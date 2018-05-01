import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Button from './button';
import '../styles/toolbar.scss';
import FileModel from '../stores/item';

@inject('files')
@observer
export default class Toolbar extends Component {
    handleCreateFolder = async () => {
      this.props.files.data.push(FileModel.fromJS(this.props, {type: 'folder', name: '新建文件夹'}));
    }

    handleMultiDelete = async () => {
      const selected = this.props.files.selected.keys();
      await this.props.files.multiRemove(selected);
      const params = new URLSearchParams();
      params.append('dir', this.props.files.dir);
      if (this.props.files.category) {
        params.append('category', this.props.files.category);
      }
      this.props.files.fetchFiles(params.toString());
      this.props.files.selected.clear();
    }

    render() {
      return (
        <div className="toolbar">
          <Button text="上传" icon="upload" disabled={ this.props.files.category !== 0 }/>
          <Button text="下载" icon="cloud-download-alt"/>
          <Button text="分享" icon="share-alt"/>
          <Button text="删除" icon="trash-alt" onClick={this.handleMultiDelete}/>
          <Button text="新建文件夹" icon="folder" onClick={this.handleCreateFolder} disabled={ this.props.files.category !== 0 }/>
          <Button text="离线下载" icon="download"/>
        </div>
      );
    }
}
Toolbar.propTypes = {
  files: PropTypes.object
};