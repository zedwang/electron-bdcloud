import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Icon } from '../components'

@inject(stores => ({
    files: stores.files.data
}))
@observer
class Home extends Component {
    constructor(props){
        super(props)
        this.data = this.props.files || []
    }

    componentDidMount() {
    }

    render() {
        return (
            <Icon data={this.data}/>
        )
    }
}

export default Home