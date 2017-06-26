import axios from 'axios'
import { load } from './mocks/helper'

const UseMock = true
if (process.env.NODE_ENV === 'development' && UseMock) {
  load('./sample')
}

export interface API {
  users(): Promise<any>
  userById(id: String): Promise<any>
}

const api: API = {

  users() {
    return axios.get('/users')
  },
  userById(id) {
    return axios.get('/users/' + id)
  }
}  
export default api