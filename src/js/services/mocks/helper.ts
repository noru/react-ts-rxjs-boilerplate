import axios from 'axios'
import * as MockAdapter from 'axios-mock-adapter'

export function load(routeFile: string) {
  let mock = new MockAdapter(axios)
  require(`${routeFile}`).default(mock) // use string template to suppress warning

}