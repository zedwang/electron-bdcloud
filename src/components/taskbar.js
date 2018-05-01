import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import PropTypes from 'prop-types';
import Button from './button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Breadcrumb from './breadcrumb';
import '../styles/taskbar.scss';

@inject('files', 'history')
@observer
export default class Taskbar extends Component {
  @observable q = '';
  timer = null;
  handleChange = (event) => {
    this.q = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(()=> {
      const params = new URLSearchParams();
      params.append('q', this.q);
      this.props.files.fetchFiles(params.toString());
    }, 5e2);
  }

  handleGoBack = () => {
    const prev = this.props.history.prev();
    this.props.files.setBreadcrumb(prev.breadcrumb);
    this.props.files.setDir(prev.step);
    const params = new URLSearchParams();
    params.append('dir', prev.step);
    this.props.files.fetchFiles(params.toString());
  }

  handleGoto = () => {
    const next = this.props.history.next();
    this.props.files.setBreadcrumb(next.breadcrumb);
    this.props.files.setDir(next.step);
    const params = new URLSearchParams();
    params.append('dir', next.step);
    this.props.files.fetchFiles(params.toString());
  }

  handleRefresh = () => {
    const params = new URLSearchParams();
    params.append('dir', this.props.files.dir);
    if (this.props.files.category) {
      params.append('category', this.props.files.category);
    }
    this.props.files.fetchFiles(params.toString());
  }

  render() {
    return (
      <div className="taskbar">
        <div className="history">
          <Button className="link-gray" type="link" size="sm" icon="long-arrow-alt-left" title="后退"  onClick={this.handleGoBack}/>
          <Button className="link-gray" type="link" size="sm" icon="long-arrow-alt-right" title="前进"  onClick={this.handleGoto}/>
          <Button className="link-gray" type="link" size="sm" icon="sync" onClick={this.handleRefresh}/>
        </div>
        <Breadcrumb/>
        <div className="search">
          <input type="text" value={this.q} placeholder="搜索我的网盘文件" onChange={this.handleChange}/>
          <span><FontAwesomeIcon icon="search"/></span>
        </div>
        <div className="view-mode">
          {/* <Button className="link-gray" title="分类查看" type="link" size="sm" icon="menu"/> */}
          <Button className="link-gray" disabled={true} title="切换查看模式" type="link" size="sm" icon="list"/>
          {/* <Glyphicon name="images"/> */}
        </div>
      </div>
    );
  }
}
Taskbar.propTypes = {
  files: PropTypes.object,
  q: PropTypes.string,
  history: PropTypes.object
};