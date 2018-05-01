import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import '../styles/footer.scss';

@inject('files')
@observer
export default class Footer extends Component {
  render() {
    return (<div className="footer">
      <div className="total"><span>{ this.props.files.total } 项</span>
        {this.props.files.selected.size ? <span>已选中 { this.props.files.selected.size } 个文件/文件夹</span> : null}
      </div>
      <div className="footer-menu">
                
      </div>
    </div>);
  }
}

Footer.propTypes = {
  files: PropTypes.object
};