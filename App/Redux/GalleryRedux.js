import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  galleryRequest: ['data'],
  gallerySuccess: ['payload'],
  galleryFailure: null,
  galleryUploadRequest: ['data'],
  galleryUploadSuccess: ['payload'],
  galleryUploadFailure: null,
  galleryDeleteRequest: ['id'],
  galleryDeleteSuccess: ['payload'],
  galleryDeleteFailure: null
})

export const GalleryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  uploading: false,
  uploadError: null,
  deleting: false,
  deleteSuccess
})

/* ------------- Selectors ------------- */

export const GallerySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, error: false })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: false, data: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/**
 * Upload
 */

// request the data from an api
export const uploadRequest = (state, { data }) =>
  state.merge({ uploading: true, uploadError: null})

// successful api lookup
export const uploadSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ uploading: false, uploadError: null })
}

// Something went wrong somewhere.
export const uploadFailure = state =>
  state.merge({ uploading: false, uploadError: true })


/**
 * Delete
 */

// request the data from an api
export const deleteRequest = (state, { data }) =>
  state.merge({ deleting: true, deleteError: null})

// successful api lookup
export const deleteSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ deleting: false, deleteError: null })
}

// Something went wrong somewhere.
export const deleteFailure = state =>
  state.merge({ deleting: false, deleteError: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GALLERY_REQUEST]: request,
  [Types.GALLERY_SUCCESS]: success,
  [Types.GALLERY_FAILURE]: failure,
  [Types.GALLERY_UPLOAD_REQUEST]: uploadRequest,
  [Types.GALLERY_UPLOAD_SUCCESS]: uploadSuccess,
  [Types.GALLERY_UPLOAD_FAILURE]: uploadFailure,
  [Types.GALLERY_DELETE_REQUEST]: deleteRequest,
  [Types.GALLERY_DELETE_SUCCESS]: deleteSuccess,
  [Types.GALLERY_DELETE_FAILURE]: deleteFailure
})
