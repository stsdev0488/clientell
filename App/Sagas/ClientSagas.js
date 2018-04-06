import { call, put } from 'redux-saga/effects'
import ClientActions from 'Redux/ClientRedux'
import ReviewActions from 'Redux/ReviewRedux'
import UserActions from 'Redux/UserRedux'
import { apiGet, retryCall } from './StartupSagas'

export function * getClients () {
  const api = yield call(apiGet)
  const response = yield call(api.getClients)

  if (response.ok) {
    yield put(ClientActions.clientSuccess(response.data))
  } else {
    yield put(ClientActions.clientFailure())
  }
}

export function * getSpecificClient (action) {
  try {
    const { id } = action
    const includes = '?include=reviews.user,reviews.client'
    // make the call to the api
    const response = yield call(retryCall, 5, 'getSpecificUser', {id, param: includes})

    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(ClientActions.getClientSuccess(response.data))
    } else {
      yield put(ClientActions.getClientFailure({message: 'Client not found'}))
    }
  } catch (err) {
    yield put(ClientActions.getClientFailure({message: 'Client not found'}))
  }
}

export function * addClient ({ data, edit }) {
  const api = yield call(apiGet)
  let apiCall = edit ? api.editClient : api.addClient
  const toSubmit = edit ? { id: edit, data } : data

  try {
    const response = yield call(apiCall, toSubmit)

    if (response.ok) {
      yield put(ClientActions.addClientSuccess(response.data))

      if (edit) {
        yield put(ClientActions.getSpecificClient(edit))
      }
    } else {
      yield put(ClientActions.addClientFailure(response.data))
    }
  } catch (err) {
    // err
    yield put(ClientActions.addClientFailure({message: 'Adding client failed. Please check the required fields and try again.'}))
  }
}

export function * deleteClient ({ id }) {
  const api = yield call(apiGet)

  try {
    const response = yield call(api.deleteClient, id)

    if (response.ok) {
      yield put(ClientActions.deleteClientSuccess(response.data))
      yield put(ClientActions.clientRequest())
    } else {
      yield put(ClientActions.deleteClientFailure(response.data))
    }
  } catch (err) {
    // err
  }
}

/**
 * CLIENT REVIEW CALLS
 */

export function * reviewClient ({ id, data }) {
  const api = yield call(apiGet)

  try {
    const response = yield call(api.addClientReview, {id, data})

    if (response.ok) {
      yield put(ReviewActions.reviewSuccess(response.data))
      yield put(ClientActions.getSpecificClient(id))
      yield put(UserActions.userRequest())
    } else {
      yield put(ReviewActions.reviewFailure(response.data))
    }
  } catch (err) {
    // err
    yield put(ReviewActions.reviewFailure({message: 'Review client failed. Please try again.'}))
  }
}

export function * editClientReview ({ id, data }) {
  const api = yield call(apiGet)

  try {
    const response = yield call(api.editClientReview, {id, data})

    if (response.ok) {
      yield put(ReviewActions.editReviewSuccess(response.data))
      yield put(ClientActions.getSpecificClient(response.data.client_id))
      yield put(UserActions.userRequest())
    } else {
      yield put(ReviewActions.editReviewFailure(response.data))
    }
  } catch (err) {
    // err
    yield put(ReviewActions.reviewFailure({message: 'Edit Client review failed. Please try again.'}))
  }
}

export function * deleteClientReview ({ id, client_id }) {
  const api = yield call(apiGet)

  try {
    const response = yield call(api.deleteClientReview, id)

    if (response.ok) {
      yield put(ReviewActions.deleteReviewSuccess(response.data))
      yield put(ClientActions.getSpecificClient(client_id))
      yield put(UserActions.userRequest())
    } else {
      yield put(ReviewActions.deleteReviewFailure(response.data))
    }
  } catch (err) {
    // err
    yield put(ReviewActions.reviewFailure({message: 'Failed to delete review.'}))
  }
}