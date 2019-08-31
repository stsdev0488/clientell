import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ClientTypes } from '../Redux/ClientRedux'
import { SearchTypes } from '../Redux/SearchRedux'
import { ReviewTypes } from '../Redux/ReviewRedux'
import { ContractorSearchTypes } from '../Redux/ContractorSearchRedux'
import { GalleryTypes } from '../Redux/GalleryRedux'
import { LicenseTypes } from '../Redux/LicenseRedux'

/* ------------- Sagas ------------- */

import { authWatcher } from './AuthSagas'
import { startup } from './StartupSagas'
import { getUser, updateUser, updateUserAvatar } from './UserSagas'
import {
  getClients,
  addClient,
  deleteClient,
  reviewClient,
  getSpecificClient,
  editClientReview,
  deleteClientReview
} from './ClientSagas'
import { getSearchResults, getSearchResults2, getFilteredClients } from './SearchSagas'
import { searchContractors } from './ContractorSearchSagas'
import { getUserGallery, uploadUserGallery, deleteGalleryItem } from './GallerySagas'
import { getUserLicense, uploadUserLicense, deleteLicenseItem } from './LicenseSagas'

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
    takeLatest(UserTypes.AVATAR_UPDATE_REQUEST, updateUserAvatar),
    
    // GALLERY SAGAS
    takeLatest(GalleryTypes.GALLERY_REQUEST, getUserGallery),
    takeLatest(GalleryTypes.GALLERY_UPLOAD_REQUEST, uploadUserGallery),
    takeLatest(GalleryTypes.GALLERY_DELETE_REQUEST, deleteGalleryItem),
    
    // LICENSE SAGAS
    takeLatest(LicenseTypes.LICENSE_REQUEST, getUserLicense),
    takeLatest(LicenseTypes.LICENSE_UPLOAD_REQUEST, uploadUserLicense),
    takeLatest(LicenseTypes.LICENSE_DELETE_REQUEST, deleteLicenseItem),

    // CLIENT SAGAS
    takeLatest(ClientTypes.CLIENT_REQUEST, getClients),
    takeLatest(ClientTypes.ADD_CLIENT, addClient),
    takeLatest(ClientTypes.DELETE_CLIENT, deleteClient),
    takeLatest(ClientTypes.GET_SPECIFIC_CLIENT, getSpecificClient),

    // REVIEW SAGAS
    takeLatest(ReviewTypes.REVIEW_REQUEST, reviewClient),
    takeLatest(ReviewTypes.EDIT_REVIEW, editClientReview),
    takeLatest(ReviewTypes.DELETE_REVIEW, deleteClientReview),

    // SEARCH SAGAS
    takeLatest(SearchTypes.SEARCH_REQUEST, getSearchResults),
    takeLatest(SearchTypes.SEARCH2_REQUEST, getSearchResults2),
    takeLatest(SearchTypes.FILTER_CLIENTS, getFilteredClients),

    // CONTRACTOR SEARCH SAGAS
    takeLatest(ContractorSearchTypes.CONTRACTOR_SEARCH_REQUEST, searchContractors)
  ])
}
