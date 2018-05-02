import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Modal from './modal';
import Button from './button';
// import Dropdown from './dropdown';
import PropTypes from 'prop-types';

import '../styles/header.scss';


@inject('window', 'user')
@observer
export default class Header extends Component {
    @observable showCloseDialog = false;
    @observable choice = 'min';
    @observable remenber = false;

    componentDidMount() {
      this.props.user.loadUser();
    }

    handleMax = () => {
      this.props.window.max();
    }

    handleMini = () => {
      this.props.window.mini();
    }

    handleExit = () => {
      this.showCloseDialog = true;
    }

    handleRestore = () => {
      this.props.window.restore();
    }

    handleOnInputChange = (event) => {
      const target = event.target;
      if (target.type === 'checkbox') {
        this.remenber = target.checked;
      } else {
        this.choice = target.value;
      }
    }

    onOk = () => {
      if (this.remenber) {
        // 进入用户信息
      }

      if (this.choice === 'exit') {
        this.props.window.exit();
      } else {
        // 进托盘
        this.props.window.hiddenWindow();
      }
      this.showCloseDialog = false;
    }

    onCancel = () => {
      this.showCloseDialog = false;
    }

    render() {
      const { window, user } = this.props;
      const state = window.isMax;
      const btns = (() => {
        if (state) {
          return (<li onClick={this.handleRestore} ><a href="javascript:;"><FontAwesomeIcon icon="window-restore"/></a></li>);
        } else {
          return (<li onClick={this.handleMax} ><a href="javascript:;"><FontAwesomeIcon icon="window-maximize"/></a></li>);
        }
      })();

      return (
            <><div className="header">
              <div className="logo">
                <span></span> 百度网盘
              </div>
              <div className="nav">
                <ul>
                  <li><NavLink to="/" activeClassName="active">我的网盘</NavLink></li>
                  <li><NavLink to="/share" activeClassName="active">分享</NavLink></li>
                  <li><NavLink to="#">隐藏空间</NavLink></li>
                  <li><NavLink to="#">功能宝箱</NavLink></li>
                </ul>
              </div>
              <div className="profile">
                <div className="avatar"></div>
                <div className="username">
                  {/* <Dropdown trigger={user.userInfo.niceName} hoverable flowing> */}
                  {user.userInfo.niceName}
                  {/* </Dropdown> */}
                  <span className="sign"></span>
                  <a href="https://github.com/zedwang/electron-bdcloud" className="bg-danger">会员中心</a>
                </div>
                <div className="operator">
                  <ul>
                    <li><a href="javascript:;"><FontAwesomeIcon icon="envelope" /></a></li>
                    <li><a href="javascript:;"><FontAwesomeIcon icon="cog" /></a></li>
                    <li onClick={this.handleMini} className="separate"><a href="javascript:;"><FontAwesomeIcon icon="window-minimize" /></a></li>
                    {btns}
                    <li onClick={this.handleExit}><a href="javascript:;"><FontAwesomeIcon icon="window-close" /></a></li>
                  </ul>
                </div>
              </div>
            </div>{this.showCloseDialog ? (
              <Modal>
                <div className="modal ani-enter">
                  <div className="modal-head">
                    <h3>关闭窗口提示</h3>
                    <span onClick={this.onCancel}>✕</span>
                  </div>
                  <div className="modal-body">
                    <p>你点击了关闭按钮，是希望：</p>
                    <div className="radio inline">
                      <label><input type="radio" name="doing" value="min" checked={'min' === this.choice} onChange={this.handleOnInputChange} />最小化到托盘</label>
                    </div>
                    <div className="radio inline">
                      <label><input type="radio" name="doing" value="exit" checked={'exit' === this.choice} onChange={this.handleOnInputChange} />直接关闭程序</label>
                    </div>
                    <div className="checkbox">
                      <label><input type="checkbox" name="remenber" checked={this.remenber} onChange={this.handleOnInputChange} />记住我</label>
                    </div>
                  </div>
                  <div className="modal-foot text-right">
                    <Button className="btn btn-default" onClick={this.onOk} text="确定" />
                    <Button className="btn btn-default" onClick={this.onCancel} text="取消" />
                  </div>
                </div>
              </Modal>) : null
            }</>

      );

    }
}

Header.propTypes = {
  window: PropTypes.object,
  user: PropTypes.object
};
