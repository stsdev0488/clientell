import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { login } from '../../App/Sagas/AuthSagas'
import AuthActions from '../../App/Redux/AuthRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

// test('Calls login API', () => {
//   const api = API.create('https://test-server.io')
//   const step = stepper(login({username: 'admin@user.com', password: '123456'}))
//   step()
//   const stepResponse = step({data: {token: 'test'}})
// })

test('login success saga', () => {
  const response = FixtureAPI.login('admin@user.com', '123456')
  const step = stepper(login({username: 'admin@user.com', password: '123456'}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(AuthActions.authSuccess(JSON.stringify(response.data))))
})

test('login failure saga', () => {
  const response = FixtureAPI.login('admin@user.com', '1234567')
  const step = stepper(login({username: 'admin@user.com', password: '1234567'}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(AuthActions.authFailure(response.data)))
})
