import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Icon } from '../components'
import cls from 'classnames'


@inject(stores => ({
    files: stores.files,
    window: stores.window
}))
@observer
class Home extends Component {


    componentDidMount() {
        window.ondragenter = (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (this.props.files.category === 0) {
                this.props.window.showLanding()
            }
        }

        window.ondragleave = (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (this.props.files.category === 0) {
                this.props.window.showLanding()
            }
        }

        let params = new URLSearchParams()
        params.append('dir', '/')
        this.props.files.fetchFiles(params.toString())

    }

    handleDrop = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (this.props.files.category != 0) return false

        this.props.window.showLanding()
        let params = new URLSearchParams()
        params.append('category', this.props.files.category)
        params.append('dir', this.props.files.dir)
        let likeArray = e.dataTransfer.files[0]
        const file = {
            name: likeArray.name,
            size: likeArray.size,
            type: likeArray.type,
            lastModified: likeArray.lastModified
        }
        await this.props.files.upload(file, {dir: this.props.files.dir})
       this.props.files.fetchFiles(params.toString())
    }

    render() {
        const { files } = this.props;
        return (
            <div className={cls({'dragable': this.props.window.showLandingPoint})}
            onDrop={ this.handleDrop }
        >
        <Icon data ={ files.data }/>
        </div>
        )
    }
}

export default Home