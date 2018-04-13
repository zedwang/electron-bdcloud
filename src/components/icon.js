import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { icon } from '../utils';
import '../styles/icon.scss';

@inject('files')
@observer
export default class MediumIcon extends Component {
    
    handleDoubleClick = (e, dirName) => {
      const path = '/' + dirName;
      const absPath = this.props.files.dir + path;
      const params = new URLSearchParams();
      params.append('dir', absPath);
      this.props.files.breadcrumb.push(path);
      this.props.files.dir = absPath;
      this.props.files.fetchFiles(params.toString());
    }

    render() {
      const dom = this.props.data.map((item, index) => {
        const cn = `ico ico-${icon(item.type)}`;
        return (
          <div className="m-icon" key={'list' + index}>
            <a href="javascript:;">
              <div className={cn} onDoubleClick={(e) => {this.handleDoubleClick(e, item.name);}}></div>
              <div className="name">
                <span>{item.name}</span>
              </div>
            </a>
          </div>
        );
      });
      return (
        <div className="m-icons">
          {dom}
        </div>);
    }
}
MediumIcon.propTypes = {
  files: PropTypes.object,
  data: PropTypes.object
};