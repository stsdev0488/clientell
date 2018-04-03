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
  loginFailure: (username, password) => {
    return {
      ok: true,
      data: require('../Fixtures/loginFailure.json')
    }
  },
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  }
}
