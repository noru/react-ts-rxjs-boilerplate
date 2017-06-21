// @flow

import React, { PureComponent } from 'react'

export default class Placeholder extends PureComponent<any, any> {
  render() {
    return <div>Placeholder {this.props.params.v}</div>
  }
}