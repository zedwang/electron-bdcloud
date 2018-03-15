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
        return (<div>
            <Header/>
            <Toolbar/>
            <Taskbar/>
            <div className="container">
                <div className="menu-bar">
                <Menu/>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
            <Footer/>
            </div>)
    }
}

export default Layout

