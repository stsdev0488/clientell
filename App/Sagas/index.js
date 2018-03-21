import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ClientTypes } from '../Redux/ClientRedux'

/* ------------- Sagas ------------- */

import { authWatcher } from './AuthSagas'
import { startup } from './StartupSagas'
import { getUser, updateUser } from './UserSagas'
import { getClients } from './ClientSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // AUTH SAGAS
    takeLatest(AuthTypes.AUTH_WATCH, authWatcher),

    // USER SAGAS
    takeLatest(UserTypes.USER_REQUEST, getUser),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser),

    takeLatest(ClientTypes.CLIENT_REQUEST, getClients)
  ])
}
