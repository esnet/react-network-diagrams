import React from "react";
import _ from "underscore";
import {Event} from "pond";

import TrafficMap from "../../lib/components/traffic-map";

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
let edgeTraffic = {};
_.each(rawTraffic.edges, edge => {
    _.each(edge.bps, (bps, dir) => {
        edgeTraffic[dir] = bps;
    });
});

let traffic = new Event(timestamp, edgeTraffic);

//
// Example
//

export default React.createClass({

    render: function() {
        // Maps link capacity to line thickness
        const edgeThinknessMap = {
            "100G": 5,
            "10G": 3,
            "1G": 1.5,
            "subG": 1
        };

        // Maps edge name to edge shape. Current options are linear (default)
        // or curved. If curved you can specify the direction and offset to control
        // the curve.
        const edgeShapeMap = {
            "AMST--BOST": {
                "shape": "curved",
                "direction": "right",
                "offset": 15
            },
            "LOND--NEWY": {
                "shape": "curved",
                "direction": "right",
                "offset": 15
            },
            "AOFA--LOND": {
                "shape": "curved",
                "direction": "right",
                "offset": 15
            },
            "CERN--WASH": {
                "shape": "curved",
                "direction": "right",
                "offset": 15
            }
        };

        // The color map maps an edge value (within the range) to a color
        const edgeColorMap = [
            {"color": "#990000", "label": ">=50 Gbps", "range": [50, 100]},
            {"color": "#bd0026", "label": "20 - 50", "range": [20, 50]},
            {"color": "#cc4c02", "label": "10 - 20", "range": [10, 20]},
            {"color": "#016c59", "label": "5 - 10", "range": [5, 10]},
            {"color": "#238b45", "label": "2 - 5", "range": [2, 5]},
            {"color": "#3690c0", "label": "1 - 2", "range": [1, 2]},
            {"color": "#74a9cf", "label": "0 - 1", "range": [0, 1]}
        ];

        // Mapping of node type to size of shape
        const nodeSizeMap = {
            "hub": 5.5,
            "esnet_site": 7
        };

        // Mapping of node name to shape (default is circle, other
        // options are cloud or square currently)
        const nodeShapeMap = {
            "CERN": "square"
        };

        // Mapping of node type to style
        const stylesMap = {
            "hub": {
                node: {
                    stroke: "none",
                    fill: "lightslategray"
                },
                label: {
                    fill: "slategray",
                    fontSize: 9
                }
            },
            "esnet_site": {
                node: {
                    stroke: "none",
                    fill: "steelblue"
                },
                label: {
                    fill: "steelblue",
                    fontSize: 11
                }
            }
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
                        <TrafficMap width={980} height={500} margin={50}
                                    topology={topo}
                                    traffic={traffic}
                                    edgeColorMap={edgeColorMap}
                                    edgeDrawingMethod="bidirectionalArrow"
                                    edgeThinknessMap={edgeThinknessMap}
                                    edgeShapeMap={edgeShapeMap}
                                    nodeSizeMap={nodeSizeMap}
                                    nodeShapeMap={nodeShapeMap}
                                    stylesMap={stylesMap}
                                    onSelectionChange={this.handleSelectionChanged} />
                    </div>
                </div>
            </div>
        );
    }
});

