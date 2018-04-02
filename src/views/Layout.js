import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Header, Toolbar, Taskbar, Footer, Glyphicon, Menu} from '../components'

@inject(stores => ({
    user:stores.user
}))
@observer
class Layout extends Component {

    render() {
        const { match, location, history } = this.props
        return (<div className="layout">
            <Header/>
            <div className="container">
                <div className="aside">
                    <Menu/>
                    <div className="aside-foot">
                        <div className="process">
                            <div className="used"></div>
                        </div>
                        <div className="desc">
                        <span>231G/2056G</span>
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

