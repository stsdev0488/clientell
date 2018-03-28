// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { AsyncStorage } from 'react-native'
import Secrets from 'react-native-config'

// our "constructor"
const create = (baseURL) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const apiFile = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const clientSettings = {
    client_id: 2,
    client_secret: Secrets.MAIN_SECRET_KEY
  }

  const getToken = () => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.getItem('@LoginStore:token')
        .then((a) => {
          if (a) {
            resolve(a)
          }
        })
    })
  }

  /**
   * Authentication API
   */

  const login = (userData) => api.post('token', { ...userData, ...clientSettings })
  const loginSocial = (userData) => api.post('auth/login/social', { ...userData })
  const signup = (data) => {
    let dd = data
    Object.keys(clientSettings).forEach(key => {
      dd.append(key, clientSettings[key])
    })

    return apiFile.post('auth/register', dd)
  }

  /**
   * User API
   */

  const getUser = (urlParams) => {
    return getToken().then((a) => api.get('auth/user', urlParams, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const updateUser = (params) => {
    return getToken().then((a) => apiFile.post('auth/user/update-profile', params, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const updateContactInfo = (params) => {
    return getToken().then((a) => apiFile.post('auth/user/update-contact', params, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  /**
   * Clients API
   */

  const addClient = (data) => {
    return getToken().then((a) => api.post('client', data, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const editClient = ({id, data}) => {
    return getToken().then((a) => api.post('client/' + id, {...data, _method: 'PUT'}, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const getClients = (urlParams) => {
    return getToken().then((a) => api.get('client?include=reviews.user,reviews.client', urlParams, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const clientLookup = (params) => {
    return getToken().then((a) => api.get('review?include=client,user', params, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const clientFilter = (params) => {
    return getToken().then((a) => api.get('client?include=reviews.user,reviews.client', params, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const getSpecificUser = (data) => {
    if (!data.param) data.param = ''
    return getToken().then((a) => api.get(`client/${data.id}${data.param}`, {}, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  /**
   * Client Review API
   */

  const addClientReview = ({id, data}) => {
    return getToken().then((a) => api.post(`client/${id}/review`, data, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const editClientReview = ({id, data}) => {
    return getToken().then((a) => api.post(`review/${id}`, {...data, _method: 'PUT'}, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  const deleteClientReview = (id) => {
    return getToken().then((a) => api.delete(`review/${id}`, {}, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  return {
    login,
    loginSocial,
    signup,
    getUser,
    getSpecificUser,
    updateUser,
    updateContactInfo,
    addClient,
    editClient,
    getClients,
    clientLookup,
    clientFilter,
    addClientReview,
    editClientReview,
    deleteClientReview
  }
}

// let's return back our create method as the default.
export default {
  create
}
