import React, {Component} from 'react'

import './icon.scss'
export default class MediumIcon extends Component {
    render() {
        const dom = this.props.data.map((item, index) => {
            return (
            <div className="m-icon" key={index}>
                <a href="#">
                    <div className="ico ico-zip"></div>
                    <div className="name">
                        <span>K2固件大全K2固件大全K2固件大全</span>
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