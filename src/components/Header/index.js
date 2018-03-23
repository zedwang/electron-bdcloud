import React, { Component } from 'react'
import Glyphicon from '../Glyphicon/'
import { observable } from "mobx"
import { observer, inject } from 'mobx-react'

import './header.scss'


@inject('window', 'user')
@observer
export default class Header extends Component {

    handleMax = () => {
        this.props.window.max()
    }

    handleMini = () => {
        this.props.window.mini()
    }

    handleExit = () => {
        this.props.window.exit()
    }

    handleRestore = () => {
        this.props.window.restore()
    }

    componentDidMount() {
        this.props.user.loadUser()
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
            <div className="header">
                <div className="logo">
                    <span className="icon icon-cloud"></span> 百度网盘
            </div>
                <div className="operator">
                    {this.status}
                    <Glyphicon name="bell" />
                    <Glyphicon name="eject" />
                    <Glyphicon name="icon_minimize" onClick={this.handleMini} />
                    {btns}
                    <Glyphicon name="close" onClick={this.handleExit} />
                </div>
                <div className="head">
                    <div className="profile">
                        <div className="avatar">
                            <img src="" />
                        </div>
                        <div className="username">
                            <h2>{user.userInfo.niceName}</h2>
                            <div className="disk-space">
                                <div className="used"></div>
                                <span className="count">229.37GB/2056.00GB</span>
                            </div>
                        </div>
                    </div>
                    <div className="nav">
                        <ul>
                            <li><a href="#"><Glyphicon name="cloud" />我的网盘</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />分享</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />隐藏空间</a></li>
                            <li><a href="#"><Glyphicon name="cloud" />功能宝箱</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}