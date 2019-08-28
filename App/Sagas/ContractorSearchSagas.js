import { call, put } from 'redux-saga/effects'
import ContractorSearchActions from 'Redux/ContractorSearchRedux'
// import { ContractorSearchSelectors } from 'Redux/ContractorSearchRedux'

export function * searchContractors (api, action) {
  /**
   * TODO: uncomment code below if theres a working api already
   */

  console.tron.log('contractor search called')
  // try {
  //
  //   const { data } = action
  //   // get current data from Store
  //   // const currentData = yield select(ContractorSearchSelectors.getData)
  //   // make the call to the api
  //   const response = yield call(api.getcontractorSearch, data)
  //
  //   // success?
  //   if (response.ok) {
  //     // You might need to change the response here - do this with a 'transform',
  //     // located in ../Transforms/. Otherwise, just pass the data back from the api.
  //     yield put(ContractorSearchActions.contractorSearchSuccess(response.data))
  //   } else {
  //     yield put(ContractorSearchActions.contractorSearchFailure())
  //   }
  // } catch (err) {
  //   yield put(ContractorSearchActions.contractorSearchFailure())
  // }
}
