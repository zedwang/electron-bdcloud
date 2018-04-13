import React, {Component} from 'react';
import './Content.scss';

export default class Content extends Component {
  render() {
    return (
      <article className="content">
        {this.props.children}
      </article>);
  }
}