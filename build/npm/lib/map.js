"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3 = require("d3");

var _d32 = _interopRequireDefault(_d3);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

var _label = require("./label");

var _label2 = _interopRequireDefault(_label);

var _legend = require("./legend");

var _legend2 = _interopRequireDefault(_legend);

var _edgeSimple = require("./edge-simple");

var _edgeSimple2 = _interopRequireDefault(_edgeSimple);

var _edgeBidirectional = require("./edge-bidirectional");

var _edgeBidirectional2 = _interopRequireDefault(_edgeBidirectional);

require("./map.css");

/**
 *
 * Base level map
 *
 */
exports["default"] = _react2["default"].createClass({

    displayName: "BaseMap",

    getDefaultProps: function getDefaultProps() {
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

    render: function render() {
        var _this = this;

        var xScale = _d32["default"].scale.linear().range([this.props.margin, this.props.width - this.props.margin]);
        var yScale = _d32["default"].scale.linear().range([this.props.margin, this.props.height - this.props.margin]);
        var hasSelectedNode = this.props.selection.nodes.length;
        var hasSelectedEdge = this.props.selection.edges.length;

        //
        // Build a mapping of edge names to the edges themselves
        //

        var edgeMap = {};
        _underscore2["default"].each(this.props.topology.edges, function (edge) {
            edgeMap["" + edge.source + "--" + edge.target] = edge;
            edgeMap["" + edge.target + "--" + edge.source] = edge;
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

        // maps node name to scaled x and y position
        var nodeCoordinates = {};
        var nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {
            var x = xScale(node.x);
            var y = yScale(node.y);
            nodeCoordinates[node.name] = { x: x, y: y };

            var label = _underscore2["default"].isUndefined(node.label) ? node.name : node.label;
            var nodeSelected = _underscore2["default"].contains(_this.props.selection.nodes, node.name);
            var edgeSelected = _underscore2["default"].contains(secondarySelectedNodes, node.name);
            var selected = nodeSelected || edgeSelected;
            var muted = hasSelectedNode && !selected || hasSelectedEdge && !selected;

            return _react2["default"].createElement(_node2["default"], { x: x,
                y: y,
                name: node.name,
                key: node.name,
                style: node.style,
                labelStyle: node.labelStyle,
                type: node.type,
                labelPosition: node.labelPosition,
                label: label,
                radius: node.radius,
                classed: node.classed,
                shape: node.shape,
                selected: selected,
                muted: muted,
                onSelectionChange: _this.props.onSelectionChange });
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
        _underscore2["default"].each(this.props.paths, function (path) {
            var pathName = path.name;
            var pathSteps = path.steps;
            for (var i = 0; i < pathSteps.length - 1; i++) {
                var node = pathSteps[i];
                var next = pathSteps[i + 1];
                var a = undefined;
                var z = undefined;

                // We store our target based on geography, west to east etc A->Z
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
                    var sourceToDestinationName = "" + source + "--" + destination;
                    var destinationToSourceName = "" + destination + "--" + source;
                    edgePathMap[sourceToDestinationName] = path;
                    edgePathMap[destinationToSourceName] = path;
                }
            }
        });

        var edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var selected = _underscore2["default"].contains(_this.props.selection.edges, edge.name);

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
                return _react2["default"].createElement(_edgeSimple2["default"], { x1: nodeCoordinates[edge.source].x,
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
                    onSelectionChange: _this.props.onSelectionChange });
            } else if (edgeDrawingMethod === "bidirectionalArrow") {
                return _react2["default"].createElement(_edgeBidirectional2["default"], { x1: nodeCoordinates[edge.source].x,
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
                    onSelectionChange: _this.props.onSelectionChange });
            } else if (edgeDrawingMethod === "pathBidirectionalArrow") {
                if (_underscore2["default"].has(edgePathMap, edge.name)) {
                    return _react2["default"].createElement(_edgeBidirectional2["default"], { x1: nodeCoordinates[edge.source].x,
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
                        onSelectionChange: _this.props.onSelectionChange });
                } else {
                    return _react2["default"].createElement(_edgeSimple2["default"], { x1: nodeCoordinates[edge.source].x,
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
                        onSelectionChange: _this.props.onSelectionChange });
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
                    var edgeName = "" + source + "--" + destination;
                    var edge = edgeMap[edgeName];

                    // Get the shape of the edge (linear or curved) and if curved,
                    // get the curve direction
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
                    // Construct this path segment as a simple (i.e. line only) path piece
                    // The width of the path is currently a prop of the map, but it would
                    // be nice to expand this to optionally be a prop of that line segement
                    //

                    if (_this.props.edgeDrawingMethod === "simple") {
                        pathSegments.push(_react2["default"].createElement(_edgeSimple2["default"], { x1: nodeCoordinates[source].x,
                            y1: nodeCoordinates[source].y,
                            x2: nodeCoordinates[destination].x,
                            y2: nodeCoordinates[destination].y,
                            position: pos * 6,
                            source: source,
                            target: destination,
                            shape: edgeShape,
                            curveDirection: curveDirection,
                            width: _this.props.pathWidth,
                            classed: "path-" + pathName,
                            key: "" + pathName + "--" + edgeName,
                            name: "" + pathName + "--" + edgeName }));
                    }
                }
            }
            return _react2["default"].createElement(
                "g",
                null,
                pathSegments
            );
        });

        //
        // Build the labels
        //

        var labels = _underscore2["default"].map(this.props.topology.labels, function (label) {
            var x = xScale(label.x);
            var y = yScale(label.y);
            return _react2["default"].createElement(_label2["default"], { x: x,
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
            legend = _react2["default"].createElement(_legend2["default"], { x: this.props.legendItems.x,
                y: this.props.legendItems.y,
                edgeTypes: this.props.legendItems.edgeTypes,
                nodeTypes: this.props.legendItems.nodeTypes,
                colorSwatches: this.props.legendItems.colorSwatches });
        }

        return _react2["default"].createElement(
            "svg",
            { width: this.props.width,
                height: this.props.height,
                className: "map-container",
                onClick: this._click },
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
    },

    _click: function _click() {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(null);
        }
    }
});
module.exports = exports["default"];