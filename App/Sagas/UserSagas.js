import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { apiGet, retryCall } from './StartupSagas'
import { NavigationActions } from 'react-navigation'

export function * getUser (action) {
  const { data } = action
  // make the call to the api
  const response = yield call(retryCall, 5, 'getUser', data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(UserActions.userSuccess(response.data))
  } else {
    yield put(UserActions.userFailure())
  }
}

export function * updateUser (action) {
  try {
    const api = yield call(apiGet)

    const { data } = action
    // make the call to the api
    let endpoint = api.updateUser
    if (data._parts.length && data._parts[0][0] && data._parts[0][0] === 'street_address') {
      endpoint = api.updateContactInfo
    }

    if (data._parts.length && data._parts[0][0] && data._parts[0][0] === 'password') {
      endpoint = api.updatePassword
    }

    const response = yield call(endpoint, data)

    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(UserActions.userUpdateSuccess(response.data))
      yield put(UserActions.userRequest())
      yield put(NavigationActions.back())
    } else {
      yield put(UserActions.userUpdateFailure(response.data))
    }
  } catch (error) {
    yield put(UserActions.userUpdateFailure({message: 'Update failure. Please try again.'}))
  }
}

export function * updateUserAvatar (action) {
  try {
    const api = yield call(apiGet)

    const { data } = action
    // make the call to the api
    let endpoint = api.updateAvatar
    const response = yield call(endpoint, data)

    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(UserActions.userUpdateSuccess(response.data))
      yield put(UserActions.userRequest())
    } else {
      yield put(UserActions.userUpdateFailure(response.data))
    }
  } catch (error) {
    yield put(UserActions.userUpdateFailure({message: 'Failed to update avatar. Please try again.'}))
  }
}
