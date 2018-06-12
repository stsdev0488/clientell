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
  getClientFailure: null,
  deleteClient: ['id'],
  deleteClientSuccess: null,
  deleteClientFailure: null,
  clientReset: null,
  clearFormErrors: null
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
  fetchingClientError: null,
  deleting: null,
  deleteError: null,
  pagination: null
})

/* ------------- Selectors ------------- */

export const ClientSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

/**
 * GET CLIENTS LISTS
 */

export const request = (state, { data }) =>
  state.merge({ fetching: true, payload: null, pagination: null, error: false })

export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload, pagination: payload.meta && payload.meta.pagination ? payload.meta.pagination : null })
}

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null, pagination: null })

/**
 * ADD CLIENT
 */

export const addRequest = (state, { data }) =>
  state.merge({ addingClient: true, addError: null })

export const addSuccess = (state, { data }) => {
  return state.merge({ addingClient: false, addError: null })
}

// Something went wrong somewhere.

export const addFailure = (state, { data }) =>
  state.merge({ addingClient: false, addError: data })

/**
 * FETCH CLIENT
 */

export const getClient = (state, { id }) =>
  state.merge({ fetchingClient: true, fetchedClient: null, fetchedClientError: false })

export const fetchClientSuccess = (state, { data }) => {
  return state.merge({ fetchingClient: false, fetchedClient: data })
}

export const fetchClientError = (state, { data }) => {
  return state.merge({ fetchingClient: false, fetchedClientError: true })
}

/**
 * DELETE CLIENT
 */

export const deleteRequest = (state, { data }) =>
  state.merge({ deleting: true, deleteError: false })

export const deleteSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ deleting: false })
}

export const deleteFailure = state =>
  state.merge({ deleting: false, deleteError: true })

export const clientsReset = (state: Object) => INITIAL_STATE
export const clearFormErrors = (state: Object) =>
  state.merge({ addError: null })

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
  [Types.GET_CLIENT_FAILURE]: fetchClientError,
  [Types.DELETE_CLIENT]: deleteRequest,
  [Types.DELETE_CLIENT_SUCCESS]: deleteSuccess,
  [Types.DELETE_CLIENT_FAILURE]: deleteFailure,
  [Types.CLIENT_RESET]: clientsReset,
  [Types.CLEAR_FORM_ERRORS]: clearFormErrors
})
