import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

@inject('files', 'history')
@observer

export default class Breadcrumb extends Component {

    handleJumpTo = (e, step) => {
      e.preventDefault();
      const path = e.target.attributes.getNamedItem('title').value;
      const deep = e.target.attributes.getNamedItem('deep').value;
      const now = this.props.files.breadcrumb.splice(0, step + 1);
      this.props.files.breadcrumb = now;
      this.props.files.setDir(path);
      if (Number(deep) === 0) this.props.files.setCategory(0);
      this.props.history.add(this.props.files);
      const params = new URLSearchParams();
      params.append('dir', this.props.files.dir);
      this.props.files.fetchFiles(params.toString());        
    }

    render() {
      const { files } = this.props;
      let absPath = '/';
      const { breadcrumb } = files;
      const last = breadcrumb.length - 1;
      const nav = breadcrumb.map((item, index) => {
        if (index < 1) {
          return(<a href="javascript:;" key={index} onClick={(e)=>{this.handleJumpTo(e, index);}} deep={index} title="/"><FontAwesomeIcon icon="home"/> 我的网盘 <span>&gt;</span></a>);
        }
        if (last === index) {
          absPath += item + '/';
          return(
            <a href="javascript:;" className="disabled" key={index}  title={absPath} deep={index}> {item.replace(/^\//, '')} <span>&gt;</span></a>
          );
        } else {
          absPath += item + '/';
          return( 
            <a href="javascript:;" key={index} onClick={(e)=>{this.handleJumpTo(e, index);}} title={absPath} deep={index}> {item.replace(/^\//, '')} <span>&gt;</span></a>
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
  files: PropTypes.object,
  history: PropTypes.object
};