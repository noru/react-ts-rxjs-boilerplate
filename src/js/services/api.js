import axios from 'axios'
import { load } from './mocks/helper'

const UseMock = true
if (process.env.NODE_ENV === 'development' && UseMock) {
  load('./sample')
}

export default {

  users() {
    return axios.get('/users')
  },
  userById(id) {
    return axios.get('/users/' + id)
  }

}