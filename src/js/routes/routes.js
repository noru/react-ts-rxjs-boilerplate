import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Placeholder from 'components/Placeholder'

export default (
  <Route path="/" component={App}>
    {/*<IndexRoute component={Placeholder} />
    <Route path="/p" component={Placeholder} />
    <Route path="/p/:v" component={Placeholder} />
    <Redirect from="*" to="404" />*/}
  </Route>
)