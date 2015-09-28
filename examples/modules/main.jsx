/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Router from "react-router";

import App from "./app";
import Intro from "./intro";

import MapLegendExample from "./legend_example";
import TrafficMapExample from "./trafficmap_example";
import BasicCircuitExample from "./basic_circuit_example";
import ConcatenatedCircuitExample from "./concatenated_circuit_example";
import ParallelCircuitExample from "./parallel_circuit_example";
import CouplerCircuitExample from "./coupler_circuit_example";
import BackplaneMateExample from "./backplane_mate_example";
import PanelCouplerExample from "./panel_coupler_example";
import PatchPanelExample from "./patch_panel_example";


let {Route, DefaultRoute} = Router;

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="intro" handler={Intro} />
    <Route name="legend" handler={MapLegendExample} />
    <Route name="trafficmap" handler={TrafficMapExample} />
    <Route name="basicCircuit" handler={BasicCircuitExample} />
    <Route name="concatenatedCircuit" handler={ConcatenatedCircuitExample} />
    <Route name="parallelCircuit" handler={ParallelCircuitExample} />
    <Route name="couplerCircuit" handler={CouplerCircuitExample} />
    <Route name="backplaneMate" handler={BackplaneMateExample} />
    <Route name="panelCoupler" handler={PanelCouplerExample} />
    <Route name="patchPanel" handler={PatchPanelExample} />
  </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById("content"));
});
