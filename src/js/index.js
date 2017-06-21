// dependencies
import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'
import routes from 'routes/routes'

// tree shaking doesn't work when use strip plugin
const Perf = process.env.NODE_ENV === 'production' ? {} : require('react-addons-perf')

// components & stores
import Root from 'components/Root'

// stylesheets
import 'css/main'

const history = createBrowserHistory()
const rootElement = document.getElementById('app')

Perf.start()
render(
  <AppContainer errorReporter={Redbox}>
    <Root history={history} routes={routes}/>
  </AppContainer>,
  rootElement
)
Perf.stop()
Perf.printInclusive(Perf.getLastMeasurements())

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render(
      <AppContainer errorReporter={Redbox}>
        <Root history={history} routes={routes}/>
      </AppContainer>,
      rootElement
    )
  })
}