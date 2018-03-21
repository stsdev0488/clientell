import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { apiGet, retryCall } from './StartupSagas'

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
  const api = yield call(apiGet)

  const { data } = action
  // make the call to the api
  let endpoint = api.updateUser
  if (data._parts.length === 1 && data._parts[0][0] && data._parts[0][0] === 'avatar') {
    endpoint = api.updateUserAvatar
  }

  if (data._parts.length === 3) {
    let keys = 0
    data._parts.forEach(item => {
      if (item[0] === 'birth_date' || item[0] === 'gender' || item[0] === 'preferred_trainer_gender') {
        keys++
      }
    })
    if (keys === 3) {
      endpoint = api.startupUserUpdate
    }
  }

  const response = yield call(endpoint, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(UserActions.userUpdateSuccess(response.data))
  } else {
    yield put(UserActions.userUpdateFailure(response.data))
  }
}
