"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerNodeList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _PowerNode = require("./PowerNode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PowerNodeList = exports.PowerNodeList = function (_React$Component) {
    _inherits(PowerNodeList, _React$Component);

    function PowerNodeList() {
        _classCallCheck(this, PowerNodeList);

        return _possibleConstructorReturn(this, (PowerNodeList.__proto__ || Object.getPrototypeOf(PowerNodeList)).apply(this, arguments));
    }

    _createClass(PowerNodeList, [{
        key: "assignPowerNodes",
        value: function assignPowerNodes(power) {
            /**
             * Power nodes are positioned around a rack in one of 9 potential locations
             * in the format Vertical - Horizontal:
             * Above - Left
             * Above - Middle
             * Above - Right
             * Center - Left
             * Center - Middle
             * Center - Right
             * Below - Left
             * Below - Middle
             * Below - Right
             *
             * There may be multiple nodes at each location, and will need to be rendered next to each other
             */

            var nodes = {
                "Above-Left": [],
                "Above-Center": [],
                "Above-Right": [],
                "Center-Left": [],
                "Center-Center": [],
                "Center-Right": [],
                "Below-Left": [],
                "Below-Center": [],
                "Below-Right": []
            };

            // Assign nodes to their position.  Each position will have 0 or more nodes
            _underscore2.default.each(power, function (powerNode) {
                var position = powerNode.vPos + "-" + powerNode.hPos;
                // get the current length of the nodes position
                nodes[position].push(powerNode);
            });

            var newNodes = {};
            _underscore2.default.each(nodes, function (node, name) {
                if (node.length > 0) {
                    newNodes[name] = node;
                }
            });
            return [_underscore2.default.flatten(_underscore2.default.values(nodes)), newNodes];
        }
    }, {
        key: "renderPositionLabel",
        value: function renderPositionLabel(label, x, y) {
            return _react2.default.createElement(
                "text",
                {
                    key: "position-" + label,
                    x: x,
                    y: y,
                    textAnchor: "start",
                    style: this.props.positionLabelStyle
                },
                label
            );
        }
    }, {
        key: "drawPowerNode",
        value: function drawPowerNode(powerNode, key) {
            return _react2.default.createElement(_PowerNode.PowerNode, {
                powerNode: powerNode,
                name: powerNode.navTo,
                selected: powerNode.id === this.props.selected,
                key: key,
                labelStyle: powerNode.style.label,
                onSelectionChange: this.props.onSelectionChange
            });
        }
    }, {
        key: "positionPowerNodes",
        value: function positionPowerNodes(newNodes) {
            var _this2 = this;

            var elements = [];
            var xStart = this.props.xOffset;
            var yStart = this.props.yOffset;
            _underscore2.default.each(newNodes, function (group, groupName) {
                var label = _this2.renderPositionLabel(groupName, xStart, yStart);
                yStart += 30;
                elements.push(label);
                _underscore2.default.each(group, function (powerNode, val) {
                    var key = groupName + "-" + val;
                    powerNode["x"] = xStart + 20;
                    powerNode["y"] = yStart;
                    elements.push(_this2.drawPowerNode(powerNode, key));
                    yStart += 55;
                });
            });
            return elements;
        }
    }, {
        key: "render",
        value: function render() {
            var powerElements = this.assignPowerNodes(this.props.powerNodes);
            var groups = _underscore2.default.map(powerElements[1], function (group, groupName) {
                return groupName;
            });
            var groupCount = groups.length;
            var nodeCount = powerElements[0].length;

            var totalHeight = groupCount * 12 + nodeCount * 60 + this.props.yOffset * 2;
            var powerContainer = {
                normal: {
                    borderTopStyle: "solid",
                    borderBottomStyle: "solid",
                    borderWidth: 1,
                    borderTopColor: "#FFFFFF",
                    borderBottomColor: "#FFFFFF",
                    width: "100%",
                    height: totalHeight
                }
            };

            var className = "rack-container";
            var svgStyle = powerContainer.normal;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "svg",
                    { className: className, style: svgStyle },
                    this.positionPowerNodes(powerElements[1])
                )
            );
        }
    }]);

    return PowerNodeList;
}(_react2.default.Component);

PowerNodeList.defaultProps = {
    xOffset: 10,
    yOffset: 30,
    positionLabelStyle: {
        fill: "#9D9D9D",
        fontSize: 10,
        fontFamily: "verdana, sans-serif"
    }
};