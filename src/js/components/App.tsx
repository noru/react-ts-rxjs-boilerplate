import * as React from 'react'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import services from 'services'

interface State { 
  response: any
}

interface Props {
  children: Array<React.ReactElement<any>>,
  t: any
}

export class App extends React.PureComponent<Props, State> {

  public handleClick(e: Event) {
    console.log(
      'test'
    );
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
    const { t } = this.props
    return (
      <div className="app">
        <span className="span">Hello {t('world')}</span>
        <ul>
          <li><Link to="/p">React Router</Link></li>
          <li><Link to="/p/2">React</Link></li>
          <li><Link to="/p" onClick={this.handleClick.bind(this)}>Click</Link></li>
        </ul>
        <div>{JSON.stringify(this.state.response.data)}</div>
        <div>{this.props.children}</div>
      </div>
    )
  }

}

export default translate()(App)
