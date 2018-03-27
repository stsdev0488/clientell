import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clientRequest: ['data'],
  clientSuccess: ['payload'],
  clientFailure: null,
  addClient: ['data', 'edit'],
  addClientSuccess: ['data'],
  addClientFailure: ['data'],
  getSpecificClient: ['id'],
  getClientSuccess: ['data'],
  getClientFailure: null
})

export const ClientTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  addingClient: null,
  addError: null,
  fetchingClient: null,
  fetchedClient: null,
  fetchingClientError: null
})

/* ------------- Selectors ------------- */

export const ClientSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, payload: null })

export const addRequest = (state, { data }) =>
  state.merge({ addingClient: true, addError: null })

export const getClient = (state, { id }) =>
  state.merge({ fetchingClient: true, fetchedClient: null, fetchedClientError: false })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload })
}

export const addSuccess = (state, { data }) => {
  return state.merge({ addingClient: false, addError: null })
}

export const fetchClientSuccess = (state, { data }) => {
  return state.merge({ fetchingClient: false, fetchedClient: data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const addFailure = (state, { data }) =>
  state.merge({ addingClient: false, addError: data })

export const fetchClientError = (state, { data }) => {
  return state.merge({ fetchingClient: false, fetchedClientError: true })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLIENT_REQUEST]: request,
  [Types.CLIENT_SUCCESS]: success,
  [Types.CLIENT_FAILURE]: failure,
  [Types.ADD_CLIENT]: addRequest,
  [Types.ADD_CLIENT_SUCCESS]: addSuccess,
  [Types.ADD_CLIENT_FAILURE]: addFailure,
  [Types.GET_SPECIFIC_CLIENT]: getClient,
  [Types.GET_CLIENT_SUCCESS]: fetchClientSuccess,
  [Types.GET_CLIENT_FAILURE]: fetchClientError
})
