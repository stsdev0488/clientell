import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contractorSearchRequest: ['data'],
  contractorSearchSuccess: ['payload'],
  contractorSearchFailure: ['data']
})

export const ContractorSearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ContractorSearchSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, { data }) =>
  state.merge({ fetching: false, error: data, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTRACTOR_SEARCH_REQUEST]: request,
  [Types.CONTRACTOR_SEARCH_SUCCESS]: success,
  [Types.CONTRACTOR_SEARCH_FAILURE]: failure
})
