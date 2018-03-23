import { call, put } from 'redux-saga/effects'
import SearchActions from 'Redux/SearchRedux'
import { apiGet, retryCall } from './StartupSagas'

export function * getSearchResults ({ data }) {
  const api = yield call(apiGet)
  const response = yield call(api.clientLookup, data)

  // success?
  if (response.ok) {
    yield put(SearchActions.searchSuccess(response.data))
  } else {
    yield put(SearchActions.searchFailure(response.data))
  }
}