import React, {Component} from 'react';
import '../styles/sider.scss';

export default class Sider extends Component {
  render() {
    return (
      <aside className="sider">
        {this.props.children}
      </aside>);
  }
}