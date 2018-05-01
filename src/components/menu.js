import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import cls from 'classnames';
import '../styles/menu.scss';

const categories = ['视频','音乐','图片','文档','应用','其他','种子'];

@inject('files', 'history')
@observer
export default class Menu extends React.Component {

    toggleCategory = (type) => {
      this.props.files.setCategory(type);
      const params = new URLSearchParams();
      if (type === 0) {
        params.append('dir', '/');
        this.props.files.setBreadcrumb(['/']);
        this.props.files.setDir('/');
      } else {
        params.append('category', this.props.files.category);
        this.props.files.setBreadcrumb(['/',categories[this.props.files.category - 1]]);
      }
      this.props.files.fetchFiles(params.toString());
    }

    render() {
      return (
        <ul className="menu">
          <li><a className={cls({'active':this.props.files.category === 0})} onClick={() => {this.toggleCategory(0);}}><FontAwesomeIcon icon="folder-open"/> 全部文件</a>
            <ul>
              <li><a className={cls({'active':this.props.files.category === 3})} onClick={()=>{this.toggleCategory(3);}}><FontAwesomeIcon icon="image" /> 图片</a></li>
              <li><a className={cls({'active':this.props.files.category === 4})} onClick={()=>{this.toggleCategory(4);}}><FontAwesomeIcon icon="file" /> 文档</a></li>
              <li><a className={cls({'active':this.props.files.category === 1})} onClick={()=>{this.toggleCategory(1);}}><FontAwesomeIcon icon="video" /> 视频</a></li>
              <li><a className={cls({'active':this.props.files.category === 7})} onClick={()=>{this.toggleCategory(7);}}><FontAwesomeIcon icon="hdd" /> 种子</a></li>
              <li><a className={cls({'active':this.props.files.category === 2})} onClick={()=>{this.toggleCategory(2);}}><FontAwesomeIcon icon="music" /> 音乐</a></li>
              <li><a className={cls({'active':this.props.files.category === 5})} onClick={()=>{this.toggleCategory(5);}}><FontAwesomeIcon icon="donate" /> 应用</a></li>
              <li><a className={cls({'active':this.props.files.category === 6})} onClick={()=>{this.toggleCategory(6);}}><FontAwesomeIcon icon="dolly-flatbed" /> 其他</a></li>
            </ul>
          </li>
          <li><a><FontAwesomeIcon icon="share-alt" /> 我的分享</a>
          </li>
        </ul>
      );
    }
}

Menu.propTypes = {
  files: PropTypes.object
};