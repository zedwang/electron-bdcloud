import React from 'react';
import {
  withRouter,
  Route,
} from 'react-router-dom';
import { Layout, Home } from '../views';


const Router = withRouter((props) => <Layout {...props}/>);
export default (
/* eslint-disable */
    <Router>
        <Route path="/" component={Home} />
    </Router>
    /* eslint-enable */
);