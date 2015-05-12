"use strict";

var React = require("react/addons");
var _ = require("underscore");

var {Map} = require("../../entry");

var topo = require("../data/portal_topo.json");

var curvedEdges = {};

var TrafficMap = React.createClass({

    _normalizedTopology: function() {
        var topology = {};

        if (_.isNull(this.props.topology)) {
            return null;
        }

        var nodeSizeMap = {
            "hub": 5.5,
            "esnet_site": 7
        };

        var capacityMap = {
            "100G": 5,
            "10G":  3,
            "1G":   1.5,
            "subG": 1
        };

        var styles = {
            "hub": {
                node: {
                    fill: "lightslategray"
                },
                label: {
                    fill: "slategray",
                    fontSize: 9
                }
            },
            "esnet_site": {
                node: {
                    fill: "steelblue"
                },
                label: {
                    fill: "steelblue",
                    fontSize: 11
                }
            }
        }

        //Extents of the raw topology
        var min_x = _.min(this.props.topology.nodes, function(node) { return node.x }).x;
        var min_y = _.min(this.props.topology.nodes, function(node) { return node.y }).y;
        var max_x = _.max(this.props.topology.nodes, function(node) { return node.x }).x;
        var max_y = _.max(this.props.topology.nodes, function(node) { return node.y }).y;
        max_x -= min_x;
        max_y -= min_y;

        //Create a node list
        topology.nodes = _.map(this.props.topology.nodes, function(node) {
            //Scale the node positions onto a normalized 0 to 1 scale
            node.x = (node.x - min_x)/max_x;
            node.y = (node.y - min_y)/max_y;

            //Radius is based on the type of node, given in the nodeSizeMap
            node.radius = nodeSizeMap[node.type];
            
            node.labelPosition = node.label_position;
            node.style = styles[node.type].node;
            node.labelStyle = styles[node.type].label;

            return node;
        });

        //Create the tologogy list
        topology.edges = _.map(this.props.topology.edges, function(edge) {
            var name = edge.source + "--" + edge.target
            var shape = "linear";
            var curveDirection = null;
            var offset = null;

            if (_.has(curvedEdges, name)) {
                shape = "curved";
                curveDirection = curvedEdges[name];
                offset = 12;
            }

            return {
                width: capacityMap[edge.capacity],
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                totalCapacity: edge.total_capacity,
                ifaces: edge.ifaces,
                name: name,
                shape: shape,
                curveDirection: curveDirection,
                offset: offset
            }
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;
        return topology;
    },

    render: function() {
        var topo = this._normalizedTopology()
        return (
            <Map topology={topo}
                 width={this.props.width}
                 height={this.props.height}
                 margin={this.props.margin}
                 edgeDrawingMethod={"bidirectionalArrow"}
                 onSelectionChange={this.handleSelectionChanged} />
        );
    }
});

//var normalizedTopology = normalizeTopology(topo);
//console.log("topo", normalizedTopology);

var TrafficMapExample = React.createClass({

    handleChange: function(attr, value) {
        this.setState({"selection": value});
    },

    handleMissingCountChange: function(attr, count) {
        this.setState({"missingCount": count});
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Traffic Map Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <p />
                            <TrafficMap topology={topo}
                                 width={980}
                                 height={500}
                                 margin={50}
                                 edgeDrawingMethod={"bidirectionalArrow"}
                                 onSelectionChange={this.handleSelectionChanged} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TrafficMapExample;