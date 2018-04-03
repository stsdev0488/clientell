import API from '../../App/Services/Api'
import { put, call } from 'redux-saga/effects'
import { login } from '../../App/Sagas/AuthSagas'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', () => {
  const step = stepper(login(API, {username: 'admin@user.com', password: '123456'}))
  // first yield is API
  // expect(step()).toEqual(call(API.login, 'taco'))
})

// test('success path', () => {
//   const response = FixtureAPI.getUser('taco')
//   const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
//   // first step API
//   step()
//   // Second step successful return
//   const stepResponse = step(response)
//   // Get the avatar Url from the response
//   const firstUser = path(['data', 'items'], response)[0]
//   const avatar = firstUser.avatar_url
//   expect(stepResponse).toEqual(put(GithubActions.userSuccess(avatar)))
// })
//
// test('failure path', () => {
//   const response = {ok: false}
//   const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
//   // first step API
//   step()
//   // Second step failed response
//   expect(step(response)).toEqual(put(GithubActions.userFailure()))
// })
