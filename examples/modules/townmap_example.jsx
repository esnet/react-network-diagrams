import React from "react";
import _ from "underscore";
import {Event} from "pond";

import TrafficMap from "../../lib/components/traffic-map";

// Test data
import topo from "../data/town_topo.json";
import rawTraffic from "../data/town_traffic.json";

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
            "Swimming Pool--Rec Center": {
                "shape": "curved",
                "direction": "left",
                "offset": 50
            },
            "Clock Tower--Supermarket": {
                "shape": "curved",
                "direction": "right",
                "offset": 50
            },
            "Central Hub--Library": {
                "shape": "curved",
                "direction": "left",
                "offset": 30
            },
            "Library--Clock Tower": {
                "shape": "curved",
                "direction": "right",
                "offset": 30
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
            "home": 15,
            "sign": 10,
            "esnet_site": 7,
            "navigation": 8,
            "big": 30
        };

        // Mapping of node name to shape (default is circle, other
        // options are cloud or square currently)
        const nodeShapeMap = {
            "ENTER": "square",
            "Apartment Lots": "square",
            "Pizza": "square",
            "Donuts": "square",
            "Taxes": "square",
            "Gym": "square",
            "Videos": "square",
            "Thai Food": "square",
            "Computers": "square",
            "Burgers": "square",
            "Central Hub": "square"
        };

        // Mapping of node type to style

        const home = {
            node: {
                normal: {fill: "rgb(0, 128, 0)", stroke: "none", cursor: "pointer"},
                selected: {fill: "rgb(0, 128, 0)", stroke: "none", strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#B0B0B0", stroke: "#9E9E9E", opacity: 0.6, cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 12},
                selected: {fill: "#333", stroke: "none", fontSize: 12},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            }
        };

        const big = {
            node: {
                normal: {fill: "rgb(112, 128, 144)",stroke: "none",cursor: "pointer"},
                selected: {fill: "rgb(112, 128, 144)", stroke: "none", strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6, cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 12},
                selected: {fill: "#333",stroke: "none", fontSize: 12},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            }
        };

        const navigation = {
            node: {
                normal: {fill: "none",stroke: "none",cursor: "pointer"},
                selected: {fill: "none", stroke: "none", strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6, cursor: "pointer"}
            },
            label: {
                normal: {fill: "rgb(112, 128, 144)", stroke: "none", fontSize: 10},
                selected: {fill: "rgb(112, 128, 144)",stroke: "none", fontSize: 10},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            }
        };

        const sign = {
            node: {
                normal: {fill: "rgb(119, 136, 153)",stroke: "none",cursor: "pointer"},
                selected: {fill: "rgb(119, 136, 153)", stroke: "none", strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6, cursor: "pointer"}
            },
            label: {
                normal: {fill: "rgb(112, 128, 144)", stroke: "none", fontSize: 10},
                selected: {fill: "rgb(112, 128, 144)",stroke: "none", fontSize: 10},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            }
        };

        const esnet_site = {
            node: {
                normal: {fill: "rgb(70, 130, 180)",stroke: "none",cursor: "pointer"},
                selected: {fill: "rgb(70, 130, 180)", stroke: "none", strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6, cursor: "pointer"}
            },
            label: {
                normal: {fill: "rgb(70, 130, 180)", stroke: "none", fontSize: 10},
                selected: {fill: "rgb(70, 130, 180)",stroke: "none", fontSize: 10},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            }
        };  

        const stylesMap = {
            "home": home,
            "big": big,
            "navigation": navigation,
            "sign": sign,
            "esnet_site": esnet_site
        };


        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>ERG Map Example</h3>
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
