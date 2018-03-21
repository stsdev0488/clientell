import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { authWatcher } from './AuthSagas'
import { startup } from './StartupSagas'
import { getUser, updateUser } from './UserSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // AUTH SAGAS
    takeLatest(AuthTypes.AUTH_WATCH, authWatcher),

    // USER SAGAS
    takeLatest(UserTypes.USER_REQUEST, getUser),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser)
  ])
}
