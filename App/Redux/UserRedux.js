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
  avatarUpdateRequest: ['data'],
  clearErrorUser: null,
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
  updateError: null,
  updatingAvatar: null
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
  return state.merge({ updating: false, data: payload, updateError: null, updatingAvatar: false })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateFailure = (state, {payload}) =>
  state.merge({ updating: false, updateError: payload, updatingAvatar: false })

export const clearUser = (state) => {
  return INITIAL_STATE
}

export const avatarUpdateRequest = (state) =>
  state.merge({ updatingAvatar: true })

export const clearErrors = (state) =>
  state.merge({ updateError: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.USER_UPDATE_REQUEST]: updateRequest,
  [Types.USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_UPDATE_FAILURE]: updateFailure,
  [Types.AVATAR_UPDATE_REQUEST]: avatarUpdateRequest,
  [Types.CLEAR_ERROR_USER]: clearErrors,
  [Types.CLEAR_USER]: clearUser
})
