"use strict";

var React = require("react/addons");
var Router = require("react-router");

var {Route,
     DefaultRoute,
     RouteHandler,
     Link} = Router;

var App = require("./app");

var Intro = require("./intro");
var TrafficMapExample = require("./trafficmap_example");

var {DefaultRoute, Route, Routes} = require("react-router");

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="intro" handler={Intro} />
    <Route name="trafficmap" handler={TrafficMapExample} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});

