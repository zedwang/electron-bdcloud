import React, {Component} from 'react'


export default class Dropdown extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        console.log('node', this.node)
    }

    onHover = (ev) => {
        console.log('hover', ev)
        const target = ev.target;
    }

    render() {
        return (<span ref={(elm) => this.node = elm} onMouseOver={this.onHover}>{this.props.children}</span>)
    }
}
