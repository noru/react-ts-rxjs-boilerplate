import api, { API } from './api'
import data, { Data } from './data'
import auth, { Auth } from './auth'

interface Services {
  api: API,
  data: Data,
  auth: Auth
}

const Services = {
  api,
  data,
  auth
}

export default Services
