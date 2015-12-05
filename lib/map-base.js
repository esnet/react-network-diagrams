/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

"use strict";

var _objectWithoutProperties = require("babel-runtime/helpers/object-without-properties")["default"];

var _extends = require("babel-runtime/helpers/extends")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3 = require("d3");

var _d32 = _interopRequireDefault(_d3);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

var _mapNodeLabel = require("./map-node-label");

var _mapNodeLabel2 = _interopRequireDefault(_mapNodeLabel);

var _mapLegend = require("./map-legend");

var _mapLegend2 = _interopRequireDefault(_mapLegend);

var _edgeSimple = require("./edge-simple");

var _edgeSimple2 = _interopRequireDefault(_edgeSimple);

var _edgeBidirectional = require("./edge-bidirectional");

var _edgeBidirectional2 = _interopRequireDefault(_edgeBidirectional);

require("./map.css");

function getElementOffset(element) {
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left };
}

exports["default"] = _react2["default"].createClass({

    displayName: "BaseMap",

    propTypes: {
        topology: _react2["default"].PropTypes.object.isRequired,
        width: _react2["default"].PropTypes.number,
        height: _react2["default"].PropTypes.number,
        margin: _react2["default"].PropTypes.number,
        bounds: _react2["default"].PropTypes.shape({
            x1: _react2["default"].PropTypes.number,
            y1: _react2["default"].PropTypes.number,
            x2: _react2["default"].PropTypes.number,
            y2: _react2["default"].PropTypes.number
        }),
        edgeDrawingMethod: _react2["default"].PropTypes.oneOf(["simple", "bidirectionalArrow", "pathBidirectionalArrow"]),
        legendItems: _react2["default"].PropTypes.shape({
            x: _react2["default"].PropTypes.number,
            y: _react2["default"].PropTypes.number,
            edgeTypes: _react2["default"].PropTypes.object,
            nodeTypes: _react2["default"].PropTypes.object,
            colorSwatches: _react2["default"].PropTypes.object
        })
    },

    getDefaultProps: function getDefaultProps() {
        return {
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
    },

    getInitialState: function getInitialState() {
        return {
            draging: null
        };
    },

    handleNodeMouseDown: function handleNodeMouseDown(id, e) {
        var _scale = this.scale();

        var xScale = _scale.xScale;
        var yScale = _scale.yScale;

        var _getOffsetMousePosition = this.getOffsetMousePosition(e);

        var x = _getOffsetMousePosition.x;
        var y = _getOffsetMousePosition.y;

        var drag = {
            id: id,
            x0: xScale.invert(x),
            y0: yScale.invert(y)
        };
        this.setState({ dragging: drag });
    },

    handleSelectionChange: function handleSelectionChange(type, id) {
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
    },

    handleMouseMove: function handleMouseMove(e) {
        e.preventDefault();
        if (this.state.dragging) {
            var id = this.state.dragging.id;

            var _scale2 = this.scale();

            var xScale = _scale2.xScale;
            var yScale = _scale2.yScale;

            var _getOffsetMousePosition2 = this.getOffsetMousePosition(e);

            var x = _getOffsetMousePosition2.x;
            var y = _getOffsetMousePosition2.y;

            if (this.props.onNodeDrag) {
                this.props.onNodeDrag(id, xScale.invert(x), yScale.invert(y));
            }
        }
    },

    handleMouseUp: function handleMouseUp(e) {
        e.stopPropagation();
        this.setState({ dragging: null });
    },

    handleClick: function handleClick(e) {
        if (this.props.onNodeSelected || this.props.onEdgeSelected) {
            return;
        }
        if (this.props.onPositionSelected) {
            var _scale3 = this.scale();

            var xScale = _scale3.xScale;
            var yScale = _scale3.yScale;

            var _getOffsetMousePosition3 = this.getOffsetMousePosition(e);

            var x = _getOffsetMousePosition3.x;
            var y = _getOffsetMousePosition3.y;

            this.props.onPositionSelected(xScale.invert(x), yScale.invert(y));
        }
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(null);
        }
    },

    /**
     * Get the event mouse position relative to the event rect
     */
    getOffsetMousePosition: function getOffsetMousePosition(e) {
        var trackerRect = _react2["default"].findDOMNode(this.refs.map);
        var offset = getElementOffset(trackerRect);
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        return { x: Math.round(x), y: Math.round(y) };
    },

    scale: function scale() {
        return {
            xScale: _d32["default"].scale.linear().domain([this.props.bounds.x1, this.props.bounds.x2]).range([this.props.margin, this.props.width - this.props.margin * 2]),
            yScale: _d32["default"].scale.linear().domain([this.props.bounds.y1, this.props.bounds.y2]).range([this.props.margin, this.props.height - this.props.margin * 2])
        };
    },

    render: function render() {
        var _this = this;

        var _scale4 = this.scale();

        var xScale = _scale4.xScale;
        var yScale = _scale4.yScale;

        var hasSelectedNode = this.props.selection.nodes.length;
        var hasSelectedEdge = this.props.selection.edges.length;

        //
        // Build a mapping of edge names to the edges themselves
        //

        var edgeMap = {};
        _underscore2["default"].each(this.props.topology.edges, function (edge) {
            edgeMap[edge.source + "--" + edge.target] = edge;
            edgeMap[edge.target + "--" + edge.source] = edge;
        });

        //
        // Build a list of nodes (each a Node) from our topology
        //

        var secondarySelectedNodes = [];
        _underscore2["default"].each(this.props.selection.edges, function (edgeName) {
            var edge = edgeMap[edgeName];
            if (edge) {
                secondarySelectedNodes.push(edge.source);
                secondarySelectedNodes.push(edge.target);
            }
        });

        var nodeCoordinates = {};
        var nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {
            var x = node.x;
            var y = node.y;
            var name = node.name;
            var id = node.id;
            var label = node.label;

            var props = _objectWithoutProperties(node, ["x", "y", "name", "id", "label"]);

            props.id = id || name;
            props.x = xScale(node.x);
            props.y = yScale(node.y);
            props.label = label || name;

            var nodeSelected = _underscore2["default"].contains(_this.props.selection.nodes, props.id);
            var edgeSelected = _underscore2["default"].contains(secondarySelectedNodes, node.name);
            props.selected = nodeSelected || edgeSelected;
            props.muted = hasSelectedNode && !props.selected || hasSelectedEdge && !props.selected;

            nodeCoordinates[node.name] = { x: props.x, y: props.y };

            return _react2["default"].createElement(_node2["default"], _extends({ key: props.id
            }, props, {
                onSelectionChange: function (type, i) {
                    return _this.handleSelectionChange(type, i);
                },
                onMouseDown: _this.handleNodeMouseDown,
                onMouseMove: function (type, i, xx, yy) {
                    return _this.props.onNodeMouseMove(i, xx, yy);
                },
                onMouseUp: function (type, i, e) {
                    return _this.props.onNodeMouseUp(i, e);
                } }));
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

        var nodePaths = {};
        _underscore2["default"].each(this.props.paths, function (path) {
            var pathName = path.name;
            var pathSteps = path.steps;
            for (var i = 0; i < pathSteps.length - 1; i++) {
                var node = pathSteps[i];
                var next = pathSteps[i + 1];

                var a = undefined;
                var z = undefined;

                // We store our target based on geography, west to east etc A->Z
                if (_underscore2["default"].has(nodeCoordinates, node) && _underscore2["default"].has(nodeCoordinates, next)) {
                    if (nodeCoordinates[node].x < nodeCoordinates[next].x || nodeCoordinates[node].y < nodeCoordinates[next].y) {
                        a = node;z = next;
                    } else {
                        a = next;z = node;
                    }

                    if (!_underscore2["default"].has(nodePaths, a)) {
                        nodePaths[a] = { targetMap: {} };
                    }

                    if (!_underscore2["default"].has(nodePaths[a].targetMap, z)) {
                        nodePaths[a].targetMap[z] = [];
                    }

                    nodePaths[a].targetMap[z].push(pathName);
                } else {
                    if (!_underscore2["default"].has(nodeCoordinates, node)) {
                        throw new Error("Missing node in path '" + pathName + "': " + node);
                    }
                    if (!_underscore2["default"].has(nodeCoordinates, next)) {
                        throw new Error("Missing node in path '" + pathName + "': " + next);
                    }
                }
            }
        });

        //
        // For drawing path bidirectional only, we build up a map first to
        // tell us which edges are touched by a path
        //

        var edgePathMap = {};
        _underscore2["default"].each(this.props.paths, function (path) {
            var pathSteps = path.steps;
            if (pathSteps.length > 1) {
                for (var i = 0; i < pathSteps.length - 1; i++) {
                    var source = pathSteps[i];
                    var destination = pathSteps[i + 1];
                    var sourceToDestinationName = source + "--" + destination;
                    var destinationToSourceName = destination + "--" + source;
                    edgePathMap[sourceToDestinationName] = path;
                    edgePathMap[destinationToSourceName] = path;
                }
            }
        });

        var edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var selected = _underscore2["default"].contains(_this.props.selection.edges, edge.name);

            if (!_underscore2["default"].has(nodeCoordinates, edge.source) || !_underscore2["default"].has(nodeCoordinates, edge.target)) {
                return;
            }

            // either 'simple' or 'bi-directional' edges.
            var edgeDrawingMethod = _this.props.edgeDrawingMethod;

            // either 'linear' or 'curved'
            var edgeShape = "linear";
            if (!_underscore2["default"].isUndefined(edge.shape) && !_underscore2["default"].isNull(edge.shape)) {
                edgeShape = edge.shape;
            }

            var curveDirection = "left";
            if (!_underscore2["default"].isUndefined(edge.curveDirection) && !_underscore2["default"].isNull(edge.curveDirection)) {
                curveDirection = edge.curveDirection;
            }

            var muted = hasSelectedEdge && !selected || hasSelectedNode;

            if (edgeDrawingMethod === "simple") {
                return _react2["default"].createElement(_edgeSimple2["default"], {
                    x1: nodeCoordinates[edge.source].x,
                    x2: nodeCoordinates[edge.target].x,
                    y1: nodeCoordinates[edge.source].y,
                    y2: nodeCoordinates[edge.target].y,
                    source: edge.source,
                    target: edge.target,
                    shape: edgeShape,
                    curveDirection: curveDirection,
                    color: edge.stroke,
                    width: edge.width,
                    classed: edge.classed,
                    key: edge.name,
                    name: edge.name,
                    selected: selected,
                    muted: muted,
                    onSelectionChange: _this.handleSelectionChange });
            } else if (edgeDrawingMethod === "bidirectionalArrow") {
                return _react2["default"].createElement(_edgeBidirectional2["default"], {
                    x1: nodeCoordinates[edge.source].x,
                    x2: nodeCoordinates[edge.target].x,
                    y1: nodeCoordinates[edge.source].y,
                    y2: nodeCoordinates[edge.target].y,
                    source: edge.source,
                    target: edge.target,
                    shape: edgeShape,
                    curveDirection: curveDirection,
                    offset: edge.offset,
                    sourceTargetColor: edge.sourceTargetColor,
                    targetSourceColor: edge.targetSourceColor,
                    width: edge.width,
                    classed: edge.classed,
                    key: edge.name,
                    name: edge.name,
                    selected: selected,
                    muted: muted,
                    onSelectionChange: _this.handleSelectionChange });
            } else if (edgeDrawingMethod === "pathBidirectionalArrow") {
                if (_underscore2["default"].has(edgePathMap, edge.name)) {
                    return _react2["default"].createElement(_edgeBidirectional2["default"], {
                        x1: nodeCoordinates[edge.source].x,
                        x2: nodeCoordinates[edge.target].x,
                        y1: nodeCoordinates[edge.source].y,
                        y2: nodeCoordinates[edge.target].y,
                        source: edge.source,
                        target: edge.target,
                        shape: edgeShape,
                        curveDirection: curveDirection,
                        sourceTargetColor: edge.sourceTargetColor,
                        targetSourceColor: edge.targetSourceColor,
                        width: edge.width,
                        classed: edge.classed,
                        key: edge.name,
                        name: edge.name,
                        selected: selected,
                        muted: muted,
                        onSelectionChange: _this.handleSelectionChange });
                } else {
                    return _react2["default"].createElement(_edgeSimple2["default"], {
                        x1: nodeCoordinates[edge.source].x,
                        x2: nodeCoordinates[edge.target].x,
                        y1: nodeCoordinates[edge.source].y,
                        y2: nodeCoordinates[edge.target].y,
                        source: edge.source,
                        target: edge.target,
                        shape: edgeShape,
                        curveDirection: curveDirection,
                        color: edge.stroke,
                        width: 1,
                        classed: edge.classed,
                        key: edge.name,
                        name: edge.name,
                        selected: selected,
                        muted: muted,
                        onSelectionChange: _this.handleSelectionChange });
                }
            }
        });

        //
        // Build the paths
        //

        var paths = _underscore2["default"].map(this.props.paths, function (path) {
            var pathName = path.name;
            var pathSteps = path.steps;
            var pathSegments = [];
            var pathColor = path.color || "steelblue";
            var pathWidth = path.width || 1;
            if (pathSteps.length > 1) {
                for (var i = 0; i < pathSteps.length - 1; i++) {
                    var a = undefined;
                    var z = undefined;
                    var dir = undefined;
                    var source = pathSteps[i];
                    var destination = pathSteps[i + 1];

                    // Get the position of path (if multiple paths run parallel)
                    if (nodeCoordinates[source].x < nodeCoordinates[destination].x || nodeCoordinates[source].y < nodeCoordinates[destination].y) {
                        a = source;z = destination;
                        dir = 1;
                    } else {
                        a = destination;z = source;
                        dir = -1;
                    }

                    var pathsToDest = nodePaths[a].targetMap[z];
                    var pathIndex = _underscore2["default"].indexOf(pathsToDest, pathName);
                    var pos = (pathIndex - (pathsToDest.length - 1) / 2) * dir;

                    // Get the edge from edgeMap
                    var edgeName = source + "--" + destination;
                    var edge = edgeMap[edgeName];

                    // Get the shape of the edge (linear or curved) and if
                    // curved, get the curve direction
                    var edgeShape = "linear";
                    if (edge && !_underscore2["default"].isUndefined(edge.shape) && !_underscore2["default"].isNull(edge.shape)) {
                        edgeShape = edge.shape;
                    }

                    // either 'left' or 'right'
                    var curveDirection = "left";
                    if (edge && !_underscore2["default"].isUndefined(edge.curveDirection) && !_underscore2["default"].isNull(edge.curveDirection)) {
                        curveDirection = edge.curveDirection;
                    }

                    //
                    // Construct this path segment as a simple (i.e. line only)
                    // path piece. The width of the path is currently a prop of
                    // the map, but it would be nice to expand this to
                    // optionally be a prop of that line segement
                    //

                    if (_this.props.edgeDrawingMethod === "simple") {
                        pathSegments.push(_react2["default"].createElement(_edgeSimple2["default"], {
                            x1: nodeCoordinates[source].x,
                            y1: nodeCoordinates[source].y,
                            x2: nodeCoordinates[destination].x,
                            y2: nodeCoordinates[destination].y,
                            position: pos * 6,
                            source: source,
                            color: pathColor,
                            target: destination,
                            shape: edgeShape,
                            curveDirection: curveDirection,
                            width: pathWidth,
                            classed: "path-" + pathName,
                            key: pathName + "--" + edgeName,
                            name: pathName + "--" + edgeName }));
                    }
                }
            }
            return _react2["default"].createElement(
                "g",
                { key: pathName },
                pathSegments
            );
        });

        //
        // Build the labels
        //

        var labels = _underscore2["default"].map(this.props.topology.labels, function (label) {
            var x = xScale(label.x);
            var y = yScale(label.y);
            return _react2["default"].createElement(_mapNodeLabel2["default"], {
                x: x,
                y: y,
                label: label.label,
                labelPosition: label.labelPosition,
                key: label.label });
        });

        //
        // Build the legend
        //

        var legend = null;
        if (!_underscore2["default"].isNull(this.props.legendItems)) {
            legend = _react2["default"].createElement(_mapLegend2["default"], {
                x: this.props.legendItems.x,
                y: this.props.legendItems.y,
                edgeTypes: this.props.legendItems.edgeTypes,
                nodeTypes: this.props.legendItems.nodeTypes,
                colorSwatches: this.props.legendItems.colorSwatches });
        }

        var style = undefined;
        if (this.state.dragging) {
            style = {
                cursor: "pointer"
            };
        } else if (this.props.onPositionSelected || this.props.onNodeSelected || this.props.onEdgeSelected) {
            style = {
                cursor: "crosshair"
            };
        } else {
            style = {
                cursor: "default"
            };
        }

        return _react2["default"].createElement(
            "svg",
            {
                style: style,
                ref: "map",
                width: this.props.width,
                height: this.props.height,
                className: "noselect map-container",
                onClick: this.handleClick,
                onMouseMove: this.handleMouseMove,
                onMouseUp: this.handleMouseUp },
            _react2["default"].createElement(
                "g",
                null,
                edges,
                paths,
                nodes,
                labels,
                legend
            )
        );
    }
});
module.exports = exports["default"];