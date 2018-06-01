/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {sidebarStyle, sidebarItemStyle, sidebarTitleStyle} from "./styles";

export default class extends Component {
    render() {
        return (
            <div style={sidebarStyle}>

                <div className="sidebar-heading" style={sidebarTitleStyle}>GUIDES</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li>
                        <Link to="/guide/intro">
                            Introduction
                        </Link>
                    </li>
                    <li>
                        <Link to="/guide/start">
                            Getting started
                        </Link>
                    </li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Circuit Examples</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li>
                        <Link to="/example/endpoint">
                            Endpoints
                        </Link>
                    </li>
                    <li>
                        <Link to="/example/connection">
                            Connections
                        </Link>
                    </li>
                    <li>
                        <Link to="/example/basic">
                            Basic circuit
                        </Link> 
                    </li>
                    <li>
                        <Link to="/example/parallel">
                            Parallel circuit
                        </Link>
                    </li>
                    <li>
                        <Link to="/example/concatenated">
                            Concatenated circuit
                        </Link>
                    </li>
                    <li>
                        <Link to="/example/patchpanel">
                            Patch panels
                        </Link> 
                    </li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Equipment</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/example/rack">Rack</Link></li>
                    <li><Link to="/example/equipment">Equipment</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Network Map Examples</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/example/map">Traffic map</Link></li>
                    <li><Link to="/example/paths">Network paths</Link></li>
                    <li><Link to="/example/editor">Topology editor</Link></li>
                    <li><Link to="/example/legend">Legend</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Low level API</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/api/Connection">Connection</Link></li>
                    <li><Link to="/api/Endpoint">Endpoint</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Circuit API</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/api/BasicCircuit">BasicCircuit</Link></li>
                    <li><Link to="/api/ConcatenatedCircuit">ConcatenatedCircuit</Link></li>
                    <li><Link to="/api/ParallelCircuit">ParallelCircuit</Link></li>
                    <li><Link to="/api/PatchPanel">PatchPanel</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Equipment API</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/api/Rack">Rack</Link></li>
                    <li><Link to="/api/Equipment">Equipment</Link></li>
                    <li><Link to="/api/PowerNode">PowerNode</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Network Map API</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/api/BaseMap">BaseMap</Link></li>
                    <li><Link to="/api/TrafficMap">TrafficMap</Link></li>
                    <li><Link to="/api/MapEditor">MapEditor</Link></li>
                    <li><Link to="/api/MapLegend">Legend</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Other API</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li><Link to="/api/Resizable">Resizable</Link></li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Links</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li>
                        <a href="https://github.com/esnet/react-network-diagrams">
                            GitHub
                        </a>
                    </li>
                    <li><a href="https://www.es.net/">ESnet</a></li>
                    <li>
                        <a href="http://software.es.net/">
                            Open Source
                        </a>
                    </li>
                </ul>

                <div className="sidebar-heading" style={sidebarTitleStyle}>Related Projects</div>
                <ul className="nav nav-sidebar" style={sidebarItemStyle}>
                    <li>
                        <a href="http://esnet-pondjs.appspot.com">
                            pond.js
                        </a>
                    </li>
                    <li>
                        <a href="http://software.es.net/react-network-diagrams/">
                            Network Diagrams
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
