import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18n from 'js/i18n'

const Root = ({ history, routes }) => {

  let ComponentEl = (
    <I18nextProvider i18n={i18n}>
      <Router history={history}>
        {routes}
      </Router>
    </I18nextProvider>
  )
/*
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./DevTools').default

    ComponentEl = (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          {!window.devToolsExtension ? <DevTools /> : null}
        </div>
      </Provider>
    )
  }*/

  return ComponentEl
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
}

export default Root
