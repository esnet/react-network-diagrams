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

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _resizable = require("./resizable");

var _resizable2 = _interopRequireDefault(_resizable);

var _mapBase = require("./map-base");

var _mapBase2 = _interopRequireDefault(_mapBase);

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

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

var counter = 1;

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
            selected: false,
            edgeColorMap: [],
            nodeSizeMap: {},
            nodeShapeMap: {},
            edgeShapeMap: {},
            stylesMap: {},
            gridSize: 0.25
        };
    },

    getInitialState: function getInitialState() {
        return {
            pendingAction: null,
            selectionType: null,
            selection: null
        };
    },

    constrain: function constrain(x, y) {
        var gridSize = this.props.gridSize;
        return {
            x: parseInt(parseInt(x / gridSize, 10) * gridSize, 10),
            y: parseInt(parseInt(y / gridSize, 10) * gridSize, 10)
        };
    },

    /**
     * When we create new elements we give it a id
     */
    makeId: function makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === "x" ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    },

    findNode: function findNode(id) {
        var result = undefined;
        _underscore2["default"].each(this.props.topology.nodes, function (node) {
            if (node.id === id) {
                result = node;
            }
        });
        return result;
    },

    findEdge: function findEdge(id) {
        var result = undefined;
        _underscore2["default"].each(this.props.topology.edges, function (edge) {
            if (edge.source + "--" + edge.target === id) {
                result = edge;
            }
        });
        return result;
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

    cloneTopo: function cloneTopo() {
        var topo = {
            name: this.props.topology.name,
            description: this.props.topology.description,
            nodes: _underscore2["default"].map(this.props.topology.nodes, function (n) {
                return _underscore2["default"].clone(n);
            }),
            edges: _underscore2["default"].map(this.props.topology.edges, function (e) {
                return _underscore2["default"].clone(e);
            })
        };
        return topo;
    },

    /**
     * Build a topology suitable for passing into the BaseMap for rendering
     * as nodes and edges
     */
    buildTopology: function buildTopology() {
        var _this = this;

        var topology = {};

        if (_underscore2["default"].isNull(this.props.topology)) {
            return null;
        }

        // Create a node list
        topology.nodes = _underscore2["default"].map(this.props.topology.nodes, function (node) {
            var n = _underscore2["default"].clone(node);

            // Radius is based on the type of node, given in the nodeSizeMap
            n.radius = _this.nodeSize(node.type);
            n.labelPosition = node.label_position;
            n.labelOffsetX = node.label_dx;
            n.labelOffsetY = node.label_dy;

            n.style = {
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

            n.labelStyle = {
                normal: { fill: "#696969", stroke: "none", fontSize: 9 },
                selected: { fill: "#333", stroke: "none", fontSize: 11 },
                muted: { fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6 }
            };

            n.shape = _this.nodeShape(node.name);

            return n;
        });

        // Create the tologogy list
        topology.edges = _underscore2["default"].map(this.props.topology.edges, function (edge) {
            var edgeName = edge.source + "--" + edge.target;
            return {
                width: _this.edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                name: edgeName,
                shape: _this.edgeShape(edgeName),
                curveDirection: _this.edgeCurveDirection(edgeName),
                offset: _this.edgeCurveOffset(edgeName)
            };
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    handleSelectionChanged: function handleSelectionChanged(selectionType, selectionId) {
        var selection = undefined;
        if (selectionType === "node") {
            selection = this.findNode(selectionId);
        } else if (selectionType === "edge") {
            selection = this.findEdge(selectionId);
        }
        this.setState({
            selectionType: selectionType,
            selection: selection
        });
    },

    handleChange: function handleChange(attr, value) {
        var selected = this.state.selection;
        selected[attr] = value;

        this.setState({
            selection: selected
        });
    },

    handleNodeDrag: function handleNodeDrag(id, posx, posy) {
        var topo = this.cloneTopo();

        var _constrain = this.constrain(posx, posy);

        var x = _constrain.x;
        var y = _constrain.y;

        _underscore2["default"].each(topo.nodes, function (node) {
            if (node.id === id) {
                node.x = x;
                node.y = y;
            }
        });

        if (this.props.onTopologyChange) {
            this.props.onTopologyChange(topo);
        }
    },

    handleAddNode: function handleAddNode() {
        this.setState({ pendingAction: {
                action: "add-node",
                instructions: "Pick a point (x,y)"
            } });
    },

    /**
     * TODO: actual handling of the add node should be done at
     * the application level (action) rather than down here in the editor.
     */
    handleAddNodePosition: function handleAddNodePosition(posx, posy) {
        var topo = this.cloneTopo();

        var _constrain2 = this.constrain(posx, posy);

        var x = _constrain2.x;
        var y = _constrain2.y;

        var n = {
            id: this.makeId(),
            label_dx: null,
            label_dy: null,
            label_position: "top",
            name: "untitled" + counter++,
            type: "node",
            x: x,
            y: y
        };

        topo.nodes.push(n);

        if (this.props.onTopologyChange) {
            this.props.onTopologyChange(topo);
        }

        this.setState({
            pendingAction: null,
            selectionType: "node",
            selection: n
        });
    },

    handleAddEdge: function handleAddEdge() {
        this.setState({ pendingAction: {
                action: "add-edge",
                instructions: "Pick source node",
                nodes: []
            } });
    },

    handleAddSelection: function handleAddSelection(node) {
        var action = this.state.pendingAction;
        if (action.action === "add-edge") {
            action.nodes.push(node);
        }
        if (action.nodes.length === 1) {
            this.setState({ pendingAction: {
                    action: "add-edge",
                    instructions: "Pick target node",
                    nodes: action.nodes
                } });
        }
        if (action.nodes.length === 2) {
            // Action complete
            var topo = this.cloneTopo();
            var e = {
                source: this.findNode(action.nodes[0]).name,
                target: this.findNode(action.nodes[1]).name,
                capacity: ""
            };
            topo.edges.push(e);

            if (this.props.onTopologyChange) {
                this.props.onTopologyChange(topo);
            }

            this.setState({ pendingAction: null });
        }
    },

    renderTextProperty: function renderTextProperty(attr, value) {
        var _this2 = this;

        return _react2["default"].createElement("input", {
            defaultValue: value,
            width: "100%",
            type: "text",
            className: "form-control input-sm",
            onBlur: function (e) {
                return _this2.handleChange(attr, e.target.value);
            } });
    },

    renderIntegerProperty: function renderIntegerProperty(attr, value) {
        var _this3 = this;

        var v = value || 0;
        return _react2["default"].createElement("input", {
            defaultValue: v,
            width: "100%",
            type: "text",
            className: "form-control input-sm",
            onBlur: function (e) {
                return _this3.handleChange(attr, parseInt(e.target.value, 10));
            } });
    },

    renderChoiceProperty: function renderChoiceProperty(attr, options, value) {
        var _this4 = this;

        return _react2["default"].createElement(_reactSelect2["default"], {
            value: value,
            searchable: false,
            clearable: false,
            options: options,
            onChange: function (val) {
                return _this4.handleChange(attr, val);
            } });
    },

    renderNodeProperties: function renderNodeProperties() {
        var _this5 = this;

        var selected = this.state.selection;

        var nodeSpec = _node2["default"].spec();
        nodeSpec.unshift({
            attr: "type",
            label: "Type",
            type: "choice",
            options: _underscore2["default"].map(this.props.stylesMap, function (s, type) {
                return { value: type, label: type };
            })
        });

        var propertyElements = undefined;
        if (this.state.selectionType === "node") {
            propertyElements = _underscore2["default"].map(nodeSpec, function (property) {
                var v = selected[property.attr];
                var editorElement = undefined;
                switch (property.type) {
                    case "text":
                        editorElement = _this5.renderTextProperty(property.attr, v);
                        break;
                    case "integer":
                        editorElement = _this5.renderIntegerProperty(property.attr, v);
                        break;
                    case "choice":
                        editorElement = _this5.renderChoiceProperty(property.attr, property.options, v);
                        break;
                }
                return _react2["default"].createElement(
                    "tr",
                    { height: "35px", key: property.attr },
                    _react2["default"].createElement(
                        "td",
                        { width: "100px" },
                        _react2["default"].createElement(
                            "label",
                            { width: 100 },
                            property.label
                        )
                    ),
                    _react2["default"].createElement(
                        "td",
                        null,
                        editorElement
                    )
                );
            });
        }

        return _react2["default"].createElement(
            "table",
            { width: "100%" },
            _react2["default"].createElement(
                "tbody",
                null,
                propertyElements
            )
        );
    },

    renderEdgeProperties: function renderEdgeProperties() {
        var _this6 = this;

        var selected = this.state.selection;
        var edgeSpec = [{
            attr: "capacity",
            label: "Capacity",
            type: "choice",
            options: _underscore2["default"].map(this.props.edgeThicknessMap, function (e, k) {
                return { value: k, label: k };
            })
        }];

        var propertyElements = undefined;
        if (this.state.selectionType === "edge") {
            propertyElements = _underscore2["default"].map(edgeSpec, function (property) {
                var v = selected[property.attr];
                var editorElement = undefined;
                switch (property.type) {
                    case "text":
                        editorElement = _this6.renderTextProperty(property.attr, v);
                        break;
                    case "integer":
                        editorElement = _this6.renderIntegerProperty(property.attr, v);
                        break;
                    case "choice":
                        editorElement = _this6.renderChoiceProperty(property.attr, property.options, v);
                        break;
                }
                return _react2["default"].createElement(
                    "tr",
                    { height: "35px", key: property.attr },
                    _react2["default"].createElement(
                        "td",
                        { width: "100px" },
                        _react2["default"].createElement(
                            "label",
                            { width: 100 },
                            property.label
                        )
                    ),
                    _react2["default"].createElement(
                        "td",
                        null,
                        editorElement
                    )
                );
            });
        }

        return _react2["default"].createElement(
            "table",
            { width: "100%" },
            _react2["default"].createElement(
                "tbody",
                null,
                propertyElements
            )
        );
    },

    renderProperties: function renderProperties() {
        var headerStyle = {
            padding: 15,
            background: "#F6F6F6",
            borderLeftStyle: "solid",
            borderLeftColor: "#37B6D3"
        };

        if (this.state.selection) {
            if (this.state.selectionType === "node") {
                return _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                        "div",
                        { style: headerStyle },
                        this.state.selection.name
                    ),
                    _react2["default"].createElement("p", null),
                    _react2["default"].createElement(
                        "div",
                        null,
                        this.renderNodeProperties()
                    )
                );
            } else {
                var edge = this.state.selection;
                var title = edge.source + " to " + edge.target;
                return _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                        "div",
                        { style: headerStyle },
                        title
                    ),
                    _react2["default"].createElement("p", null),
                    _react2["default"].createElement(
                        "div",
                        null,
                        this.renderEdgeProperties()
                    )
                );
            }
        } else {
            return _react2["default"].createElement(
                "span",
                null,
                "Nothing selected"
            );
        }
    },

    renderToolbar: function renderToolbar() {
        var toolbarStyle = {
            padding: 5,
            borderBottomStyle: "solid",
            borderWidth: "thin",
            borderColor: "#CBCBCB"
        };

        // Highlight buttons when action is in progress
        var addNodeStyle = { color: "grey" };
        var addEdgeStyle = { color: "grey", marginLeft: 10 };
        if (this.state.pendingAction) {
            if (this.state.pendingAction.action === "add-node") {
                addNodeStyle = { color: "steelblue" };
            }
            if (this.state.pendingAction.action === "add-edge") {
                addEdgeStyle = { color: "steelblue", marginLeft: 10 };
            }
        }

        return _react2["default"].createElement(
            "div",
            { style: toolbarStyle },
            _react2["default"].createElement(
                "button",
                {
                    type: "button",
                    style: addNodeStyle,
                    className: "btn btn-default btn-xs",
                    onClick: this.handleAddNode },
                _react2["default"].createElement("span", {
                    className: "glyphicon glyphicon-plus",
                    "aria-hidden": "true" }),
                " Node"
            ),
            _react2["default"].createElement(
                "button",
                {
                    type: "button",
                    style: addEdgeStyle,
                    className: "btn btn-default btn-xs",
                    onClick: this.handleAddEdge },
                _react2["default"].createElement("span", {
                    className: "glyphicon glyphicon-plus",
                    "aria-hidden": "true" }),
                " Edge"
            ),
            _react2["default"].createElement(
                "span",
                { style: { color: "steelblue", marginLeft: 10 } },
                this.state.pendingAction ? this.state.pendingAction.instructions : null
            )
        );
    },

    renderMap: function renderMap() {
        var topo = this.buildTopology();
        var bounds = this.bounds();
        var aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);

        var positionSelected = undefined;
        var nodeSelected = undefined;

        if (this.state.pendingAction) {
            if (this.state.pendingAction.action === "add-node") {
                positionSelected = this.handleAddNodePosition;
            }
            if (this.state.pendingAction.action === "add-edge") {
                nodeSelected = this.handleAddSelection;
            }
        }

        var mapSelection = {
            nodes: this.state.selectionType === "node" ? [this.state.selection.id] : [],
            edges: this.state.selectionType === "edge" ? [this.state.selection.source + "--" + this.state.selection.target] : []
        };

        return _react2["default"].createElement(
            _resizable2["default"],
            { aspect: aspect, style: {
                    background: "#F6F6F6",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "#E6E6E6" } },
            _react2["default"].createElement(_mapBase2["default"], {
                topology: topo,
                width: this.props.width,
                height: this.props.height,
                margin: this.props.margin,
                bounds: bounds,
                selection: mapSelection,
                edgeDrawingMethod: "simple",
                onSelectionChange: this.handleSelectionChanged,
                onPositionSelected: positionSelected,
                onNodeSelected: nodeSelected,
                onNodeDrag: this.handleNodeDrag })
        );
    },

    render: function render() {
        return _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
                "div",
                { className: "row" },
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-12", style: { marginBottom: 5, marginTop: 5 } },
                    this.renderToolbar()
                )
            ),
            _react2["default"].createElement(
                "div",
                { className: "row" },
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-12", style: { marginBottom: 5, marginTop: 5 } },
                    _react2["default"].createElement(
                        "div",
                        { className: "row" },
                        _react2["default"].createElement(
                            "div",
                            { className: "col-md-9" },
                            this.renderMap()
                        ),
                        _react2["default"].createElement(
                            "div",
                            { className: "col-md-3" },
                            this.renderProperties()
                        )
                    )
                )
            )
        );
    }
});
module.exports = exports["default"];