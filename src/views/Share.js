import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';



@inject(stores => ({
  files: stores.files,
  window: stores.window
}))
@observer
export default class Share extends Component {


  render() {
    return (
      <div className='share-empty'>
        
      </div>
    );
  }
}
