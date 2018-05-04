import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  auth: require('./AuthRedux').reducer,
  user: require('./UserRedux').reducer,
  client: require('./ClientRedux').reducer,
  search: require('./SearchRedux').reducer,
  review: require('./ReviewRedux').reducer,
  drawer: require('./DrawerRedux').reducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
