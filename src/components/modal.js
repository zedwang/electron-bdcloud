import React from 'react';
import ReactDOM from 'react-dom';
// import { observer, inject } from 'mobx-react';

import '../styles/modal.scss';
// These two containers are siblings in the DOM
const modalRoot = document.getElementsByTagName('body')[0];

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = 'modal-backend';
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;

