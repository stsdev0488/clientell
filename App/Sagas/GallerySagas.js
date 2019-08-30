import { call, put } from 'redux-saga/effects'
import GalleryActions from 'Redux/GalleryRedux'
import {apiGet} from "./StartupSagas";
// import { GallerySelectors } from 'Redux/GalleryRedux'

export function * getUserGallery (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  try {
    const { data } = action
    const response = yield call(api.fetchGallery, data)

    // success?
    if (response.ok) {
      yield put(GalleryActions.gallerySuccess(response.data.data))
    } else {
      yield put(GalleryActions.galleryFailure())
    }
  } catch (err) {
    yield put(GalleryActions.galleryFailure())
  }
}

export function * uploadUserGallery (action, fixtureAPI) {
  let api
  if (!fixtureAPI) {
    api = yield call(apiGet)
  } else {
    api = fixtureAPI
  }

  try {
    const { data } = action
    const response = yield call(api.uploadGallery, data)

    // success?
    if (response.ok) {
      yield put(GalleryActions.galleryUploadSuccess(response.data))
      yield put(GalleryActions.galleryRequest())
    } else {
      yield put(GalleryActions.galleryUploadFailure())
    }
  } catch (err) {
    yield put(GalleryActions.galleryUploadFailure())
  }
}
