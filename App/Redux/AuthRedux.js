import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authWatch: null,
  register: ['payload'],
  login: ['username', 'password'],
  logout: null,
  loginSocial: ['accessToken', 'provider'],
  authSuccess: ['payload'],
  authFailure: ['payload'],
  registrationSuccess: ['payload'],
  registrationFailure: ['payload'],
  reset: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null,
  registering: null,
  registrationError: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const authWatch = (state, { data }) => state

export const register = (state, { data }) =>
  state.merge({ registering: true, registrationError: null })

export const login = (state, { data }) =>
  state.merge({ fetching: true, error: null })

export const loginSocial = (state, { data }) =>
  state.merge({ fetching: true, error: null })

export const logout = (state, { data }) => state

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload })
}

export const registrationSuccess = (state, {payload}) =>
  state.merge({ registering: false, error: null })

// Something went wrong somewhere.
export const failure = (state, {payload}) =>
  state.merge({ fetching: false, error: payload })

export const registrationFailure = (state, {payload}) =>
  state.merge({ registering: false, registrationError: payload })

export const authReset = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_WATCH]: authWatch,
  [Types.REGISTER]: register,
  [Types.LOGIN]: login,
  [Types.LOGIN_SOCIAL]: loginSocial,
  [Types.LOGOUT]: logout,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.REGISTRATION_SUCCESS]: registrationSuccess,
  [Types.REGISTRATION_FAILURE]: registrationFailure,
  [Types.RESET]: authReset
})
