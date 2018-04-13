import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Button from './button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Breadcrumb from './breadcrumb';
import '../styles/taskbar.scss';

@inject(stores => ({
  search:stores.search
}))
@observer
export default class Taskbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.search.search(this.state.value);
        
  }

  render() {
    return (
      <div className="taskbar">
        <div className="history">
          <Button className="link-gray" type="link" size="sm" icon="long-arrow-alt-left"/>
          <Button className="link-gray" type="link" size="sm" icon="long-arrow-alt-right"/>
          <Button className="link-gray" type="link" size="sm" icon="sync"/>
        </div>
        <Breadcrumb/>
        <div className="search">
          <input type="text" value={this.state.q} placeholder="搜索我的网盘文件" onChange={this.handleChange}/>
          <FontAwesomeIcon icon="search" onClick={this.handleSearch}/>
        </div>
        <div className="view-mode">
          {/* <Button className="link-gray" title="分类查看" type="link" size="sm" icon="menu"/> */}
          <Button className="link-gray" title="切换查看模式" type="link" size="sm" icon="list"/>
          {/* <Glyphicon name="images"/> */}
        </div>
      </div>
    );
  }
}
Taskbar.propTypes = {
  search: PropTypes.object
};