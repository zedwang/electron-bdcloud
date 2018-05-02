import React from 'react';
import {
  withRouter,
  Route,
} from 'react-router-dom';
import { Layout, Home, Share } from '../views';

const Router = withRouter((props) => <Layout {...props}/>);
export default (
/* eslint-disable */
    <Router>
        <Route path="/" component={Home}/>
        <Route path="/share" component={Share} />
        {/* <Route path="/space" component={Space} /> */}
        {/* <Route path="/function" component={Function} /> */}
    </Router>
    /* eslint-enable */
);