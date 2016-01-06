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

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _mapBase = require("./map-base");

var _mapBase2 = _interopRequireDefault(_mapBase);

var _resizable = require("./resizable");

var _resizable2 = _interopRequireDefault(_resizable);

/**
 * A high level component for showing network topology, including visualizing
 * network traffic as a heat map.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "traffic-map",

    getDefaultProps: function getDefaultProps() {
        return {
            edgeThinknessMap: {
                "100G": 5,
                "10G": 3,
                "1G": 1.5,
                subG: 1
            },
            edgeColorMap: [],
            nodeSizeMap: {},
            nodeShapeMap: {},
            edgeShapeMap: {},
            selected: false,
            shape: "circle",
            stylesMap: {},
            showPaths: false
        };
    },

    propTypes: {

        /** The width of the circuit diagram */
        width: _react2["default"].PropTypes.number,

        /**
         * The topology structure, as detailed above. This contains the
         * descriptions of nodes, edges and paths used to render the topology
         */
        topology: _react2["default"].PropTypes.object,

        /**
         * Specified as an object containing x1, y1 and x2, y2. This is the region
         * to display on the map. If this isn't specified the bounds will be
         * calculated from the nodes in the Map.
         */
        bounds: _react2["default"].PropTypes.shape({
            x1: _react2["default"].PropTypes.number,
            y1: _react2["default"].PropTypes.number,
            x2: _react2["default"].PropTypes.number,
            y2: _react2["default"].PropTypes.number
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
        edgeDrawingMethod: _react2["default"].PropTypes.oneOf(["simple", "bidirectional", "pathBidirectionalArrow"]),

        /**
         * Either a boolean or a list of path names. If a bool, and true, then all
         * paths will be shown. If a list then only the paths in that list will be
         * shown. The default is to show no paths.
         */
        showPaths: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string)]),

        /**
         * A mapping of the capacity field within the tologogy edge object
         * to a line thickness for rendering the edges.
         *
         * Example:
         *
         * ```
         * const edgeThinknessMap = {
         *     "100G": 5,
         *     "10G": 3,
         *     "1G": 1.5,
         *     "subG": 1
         * };
         * ```
         */
        edgeThinknessMap: _react2["default"].PropTypes.object,

        /**
         * A mapping of the edge name (which is source + "--" + target) to a
         * dict of edge shape options:
         *  * `shape` (either "linear" or "curved")
         *  * `direction` (if shape is curved, either "left" or "right")
         *  * `offset` (if shape is curved, the amount of curve, which is
         *  pixel offset from a straight line between the source and target at the midpoint)
         *
         * Example:
         * ```
         * const edgeShapeMap = {
         *     ALBQ--DENV: {
         *         shape: "curved",
         *         direction: "right",
         *         offset: 15
         *     }, ...
         *  }
         */
        edgeColorMap: _react2["default"].PropTypes.array,

        /**
         * A mapping from the type field in the node object to a size to draw the shape
         *
         * Example:
         * ```
         * const nodeSizeMap = {
         *     hub: 5.5,
         *     esnet_site: 7
         * };
         * ```
         */
        nodeSizeMap: _react2["default"].PropTypes.object,

        /**
         * Mapping of node name to shape (default is "circle", other options are
         * "cloud" or "square", currently).
         *
         * Example:
         * ```
         * const nodeShapeMap = {
         *     DENV: "square"
         * };
         * ```
         */
        nodeShapeMap: _react2["default"].PropTypes.object,

        /**
         * A mapping of the edge name (which is source + "--" + target) to a
         * dict of edge shape options:
         *  * `shape` (either "linear" or "curved")
         *  * `direction` (if shape is curved, either "left" or "right")
         *  * `offset` (if shape is curved, the amount of curve, which is
         *  pixel offset from a straight line between the source and target at the midpoint)
         *
         * Example:
         * ```
         * const edgeShapeMap = {
         *     "ALBQ--DENV": {
         *     "shape": "curved",
         *     "direction": "right",
         *     "offset": 15
         * }
         * ```
         */
        edgeShapeMap: _react2["default"].PropTypes.object
    },

    bounds: function bounds() {
        if (this.props.bounds) {
            return this.props.bounds;
        }
        var minX = _underscore2["default"].min(this.props.topology.nodes, function (node) {
            return node.x;
        }).x;
        var minY = _underscore2["default"].min(this.props.topology.nodes, function (node) {
            return node.y;
        }).y;
        var maxX = _underscore2["default"].max(this.props.topology.nodes, function (node) {
            return node.x;
        }).x;
        var maxY = _underscore2["default"].max(this.props.topology.nodes, function (node) {
            return node.y;
        }).y;
        return { x1: minX, x2: maxX, y1: minY, y2: maxY };
    },

    nodeSize: function nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
    },

    nodeShape: function nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
    },

    edgeThickness: function edgeThickness(capacity) {
        return this.props.edgeThinknessMap[capacity] || 5;
    },

    edgeShape: function edgeShape(name) {
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            return this.props.edgeShapeMap[name].shape;
        } else {
            return "linear";
        }
    },

    edgeCurveDirection: function edgeCurveDirection(name) {
        var direction = undefined;
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].direction;
            }
        }
        return direction;
    },

    edgeCurveOffset: function edgeCurveOffset(name) {
        var offset = undefined;
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].offset;
            }
        }
        return offset;
    },

    selectEdgeColor: function selectEdgeColor(bps) {
        var gbps = bps / 1.0e9;
        for (var i = 0; i < this.props.edgeColorMap.length; i++) {
            var row = this.props.edgeColorMap[i];
            if (gbps >= row.range[0]) {
                return row.color;
            }
        }
        return "#C9CACC";
    },

    filteredPaths: function filteredPaths() {
        var _this = this;

        return _underscore2["default"].filter(this.props.topology.paths, function (path) {
            if (_underscore2["default"].isArray(_this.props.showPaths)) {
                return _underscore2["default"].contains(_this.props.showPaths, path.name);
            }
            return true;
        });
    },

    buildTopology: function buildTopology() {
        var _this2 = this;

        var topology = {};

        if (_underscore2["default"].isNull(this.props.topology)) {
            return null;
        }

        var genericStyle = {
            node: {
                normal: { fill: "#B0B0B0", stroke: "#9E9E9E", cursor: "pointer" },
                selected: { fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                    strokeWidth: 10, cursor: "pointer" },
                muted: { fill: "#B0B0B0", stroke: "#9E9E9E", opacity: 0.6,
                    cursor: "pointer" }
            },
            label: {
                normal: { fill: "#696969", stroke: "none", fontSize: 9 },
                selected: { fill: "#333", stroke: "none", fontSize: 11 },
                muted: { fill: "#696969", stroke: "none", fontSize: 8,
                    opacity: 0.6 }
            }
        };

        // Create a node list
        topology.nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {
            var n = _underscore2["default"].clone(node);

            // Radius is based on the type of node, given in the nodeSizeMap
            n.radius = _this2.nodeSize(node.type);
            n.labelPosition = node.label_position;
            n.labelOffsetX = node.label_dx;
            n.labelOffsetY = node.label_dy;

            var styleMap = _underscore2["default"].has(_this2.props.stylesMap, node.type) ? _this2.props.stylesMap[node.type] : genericStyle;
            n.style = styleMap.node;
            n.labelStyle = styleMap.label;

            n.shape = _this2.nodeShape(node.name);
            return n;
        });

        // Create the edge list
        topology.edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var edgeName = edge.source + "--" + edge.target;
            return {
                width: _this2.edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                totalCapacity: edge.total_capacity,
                ifaces: edge.ifaces,
                name: edgeName,
                shape: _this2.edgeShape(edgeName),
                curveDirection: _this2.edgeCurveDirection(edgeName),
                offset: _this2.edgeCurveOffset(edgeName)
            };
        });

        // Create the path list, filtering based on what is in showPaths
        if (this.props.showPaths) {
            topology.paths = _underscore2["default"].map(this.filteredPaths(), function (path) {
                var color = _underscore2["default"].has(_this2.props.pathColorMap, path.name) ? _this2.props.pathColorMap[path.name] : "lightsteelblue";
                var width = _underscore2["default"].has(_this2.props.pathWidthMap, path.name) ? _this2.props.pathWidthMap[path.name] : 4;
                return {
                    name: path.name,
                    steps: path.steps,
                    color: color,
                    width: width
                };
            });
        }

        // Colorize the topology
        if (this.props.traffic) {
            if (!this.props.showPaths && this.props.edgeDrawingMethod === "bidirectionalArrow") {
                _underscore2["default"].each(topology.edges, function (edge) {
                    var sourceTargetName = edge.source + "--" + edge.target;
                    var targetSourceName = edge.target + "--" + edge.source;
                    var sourceTargetTraffic = _this2.props.traffic.get(sourceTargetName);
                    var targetSourceTraffic = _this2.props.traffic.get(targetSourceName);
                    edge.sourceTargetColor = _this2.selectEdgeColor(sourceTargetTraffic);
                    edge.targetSourceColor = _this2.selectEdgeColor(targetSourceTraffic);
                });
            } else {
                (function () {
                    var edgeMap = {};
                    _underscore2["default"].each(_this2.filteredPaths(), function (path) {

                        var pathAtoZTraffic = _this2.props.traffic.get(path.name + "--AtoZ");
                        var pathZtoATraffic = _this2.props.traffic.get(path.name + "--ZtoA");

                        var prev = null;
                        _underscore2["default"].each(path.steps, function (step) {
                            if (prev) {
                                var sourceTargetName = prev + "--" + step;
                                if (!_underscore2["default"].has(edgeMap, sourceTargetName)) {
                                    edgeMap[sourceTargetName] = 0;
                                }
                                edgeMap[sourceTargetName] += pathAtoZTraffic;

                                var targetSourceName = step + "--" + prev;
                                if (!_underscore2["default"].has(edgeMap, targetSourceName)) {
                                    edgeMap[targetSourceName] = 0;
                                }
                                edgeMap[targetSourceName] += pathZtoATraffic;
                            }
                            prev = step;
                        });
                    });
                    _underscore2["default"].each(topology.edges, function (edge) {
                        var sourceTargetName = edge.source + "--" + edge.target;
                        var targetSourceName = edge.target + "--" + edge.source;
                        if (_underscore2["default"].has(edgeMap, sourceTargetName)) {
                            var sourceTargetTraffic = edgeMap[sourceTargetName];
                            edge.sourceTargetColor = _this2.selectEdgeColor(sourceTargetTraffic);
                        }
                        if (_underscore2["default"].has(edgeMap, targetSourceName)) {
                            var targetSourceTraffic = edgeMap[targetSourceName];
                            edge.targetSourceColor = _this2.selectEdgeColor(targetSourceTraffic);
                        }
                    });
                })();
            }
        }

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    handleSelectionChanged: function handleSelectionChanged(selectionType, selection) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectionType, selection);
        }
    },

    render: function render() {
        var topo = this.buildTopology();
        var bounds = this.bounds();
        var aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);
        return _react2["default"].createElement(
            _resizable2["default"],
            { aspect: aspect, style: {
                    background: "#F6F6F6",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "#E6E6E6" } },
            _react2["default"].createElement(_mapBase2["default"], {
                topology: topo,
                paths: topo.paths,
                bounds: bounds,
                width: this.props.width,
                height: this.props.height,
                margin: this.props.margin,
                selection: this.props.selection,
                edgeDrawingMethod: this.props.edgeDrawingMethod,
                onSelectionChange: this.handleSelectionChanged })
        );
    }
});
module.exports = exports["default"];