import * as React from 'react'
import { Subscription } from 'rxjs-es/Subscription'
import { HttpCallSubject, HttpCallObservable } from 'observables/index'

export default class Placeholder extends React.PureComponent<any, { data: any }> {

  subscribe: Subscription

  state = {
    data: null
  }

  buttonClicked = (evt) => {
    console.log('clicked');
    HttpCallSubject.next() 
  }
  
  observeHttp = (data: any) => {
    console.log(data);
    this.setState({ data: data })
  }

  componentDidMount() {
    this.subscribe = HttpCallObservable.subscribe(this.observeHttp)
  }

  componentWillUnmount() {
    this.subscribe.unsubscribe()
  }

  render() {
    return <div>
      <div>Placeholder {this.props.match.params.v}</div>
      <button onClick={this.buttonClicked}>Button</button>
      <div>{JSON.stringify(this.state.data)}</div>
    </div>
  }
}