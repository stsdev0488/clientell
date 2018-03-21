import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'
import API from '../Services/Api'
import Secrets from 'react-native-config'

// process STARTUP actions
export function * startup (action) {
  yield put(AuthActions.authWatch())
}

export function * apiGet () {
  const a = yield call(AsyncStorage.getItem, '@AppStore:useAlternateURL')
  /* ------------- API ------------- */

  // The API we use is only used from Sagas, so we create it here and pass along
  // to the sagas which need it.
  const api = API.create(a ? Secrets.ALTERNATE_API_URL : Secrets.API_URL)
  return api
}

export function * retryCall (maxRetries, apiName, data) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const api = yield call(apiGet)
      const a = yield call(api[apiName], data)

      if (a && a.ok) {
        return a
      } else {
        return {ok: false}
      }
    } catch (err) {
      if (i < (maxRetries - 1)) {
        yield call(delay, 2000)
      }
    }
  }
}