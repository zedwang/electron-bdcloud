import React, { Component, Fragment } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import cls from 'classnames';
import { iconType } from '../utils';
import '../styles/icon.scss';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@inject('files', 'history')
@observer
export default class MediumIcon extends Component {
  @observable rename = false;
  @observable editText = '新建文件夹';
  @observable selected = this.props.item.selected || false;
  @observable enter = true;
  @observable leave = false;

  componentDidMount() {
    this.rename = this.props.item.id ? false : true;
  }

  componentWillUnmount() {
    this.enter = false;
    this.leave = true;
  }

  handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.files.data = [];
    const path = this.props.item.name;
    const absPath = this.props.files.dir + path + '/';
    const params = new URLSearchParams();
    const currentHis = this.props.history.getCurrent().breadcrumb;
    this.props.files.setBreadcrumb(currentHis);
    this.props.files.addBreadcrumb(path);
    this.props.files.setDir(absPath);
    this.props.history.add(this.props.files);
    
    params.append('dir', absPath);
    this.props.files.fetchFiles(params.toString());

    
  }

  handleChoose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.selected = !this.selected;
    this.props.item.setSelected(this.selected);
    if (this.selected) {
      this.props.files.selected.set(this.props.item.id);
    } else {
      this.props.files.selected.delete(this.props.item.id);
    }
  }

  handleDelete = async (e, data) => {
    await this.props.files.remove(data.id);
    const params = new URLSearchParams();
    params.append('dir', this.props.files.dir);
    if (this.props.files.category) {
      params.append('category', this.props.files.category);
    }
    this.props.files.fetchFiles(params.toString());
    this.props.files.selected.clear();
  }

  handleRename = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.rename = true;
    this.editText = this.props.item.name;
  }

  handleChange = (e) => {
    this.editText = e.target.value;
  }

  handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      this.editText = this.props.item.name;
      this.rename = false;
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  }

  handleSubmit = async () => {
    const val = this.editText.trim();
    if (val) {
      this.props.item.setName(val);
      this.editText = val;
      if (this.props.item.id) {
        await this.props.files.rename(this.props.item.id, val);
      } else {
        await this.props.files.createFolder(val);
      }
      const params = new URLSearchParams();
      params.append('dir', this.props.files.dir);
      this.props.files.fetchFiles(params.toString());
    }
    this.rename = false;
  }

  render() {
    const cn = `ico ico-${iconType(this.props.item.type)}`;
    return (
      <Fragment>
        <ContextMenuTrigger id={'ITEM'+this.props.item.id}>
          <div className={cls('m-icon',{'ani-enter': this.enter, 'ani-leave': this.leave})} onDoubleClick={this.handleDoubleClick} onClick={this.handleChoose}>
            <a href="javascript:;" className={cls({'active': this.props.item.selected})}>
              <div className={cn}></div>
              <div className="name" onDoubleClick={this.handleRename}>
                {this.rename ?
                  <input
                    className="edit"
                    autoFocus
                    value={this.editText}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                  /> : <span>{this.props.item.name}</span>}
              </div>
            </a>
          </div>
        </ContextMenuTrigger>
        <ContextMenu id={'ITEM'+this.props.item.id}>
          <MenuItem onClick={this.handleDoubleClick}>打开</MenuItem>
          <MenuItem disabled={true}>下载</MenuItem>
          <MenuItem disabled={true}>分享</MenuItem>
          <MenuItem disabled={true}>复制</MenuItem>
          <MenuItem disabled={true}>剪切</MenuItem>
          <MenuItem disabled={true}>移动到</MenuItem>
          <MenuItem disabled={true}>推送设备</MenuItem>
          <MenuItem onClick={this.handleDelete} data={{id: this.props.item.id}}>删除</MenuItem>
          <MenuItem onClick={this.handleRename} data={{id: this.props.item.id}}>重命名</MenuItem>
          <MenuItem disabled={true}>属性</MenuItem>
        </ContextMenu>
      </Fragment>
    );
  }
}
MediumIcon.propTypes = {
  files: PropTypes.object,
  item: PropTypes.object,
  history: PropTypes.object,
};