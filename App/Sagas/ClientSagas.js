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

export function * addClient ({ data }) {
  const api = yield call(apiGet)
  
  try {
    const response = yield call(api.addClient, data)

    if (response.ok) {
      yield put(ClientActions.addClientSuccess(response.data))
    } else {
      yield put(ClientActions.addClientFailure(response.data))
    }
  } catch (err) {
    // err
  }
}