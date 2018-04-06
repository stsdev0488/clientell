import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reviewRequest: ['id', 'data'],
  reviewSuccess: ['payload'],
  reviewFailure: ['data'],
  editReview: ['id', 'data'],
  editReviewSuccess: ['payload'],
  editReviewFailure: ['data'],
  deleteReview: ['id', 'client_id'],
  deleteReviewSuccess: ['payload'],
  deleteReviewFailure: ['data'],
  reviewsReset: null
})

export const ReviewTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  editing: null,
  editError: null,
  deleting: null,
  deleteError: null
})

/* ------------- Selectors ------------- */

export const ReviewSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = ({ data }) =>
  state.merge({ fetching: false, error: data, payload: null })

/**
 * EDIT REVIEW
 */
// request the data from an api
export const editRequest = (state, { data }) =>
  state.merge({ editing: true, editError: null })

// successful api lookup
export const editSuccess = (state) => {
  return state.merge({ editing: false })
}

// Something went wrong somewhere.
export const editFailure = (state, { data: editError }) =>
  state.merge({ editing: false, editError })

/**
 * DELETE REVIEW
 */
// request the data from an api
export const deleteRequest = (state, { data }) =>
  state.merge({ deleting: true, deleteError: null })

// successful api lookup
export const deleteSuccess = (state) => {
  return state.merge({ deleting: false })
}

// Something went wrong somewhere.
export const deleteFailure = (state, { data: deleteError }) =>
  state.merge({ deleting: false, deleteError })

export const reviewsReset = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REVIEW_REQUEST]: request,
  [Types.REVIEW_SUCCESS]: success,
  [Types.REVIEW_FAILURE]: failure,
  [Types.EDIT_REVIEW]: editRequest,
  [Types.EDIT_REVIEW_SUCCESS]: editSuccess,
  [Types.EDIT_REVIEW_FAILURE]: editFailure,
  [Types.DELETE_REVIEW]: deleteRequest,
  [Types.DELETE_REVIEW_SUCCESS]: deleteSuccess,
  [Types.DELETE_REVIEW_FAILURE]: deleteFailure,
  [Types.REVIEWS_RESET]: reviewsReset
})
