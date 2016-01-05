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
import _ from "underscore";
import APIDocs from "./docs";
import { Event } from "pondjs";
import TrafficMap from "../../src/traffic-map";
import Markdown from "react-markdown";

const text = require("raw!../markdown/trafficmap.md");

// Test data
import topo from "../data/portal_topo.json";
import rawTraffic from "../data/portal_traffic.json";

//
// Take raw portal traffic structure (eventually transmit this) and
// turn it into a timestamped event. If we had a timeseries of data
// over the network we could scrub across them, feeding in emitted
// events, but for now just make one.
//

const timestamp = rawTraffic.timestamp * 1000;
const edgeTraffic = {};
_.each(rawTraffic.edges, edge => {
    _.each(edge.bps, (bps, dir) => {
        edgeTraffic[dir] = bps;
    });
});

const traffic = new Event(timestamp, edgeTraffic);

//
// Example
//

export default React.createClass({

    getInitialState() {
        return {
            selectionType: null,
            selection: null
        };
    },

    handleSelectionChanged(selectionType, selection) {
        this.setState({selectionType, selection});
    },

    render() {

        const mapSelection = {
            nodes: this.state.selectionType === "node" ?
                [this.state.selection] : [],
            edges: this.state.selectionType === "edge" ?
                [this.state.selection] : []
        };

        // Maps link capacity to line thickness
        const edgeThinknessMap = {
            "100G": 5,
            "10G": 3,
            "1G": 1.5,
            subG: 1
        };

        // Maps edge name to edge shape. Current options are linear (default)
        // or curved. If curved you can specify the direction and offset
        // to control the curve.
        const edgeShapeMap = {
            "AMST--BOST": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "LOND--NEWY": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "AOFA--LOND": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "CERN--WASH": {
                shape: "curved",
                direction: "right",
                offset: 15
            }
        };

        // The color map maps an edge value (within the range) to a color
        const edgeColorMap = [
            {color: "#990000", label: ">=50 Gbps", range: [50, 100]},
            {color: "#bd0026", label: "20 - 50", range: [20, 50]},
            {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
            {color: "#016c59", label: "5 - 10", range: [5, 10]},
            {color: "#238b45", label: "2 - 5", range: [2, 5]},
            {color: "#3690c0", label: "1 - 2", range: [1, 2]},
            {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
        ];

        // Mapping of node type to size of shape
        const nodeSizeMap = {
            hub: 5.5,
            esnet_site: 7
        };

        // Mapping of node name to shape (default is circle, other
        // options are cloud or square currently)
        const nodeShapeMap = {
            CERN: "square"
        };

        const siteStyle = {
            node: {
                normal: {fill: "#B0B0B0", stroke: "#9E9E9E", cursor: "pointer"},
                selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                           strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#B0B0B0", stroke: "#9E9E9E", opacity: 0.6,
                        cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333", stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8,
                        opacity: 0.6}
            }
        };

        const hubStyle = {
            node: {
                normal: {fill: "#CBCBCB",stroke: "#BEBEBE",
                         cursor: "pointer"},
                selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                           strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6,
                        cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333",stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6}
            }
        };

        // Mapping of node type to style
        const stylesMap = {
            hub: hubStyle,
            esnet_site: siteStyle
        };

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Traffic Map Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TrafficMap
                            bounds={{x1: -5, y1: 5, x2: 240, y2: 120}}
                            topology={topo}
                            traffic={traffic}
                            edgeColorMap={edgeColorMap}
                            edgeDrawingMethod="bidirectionalArrow"
                            edgeThinknessMap={edgeThinknessMap}
                            edgeShapeMap={edgeShapeMap}
                            nodeSizeMap={nodeSizeMap}
                            nodeShapeMap={nodeShapeMap}
                            stylesMap={stylesMap}
                            selection={mapSelection}
                            onSelectionChange={this.handleSelectionChanged} />
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <Markdown source={text} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <APIDocs file="src/traffic-map.jsx"/>
                    </div>
                </div>
            </div>
        );
    }
});
