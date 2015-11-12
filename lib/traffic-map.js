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

/**
 * Props:
 *
 * topology:
 *     Pass in the topology structure.
 *         Nodes:
 *             - type
 *         Edges:
 *             - source (refers to node name)
 *             - target (refers to node name)
 *             - capacity (string)
 *             - total_capacity (string)
 *         Paths:
 *             - name
 *             - steps
 *  showPaths:
 *      Maybe a boolean to show all paths, or none. Or it maybe an array
 *      of path names to show a selection of paths
 *
 *  nodeSizeMap:
 *      A mapping from the node type field to a size to draw the shape
 *
 *  edgeThinknessMap:
 *      "capacity" within the tologogy edges is a string, such as "100G".
 *      You can pass in an edgeThinknessMap that is used to look up the
 *      capacity as a line thickness for rendering the edges.
 *
 *  edgeShapeMap:
 *      A mapping of the edge name (which is source + "--" + target) to a
 *      dict of edge shape
 *      options.
 *          - shape (either "linear" or "curved")
 *          - direction (if curved, either "left" or "right")
 *          - offset (if curved, the amount of curve, which is pixel offset
 *            from a straight line between the source and target at the
 *            midpoint)
 *      e.g.
 *          {
 *            "AMST--BOST": {
 *              "shape": "curved",
 *              "direction": "right",
 *              "offset": 15
 *          }
 *
 *  callbacks:
 *
 *  handleSelectionChange(selectionType, selection):
 *      will be called when the use selects an object in the map, be it a node
 *      or a link
 *
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

    _nodeSize: function _nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
    },

    _nodeShape: function _nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
    },

    _edgeThickness: function _edgeThickness(capacity) {
        return this.props.edgeThinknessMap[capacity] || 5;
    },

    _edgeShape: function _edgeShape(name) {
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            return this.props.edgeShapeMap[name].shape;
        } else {
            return "linear";
        }
    },

    _edgeCurveDirection: function _edgeCurveDirection(name) {
        var direction = undefined;
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].direction;
            }
        }
        return direction;
    },

    _edgeCurveOffset: function _edgeCurveOffset(name) {
        var offset = undefined;
        if (_underscore2["default"].has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].offset;
            }
        }
        return offset;
    },

    _selectEdgeColor: function _selectEdgeColor(bps) {
        var gbps = bps / 1.0e9;
        for (var i = 0; i < this.props.edgeColorMap.length; i++) {
            var row = this.props.edgeColorMap[i];
            if (gbps >= row.range[0]) {
                return row.color;
            }
        }
        return "#C9CACC";
    },

    _filteredPaths: function _filteredPaths() {
        var _this = this;

        return _underscore2["default"].filter(this.props.topology.paths, function (path) {
            if (_underscore2["default"].isArray(_this.props.showPaths)) {
                return _underscore2["default"].contains(_this.props.showPaths, path.name);
            }
            return true;
        });
    },

    _normalizedTopology: function _normalizedTopology() {
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

        // Extents of the raw topology for scaling into width
        // and height of the map
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
        maxX -= minX;
        maxY -= minY;

        // Create a node list
        topology.nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {
            // Scale the node positions onto a normalized 0 to 1 scale
            node.x = (node.x - minX) / maxX;
            node.y = (node.y - minY) / maxY;

            // Radius is based on the type of node, given in the nodeSizeMap
            node.radius = _this2._nodeSize(node.type);

            node.labelPosition = node.label_position;
            node.labelOffsetX = node.label_dx;
            node.labelOffsetY = node.label_dy;
            var styleMap = _underscore2["default"].has(_this2.props.stylesMap, node.type) ? _this2.props.stylesMap[node.type] : genericStyle;
            node.style = styleMap.node;
            node.labelStyle = styleMap.label;

            node.shape = _this2._nodeShape(node.name);
            return node;
        });

        // Create the edge list
        topology.edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var edgeName = edge.source + "--" + edge.target;
            return {
                width: _this2._edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                totalCapacity: edge.total_capacity,
                ifaces: edge.ifaces,
                name: edgeName,
                shape: _this2._edgeShape(edgeName),
                curveDirection: _this2._edgeCurveDirection(edgeName),
                offset: _this2._edgeCurveOffset(edgeName)
            };
        });

        // Create the path list, filtering based on what is in showPaths
        if (this.props.showPaths) {
            topology.paths = _underscore2["default"].map(this._filteredPaths(), function (path) {
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
                    edge.sourceTargetColor = _this2._selectEdgeColor(sourceTargetTraffic);
                    edge.targetSourceColor = _this2._selectEdgeColor(targetSourceTraffic);
                });
            } else {
                (function () {
                    var edgeMap = {};
                    _underscore2["default"].each(_this2._filteredPaths(), function (path) {

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
                            edge.sourceTargetColor = _this2._selectEdgeColor(sourceTargetTraffic);
                        }
                        if (_underscore2["default"].has(edgeMap, targetSourceName)) {
                            var targetSourceTraffic = edgeMap[targetSourceName];
                            edge.targetSourceColor = _this2._selectEdgeColor(targetSourceTraffic);
                        }
                    });
                })();
            }
        }

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    _handleSelectionChanged: function _handleSelectionChanged(selectionType, selection) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectionType, selection);
        }
    },

    render: function render() {
        var topo = this._normalizedTopology();
        return _react2["default"].createElement(_mapBase2["default"], {
            topology: topo,
            paths: topo.paths,
            width: this.props.width,
            height: this.props.height,
            margin: this.props.margin,
            selection: this.props.selection,
            edgeDrawingMethod: this.props.edgeDrawingMethod,
            onSelectionChange: this._handleSelectionChanged });
    }
});
module.exports = exports["default"];