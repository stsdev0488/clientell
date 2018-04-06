export default {
  // Functions return fixtures
  login: (username, password) => {
    let d
    if (password === '1234567')
      d = require('../Fixtures/loginFailure.json')
    else
      d = require('../Fixtures/loginSuccess.json')

    return {
      ok: password === '1234567' ? false : true,
      data: d
    }
  },
  getUser: () => {
    return {
      ok: true,
      data: require('../Fixtures/getUser.json')
    }
  },
  updateUser: (type) => {
    let d
    switch (type) {
      case 'address':
        d = require('../Fixtures/updateProfile.json')
        break;
      case 'password':
        d = require('../Fixtures/updateProfile.json')
        break;
      default:
        d = require('../Fixtures/updateProfile.json')
    }

    return {
      ok: true,
      data: d
    }
  },
  updateUserAvatar: (image) => {
    if (!image) {
      return {
        ok: false,
        data: {error: true}
      }
    } else {
      return {
        ok: true,
        data: require('../Fixtures/updateAvatar.json')
      }
    }
  },
  getClients: () => {
    return {
      ok: true,
      data: require('../Fixtures/getClients.json')
    }
  },
  addClient: () => {
    return {
      ok: true,
      data: require('../Fixtures/addClient.json')
    }
  }
}
