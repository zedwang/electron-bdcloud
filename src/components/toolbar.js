import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Button from './button';
import '../styles/toolbar.scss';

@inject('files')
@observer
export default class Toolbar extends Component {
    handleCreateFolder = () => {
      this.props.files.createFolder('测试文件夹' + Math.random());
    }

    render() {
      return (
        <div className="toolbar">
          <Button text="上传" icon="upload" disabled={ this.props.files.category !== 0 }/>
          <Button text="下载" icon="cloud-download-alt"/>
          <Button text="分享" icon="share-alt"/>
          <Button text="删除" icon="trash-alt"/>
          <Button text="新建文件夹" icon="folder" onClick={this.handleCreateFolder} disabled={ this.props.files.category !== 0 }/>
          <Button text="离线下载" icon="download"/>
        </div>
      );
    }
}
Toolbar.propTypes = {
  files: PropTypes.object
};