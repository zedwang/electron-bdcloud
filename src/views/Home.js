import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Toolbar, Taskbar, Footer, Menu} from '../components';
import FileModel from '../stores/item';
import { formatSize } from '../utils';
import cls from 'classnames';
import PropTypes from 'prop-types';


window.ondragover = (e) => e.preventDefault();
window.ondrop = (e) => e.preventDefault();

@inject('user', 'files', 'window')
@observer
export default class Home extends Component {


  componentDidMount() {
    window.ondragenter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.files.category === 0) {
        this.props.window.showLanding();
      }
    };

    window.ondragleave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.files.category === 0) {
        this.props.window.showLanding();
      }
    };

    const params = new URLSearchParams();
    params.append('dir', '/');
    this.props.files.fetchFiles(params.toString());

  }

    handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.files.category != 0) return false;

      this.props.window.showLanding();
      const params = new URLSearchParams();
      // params.append('category', this.props.files.category);
      params.append('dir', this.props.files.dir);
      const likeArray = e.dataTransfer.files[0];
      const file = {
        name: likeArray.name,
        size: likeArray.size,
        type: likeArray.type,
        lastModified: likeArray.lastModified
      };
      await this.props.files.upload(file, params.toString());
      this.props.files.fetchFiles(params.toString());
    }

    render() {
      const { files, user } = this.props;
      const used = {width: Math.round((user.userInfo.used / user.userInfo.totalSize) * 100)  + '%'};
      const items = files.data.map((item, index) => <Icon item ={ new FileModel(this.props, item._id, item.name, item.size, item.type, item.lastModified, item.selected) } key={index}/>);
      return (
        <div className="container">
          <div className="aside">
            <Menu/>
            <div className="aside-foot">
              <div className="process">
                <div className="used" style={used}></div>
              </div>
              <div className="desc">
                <span>{formatSize(user.userInfo.used)} / {formatSize(user.userInfo.totalSize)}</span>
                <a href="#" >扩容至5T</a>
                        
              </div>
            </div>
          </div>
          <div className="content">
            <Toolbar/>
            <Taskbar/>
            <div /*className={cls({'dragable': this.props.window.showLandingPoint})}*/
              onDrop={ this.handleDrop }>
              <div className={cls('m-icons', {'empty': this.props.files.total === 0})} >
                {items}
              </div>
            </div>
            <Footer/>
          </div>
        </div>
       
      );
    }
}

Home.propTypes = {
  files: PropTypes.object,
  window: PropTypes.object,
  user: PropTypes.object,
};