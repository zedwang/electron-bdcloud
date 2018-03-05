import React, {Component} from 'react'
import Button from '../Button/'

import './toolbar.scss'

export default class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Button text="上传" icon="upload"/>
                <Button text="下载" icon="download"/>
                <Button text="分享" icon="share2"/>
                <Button text="删除" icon="hammer"/>
                <Button text="新建文件夹" icon="folder-plus"/>
                <Button text="离线下载" icon="box-add"/>
            </div>
        )
    }
}