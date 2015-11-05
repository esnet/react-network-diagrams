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
    displayName: "map-editor",

    getDefaultProps: function getDefaultProps() {
        return {
            edgeThinknessMap: {
                "100G": 5,
                "10G": 3,
                "1G": 1.5,
                subG: 1
            },
            selected: false
        };
    },

    _nodeSize: function _nodeSize() {
        return 7;
    },

    _nodeShape: function _nodeShape() {
        return "circle";
    },

    _edgeThickness: function _edgeThickness() {
        return 5;
    },

    _edgeShape: function _edgeShape() {
        return "linear";
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

    _edgeCurveOffset: function _edgeCurveOffset() {
        return 10;
    },

    _selectEdgeColor: function _selectEdgeColor() {
        return "#C9CACC";
    },

    _bounds: function _bounds() {
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
        console.log("maxY", maxY, "minY", minY);
        return { x1: minX, x2: maxX, y1: minY, y2: maxY };
    },

    _buildTopology: function _buildTopology() {
        var _this = this;

        var topology = {};

        if (_underscore2["default"].isNull(this.props.topology)) {
            return null;
        }

        // Create a node list
        topology.nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {

            // Radius is based on the type of node, given in the nodeSizeMap
            node.radius = _this._nodeSize(node.type);

            node.labelPosition = node.label_position;
            node.style = {
                normal: { fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer" },
                selected: {
                    fill: "#37B6D3",
                    stroke: "rgba(55, 182, 211, 0.22)",
                    strokeWidth: 10, cursor: "pointer"
                },
                muted: {
                    fill: "#CBCBCB",
                    stroke: "#BEBEBE",
                    opacity: 0.6,
                    cursor: "pointer"
                }
            };
            node.labelStyle = {
                normal: { fill: "#696969", stroke: "none", fontSize: 9 },
                selected: { fill: "#333", stroke: "none", fontSize: 11 },
                muted: { fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6 }
            };

            node.shape = _this._nodeShape(node.name);

            return node;
        });

        // Create the tologogy list
        topology.edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var edgeName = edge.source + "--" + edge.target;
            return {
                width: _this._edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                name: edgeName,
                shape: _this._edgeShape(edgeName),
                curveDirection: _this._edgeCurveDirection(edgeName),
                offset: _this._edgeCurveOffset(edgeName)
            };
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    render: function render() {
        var topo = this._buildTopology();
        var bounds = this._bounds();
        return _react2["default"].createElement(_mapBase2["default"], {
            topology: topo,
            width: this.props.width,
            height: this.props.height,
            margin: this.props.margin,
            bounds: bounds,
            selection: this.props.selection,
            edgeDrawingMethod: "simple",
            onSelectionChange: this.props.onSelectionChange,
            onPositionSelected: this.props.onPositionSelected,
            onNodeDrag: this.props.onNodeDrag });
    }
});
module.exports = exports["default"];