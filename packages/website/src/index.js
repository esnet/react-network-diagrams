import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from "react-router";

import './index.css';

import App from './App';
import Intro from "./components/Intro";
import Guide from "./components/Guide";
import Example from "./components/Example";
import API from "./components/API";

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Intro}/>
            <Route path="guide/:doc" component={Guide} />
            <Route path="example/:example" component={Example} />
            <Route path="api/:component" component={API} />
        </Route>
    </Router>
), document.getElementById("root"));
