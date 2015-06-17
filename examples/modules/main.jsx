import React from "react";
import Router from "react-router";

import App from "./app";
import Intro from "./intro";
import TrafficMapExample from "./trafficmap_example";

let {Route, DefaultRoute} = Router;

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="intro" handler={Intro} />
    <Route name="trafficmap" handler={TrafficMapExample} />
  </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById("content"));
});
