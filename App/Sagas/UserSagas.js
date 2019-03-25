import { call, put } from 'redux-saga/effects'
import {delay} from 'redux-saga'
import UserActions from '../Redux/UserRedux'
import { apiGet, retryCall } from './StartupSagas'
import { NavigationActions } from 'react-navigation'

export function * getUser (action, fixtureAPI) {
  const { data } = action
  // make the call to the api
  let response
  if (!fixtureAPI) {
    response = yield call(retryCall, 5, 'getUser', data)
  } else {
    response = yield call(fixtureAPI.getUser)
  }

  // success?
  if (response && response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.

    if (response.data.finished_signup) {
      yield call(delay, 500)
      yield put(NavigationActions.back())
      yield put(NavigationActions.navigate({ routeName: 'PostSignUp', params: {user: response.data} }))
    }
    yield put(UserActions.userSuccess(response.data))
  } else {
    yield put(UserActions.userFailure())
  }
}

export function * updateUser (action, fixtureAPI) {
  try {
    let response
    if (!fixtureAPI) {
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

      response = yield call(endpoint, data)
    } else {
      const { data } = action
      response = yield call(fixtureAPI.updateUser, data)
    }

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

export function * updateUserAvatar (action, fixtureAPI) {
  try {
    let response
    const { data } = action

    if (!fixtureAPI) {
      const api = yield call(apiGet)
      // make the call to the api
      let endpoint = api.updateAvatar
      response = yield call(endpoint, data)
    } else {
      response = yield call(fixtureAPI.updateUserAvatar, data)
    }

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
