"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _BaseMap = require("./BaseMap");

var _Node = require("./Node");

var _Resizable = require("./Resizable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2018, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var counter = 1;

var MapEditor = exports.MapEditor = function (_React$Component) {
    _inherits(MapEditor, _React$Component);

    function MapEditor(props) {
        _classCallCheck(this, MapEditor);

        var _this = _possibleConstructorReturn(this, (MapEditor.__proto__ || Object.getPrototypeOf(MapEditor)).call(this, props));

        _this.state = {
            pendingAction: null,
            selectionType: null,
            selection: null
        };
        _this.handleAddEdge = _this.handleAddEdge.bind(_this);
        _this.handleAddNode = _this.handleAddNode.bind(_this);
        _this.handleDeleteEdge = _this.handleDeleteEdge.bind(_this);
        _this.handleDeleteNode = _this.handleDeleteNode.bind(_this);
        return _this;
    }

    _createClass(MapEditor, [{
        key: "constrain",
        value: function constrain(x, y) {
            var gridSize = this.props.gridSize;
            return {
                x: parseInt(parseInt(x / gridSize, 10) * gridSize, 10),
                y: parseInt(parseInt(y / gridSize, 10) * gridSize, 10)
            };
        }

        /**
         * When we create new elements we give it a id
         */

    }, {
        key: "makeId",
        value: function makeId() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c === "x" ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }
    }, {
        key: "findNode",
        value: function findNode(id) {
            var result = void 0;
            _underscore2.default.each(this.props.topology.nodes, function (node) {
                if (node.id === id) {
                    result = node;
                }
            });
            return result;
        }
    }, {
        key: "findEdge",
        value: function findEdge(id) {
            var result = void 0;
            _underscore2.default.each(this.props.topology.edges, function (edge) {
                if (edge.source + "--" + edge.target === id) {
                    result = edge;
                }
            });
            return result;
        }
    }, {
        key: "nodeSize",
        value: function nodeSize(name) {
            return this.props.nodeSizeMap[name] || 7;
        }
    }, {
        key: "nodeShape",
        value: function nodeShape(name) {
            return this.props.nodeShapeMap[name] || "circle";
        }
    }, {
        key: "edgeThickness",
        value: function edgeThickness(capacity) {
            return this.props.edgeThinknessMap[capacity] || 5;
        }
    }, {
        key: "edgeShape",
        value: function edgeShape(name) {
            if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
                return this.props.edgeShapeMap[name].shape;
            } else {
                return "linear";
            }
        }
    }, {
        key: "edgeCurveDirection",
        value: function edgeCurveDirection(name) {
            var direction = void 0;
            if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
                if (this.props.edgeShapeMap[name].shape === "curved") {
                    return this.props.edgeShapeMap[name].direction;
                }
            }
            return direction;
        }
    }, {
        key: "edgeCurveOffset",
        value: function edgeCurveOffset(name) {
            var offset = void 0;
            if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
                if (this.props.edgeShapeMap[name].shape === "curved") {
                    return this.props.edgeShapeMap[name].offset;
                }
            }
            return offset;
        }
    }, {
        key: "bounds",
        value: function bounds() {
            if (this.props.bounds) {
                return this.props.bounds;
            }
            var minX = _underscore2.default.min(this.props.topology.nodes, function (node) {
                return node.x;
            }).x;
            var minY = _underscore2.default.min(this.props.topology.nodes, function (node) {
                return node.y;
            }).y;
            var maxX = _underscore2.default.max(this.props.topology.nodes, function (node) {
                return node.x;
            }).x;
            var maxY = _underscore2.default.max(this.props.topology.nodes, function (node) {
                return node.y;
            }).y;
            return { x1: minX, x2: maxX, y1: minY, y2: maxY };
        }
    }, {
        key: "cloneTopo",
        value: function cloneTopo() {
            var topo = {
                name: this.props.topology.name,
                description: this.props.topology.description,
                nodes: _underscore2.default.map(this.props.topology.nodes, function (n) {
                    return _underscore2.default.clone(n);
                }),
                edges: _underscore2.default.map(this.props.topology.edges, function (e) {
                    return _underscore2.default.clone(e);
                })
            };
            return topo;
        }

        /**
         * Build a topology suitable for passing into the BaseMap for rendering
         * as nodes and edges
         */

    }, {
        key: "buildTopology",
        value: function buildTopology() {
            var _this2 = this;

            var topology = {};

            if (_underscore2.default.isNull(this.props.topology)) {
                return null;
            }

            // Create a node list
            topology.nodes = _underscore2.default.map(this.props.topology.nodes, function (node) {
                var n = _underscore2.default.clone(node);

                // Radius is based on the type of node, given in the nodeSizeMap
                n.radius = _this2.nodeSize(node.type);
                n.labelPosition = node.label_position;
                n.labelOffsetX = node.label_dx;
                n.labelOffsetY = node.label_dy;

                n.style = {
                    normal: { fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer" },
                    selected: {
                        fill: "#37B6D3",
                        stroke: "rgba(55, 182, 211, 0.22)",
                        strokeWidth: 10,
                        cursor: "pointer"
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

                n.shape = _this2.nodeShape(node.name);

                return n;
            });

            // Create the tologogy list
            topology.edges = _underscore2.default.map(this.props.topology.edges, function (edge) {
                var edgeName = edge.source + "--" + edge.target;
                return {
                    width: _this2.edgeThickness(edge.capacity),
                    classed: edge.capacity,
                    source: edge.source,
                    target: edge.target,
                    name: edgeName,
                    shape: _this2.edgeShape(edgeName),
                    curveDirection: _this2.edgeCurveDirection(edgeName),
                    offset: _this2.edgeCurveOffset(edgeName)
                };
            });

            topology.name = this.props.topology.name;
            topology.description = this.props.topology.description;

            return topology;
        }
    }, {
        key: "handleSelectionChanged",
        value: function handleSelectionChanged(selectionType, selectionId) {
            var selection = void 0;
            if (selectionType === "node") {
                selection = this.findNode(selectionId);
            } else if (selectionType === "edge") {
                selection = this.findEdge(selectionId);
            }
            this.setState({ selectionType: selectionType, selection: selection });
        }
    }, {
        key: "handleChange",
        value: function handleChange(attr, value) {
            var selected = this.state.selection;
            selected[attr] = value;

            this.setState({
                selection: selected
            });
        }
    }, {
        key: "handleNodeDrag",
        value: function handleNodeDrag(id, posx, posy) {
            var topo = this.cloneTopo();

            var _constrain = this.constrain(posx, posy),
                x = _constrain.x,
                y = _constrain.y;

            _underscore2.default.each(topo.nodes, function (node) {
                if (node.id === id) {
                    node.x = x;
                    node.y = y;
                }
            });

            if (this.props.onTopologyChange) {
                this.props.onTopologyChange(topo);
            }
        }
    }, {
        key: "handleAddNode",
        value: function handleAddNode() {
            this.setState({
                pendingAction: {
                    action: "add-node",
                    instructions: "Pick a point (x,y)"
                }
            });
        }

        /**
         * TODO: actual handling of the add node should be done at
         * the application level (action) rather than down here in the editor.
         */

    }, {
        key: "handleAddNodePosition",
        value: function handleAddNodePosition(posx, posy) {
            var topo = this.cloneTopo();

            var _constrain2 = this.constrain(posx, posy),
                x = _constrain2.x,
                y = _constrain2.y;

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
        }
    }, {
        key: "handleAddEdge",
        value: function handleAddEdge() {
            this.setState({
                pendingAction: {
                    action: "add-edge",
                    instructions: "Pick source node",
                    nodes: []
                }
            });
        }
    }, {
        key: "handleDeleteNode",
        value: function handleDeleteNode() {
            this.setState({
                pendingAction: {
                    action: "delete-node",
                    instructions: "Pick a node to delete (will delete related edges)",
                    nodes: []
                }
            });
        }
    }, {
        key: "handleDeleteEdge",
        value: function handleDeleteEdge() {
            this.setState({
                pendingAction: {
                    action: "delete-edge",
                    instructions: "Pick an edge to delete",
                    edge: null
                }
            });
        }
    }, {
        key: "handleAddSelection",
        value: function handleAddSelection(node) {
            var action = this.state.pendingAction;
            if (action.action === "add-edge") {
                action.nodes.push(node);
            }
            if (action.nodes.length === 1) {
                this.setState({
                    pendingAction: {
                        action: "add-edge",
                        instructions: "Pick target node",
                        nodes: action.nodes
                    }
                });
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
        }
    }, {
        key: "handleDeleteNodeSelection",
        value: function handleDeleteNodeSelection(nodeId) {
            var action = this.state.pendingAction;
            if (action.action === "delete-node") {
                action.nodes.push(nodeId);
            }
            if (action.nodes.length === 1) {
                var node = this.findNode(nodeId);

                var topo = this.cloneTopo();
                topo.nodes = _underscore2.default.filter(topo.nodes, function (n) {
                    return n.id !== nodeId;
                });

                topo.edges = _underscore2.default.filter(topo.edges, function (e) {
                    return e.source !== node.name && e.target !== node.name;
                });

                if (this.props.onTopologyChange) {
                    this.props.onTopologyChange(topo);
                }

                this.setState({ pendingAction: null });
            }
        }
    }, {
        key: "handleDeleteEdgeSelection",
        value: function handleDeleteEdgeSelection(edgeId) {
            var action = this.state.pendingAction;
            if (action.action === "delete-edge") {
                action.edgeId = edgeId;
            }

            if (action.edgeId) {
                var edge = this.findEdge(edgeId);
                var topo = this.cloneTopo();

                topo.edges = _underscore2.default.filter(topo.edges, function (e) {
                    return !(e.source === edge.source && e.target === edge.target);
                });

                if (this.props.onTopologyChange) {
                    this.props.onTopologyChange(topo);
                }

                this.setState({ pendingAction: null });
            }
        }
    }, {
        key: "renderTextProperty",
        value: function renderTextProperty(attr, value) {
            var _this3 = this;

            return _react2.default.createElement("input", {
                defaultValue: value,
                width: "100%",
                type: "text",
                className: "form-control input-sm",
                onBlur: function onBlur(e) {
                    return _this3.handleChange(attr, e.target.value);
                }
            });
        }
    }, {
        key: "renderIntegerProperty",
        value: function renderIntegerProperty(attr, value) {
            var _this4 = this;

            var v = value || 0;
            return _react2.default.createElement("input", {
                defaultValue: v,
                width: "100%",
                type: "text",
                className: "form-control input-sm",
                onBlur: function onBlur(e) {
                    return _this4.handleChange(attr, parseInt(e.target.value, 10));
                }
            });
        }
    }, {
        key: "renderChoiceProperty",
        value: function renderChoiceProperty(attr, options, cvalue) {
            var _this5 = this,
                _React$createElement;

            return _react2.default.createElement(_reactSelect2.default, (_React$createElement = {
                value: value
            }, _defineProperty(_React$createElement, "value", options.filter(function (_ref) {
                var value = _ref.value;
                return value === cvalue;
            })), _defineProperty(_React$createElement, "searchable", false), _defineProperty(_React$createElement, "clearable", false), _defineProperty(_React$createElement, "options", options), _defineProperty(_React$createElement, "onChange", function onChange(val) {
                return _this5.handleChange(attr, val.value);
            }), _React$createElement));
        }
    }, {
        key: "renderNodeProperties",
        value: function renderNodeProperties() {
            var _this6 = this;

            var selected = this.state.selection;

            var nodeSpec = _Node.Node.spec();
            nodeSpec.unshift({
                attr: "type",
                label: "Type",
                type: "choice",
                options: _underscore2.default.map(this.props.stylesMap, function (s, type) {
                    return { value: type, label: type };
                })
            });

            var propertyElements = void 0;
            if (this.state.selectionType === "node") {
                propertyElements = _underscore2.default.map(nodeSpec, function (property) {
                    var v = selected[property.attr];
                    var editorElement = void 0;
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
                        default:
                            break;
                    }
                    return _react2.default.createElement(
                        "tr",
                        { height: "35px", key: property.attr },
                        _react2.default.createElement(
                            "td",
                            { width: "100px" },
                            _react2.default.createElement(
                                "label",
                                { width: 100 },
                                property.label
                            )
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            editorElement
                        )
                    );
                });
            }

            return _react2.default.createElement(
                "table",
                { width: "100%" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    propertyElements
                )
            );
        }
    }, {
        key: "renderEdgeProperties",
        value: function renderEdgeProperties() {
            var _this7 = this;

            var selected = this.state.selection;
            var edgeSpec = [{
                attr: "capacity",
                label: "Capacity",
                type: "choice",
                options: _underscore2.default.map(this.props.edgeThicknessMap, function (e, k) {
                    return { value: k, label: k };
                })
            }, {
                attr: "source_int",
                label: "Source Interface",
                type: "text"
            }];

            var propertyElements = void 0;
            if (this.state.selectionType === "edge") {
                propertyElements = _underscore2.default.map(edgeSpec, function (property) {
                    var v = selected[property.attr];
                    var editorElement = void 0;
                    switch (property.type) {
                        case "text":
                            editorElement = _this7.renderTextProperty(property.attr, v);
                            break;
                        case "integer":
                            editorElement = _this7.renderIntegerProperty(property.attr, v);
                            break;
                        case "choice":
                            editorElement = _this7.renderChoiceProperty(property.attr, property.options, v);
                            break;
                        default:
                            break;
                    }
                    return _react2.default.createElement(
                        "tr",
                        { height: "35px", key: property.attr },
                        _react2.default.createElement(
                            "td",
                            { width: "100px" },
                            _react2.default.createElement(
                                "label",
                                { width: 100 },
                                property.label
                            )
                        ),
                        _react2.default.createElement(
                            "td",
                            null,
                            editorElement
                        )
                    );
                });
            }

            return _react2.default.createElement(
                "table",
                { width: "100%" },
                _react2.default.createElement(
                    "tbody",
                    null,
                    propertyElements
                )
            );
        }
    }, {
        key: "renderProperties",
        value: function renderProperties() {
            var headerStyle = {
                padding: 15,
                background: "#F6F6F6",
                borderLeftStyle: "solid",
                borderLeftColor: "#37B6D3"
            };

            if (this.state.selection) {
                if (this.state.selectionType === "node") {
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { style: headerStyle },
                            this.state.selection.name
                        ),
                        _react2.default.createElement("p", null),
                        _react2.default.createElement(
                            "div",
                            null,
                            this.renderNodeProperties()
                        )
                    );
                } else {
                    var edge = this.state.selection;
                    var title = edge.source + " to " + edge.target;
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { style: headerStyle },
                            title
                        ),
                        _react2.default.createElement("p", null),
                        _react2.default.createElement(
                            "div",
                            null,
                            this.renderEdgeProperties()
                        )
                    );
                }
            } else {
                return _react2.default.createElement(
                    "span",
                    null,
                    "Nothing selected"
                );
            }
        }
    }, {
        key: "renderToolbar",
        value: function renderToolbar() {
            var toolbarStyle = {
                padding: 5,
                borderBottomStyle: "solid",
                borderWidth: "thin",
                borderColor: "#CBCBCB"
            };

            // Highlight buttons when action is in progress
            var addNodeStyle = { color: "grey" };
            var addEdgeStyle = { color: "grey", marginLeft: 10 };
            var deleteNodeStyle = { color: "grey", marginLeft: 10 };
            var deleteEdgeStyle = { color: "grey", marginLeft: 10 };
            if (this.state.pendingAction) {
                if (this.state.pendingAction.action === "add-node") {
                    addNodeStyle = { color: "steelblue" };
                }
                if (this.state.pendingAction.action === "add-edge") {
                    addEdgeStyle = { color: "steelblue", marginLeft: 10 };
                }
                if (this.state.pendingAction.action === "delete-node") {
                    deleteNodeStyle = { color: "steelblue", marginLeft: 10 };
                }
                if (this.state.pendingAction.action === "delete-edge") {
                    deleteEdgeStyle = { color: "steelblue", marginLeft: 10 };
                }
            }

            return _react2.default.createElement(
                "div",
                { style: toolbarStyle },
                _react2.default.createElement(
                    "button",
                    {
                        type: "button",
                        style: addNodeStyle,
                        className: "btn btn-default btn-xs",
                        onClick: this.handleAddNode
                    },
                    _react2.default.createElement("span", { className: "icon-plus", "aria-hidden": "true" }),
                    " Node"
                ),
                _react2.default.createElement(
                    "button",
                    {
                        type: "button",
                        style: addEdgeStyle,
                        className: "btn btn-default btn-xs",
                        onClick: this.handleAddEdge
                    },
                    _react2.default.createElement("span", { className: "icon-plus", "aria-hidden": "true" }),
                    " Edge"
                ),
                _react2.default.createElement(
                    "button",
                    {
                        type: "button",
                        style: deleteNodeStyle,
                        className: "btn btn-default btn-xs",
                        onClick: this.handleDeleteNode
                    },
                    _react2.default.createElement("span", { className: "icon-minus", "aria-hidden": "true" }),
                    " Node"
                ),
                _react2.default.createElement(
                    "button",
                    {
                        type: "button",
                        style: deleteEdgeStyle,
                        className: "btn btn-default btn-xs",
                        onClick: this.handleDeleteEdge
                    },
                    _react2.default.createElement("span", { className: "icon-minus", "aria-hidden": "true" }),
                    " Edge"
                ),
                _react2.default.createElement(
                    "span",
                    { style: { color: "steelblue", marginLeft: 10 } },
                    this.state.pendingAction ? this.state.pendingAction.instructions : null
                )
            );
        }
    }, {
        key: "renderMap",
        value: function renderMap() {
            var _this8 = this;

            var topo = this.buildTopology();
            var bounds = this.bounds();
            var aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);

            var positionSelected = void 0;
            var nodeSelected = void 0;
            var edgeSelected = void 0;

            if (this.state.pendingAction) {
                if (this.state.pendingAction.action === "add-node") {
                    positionSelected = function positionSelected(posx, posy) {
                        return _this8.handleAddNodePosition(posx, posy);
                    };
                }
                if (this.state.pendingAction.action === "add-edge") {
                    nodeSelected = function nodeSelected(node) {
                        return _this8.handleAddSelection(node);
                    };
                }
                if (this.state.pendingAction.action === "delete-node") {
                    nodeSelected = function nodeSelected(nodeId) {
                        return _this8.handleDeleteNodeSelection(nodeId);
                    };
                }
                if (this.state.pendingAction.action === "delete-edge") {
                    edgeSelected = function edgeSelected(edgeId) {
                        return _this8.handleDeleteEdgeSelection(edgeId);
                    };
                }
            }

            var mapSelection = {
                nodes: this.state.selectionType === "node" ? [this.state.selection.id] : [],
                edges: this.state.selectionType === "edge" ? [this.state.selection.source + "--" + this.state.selection.target] : []
            };

            if (this.props.autoSize) {
                return _react2.default.createElement(
                    _Resizable.Resizable,
                    {
                        aspect: aspect,
                        style: {
                            background: "#F6F6F6",
                            borderStyle: "solid",
                            borderWidth: "thin",
                            borderColor: "#E6E6E6"
                        }
                    },
                    _react2.default.createElement(_BaseMap.BaseMap, {
                        topology: topo,
                        width: this.props.width,
                        height: this.props.height,
                        autoSize: this.props.autoSize,
                        margin: this.props.margin,
                        bounds: bounds,
                        selection: mapSelection,
                        edgeDrawingMethod: "simple",
                        onSelectionChange: function onSelectionChange(selectionType, selectionId) {
                            return _this8.handleSelectionChanged(selectionType, selectionId);
                        },
                        onPositionSelected: positionSelected,
                        onNodeSelected: nodeSelected,
                        onEdgeSelected: edgeSelected,
                        onNodeDrag: function onNodeDrag(id, posx, posy) {
                            return _this8.handleNodeDrag(id, posx, posy);
                        }
                    })
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    {
                        style: {
                            background: "#F6F6F6",
                            borderStyle: "solid",
                            borderWidth: "thin",
                            borderColor: "#E6E6E6"
                        }
                    },
                    _react2.default.createElement(_BaseMap.BaseMap, {
                        topology: topo,
                        width: this.props.width,
                        height: this.props.height,
                        autoSize: this.props.autoSize,
                        margin: this.props.margin,
                        bounds: bounds,
                        selection: mapSelection,
                        edgeDrawingMethod: "simple",
                        onSelectionChange: function onSelectionChange(selectionType, selectionId) {
                            return _this8.handleSelectionChanged(selectionType, selectionId);
                        },
                        onPositionSelected: positionSelected,
                        onNodeSelected: nodeSelected,
                        onEdgeSelected: edgeSelected,
                        onNodeDrag: function onNodeDrag(id, posx, posy) {
                            return _this8.handleNodeDrag(id, posx, posy);
                        }
                    })
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-md-12", style: { marginBottom: 5, marginTop: 5 } },
                        this.renderToolbar()
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-md-12", style: { marginBottom: 5, marginTop: 5 } },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-9" },
                                this.renderMap()
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-3" },
                                this.renderProperties()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MapEditor;
}(_react2.default.Component);

MapEditor.propTypes = {
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
    edgeThicknessMap: _propTypes2.default.object,

    /** Display the endpoint selected */
    selected: _propTypes2.default.bool,

    edgeColorMap: _propTypes2.default.array,

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
    nodeSizeMap: _propTypes2.default.object,

    nodeShapeMap: _propTypes2.default.object,

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
    edgeShapeMap: _propTypes2.default.object,

    stylesMap: _propTypes2.default.object,

    gridSize: _propTypes2.default.number
};

MapEditor.defaultProps = {
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