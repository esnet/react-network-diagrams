"use strict";

var React = require("react/addons");
var _ = require("underscore");

var {Map} = require("../../entry");

var topo = require("../data/portal_topo.json");


var capacityMap = {
    "100G": 5,
    "10G":  3,
    "1G":   1.5,
    "subG": 1
};

var nodeSizeMap = {
    "hub": 7,
    "esnet_site": 7
};

var curvedEdges = {};

function normalizeTopology(rawTopology) {
    if(_.isNull(rawTopology)) { return null }
    
    var topology = {};

    var min_x = _.min(rawTopology.nodes, function(node) { return node.x }).x;
    var min_y = _.min(rawTopology.nodes, function(node) { return node.y }).y;
    var max_x = _.max(rawTopology.nodes, function(node) { return node.x }).x;
    var max_y = _.max(rawTopology.nodes, function(node) { return node.y }).y;
    max_x -= min_x;
    max_y -= min_y;


    topology.nodes = _.map(rawTopology.nodes, function(node) {
        node.x = (node.x - min_x)/max_x;
        node.y = (node.y - min_y)/max_y;
        node.radius = nodeSizeMap[node.type];
        node.labelPosition = node.label_position;
        node.classed = node.type;
        return node;
    });

    topology.edges = _.map(rawTopology.edges, function(edge) {
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

    topology.name = rawTopology.name;
    topology.description = rawTopology.description;
    return topology;
}

var normalizedTopology = normalizeTopology(topo);
console.log("topo", normalizedTopology);


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
                            <Map topology={normalizedTopology}
                                 width={1140}
                                 height={530}
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