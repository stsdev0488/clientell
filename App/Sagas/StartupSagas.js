import { put, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'
import API from '../Services/Api'
import Secrets from 'react-native-config'
import { NativeModules, Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'

function checkDirectoryEnabled () {
  return (new Promise((resolve) => {
    try {
      NativeModules.CallDetection.checkEnabled((err, data) => {
        resolve(data)
      })
    } catch (err) {
      resolve({enabled: false})
    }
  }))
}

// process STARTUP actions
export function * startup (action) {
  yield put(AuthActions.authWatch())
  const logined = yield call(AsyncStorage.getItem, '@LoginStore:token')

  if (logined) {
    const b = yield call(checkDirectoryEnabled)

    if (!b.enabled) {
      // delay 1 second to allow other preloaded tabs to set its navigation header values
      yield call(delay, 500)
      yield put(NavigationActions.navigate({ routeName: 'CallDirectoryModal' }))
    }

    const api = yield call(apiGet)
    const a = yield call(api['fetchAllClients'])

    if (a.ok) {
      const {data} = a.data

      if (data) {
        let phoneNumbers = []
        let phoneLabels = []

        data.forEach(d => {
          phoneNumbers.push(d.phone_number.replace('+', ''))

          const avgRating = parseInt(d.avg_rating)
          let stars = ''
          Array.from(Array(avgRating)).forEach((n) => {
            stars += `\u{2B50}`
          })

          phoneLabels.push(`${stars} ${d.name}`)
        })

        NativeModules.CallDetection.addContacts(phoneNumbers, phoneLabels)

        // debug numbers
        // NativeModules.CallDetection.addContacts(
        //   ['639173078009', '61416622681'],
        //   [`\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Ian`, `\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50} Aaron Darr`]
        // )
      }
    }
  }
}

export function * apiGet () {
  const a = yield call(AsyncStorage.getItem, '@AppStore:useAlternateURL')
  /* ------------- API ------------- */

  // The API we use is only used from Sagas, so we create it here and pass along
  // to the sagas which need it.
  const api = API.create(a ? Secrets.ALTERNATE_API_URL : Secrets.API_URL)
  return api
}

export function * retryCall (maxRetries, apiName, data) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const api = yield call(apiGet)
      const a = yield call(api[apiName], data)

      if (a && a.ok) {
        return a
      } else {
        return {ok: false}
      }
    } catch (err) {
      if (i < (maxRetries - 1)) {
        yield call(delay, 2000)
      }
    }
  }
}