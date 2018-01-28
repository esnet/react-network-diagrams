/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import _ from "underscore";
import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";

import { BidirectionalEdge } from "./BidirectionalEdge";
import { NodeLabel as Label } from "./NodeLabel";
import { MapLegend as Legend } from "./MapLegend";
import { Node } from "./Node";
import { SimpleEdge } from "./SimpleEdge";

// import '../map.css';

function getElementOffset(element) {
    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top + window.pageYOffset - de.clientTop;
    const left = box.left + window.pageXOffset - de.clientLeft;
    return { top, left };
}

/**
 * The BaseMap forms a general network drawing component which
 * doesn't assume that the drawing is of a Network. It is used
 * by the `<TrafficMap>` to produce the chart seen of the front
 * page of my.es.net.
 */
export class BaseMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: null
        };
    }

    handleNodeMouseDown(id, e) {
        const { xScale, yScale } = this.scale();
        const { x, y } = this.getOffsetMousePosition(e);
        const drag = {
            id,
            x0: xScale.invert(x),
            y0: yScale.invert(y)
        };
        this.setState({ dragging: drag });
    }

    handleSelectionChange(type, id) {
        if (this.props.onNodeSelected) {
            if (type === "node") {
                this.props.onNodeSelected(id);
            }
        } else if (this.props.onEdgeSelected) {
            if (type === "edge") {
                this.props.onEdgeSelected(id);
            }
        } else if (this.props.onSelectionChange) {
            this.props.onSelectionChange(type, id);
        }
    }

    handleMouseMove(e) {
        e.preventDefault();
        if (this.state.dragging) {
            const { id } = this.state.dragging;
            const { xScale, yScale } = this.scale();
            const { x, y } = this.getOffsetMousePosition(e);
            if (this.props.onNodeDrag) {
                this.props.onNodeDrag(id, xScale.invert(x), yScale.invert(y));
            }
        }
    }

    handleMouseUp(e) {
        e.stopPropagation();
        this.setState({ dragging: null });
    }

    handleClick(e) {
        if (this.props.onNodeSelected || this.props.onEdgeSelected) {
            return;
        }
        if (this.props.onPositionSelected) {
            const { xScale, yScale } = this.scale();
            const { x, y } = this.getOffsetMousePosition(e);
            this.props.onPositionSelected(xScale.invert(x), yScale.invert(y));
        }
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(null);
        }
    }

    /**
     * Get the event mouse position relative to the event rect
     */
    getOffsetMousePosition(e) {
        const trackerRect = this.map;
        const offset = getElementOffset(trackerRect);
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        return { x: Math.round(x), y: Math.round(y) };
    }

    scale() {
        return {
            xScale: scaleLinear()
                .domain([this.props.bounds.x1, this.props.bounds.x2])
                .range([this.props.margin, this.props.width - this.props.margin * 2]),
            yScale: scaleLinear()
                .domain([this.props.bounds.y1, this.props.bounds.y2])
                .range([this.props.margin, this.props.height - this.props.margin * 2])
        };
    }

    render() {
        const { xScale, yScale } = this.scale();
        const hasSelectedNode = this.props.selection.nodes.length;
        const hasSelectedEdge = this.props.selection.edges.length;

        //
        // Build a mapping of edge names to the edges themselves
        //

        const edgeMap = {};
        _.each(this.props.topology.edges, edge => {
            edgeMap[`${edge.source}--${edge.target}`] = edge;
            edgeMap[`${edge.target}--${edge.source}`] = edge;
        });

        //
        // Build a list of nodes (each a Node) from our topology
        //

        const secondarySelectedNodes = [];
        _.each(this.props.selection.edges, edgeName => {
            const edge = edgeMap[edgeName];
            if (edge) {
                secondarySelectedNodes.push(edge.source);
                secondarySelectedNodes.push(edge.target);
            }
        });

        const nodeCoordinates = {};
        const nodes = _.map(this.props.topology.nodes, node => {
            const { name, id, label, ...props } = node;
            props.id = id || name;
            props.x = xScale(node.x);
            props.y = yScale(node.y);
            props.label = label || name;

            const nodeSelected = _.contains(this.props.selection.nodes, props.id);
            const edgeSelected = _.contains(secondarySelectedNodes, node.name);
            props.selected = nodeSelected || edgeSelected;
            props.muted =
                (hasSelectedNode && !props.selected) || (hasSelectedEdge && !props.selected);

            nodeCoordinates[node.name] = { x: props.x, y: props.y };

            return (
                <Node
                    key={props.id}
                    {...props}
                    onSelectionChange={(type, i) => this.handleSelectionChange(type, i)}
                    onMouseDown={(id, e) => this.handleNodeMouseDown(id, e)}
                    onMouseMove={(type, i, xx, yy) => this.props.onNodeMouseMove(i, xx, yy)}
                    onMouseUp={(type, i, e) => this.props.onNodeMouseUp(i, e)}
                />
            );
        });

        //
        // Build a axillary structure to help us build the paths
        //
        // For each node, we need a map of sources and destinations
        // for each path e.g. If DENV has two incoming paths, both
        // from SACR and one out going path to KANS the that would
        // be represented like this:
        //
        //      nodePathMap[DENV].targetMap[SACR] => [PATH1, PATH2]
        //                                 [KANS] => [PATH2]

        const nodePaths = {};
        _.each(this.props.paths, path => {
            const pathName = path.name;
            const pathSteps = path.steps;
            for (let i = 0; i < pathSteps.length - 1; i++) {
                const node = pathSteps[i];
                const next = pathSteps[i + 1];

                let a;
                let z;

                // We store our target based on geography, west to east etc A->Z
                if (_.has(nodeCoordinates, node) && _.has(nodeCoordinates, next)) {
                    if (
                        nodeCoordinates[node].x < nodeCoordinates[next].x ||
                        nodeCoordinates[node].y < nodeCoordinates[next].y
                    ) {
                        a = node;
                        z = next;
                    } else {
                        a = next;
                        z = node;
                    }

                    if (!_.has(nodePaths, a)) {
                        nodePaths[a] = { targetMap: {} };
                    }

                    if (!_.has(nodePaths[a].targetMap, z)) {
                        nodePaths[a].targetMap[z] = [];
                    }

                    nodePaths[a].targetMap[z].push(pathName);
                } else {
                    if (!_.has(nodeCoordinates, node)) {
                        throw new Error(`Missing node in path '${pathName}': ${node}`);
                    }
                    if (!_.has(nodeCoordinates, next)) {
                        throw new Error(`Missing node in path '${pathName}': ${next}`);
                    }
                }
            }
        });

        //
        // For drawing path bidirectional only, we build up a map first to
        // tell us which edges are touched by a path
        //

        const edgePathMap = {};
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

        const edges = _.map(this.props.topology.edges, edge => {
            const selected = _.contains(this.props.selection.edges, edge.name);

            if (!_.has(nodeCoordinates, edge.source) || !_.has(nodeCoordinates, edge.target)) {
                return;
            }

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

            const muted_val = (hasSelectedEdge && !selected) || hasSelectedNode;
            const muted = muted_val === 0 ? false : true;

            if (edgeDrawingMethod === "simple") {
                return (
                    <SimpleEdge
                        x1={nodeCoordinates[edge.source].x}
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
                        onSelectionChange={(type, id) => this.handleSelectionChange(type, id)}
                    />
                );
            } else if (edgeDrawingMethod === "bidirectionalArrow") {
                return (
                    <BidirectionalEdge
                        x1={nodeCoordinates[edge.source].x}
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
                        onSelectionChange={(type, id) => this.handleSelectionChange(type, id)}
                    />
                );
            } else if (edgeDrawingMethod === "pathBidirectionalArrow") {
                if (_.has(edgePathMap, edge.name)) {
                    return (
                        <BidirectionalEdge
                            x1={nodeCoordinates[edge.source].x}
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
                            onSelectionChange={(type, id) => this.handleSelectionChange(type, id)}
                        />
                    );
                } else {
                    return (
                        <SimpleEdge
                            x1={nodeCoordinates[edge.source].x}
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
                            onSelectionChange={(type, id) => this.handleSelectionChange(type, id)}
                        />
                    );
                }
            }
        });

        //
        // Build the paths
        //

        const paths = _.map(this.props.paths, path => {
            const pathName = path.name;
            const pathSteps = path.steps;
            const pathSegments = [];
            const pathColor = path.color || "steelblue";
            const pathWidth = path.width || 1;
            if (pathSteps.length > 1) {
                for (let i = 0; i < pathSteps.length - 1; i++) {
                    let a;
                    let z;
                    let dir;
                    const source = pathSteps[i];
                    const destination = pathSteps[i + 1];

                    // Get the position of path (if multiple paths run parallel)
                    if (
                        nodeCoordinates[source].x < nodeCoordinates[destination].x ||
                        nodeCoordinates[source].y < nodeCoordinates[destination].y
                    ) {
                        a = source;
                        z = destination;
                        dir = 1;
                    } else {
                        a = destination;
                        z = source;
                        dir = -1;
                    }

                    const pathsToDest = nodePaths[a].targetMap[z];
                    const pathIndex = _.indexOf(pathsToDest, pathName);
                    const pos = (pathIndex - (pathsToDest.length - 1) / 2) * dir;

                    // Get the edge from edgeMap
                    const edgeName = `${source}--${destination}`;
                    const edge = edgeMap[edgeName];

                    // Get the shape of the edge (linear or curved) and if
                    // curved, get the curve direction
                    let edgeShape = "linear";
                    if (edge && !_.isUndefined(edge.shape) && !_.isNull(edge.shape)) {
                        edgeShape = edge.shape;
                    }

                    // either 'left' or 'right'
                    let curveDirection = "left";
                    if (
                        edge &&
                        !_.isUndefined(edge.curveDirection) &&
                        !_.isNull(edge.curveDirection)
                    ) {
                        curveDirection = edge.curveDirection;
                    }

                    //
                    // Construct this path segment as a simple (i.e. line only)
                    // path piece. The width of the path is currently a prop of
                    // the map, but it would be nice to expand this to
                    // optionally be a prop of that line segement
                    //

                    if (this.props.edgeDrawingMethod === "simple") {
                        pathSegments.push(
                            <SimpleEdge
                                x1={nodeCoordinates[source].x}
                                y1={nodeCoordinates[source].y}
                                x2={nodeCoordinates[destination].x}
                                y2={nodeCoordinates[destination].y}
                                position={pos * 6}
                                source={source}
                                color={pathColor}
                                target={destination}
                                shape={edgeShape}
                                curveDirection={curveDirection}
                                width={pathWidth}
                                classed={`path-${pathName}`}
                                key={`${pathName}--${edgeName}`}
                                name={`${pathName}--${edgeName}`}
                            />
                        );
                    }
                }
            }
            return <g key={pathName}>{pathSegments}</g>;
        });

        //
        // Build the labels
        //

        const labels = _.map(this.props.topology.labels, label => {
            const x = xScale(label.x);
            const y = yScale(label.y);
            return (
                <Label
                    x={x}
                    y={y}
                    label={label.label}
                    labelPosition={label.labelPosition}
                    key={label.label}
                />
            );
        });

        //
        // Build the legend
        //

        let legend = null;
        if (!_.isNull(this.props.legendItems)) {
            legend = (
                <Legend
                    x={this.props.legendItems.x}
                    y={this.props.legendItems.y}
                    edgeTypes={this.props.legendItems.edgeTypes}
                    nodeTypes={this.props.legendItems.nodeTypes}
                    colorSwatches={this.props.legendItems.colorSwatches}
                />
            );
        }

        let style;
        if (this.state.dragging) {
            style = {
                cursor: "pointer"
            };
        } else if (
            this.props.onPositionSelected ||
            this.props.onNodeSelected ||
            this.props.onEdgeSelected
        ) {
            style = {
                cursor: "crosshair"
            };
        } else {
            style = {
                cursor: "default"
            };
        }

        return (
            <svg
                style={style}
                ref={inst => {
                    this.map = inst;
                }}
                width={this.props.width}
                height={this.props.height}
                className="noselect map-container"
                onClick={e => this.handleClick(e)}
                onMouseMove={e => this.handleMouseMove(e)}
                onMouseUp={e => this.handleMouseUp(e)}
            >
                <g>
                    {edges}
                    {paths}
                    {nodes}
                    {labels}
                    {legend}
                </g>
            </svg>
        );
    }
}

BaseMap.propTypes = {
    /**
     * The topology structure, as detailed above. This contains the
     * descriptions of nodes, edges and paths used to render the topology
     */
    topology: PropTypes.object.isRequired,

    /** The width of the circuit diagram */
    width: PropTypes.number,

    /** The height of the circuit diagram */
    height: PropTypes.number,

    /** The blank margin around the diagram drawing */
    margin: PropTypes.number,

    /**
     * Specified as an object containing x1, y1 and x2, y2. This is the region
     * to display on the map. If this isn't specified the bounds will be
     * calculated from the nodes in the Map.
     */
    bounds: PropTypes.shape({
        x1: PropTypes.number,
        y1: PropTypes.number,
        x2: PropTypes.number,
        y2: PropTypes.number
    }),

    /**
     * The is the overall rendering style for the edge connections. Maybe
     * one of the following strings:
     *
     *  * "simple" - simple line connections between nodes
     *  * "bidirectionalArrow" - network traffic represented by bi-directional arrows
     *  * "pathBidirectionalArrow" - similar to "bidirectionalArrow", but only for
     *  edges that are used in the currently displayed path(s).
     */
    edgeDrawingMethod: PropTypes.oneOf(["simple", "bidirectionalArrow", "pathBidirectionalArrow"]),

    legendItems: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        edgeTypes: PropTypes.object,
        nodeTypes: PropTypes.object,
        colorSwatches: PropTypes.object
    }),

    selection: PropTypes.object,

    paths: PropTypes.array,

    pathWidth: PropTypes.number
};

BaseMap.defaultProps = {
    width: 800,
    height: 600,
    margin: 20,
    bounds: { x1: 0, y1: 0, x2: 1, y2: 1 },
    edgeDrawingMethod: "simple",
    legendItems: null,
    selection: { nodes: {}, edges: {} },
    paths: [],
    pathWidth: 5
};
