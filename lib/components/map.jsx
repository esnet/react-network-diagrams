"use strict";

var React = require("react");
var d3 = require("d3");
var _ = require("underscore");

var Node = require("./node");
var Label = require("./label");
var Legend = require("./legend");

var SimpleEdge   = require("./edge-simple");
var BidirectionalEdge   = require("./edge-bidirectional");

require("../styles/map.css");

/**
 *
 * Base level map
 *
 */
var Map = React.createClass({

    displayName: "Map",

    getDefaultProps: function() {
        return {
            width: 800,
            height: 600,
            margin: 20,
            edgeDrawingMethod: "simple",
            legendItems: null,
            selection: { nodes: {}, edges: {} },
            paths: [],
            pathWidth: 5
        };
    },

    render: function() {
        var self = this;
        var xScale = d3.scale.linear()
                       .range([this.props.margin,
                               this.props.width - this.props.margin]);
        var yScale = d3.scale.linear()
                       .range([this.props.margin,
                               this.props.height - this.props.margin]);
                      
        var hasSelectedNode = this.props.selection.nodes.length;
        var hasSelectedEdge = this.props.selection.edges.length;

        //
        // Build a mapping of edge names to the edges themselves
        //

        var edgeMap = {};
        _.each(this.props.topology.edges, function(edge) {
            edgeMap[edge.source + "--" + edge.target] = edge;
            edgeMap[edge.target + "--" + edge.source] = edge;
        });

        //
        // Build a list of nodes (each a Node) from our topology
        //

        var secondarySelectedNodes = [];
        _.each(this.props.selection.edges, function(edgeName) {
            var edge = edgeMap[edgeName];
            if (edge) {
                secondarySelectedNodes.push(edge.source);
                secondarySelectedNodes.push(edge.target);
            }
        });

        var nodeCoordinates = {}; //maps node name to scaled x and y position
        var nodes = _.map(this.props.topology.nodes, function(node) {
            var x = xScale(node.x);
            var y = yScale(node.y);
            nodeCoordinates[node.name] = {x: x, y: y};
            var label = _.isUndefined(node.label) ? node.name : node.label;
            var nodeSelected = _.contains(self.props.selection.nodes, node.name);
            var edgeSelected = _.contains(secondarySelectedNodes, node.name);
            var selected = nodeSelected || edgeSelected;
            var muted = (hasSelectedNode && !selected) || (hasSelectedEdge && !selected);
            return (
                <Node x={x}
                      y={y}
                      name={node.name}
                      key={node.name}
                      style={node.style}
                      labelStyle={node.labelStyle}
                      type={node.type}
                      labelPosition={node.labelPosition}
                      label={label}
                      radius={node.radius}
                      classed={node.classed}
                      shape={node.shape}
                      selected={selected}
                      muted={muted}
                      onSelectionChange={self.props.onSelectionChange}/>
            );
        });



        //
        // Build a axillary structure to help us build the paths
        //
        // For each node, we need a map of sources and destinations for each path
        // e.g. If DENV has two incoming paths, both from SACR and one out going path to KANS
        // the that would be represented like this:
        //
        //      nodePathMap[DENV].targetMap[SACR] => [PATH1, PATH2]
        //                                 [KANS] => [PATH2]
        //

        var nodePaths = {};
        
        var i;
        _.each(this.props.paths, function(path) {
            var pathName = path.name;
            var pathSteps = path.steps;
            var node, next;
            var a, z;
            for (i = 0; i < pathSteps.length-1; i++) {

                node = pathSteps[i];
                next = pathSteps[i+1];

                // We store our target based on geography, west to east etc A->Z
                if (nodeCoordinates[node].x < nodeCoordinates[next].x ||
                    nodeCoordinates[node].y < nodeCoordinates[next].y) {
                    a = node; z = next;
                } else {
                    a = next; z = node;
                }

                if (!_.has(nodePaths, a)) {
                    nodePaths[a] = {targetMap: {}};
                }

                if (!_.has(nodePaths[a].targetMap, z)) {
                    nodePaths[a].targetMap[z] = [];
                }

                nodePaths[a].targetMap[z].push(pathName);
            }
        });

        //
        // For drawing path bidirectional only, we build up a map first to
        // tell us which edges are touched by a path
        //

        var edgePathMap = {};
        _.each(this.props.paths, function(path) {
            var pathSteps = path.steps;
            if (pathSteps.length > 1) {
                for (i = 0; i < pathSteps.length-1; i++) {
                    var source = pathSteps[i];
                    var destination = pathSteps[i+1];
                    var sourceToDestinationName = source + "--" + destination;
                    var destinationToSourceName = destination + "--" + source;
                    edgePathMap[sourceToDestinationName] = path;
                    edgePathMap[destinationToSourceName] = path;
                }
            }
        });
        
        var edges = _.map(this.props.topology.edges, function(edge) {
            var selected = _.contains(self.props.selection.edges, edge.name);

            //either 'simple' or 'bi-directional' edges.
            var edgeDrawingMethod = self.props.edgeDrawingMethod;

            // either 'linear' or 'curved'
            var edgeShape = "linear";
            if(!_.isUndefined(edge.shape) && !_.isNull(edge.shape)) {
                edgeShape = edge.shape;
            }
            
            var curveDirection = "left";
            if(!_.isUndefined(edge.curveDirection) && !_.isNull(edge.curveDirection)) {
                curveDirection = edge.curveDirection;
            }

            var muted = (hasSelectedEdge && !selected) || hasSelectedNode;

            if (edgeDrawingMethod === "simple") {
            
                return (
                    <SimpleEdge x1={nodeCoordinates[edge.source].x}
                                x2={nodeCoordinates[edge.target].x}
                                y1={nodeCoordinates[edge.source].y}
                                y2={nodeCoordinates[edge.target].y}
                                source={edge.source}
                                target={edge.target}
                                shape={edgeShape}
                                curveDirection={curveDirection}
                                color={edge.stroke}
                                width={edge.width}
                                classed={edge.classed}
                                key={edge.name}
                                name={edge.name}
                                selected={selected}
                                muted={muted}
                                onSelectionChange={self.props.onSelectionChange}/>
                );

            } else if (edgeDrawingMethod === "bidirectionalArrow") {
            
                return (
                    <BidirectionalEdge x1={nodeCoordinates[edge.source].x}
                                       x2={nodeCoordinates[edge.target].x}
                                       y1={nodeCoordinates[edge.source].y}
                                       y2={nodeCoordinates[edge.target].y}
                                       source={edge.source}
                                       target={edge.target}
                                       shape={edgeShape}
                                       curveDirection={curveDirection}
                                       offset={edge.offset}
                                       sourceTargetColor={edge.sourceTargetColor}
                                       targetSourceColor={edge.targetSourceColor}
                                       width={edge.width}
                                       classed={edge.classed}
                                       key={edge.name}
                                       name={edge.name}
                                       selected={selected}
                                       muted={muted}
                                       onSelectionChange={self.props.onSelectionChange} />
                );
            } else if (edgeDrawingMethod === "pathBidirectionalArrow") {

                if (_.has(edgePathMap, edge.name)) {
                    return (
                        <BidirectionalEdge x1={nodeCoordinates[edge.source].x}
                                                   x2={nodeCoordinates[edge.target].x}
                                                   y1={nodeCoordinates[edge.source].y}
                                                   y2={nodeCoordinates[edge.target].y}
                                                   source={edge.source}
                                                   target={edge.target}
                                                   shape={edgeShape}
                                                   curveDirection={curveDirection}
                                                   sourceTargetColor={edge.sourceTargetColor}
                                                   targetSourceColor={edge.targetSourceColor}
                                                   width={edge.width}
                                                   classed={edge.classed}
                                                   key={edge.name}
                                                   name={edge.name}
                                                   selected={selected}
                                                   muted={muted}
                                                   onSelectionChange={self.props.onSelectionChange}/>
                    );
                } else {
                    return (
                        <SimpleEdge x1={nodeCoordinates[edge.source].x}
                                    x2={nodeCoordinates[edge.target].x}
                                    y1={nodeCoordinates[edge.source].y}
                                    y2={nodeCoordinates[edge.target].y}
                                    source={edge.source}
                                    target={edge.target}
                                    shape={edgeShape}
                                    curveDirection={curveDirection}
                                    color={edge.stroke}
                                    width={1}
                                    classed={edge.classed}
                                    key={edge.name}
                                    name={edge.name}
                                    selected={selected}
                                    muted={muted}
                                    onSelectionChange={self.props.onSelectionChange}/>
                    );
                }
            }
        });

        //
        // Build the paths
        //
        
        var paths = _.map(this.props.paths, function(path) {
            var pathSegments = [];
            var pathName = path.name;
            var pathSteps = path.steps;
            var a, z, dir;
            if (pathSteps.length > 1) {
                for (i = 0; i < pathSteps.length-1; i++) {

                    var source = pathSteps[i];
                    var destination = pathSteps[i+1];

                    //Get the position of path (if multiple paths run parallel)
                    if (nodeCoordinates[source].x < nodeCoordinates[destination].x ||
                        nodeCoordinates[source].y < nodeCoordinates[destination].y) {
                        a = source; z = destination;
                        dir = 1;
                    } else {
                        a = destination; z = source;
                        dir = -1;
                    }
                    var pathsToDest = nodePaths[a].targetMap[z];
                    var pathIndex = _.indexOf(pathsToDest, pathName);
                    var pos = (pathIndex - (pathsToDest.length-1)/2 )*dir;

                    //Get the edge from edgeMap
                    var edgeName = source + "--" + destination;
                    var edge = edgeMap[edgeName];

                    //Get the shape of the edge (linear or curved) and if curved,
                    //get the curve direction
                    var edgeShape = "linear"; // either 'linear' or 'curved'
                    if (edge && !_.isUndefined(edge.shape) && !_.isNull(edge.shape)) {
                        edgeShape = edge.shape;
                    }
                    var curveDirection = "left"; // either 'left' or 'right'
                    if (edge && !_.isUndefined(edge.curveDirection) && !_.isNull(edge.curveDirection)) {
                        curveDirection = edge.curveDirection;
                    }

                    //Construct this path segment as a simple (i.e. line only) path piece
                    //The width of the path is currently a prop of the map, but it would
                    //be nice to expand this to optionally be a prop of that line segement
                    if (self.props.edgeDrawingMethod === "simple") {
                        pathSegments.push(
                            <SimpleEdge x1={nodeCoordinates[source].x}
                                        y1={nodeCoordinates[source].y}
                                        x2={nodeCoordinates[destination].x}
                                        y2={nodeCoordinates[destination].y}
                                        position={pos*6}
                                        source={source}
                                        target={destination}
                                        shape={edgeShape}
                                        curveDirection={curveDirection}
                                        width={self.props.pathWidth}
                                        classed={"path-" + pathName}
                                        key={pathName + "--" + edgeName}
                                        name={pathName + "--" + edgeName} />
                        );
                    }
                }
            }
            return (
                <g>{pathSegments}</g>
            );
        });

        //
        // Build the labels
        //

        var labels = _.map(this.props.topology.labels, function(label) {
            var x = xScale(label.x);
            var y = yScale(label.y);
            return (
                <Label x={x}
                       y={y}
                       label={label.label}
                       labelPosition={label.labelPosition}
                       key={label.label} />
            );
        });

        //
        // Build the legend
        //

        var legend = null;
        if(!_.isNull(this.props.legendItems)){
            legend = (
                <Legend x={this.props.legendItems.x}
                        y={this.props.legendItems.y}
                        edgeTypes={this.props.legendItems.edgeTypes}
                        nodeTypes={this.props.legendItems.nodeTypes}
                        colorSwatches={this.props.legendItems.colorSwatches} />
            );
        }

        return (
            <svg width={this.props.width}
                 height={this.props.height}
                 className={"map-container"}
                 onClick={this._click}>
                <g>
                {edges}
                {paths}
                {nodes}
                {labels}
                {legend}
                </g>
            </svg>
        );
    },
    _click: function() {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(null);
        }
    }
});

module.exports = Map;
