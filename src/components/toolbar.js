import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import Button from './button'
import '../styles/toolbar.scss'

@inject('files')
@observer
export default class Toolbar extends Component {
    handleCreateFolder = () => {
        this.props.files.createFolder('测试文件夹' + Math.random())
    }

    render() {
        return (
            <div className="toolbar">
                <Button text="上传" icon="upload" disabled={ this.props.files.category !== 0 }/>
                <Button text="下载" icon="download"/>
                <Button text="分享" icon="share2"/>
                <Button text="删除" icon="hammer"/>
                <Button text="新建文件夹" icon="folder-plus" onClick={this.handleCreateFolder} disabled={ this.props.files.category !== 0 }/>
                <Button text="离线下载" icon="box-add"/>
            </div>
        )
    }
}