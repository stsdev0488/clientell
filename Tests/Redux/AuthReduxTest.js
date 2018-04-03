import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/AuthRedux'

test('login', () => {
  const username = 'admin@user.com'
  const password = '123456'
  const state = reducer(INITIAL_STATE, Actions.login(username, password))

  expect(state.fetching).toBe(true)
})

test('login success', () => {
  const data = JSON.stringify({'token_type':'Bearer','expires_in':2592000,'access_token':'sample_token'})
  const state = reducer(INITIAL_STATE, Actions.authSuccess(data))

  expect(state.fetching).toBe(false)
  expect(state.data).toBe(data)
  expect(state.error).toBeNull()
})

test('login failure', () => {
  const data = {
    error: 'invalid_credentials',
    message: 'The user credentials were incorrect'
  }
  const state = reducer(INITIAL_STATE, Actions.authFailure(data))

  expect(state.fetching).toBe(false)
  expect(state.error).toHaveProperty('error')
  expect(state.error).toHaveProperty('message')
  expect(state.data).toBeNull()
})
