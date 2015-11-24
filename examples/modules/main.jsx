/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint max-len:0 */

import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import App from "./app.jsx";
import Intro from "./intro.jsx";
import MapLegendExample from "./legend_example";
import TrafficMapExample from "./trafficmap_example";
import BasicCircuitExample from "./basic_circuit_example";
import ConcatenatedCircuitExample from "./concatenated_circuit_example";
import ParallelCircuitExample from "./parallel_circuit_example";
import PatchPanelExample from "./patch_panel_example";
import EndpointExample from "./endpoint_example";
import ConnectionExample from "./connection_example";
import EditorExample from "./editor_example";
import PathsExample from "./paths_example";

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Intro}/>
            <Route path="legend" component={MapLegendExample} />
            <Route path="trafficmap" component={TrafficMapExample} />
            <Route path="basicCircuit" component={BasicCircuitExample} />
            <Route path="concatenatedCircuit" component={ConcatenatedCircuitExample} />
            <Route path="parallelCircuit" component={ParallelCircuitExample} />
            <Route path="patchPanel" component={PatchPanelExample} />
            <Route path="endpoint" component={EndpointExample} />
            <Route path="connection" component={ConnectionExample} />
            <Route path="editor" component={EditorExample} />
            <Route path="paths" component={PathsExample} />
        </Route>
    </Router>
), document.getElementById("content"));
