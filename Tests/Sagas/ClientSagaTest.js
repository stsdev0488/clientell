import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import {
  getClients,
  addClient,
  deleteClient,
  reviewClient,
  getSpecificClient,
  editClientReview,
  deleteClientReview
} from '../../App/Sagas/ClientSagas'
import ClientActions from '../../App/Redux/ClientRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('list clients success', () => {
  const response = FixtureAPI.getClients()
  const step = stepper(getClients({data: null}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(ClientActions.clientSuccess(response.data)))
})

test('add client success', () => {
  const response = FixtureAPI.addClient({})
  const step = stepper(addClient({data: {}, edit: false}, FixtureAPI))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  expect(stepResponse).toEqual(put(ClientActions.addClientSuccess(response.data)))
})
