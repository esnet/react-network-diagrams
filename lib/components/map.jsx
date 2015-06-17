import React from "react";
import d3 from "d3";
import _ from "underscore";

import Node from "./node";
import Label from "./label";
import Legend from "./legend";
import SimpleEdge from "./edge-simple";
import BidirectionalEdge from "./edge-bidirectional";

import "../styles/map.css";

/**
 *
 * Base level map
 *
 */
export default React.createClass({

    displayName: "BaseMap",

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
        const xScale = d3.scale.linear().range([this.props.margin,
                                                this.props.width - this.props.margin]);
        const yScale = d3.scale.linear().range([this.props.margin,
                                                this.props.height - this.props.margin]);
        const hasSelectedNode = this.props.selection.nodes.length;
        const hasSelectedEdge = this.props.selection.edges.length;

        //
        // Build a mapping of edge names to the edges themselves
        //

        let edgeMap = {};
        _.each(this.props.topology.edges, function(edge) {
            edgeMap[`${edge.source}--${edge.target}`] = edge;
            edgeMap[`${edge.target}--${edge.source}`] = edge;
        });

        //
        // Build a list of nodes (each a Node) from our topology
        //

        let secondarySelectedNodes = [];
        _.each(this.props.selection.edges, function(edgeName) {
            let edge = edgeMap[edgeName];
            if (edge) {
                secondarySelectedNodes.push(edge.source);
                secondarySelectedNodes.push(edge.target);
            }
        });

        // maps node name to scaled x and y position
        let nodeCoordinates = {};
        let nodes = _.map(this.props.topology.nodes, node => {
            const x = xScale(node.x);
            const y = yScale(node.y);
            nodeCoordinates[node.name] = {x: x, y: y};

            const label = _.isUndefined(node.label) ? node.name : node.label;
            const nodeSelected = _.contains(this.props.selection.nodes, node.name);
            const edgeSelected = _.contains(secondarySelectedNodes, node.name);
            const selected = nodeSelected || edgeSelected;
            const muted = (hasSelectedNode && !selected) || (hasSelectedEdge && !selected);

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
                      onSelectionChange={this.props.onSelectionChange}/>
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

        let nodePaths = {};
        _.each(this.props.paths, path => {
            const pathName = path.name;
            const pathSteps = path.steps;
            for (let i = 0; i < pathSteps.length - 1; i++) {
                let node = pathSteps[i];
                let next = pathSteps[i + 1];
                let a;
                let z;

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

        let edgePathMap = {};
        _.each(this.props.paths, path => {
            const pathSteps = path.steps;
            if (pathSteps.length > 1) {
                for (let i = 0; i < pathSteps.length - 1; i++) {
                    const source = pathSteps[i];
                    const destination = pathSteps[i + 1];
                    const sourceToDestinationName = `${source}--${destination}`;
                    const destinationToSourceName = `${destination}--${source}`;
                    edgePathMap[sourceToDestinationName] = path;
                    edgePathMap[destinationToSourceName] = path;
                }
            }
        });

        let edges = _.map(this.props.topology.edges, edge => {
            const selected = _.contains(this.props.selection.edges, edge.name);

            // either 'simple' or 'bi-directional' edges.
            const edgeDrawingMethod = this.props.edgeDrawingMethod;

            // either 'linear' or 'curved'
            let edgeShape = "linear";
            if (!_.isUndefined(edge.shape) && !_.isNull(edge.shape)) {
                edgeShape = edge.shape;
            }

            let curveDirection = "left";
            if (!_.isUndefined(edge.curveDirection) && !_.isNull(edge.curveDirection)) {
                curveDirection = edge.curveDirection;
            }

            const muted = (hasSelectedEdge && !selected) || hasSelectedNode;

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
                                onSelectionChange={this.props.onSelectionChange}/>
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
                                       onSelectionChange={this.props.onSelectionChange} />
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
                                                   onSelectionChange={this.props.onSelectionChange}/>
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
                                    onSelectionChange={this.props.onSelectionChange}/>
                    );
                }
            }
        });

        //
        // Build the paths
        //

        let paths = _.map(this.props.paths, path => {
            const pathName = path.name;
            const pathSteps = path.steps;
            let pathSegments = [];

            if (pathSteps.length > 1) {
                for (let i = 0; i < pathSteps.length - 1; i++) {
                    let a;
                    let z;
                    let dir;
                    const source = pathSteps[i];
                    const destination = pathSteps[i + 1];

                    // Get the position of path (if multiple paths run parallel)
                    if (nodeCoordinates[source].x < nodeCoordinates[destination].x ||
                        nodeCoordinates[source].y < nodeCoordinates[destination].y) {
                        a = source; z = destination;
                        dir = 1;
                    } else {
                        a = destination; z = source;
                        dir = -1;
                    }

                    const pathsToDest = nodePaths[a].targetMap[z];
                    const pathIndex = _.indexOf(pathsToDest, pathName);
                    const pos = (pathIndex - (pathsToDest.length - 1) / 2) * dir;

                    // Get the edge from edgeMap
                    const edgeName = `${source}--${destination}`;
                    const edge = edgeMap[edgeName];

                    // Get the shape of the edge (linear or curved) and if curved,
                    // get the curve direction
                    let edgeShape = "linear";
                    if (edge && !_.isUndefined(edge.shape) && !_.isNull(edge.shape)) {
                        edgeShape = edge.shape;
                    }

                    // either 'left' or 'right'
                    let curveDirection = "left";
                    if (edge && !_.isUndefined(edge.curveDirection) && !_.isNull(edge.curveDirection)) {
                        curveDirection = edge.curveDirection;
                    }

                    //
                    // Construct this path segment as a simple (i.e. line only) path piece
                    // The width of the path is currently a prop of the map, but it would
                    // be nice to expand this to optionally be a prop of that line segement
                    //

                    if (this.props.edgeDrawingMethod === "simple") {
                        pathSegments.push(
                            <SimpleEdge x1={nodeCoordinates[source].x}
                                        y1={nodeCoordinates[source].y}
                                        x2={nodeCoordinates[destination].x}
                                        y2={nodeCoordinates[destination].y}
                                        position={pos * 6}
                                        source={source}
                                        target={destination}
                                        shape={edgeShape}
                                        curveDirection={curveDirection}
                                        width={this.props.pathWidth}
                                        classed={"path-" + pathName}
                                        key={`${pathName}--${edgeName}`}
                                        name={`${pathName}--${edgeName}`} />
                        );
                    }
                }
            }
            return (
                <g>
                    {pathSegments}
                </g>
            );
        });

        //
        // Build the labels
        //

        let labels = _.map(this.props.topology.labels, function(label) {
            const x = xScale(label.x);
            const y = yScale(label.y);
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

        let legend = null;
        if (!_.isNull(this.props.legendItems)) {
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

