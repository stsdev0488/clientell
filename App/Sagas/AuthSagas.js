import { call, put, fork, take } from 'redux-saga/effects'
import AuthActions, {AuthTypes} from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'
import {AsyncStorage, NativeModules, Platform} from 'react-native'
import {delay} from 'redux-saga'
import { apiGet } from './StartupSagas'
import { NavigationActions } from 'react-navigation'

export function * authWatcher () {
  yield [
    watchLoginFlow(),
    watchLoginSocialFlow(),
    watchLogoutFlow(),
    watchSignupFlow()
  ]
}

/**
 * Watchers
 */

function * watchSignupFlow () {
  while (true) {
    const action = yield take(AuthTypes.REGISTER)
    // login action
    yield fork(register, action)
  }
}

function * watchLoginFlow () {
  while (true) {
    const action = yield take(AuthTypes.LOGIN)
    // login action
    yield fork(login, action)
  }
}

function * watchLoginSocialFlow () {
  while (true) {
    const action = yield take(AuthTypes.LOGIN_SOCIAL)
    // login action
    yield fork(loginFB, action)
  }
}

function * watchLogoutFlow () {
  while (true) {
    yield take(AuthTypes.LOGOUT)
    yield fork(logoutTask)
  }
}

/**
 * Saga Executions
 */

// Register
export function * register ({payload}) {
  const api = yield call(apiGet)

  try {
    let formData = new FormData()

    Object.keys(payload).forEach(key => {
      if (key === 'avatar' && !payload[key]) return

      formData.append(key, payload[key])
    })

    const response = yield call(api.signup, formData)

    if (response && response.ok) {
      yield put(AuthActions.registrationSuccess(JSON.stringify(response.data)))
      yield call(delay, 100)
      yield put(AuthActions.login(payload.email, payload.password))
      /**
       * ADD PUSH TOKEN TO USER
       */
      // yield call(api.addPushToken, {
      //   device_type: Platform.OS
      // });
      return true
    } else {
      yield put(AuthActions.registrationFailure(response.data || {error: 'unknown', message: `Can't connect to server`}))
    }
  } catch (error) {
    yield put(AuthActions.registrationFailure({error: 'unknown', message: `Can't connect to server`}))
  }
}

// Login
export function * login (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  try {
    const {username, password} = action

    const response = yield call(api.login, {
      grant_type: 'password',
      username: username,
      password: password
    })

    if (response && response.ok) {
      yield put(AuthActions.authSuccess(JSON.stringify(response.data)))
      AsyncStorage.setItem('@LoginStore:token', response.data.access_token)
      yield put(UserActions.userRequest())
      yield put(NavigationActions.navigate({ routeName: 'App' }))

      /**
       * ADD PUSH TOKEN TO USER
       */
      // yield call(api.addPushToken, {
      //   device_type: Platform.OS
      // });
      yield fork(callDirectorySync)

      return true
    } else {
      yield put(AuthActions.authFailure(response.data || {error: 'unknown', message: `Can't connect to server`}))
    }
  } catch (error) {
    console.log(error)
    yield put(AuthActions.authFailure({error: 'unknown', message: `Can't connect to server`}))
  }
}

// FB Login
export function * loginFB (action) {
  const api = yield call(apiGet)

  try {
    const {accessToken, provider} = action

    const response = yield call(api.loginSocial, {
      grant_type: 'social',
      provider,
      access_token: accessToken
    })

    if (response && response.ok) {
      yield put(AuthActions.authSuccess(JSON.stringify(response.data)))

      AsyncStorage.setItem('@LoginStore:token', response.data.access_token)
      yield put(UserActions.userRequest())
      yield put(NavigationActions.navigate({ routeName: 'App' }))

      /**
       * ADD PUSH TOKEN TO USER
       */
      // yield call(api.addPushToken, {
      //   device_type: Platform.OS
      // });

      yield fork(callDirectorySync)

      return true
    } else {
      let errorObj = response.data || {error: 'unknown', message: `Can't connect to server`}
      if (errorObj.error && errorObj.error === 'not_registered') {
        errorObj = ['Facebook email was not registered.']
      }
      yield put(AuthActions.authFailure(errorObj))
    }
  } catch (error) {
    yield put(AuthActions.authFailure({error: 'unknown', message: `Can't connect to server`}))
  }
}

// Logout
function * logoutTask () {
  // logout task here
  // const api = yield call(apiGet)

  try {
    yield call([
      UserActions.clearUser()
    ])
  } catch (error) {
    console.tron.log(error)
  }
}

function * callDirectorySync () {
  if (!NativeModules.CallDetection) return

  let api = yield call(apiGet)

  yield call(delay, 500)
  const b = yield call(checkDirectoryEnabled)

  if (!b.enabled) {
    yield put(NavigationActions.navigate({ routeName: 'CallDirectoryModal' }))
  }

  const a = yield call(api['fetchAllClients'])

  if (a.ok) {
    const {data} = a.data

    if (data) {
      let phoneNumbers = []
      let phoneLabels = []
      let androidEntries = []

      data.forEach(d => {
        phoneNumbers.push(d.phone_number.replace('+', ''))

        const avgRating = parseInt(d.avg_rating)
        let stars = ''
        Array.from(Array(avgRating)).forEach((n) => {
          stars += `\u{2B50}`
        })

        phoneLabels.push(`${stars} ${d.name}`)
        androidEntries.push({
          rating: stars,
          name: `${d.name}`,
          phone: d.phone_number.replace('+', '')
        })
      })

      if (Platform.OS === 'ios') {
        NativeModules.CallDetection.addContacts(phoneNumbers, phoneLabels)
      } else {
        NativeModules.CallDetection.addContacts([])
      }

      // debug numbers
      // NativeModules.CallDetection.addContacts(
      //   ['639173078009', '61416622681'],
      //   [`\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Ian`, `\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Aaron Darr`]
      // )
      // NativeModules.CallDetection.addContacts([
      //   {
      //     rating: '\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50}',
      //     phone: '6505551212',
      //     name: 'Ian'
      //   }
      // ])
    }
  }
}

function checkDirectoryEnabled () {
  return (new Promise((resolve) => {
    try {
      if (Platform.OS !== 'android') {
        NativeModules.CallDetection.checkEnabled((err, data) => {
          resolve(data)
        })
      } else {
        NativeModules.CallDetection.checkEnabled((data) => {
          console.tron.log(data)
          resolve(data)
        })
      }
    } catch (err) {
      resolve({enabled: false})
    }
  }))
}
