import { call, put } from 'redux-saga/effects'
import LicenseActions from 'Redux/LicenseRedux'
import {apiGet} from "./StartupSagas";
// import { LicenseSelectors } from 'Redux/LicenseRedux'

export function * getUserLicense (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  try {
    const { data } = action
    const response = yield call(api.fetchLicense, data)

    // success?
    if (response.ok) {
      yield put(LicenseActions.licenseSuccess(response.data.data))
    } else {
      yield put(LicenseActions.licenseFailure())
    }
  } catch (err) {
    yield put(LicenseActions.licenseFailure())
  }
}

export function * uploadUserLicense (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  console.tron.log(action)

  // try {
  //   const { data } = action
  //   const response = yield call(api.uploadLicense, data)
  //
  //   // success?
  //   if (response.ok) {
  //     yield put(LicenseActions.licenseUploadSuccess(response.data))
  //     yield put(LicenseActions.licenseRequest())
  //   } else {
  //     yield put(LicenseActions.licenseUploadFailure())
  //   }
  // } catch (err) {
  //   yield put(LicenseActions.licenseUploadFailure())
  // }
}

export function * deleteLicenseItem (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  try {
    const { id } = action
    const response = yield call(api.deleteLicenseItem, id)

    // success?
    if (response.ok) {
      yield put(LicenseActions.licenseDeleteSuccess())
      yield put(LicenseActions.licenseRequest())
    } else {
      yield put(LicenseActions.licenseDeleteFailure())
    }
  } catch (err) {
    yield put(LicenseActions.licenseDeleteFailure())
  }
}
