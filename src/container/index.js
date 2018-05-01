import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
// import { ipcRenderer, remote, shell } from 'electron';
import routes from '../routes';
import stores from '../stores';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (<Provider {...stores }>
      <BrowserRouter>
        {routes}
      </BrowserRouter>

    </Provider>);
  }
}

export default App;