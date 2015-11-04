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

import "../styles/app.css";

const {RouteHandler, Link} = Router;
const logo = document.createElement("img");
logo.src = require("../img/logo.png");

export default React.createClass({

    render: function () {
        const sidebarStyle = {
            borderRightStyle: "solid",
            borderRightColor: "#ddd",
            borderRightWidth: 1
        };

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img style={{float: "right"}}
                             className="main-image"
                             src={logo.src} width={80}/>
                    </div>
                    <div className="col-md-10">
                        <h2>ESnet React Network Diagrams</h2>
                    </div>
                </div>

                <hr />

                <div className="row">

                    <div className="col-md-2" style={sidebarStyle}>
                        <div className="docs-sidebar">
                            <ul className="docs-sidenav nav">
                                <li><Link to="intro">Introduction</Link></li>

                                <hr />

                                Basic:
                                <li><Link to="endpoint">Endpoint</Link></li>
                                <li><Link to="connection">Connection</Link></li>
                                <hr />

                                Circuits:
                                <li><Link to="basicCircuit">Basic</Link></li>
                                <li><Link to="concatenatedCircuit">Concatenated</Link></li>
                                <li><Link to="parallelCircuit">Parallel</Link></li>
                                <li><Link to="patchPanel">Patch Panel</Link></li>
                                <hr />

                                Maps:

                                <li><Link to="trafficmap">Traffic Map</Link></li>
                                <li><Link to="editor">Editor</Link></li>

                                <hr />

                                Extras:
                                <li><Link to="legend">Map Legend</Link></li>

                                <hr />

                                Links:
                                <li><a href="https://github.com/esnet/react-network-diagrams/">GitHub</a></li>
                                <li><a href="https://www.es.net/">ESnet</a></li>
                                <li><a href="http://software.es.net/">Open Source</a></li>

                                <hr />

                                Related Projects:
                                <li><a href="http://software.es.net/pond/">Pond</a></li>
                                <li><a href="http://software.es.net/react-timeseries-charts">Timeseries Charts</a></li>

                            </ul>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <RouteHandler />
                    </div>

                </div>
            </div>
        );
    }
});
