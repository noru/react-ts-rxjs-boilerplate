import * as React from 'react'
import { Link, Match } from 'react-router-dom'
import { translate } from 'react-i18next'
import services from 'services/index'
import Placeholder from 'components/Placeholder'
import { Route } from 'react-router'

interface State { 
  response: any
}

interface Props {
  children: Array<React.ReactElement<any>>
  match: Match
  t: any
}

export class App extends React.PureComponent<Props, State> {

  handleClick = (e: Event) => {
    e.preventDefault()
    services.api.users().then((r: any) => this.setState({response: r}))
  }
  constructor() {
    super()
    this.state = {
      response: {}
    }
  }
  render() {
    const { t, match } = this.props
    return (
      <div className="app">
        <span className="span">Hello {t('world')}</span>
        <ul>
          <li><Link to="/p">React Router</Link></li>
          <li><Link to="/p/2">React</Link></li>
          <li><Link to="/p" onClick={this.handleClick}>Click</Link></li>
        </ul>
        <div>{JSON.stringify(this.state.response.data)}</div>
        <div>
          <Route path="/p/:v" component={Placeholder} />
        </div>
      </div>
    )
  }
}

export default translate()(App)
