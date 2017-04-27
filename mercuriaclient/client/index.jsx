import React, { Component } from 'react';
import { render } from 'react-dom';

// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Home from './components/main.js'
import AddTrade from './components/addTrade.js'
import Listing from './components/listing.js'
import Login from './components/login.js'
import Matching from './components/matching.js'

//load trade store
import AppStore from './store/appStore.js';

render(
    <Router history={browserHistory}>
        <Route component={Home}>
            <Route path="/" component={Login} data={AppStore}/>
            <Route path="/addTrade" component={AddTrade} data={AppStore}/>
            <Route path="/listing" component={Listing} data={AppStore}/>
            <Route path="/login" component={Login} data={AppStore}/>
            <Route path="/matching/:trade" component={Matching} data={AppStore}/>
        </Route>
    </Router>,
    document.getElementById('container')
);
