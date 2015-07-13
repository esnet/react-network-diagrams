//Import the require hook for babel runtime
import "babel/register";

import React from "react";
import Router from "react-router";

import App from "./app";
import Intro from "./intro";
import TrafficMapExample from "./trafficmap_example";
import ERGMapExample from "./ergmap_example"

let {Route, DefaultRoute} = Router;

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="intro" handler={Intro} />
    <Route name="trafficmap" handler={TrafficMapExample} />
    <Route name="townmap" handler={ERGMapExample} />
  </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById("content"));
});
