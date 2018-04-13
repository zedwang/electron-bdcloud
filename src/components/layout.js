import React, {Component} from 'react';
import './layout.scss';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>);
  }
}