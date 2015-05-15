"use strict";

var React = require("react/addons");
var _ = require("underscore");
var Pond = require("pond");

var {TrafficMap} = require("../../entry");
var {Event} = Pond;

var topo = require("../data/portal_topo.json");

//Get raw portal traffic structure (eventually transmit this) and
//turn it into a timestamped event. If we had a timeseries of data
//over the network we could scrub across them, feeding in emitted
//events, but for now just make one.
var rawTraffic = require("../data/portal_traffic.json");
var timestamp = rawTraffic.timestamp*1000;
var edgeTraffic = {};
_.each(rawTraffic.edges, (edge, k) => {
    _.each(edge.bps, (bps, dir) => {
        edgeTraffic[dir] = bps;
    });
});
var traffic = new Event(timestamp, edgeTraffic);

var TrafficMapExample = React.createClass({

    handleChange: function(attr, value) {
        this.setState({"selection": value});
    },

    handleMissingCountChange: function(attr, count) {
        this.setState({"missingCount": count});
    },

    render: function() {

        var e = new Event(new Date, {"name": "bob"});
        console.log(e.toString());

        var edgeThinknessMap = {
            "100G": 5,
            "10G":  3,
            "1G":   1.5,
            "subG": 1
        };

        var edgeShapeMap = {
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

        var edgeColorMap = [
            {"color": "#990000", "label": ">=50 Gbps", "range": [50,100]},
            {"color": "#bd0026", "label": "20 - 50", "range": [20,50]},
            {"color": "#cc4c02", "label": "10 - 20", "range": [10,20]},
            {"color": "#016c59", "label": "5 - 10", "range": [5,10]},
            {"color": "#238b45", "label": "2 - 5", "range": [2,5]},
            {"color": "#3690c0", "label": "1 - 2", "range": [1,2]},
            {"color": "#74a9cf", "label": "0 - 1", "range": [0,1]}
        ];

        var nodeSizeMap = {
            "hub": 5.5,
            "esnet_site": 7
        };

        var nodeShapeMap = {
            "CERN": "square"
        };

        var stylesMap = {
            "hub": {
                node: {
                    stroke: "none",
                    fill: "lightslategray",
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
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Traffic Map Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TrafficMap topology={topo}
                                    traffic={traffic}
                                    width={980}
                                    height={500}
                                    margin={50}
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

module.exports = TrafficMapExample;