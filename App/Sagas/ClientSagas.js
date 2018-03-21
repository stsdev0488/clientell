import { call, put } from 'redux-saga/effects'
import ClientActions from 'Redux/ClientRedux'
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
