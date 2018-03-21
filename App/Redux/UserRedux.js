import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['data'],
  userSuccess: ['payload'],
  userFailure: null,
  userUpdateRequest: ['data'],
  userUpdateSuccess: ['payload'],
  userUpdateFailure: ['payload'],
  clearUser: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  error: null,
  updating: null,
  updateError: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, error: null, payload: null })

export const updateRequest = (state) =>
  state.merge({ updating: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload })
}

export const updateSuccess = (state, { payload }) => {
  return state.merge({ updating: false, data: payload, updateError: null })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateFailure = (state, {payload}) =>
  state.merge({ updating: false, updateError: payload })

export const clearUser = (state) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.USER_UPDATE_REQUEST]: updateRequest,
  [Types.USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_UPDATE_FAILURE]: updateFailure,
  [Types.CLEAR_USER]: clearUser
})
