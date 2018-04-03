import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getUser, updateUser } from '../../App/Sagas/UserSagas'
import UserActions from '../../App/Redux/UserRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get user saga', () => {
  const response = FixtureAPI.getUser()
  const step = stepper(getUser({data: null}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(UserActions.userSuccess(response.data)))
})

test('update user saga', () => {
  const response = FixtureAPI.updateUser('personal')
  const step = stepper(updateUser({data: 'personal'}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(UserActions.userUpdateSuccess(response.data)))
})