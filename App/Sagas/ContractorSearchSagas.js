import { call, put } from 'redux-saga/effects'
import ContractorSearchActions from 'Redux/ContractorSearchRedux'
import {apiGet} from "./StartupSagas";
// import { ContractorSearchSelectors } from 'Redux/ContractorSearchRedux'

export function * searchContractors (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }
  try {
    const { data } = action
    const response = yield call(api.fetchContractors, data)

    if (response.ok) {
      yield put(ContractorSearchActions.contractorSearchSuccess(response.data.data))
    } else {
      yield put(ContractorSearchActions.contractorSearchFailure())
    }
  } catch (err) {
    yield put(ContractorSearchActions.contractorSearchFailure())
  }
}
