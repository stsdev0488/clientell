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

  const getSpecificUser = (data) => {
    if (!data.param) data.param = ''
    return getToken().then((a) => api.get(`user/${data.id}${data.param}`, {}, {headers: {'Authorization': 'Bearer ' + a}}))
  }

  return {
    login,
    loginSocial,
    signup,
    getUser,
    getSpecificUser
  }
}

// let's return back our create method as the default.
export default {
  create
}
