import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Header } from '../components';

@observer
export default class Layout extends Component {

  render() {
    return (
      <div className="layout">
        <Header/>
        {this.props.children}
      </div>);
  }
}