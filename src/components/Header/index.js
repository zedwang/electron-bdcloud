import React, {Component} from 'react'
import Glyphicon from '../Glyphicon/'

import './header.scss'

class Header extends Component {
    render() {
        return (
<div className="header">
            <div className="logo">
                <span className="icon icon-cloud"></span> 百度网盘
            </div>
            <div className="operator">
                <Glyphicon name="bell"/>
                <Glyphicon name="eject"/>
                <Glyphicon name="icon_minimize"/>
                <Glyphicon name="icon_maximize"/>
                <Glyphicon name="close"/>
            </div>
            <div className="head">
                <div className="profile">
                    <div className="avatar">
                        <img src=""/>
                    </div>
                    <div className="username">
                        <h2>爱笑的茄子</h2>
                        <div className="disk-space">
                            <div className="used"></div>
                            <span className="count">229.37GB/2056.00GB</span>
                        </div>
                    </div>
                </div>
                <div className="nav">
                        <ul>
                            <li><a href="#"><Glyphicon name="cloud"/>我的网盘</a></li>
                            <li><a href="#"><Glyphicon name="cloud"/>分享</a></li>
                            <li><a href="#"><Glyphicon name="cloud"/>隐藏空间</a></li>
                            <li><a href="#"><Glyphicon name="cloud"/>功能宝箱</a></li>
                        </ul>
                    </div>
            </div>
        </div>
        )
        
    }
}

export default Header