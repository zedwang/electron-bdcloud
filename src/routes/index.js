import React from 'react';
import {
    withRouter,
    Route,
} from 'react-router-dom';
import { Layout, Home, Login, NoMatch } from '../views'


const Router = withRouter((props) => <Layout {...props}/>)
export default (
    /* eslint-disable */
    <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Home} />
    </Router>
    /* eslint-enable */
)