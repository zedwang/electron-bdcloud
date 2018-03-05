import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Header, Toolbar, Taskbar, Footer, Glyphicon, Menu} from '../components'

@inject(stores => ({
    user:stores.user
}))
@observer
class Layout extends Component {
    // constructor(props) {
    //     super(props)
    //     console.log(this.props);
    // }

    render() {
        console.log(this.props);
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

