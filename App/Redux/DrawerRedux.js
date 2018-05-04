import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  drawerOpen: null,
  drawerClose: null
})

export const DrawerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  opened: false
})

/* ------------- Selectors ------------- */

export const DrawerSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const open = (state) =>
  state.merge({ opened: true })

export const close = (state) => {
  return state.merge({ opened: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRAWER_OPEN]: open,
  [Types.DRAWER_CLOSE]: close
})
