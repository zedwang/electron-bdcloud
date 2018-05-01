import React, {Component} from 'react';

export default class Dropdown extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
  }

    onHover = (ev) => {
      console.log('hover', ev);
    }

    render() {
      return (<span ref={(elm) => this.node = elm} onMouseOver={this.onHover}>{this.props.children}</span>);
    }
}
