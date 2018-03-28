import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchRequest: ['data'],
  searchSuccess: ['payload'],
  searchFailure: ['data'],
  filterClients: ['keyword'],
  clientFilterSuccess: ['data'],
  clientFilterFailure: null
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  filteredClient: null,
  filtering: null,
  filterError: null,
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
  state.merge({ filtering: true, filteredClient: null })

// successful api lookup
export const filterSuccess = (state, action) => {
  const { data } = action
  return state.merge({ filtering: false, filterError: null, filteredClient: data })
}

// Something went wrong somewhere.
export const filterFailure = (state, { data }) =>
  state.merge({ filtering: false, filterError: true })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
  [Types.FILTER_CLIENTS]: requestFilter,
  [Types.CLIENT_FILTER_SUCCESS]: filterSuccess,
  [Types.CLIENT_FILTER_FAILURE]: filterFailure
})
