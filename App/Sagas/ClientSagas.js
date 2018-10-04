import { call, put, fork } from 'redux-saga/effects'
import ClientActions from 'Redux/ClientRedux'
import ReviewActions from 'Redux/ReviewRedux'
import UserActions from 'Redux/UserRedux'
import { apiGet, retryCall } from './StartupSagas'
import { NavigationActions } from 'react-navigation'
import { NativeModules } from 'react-native'

function * callDirectorySync () {
  if (!NativeModules.CallDetection) return

  let api = yield call(apiGet)
  const a = yield call(api['fetchAllClients'])

  if (a.ok) {
    const {data} = a.data

    if (data) {
      let phoneNumbers = []
      let phoneLabels = []

      data.forEach(d => {
        phoneNumbers.push(d.phone_number.replace('+', ''))

        const avgRating = parseInt(d.avg_rating)
        let stars = ''
        Array.from(Array(avgRating)).forEach((n) => {
          stars += `\u{2B50}`
        })

        phoneLabels.push(`${stars} ${d.name}`)
      })

      NativeModules.CallDetection.addContacts(phoneNumbers, phoneLabels)

      // debug numbers
      // NativeModules.CallDetection.addContacts(
      //   ['639173078009', '61416622681'],
      //   [`\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Ian`, `\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Aaron Darr`]
      // )
    }
  }
}

export function * getClients ({ data }, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  const response = yield call(api.getClients, data)

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

export function * addClient ({ data, edit }, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  let formData = new FormData()

  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  if (edit) {
    formData.append('_method', 'PUT')
  }

  let apiCall = edit ? api.editClient : api.addClient
  const toSubmit = edit ? { id: edit, data: formData } : formData

  try {
    const response = yield call(apiCall, toSubmit)

    if (response.ok) {
      yield put(ClientActions.addClientSuccess(response.data))
      yield fork(callDirectorySync)

      if (edit) {
        yield put(ClientActions.getSpecificClient(edit))
      } else {
        yield put(NavigationActions.navigate({ routeName: 'ClientProfile', params: { client: response.data } }))
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
      yield fork(callDirectorySync)

      // go back to clients listings on successful delete
      yield put(NavigationActions.back())
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
      yield put(ClientActions.clientRequest())
      yield fork(callDirectorySync)
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
      yield fork(callDirectorySync)
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
      yield put(ClientActions.clientRequest())
      yield fork(callDirectorySync)
    } else {
      yield put(ReviewActions.deleteReviewFailure(response.data))
    }
  } catch (err) {
    // err
    yield put(ReviewActions.reviewFailure({message: 'Failed to delete review.'}))
  }
}