import React, { Component } from 'react'
import { icon } from '../utils'
import '../styles/icon.scss'
export default class MediumIcon extends Component {
    render() {
        const dom = this.props.data.map((item, index) => {
            const cn = `ico ico-${icon(item.type)}`
            return (
            <div className="m-icon" key={index}>
                <a href="#">
                    <div className={cn}></div>
                    <div className="name">
                        <span>{item.name}</span>
                    </div>
                </a>
            </div>
            )
        })
        return (
        <div className="m-icons">
        {dom}
        </div>)
    }
}