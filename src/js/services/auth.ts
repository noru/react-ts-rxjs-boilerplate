import axios from 'axios'
// import { load } from './mocks/helper'

const UseMock = true
if (process.env.NODE_ENV === 'development' && UseMock) {
  // load('./sample')
}

const ax = () => {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem('hc-apm-token')
    }
  })
}

const userAccounts = '/gateway/api/apm/security/userAccounts'
const url = {
  login: 'authenticateBasic',
  refresh: 'refreshToken'
}
Object.keys(url).forEach(key => url[key] = userAccounts + url[key])

export interface Login {
  loginName: String
  password: String
}

export interface Auth {
  login(data: Login): Promise<any>
  refresh(): Promise<any>
}

const auth: Auth = {
  login(data) {
    return axios.post(url.login, data).then(res => {
      if (res && res.data && res.data.jwtToken && res.data.jwtToken.id_token) {
        const date = new Date()
        localStorage.setItem('hc-apm-token', res.data.jwtToken.id_token)
        localStorage.setItem('hc-apm-token-expire', res.data.jwtToken.expiredSeconds + date.getSeconds())
      }
    })
  },
  refresh() {
    return ax().get(url.refresh).then(res => {
      if (res && res.data && res.data.id_token) {
        const date = new Date()
        localStorage.setItem('hc-apm-token', res.data.id_token)
        localStorage.setItem('hc-apm-token-expire', res.data.expiredSeconds + date.getSeconds())
      }
    })
  }
}

export default auth
