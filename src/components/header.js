import React, { Component } from 'react'
import { observable } from "mobx"
import { observer, inject } from 'mobx-react'
import Glyphicon from './glyphicon'
import Modal from './modal'
import Button from './button'

import '../styles/header.scss'


@inject('window', 'user')
@observer
export default class Header extends Component {
    @observable showCloseDialog = false;
    @observable choice = 'min';
    @observable remenber = false;

    componentDidMount() {
        this.props.user.loadUser()
    }

    handleMax = () => {
        this.props.window.max()
    }

    handleMini = () => {
        this.props.window.mini()
    }

    handleExit = () => {
        this.showCloseDialog = true;
    }

    handleRestore = () => {
        this.props.window.restore()
    }

    handleOnInputChange = (event) => {
        const target = event.target;
        if (target.type === 'checkbox') {
            this.remenber = target.checked;
        } else {
            this.choice = target.value
        }
    }

    onOk = () => {
        if (this.remenber) {
            // 进入用户信息
        }

        if (this.choice === 'exit') {
            this.props.window.exit()
        } else {
            // 进托盘
            this.props.window.hiddenWindow()
        }
        this.showCloseDialog = false;
    }

    onCancel = () => {
        this.showCloseDialog = false;
    }

    render() {
        const { window, user } = this.props;
        console.log(user.userInfo)
        const state = window.isMax;
        const btns = (() => {
            if (state) {
                return (<Glyphicon name="icon_maximize" onClick={this.handleRestore} />)
            } else {
                return (<Glyphicon name="enlarge" onClick={this.handleMax} />)
            }
        })()

        return (
            <>
                <div className="header">
                    <div className="logo">
                        <span className="icon icon-cloud"></span> 百度网盘
                    </div>
                    <div className="nav">
                        <ul>
                            <li><a href="#"><Glyphicon name="cloud" />我的网盘</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />分享</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />隐藏空间</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />功能宝箱</a></li>
                        </ul>
                    </div>
                    <div className="profile">
                        <div className="avatar">
                        </div>
                        <div className="username">
                            <h2>{user.userInfo.niceName}</h2>
                            <span className="sign"></span>
                            <a href="#" className="bg-danger">会员中心</a>
                            
                        </div>
                        <div className="operator">
                            <ul>
                                <li><a href=""><Glyphicon name="bell" /></a></li>
                                <li className="separate"><a href=""><Glyphicon name="bell" /></a></li>
                                <li><a href=""><Glyphicon name="icon_minimize" /></a></li>
                                {btns}
                                <li><a href=""><Glyphicon name="close" /></a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {this.showCloseDialog ? (
                    <Modal>
                        <div className="modal">
                            <div className="modal-head">
                                <h3><Glyphicon name="cloud" /> 关闭窗口提示</h3>
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
                    </Modal>) : null}
            </>

        )

    }
}