import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchRequest: ['data'],
  searchSuccess: ['payload'],
  searchFailure: ['data'],
  search2Request: ['data'],
  search2Success: ['payload'],
  search2Failure: ['data'],
  filterClients: ['keyword'],
  clientFilterSuccess: ['data'],
  clientFilterFailure: null,
  clearFilter: null
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  data2: null,
  fetching2: null,
  payload2: null,
  error2: null,
  filteredClient: null,
  filtering: null,
  filterError: null,
  pagination: null
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
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

/**
 * CLIENT FILTER
 */
// request the data from an api
export const requestFilter = (state, { data }) =>
  state.merge({ filtering: true, filteredClient: null, pagination: null })

// successful api lookup
export const filterSuccess = (state, action) => {
  const { data } = action
  return state.merge({ filtering: false, filterError: null, filteredClient: data, pagination: data.meta ? data.meta.pagination : null })
}

// Something went wrong somewhere.
export const filterFailure = (state, { data }) =>
  state.merge({ filtering: false, filterError: true })

export const clearFilter = (state) =>
  state.merge({ filteredClient: null, pagination: null })

/**
 * Search v2 used in client info
 */
// request the data from an api
export const request2 = (state, { data }) =>
  state.merge({ fetching2: true, data2: null })

// successful api lookup
export const success2 = (state, action) => {
  const { payload } = action
  return state.merge({ fetching2: false, error2: null, payload2: payload })
}

// Something went wrong somewhere.
export const failure2 = (state, { data }) =>
  state.merge({ fetching2: false, error2: data, payload2: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
  [Types.SEARCH2_REQUEST]: request2,
  [Types.SEARCH2_SUCCESS]: success2,
  [Types.SEARCH2_FAILURE]: failure2,
  [Types.FILTER_CLIENTS]: requestFilter,
  [Types.CLIENT_FILTER_SUCCESS]: filterSuccess,
  [Types.CLIENT_FILTER_FAILURE]: filterFailure,
  [Types.CLEAR_FILTER]: clearFilter
})
