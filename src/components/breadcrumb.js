import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

@inject('files')
@observer

export default class Breadcrumb extends Component {

    handleJumpTo = (e, step) => {
      e.preventDefault();
      const now = this.props.files.breadcrumb.splice(0, step);
      this.props.files.breadcrumb = now;
      this.props.files.dir = e.target.attributes.getNamedItem('title').value;
      const params = new URLSearchParams();
      params.append('dir', this.props.files.dir);
      this.props.files.fetchFiles(params.toString());        
    }

    render() {
      const { files } = this.props;
      let absPath = '';
      const { breadcrumb } = files;
      const nav = breadcrumb.map((item, index) => {
        absPath += item;
        if (index < 1) {
          return(<a href="javascript:;" key={index} onClick={(e)=>{this.handleJumpTo(e, index);}}><FontAwesomeIcon icon="home"/> 我的网盘 <span>&gt;</span></a>);
        }
        if (!breadcrumb[index + 1]) {
          return(
            <a href="javascript:;" className="disabled" key={index}  title={absPath} deep={index}> {item.replace(/^\//, '')}<span>&gt;</span></a>
          );
        } else {
          return(
            <a href="javascript:;" key={index} onClick={(e)=>{this.handleJumpTo(e, index);}} title={absPath} deep={index}> {item.replace(/^\//, '')}<span>&gt;</span></a>
          );
        }
      });
      return (
        <div className="bread">
          {nav}
        </div>
      );
    }
}

Breadcrumb.propTypes = {
  files: PropTypes.object
};