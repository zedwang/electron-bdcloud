import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Header, Toolbar, Taskbar, Footer, Glyphicon, Menu} from '../components'
import { formatSize } from '../utils'

window.ondragover = (e) => e.preventDefault()
window.ondrop = (e) => e.preventDefault()

@inject(stores => ({
    user:stores.user
    
}))
@observer
class Layout extends Component {
    

    render() {
        const { match, location, history, user } = this.props;
        const used = {width: Math.round((user.userInfo.used / user.userInfo.totalSize) * 100)  + '%'};
        return (<div className="layout">
            <Header/>
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
                    {this.props.children}
                   
                    <Footer/>
                </div>
            </div>
            </div>)
    }
}

export default Layout

