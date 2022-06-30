"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapLegend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

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

var MapLegend = exports.MapLegend = function (_React$Component) {
    _inherits(MapLegend, _React$Component);

    function MapLegend() {
        _classCallCheck(this, MapLegend);

        return _possibleConstructorReturn(this, (MapLegend.__proto__ || Object.getPrototypeOf(MapLegend)).apply(this, arguments));
    }

    _createClass(MapLegend, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var curX = this.props.x;
            var curY = this.props.y;
            var lineCenter = this.props.lineHeight / 2;

            var elements = [];
            if (this.props.nodeTypes.length > 0) {
                _underscore2.default.each(this.props.nodeTypes, function (node, i) {
                    if (node.shape === "square") {
                        var classed = "map-node-shape-square-" + node.classed;
                        var x = curX - node.radius;
                        var y = curY;
                        var width = 2 * node.radius;
                        var style = { stroke: node.stroke, fill: node.fill };

                        var textX = curX + _this2.props.exampleWidth;
                        var textY = curY + lineCenter;

                        elements.push(_react2.default.createElement(
                            "g",
                            { key: "node-" + i },
                            _react2.default.createElement("rect", {
                                x: x,
                                y: y,
                                width: width,
                                height: width,
                                style: style,
                                className: classed
                            }),
                            _react2.default.createElement(
                                "text",
                                { x: textX, y: textY + 4, textAnchor: "begin" },
                                node.text
                            )
                        ));
                        curY += _this2.props.lineHeight;
                    } else {
                        var _textX = curX + _this2.props.exampleWidth;
                        var _textY = curY + lineCenter;
                        var _classed = "map-node-shape-circle-" + node.classed;
                        var _style = { stroke: node.stroke, fill: node.fill };

                        elements.push(_react2.default.createElement(
                            "g",
                            { key: "node-" + i },
                            _react2.default.createElement("circle", {
                                style: _style,
                                cx: curX,
                                cy: _textY,
                                r: node.radius,
                                className: _classed
                            }),
                            _react2.default.createElement(
                                "text",
                                { x: _textX, y: _textY + 4, textAnchor: "begin" },
                                node.text
                            )
                        ));
                        curY += _this2.props.lineHeight;
                    }
                });

                if (this.props.columns) {
                    curX += this.props.columnWidth;
                    curY = this.props.y;
                }
            }

            if (this.props.edgeTypes.length > 0) {
                _underscore2.default.each(this.props.edgeTypes, function (edge, i) {
                    var x = curX;
                    var y = curY + lineCenter - edge.strokeWidth / 2;
                    var textX = x + _this2.props.exampleWidth + _this2.props.gutter;
                    var textY = curY + lineCenter;

                    elements.push(_react2.default.createElement(
                        "g",
                        { key: "edge-" + i },
                        _react2.default.createElement("line", {
                            x1: x,
                            y1: y,
                            x2: x + _this2.props.exampleWidth,
                            y2: y,
                            stroke: _this2.props.edgeColor,
                            strokeWidth: edge.strokeWidth
                        }),
                        _react2.default.createElement(
                            "text",
                            { x: textX, y: textY, textAnchor: "begin" },
                            edge.text
                        )
                    ));

                    curY += _this2.props.lineHeight;
                });

                if (this.props.columns) {
                    curX += this.props.columnWidth;
                    curY = this.props.y;
                }
            }

            if (this.props.colorSwatches.length > 0) {
                var width = this.props.exampleWidth;
                var height = this.props.lineHeight - 4;
                var itemCount = 0;

                _underscore2.default.each(this.props.colorSwatches, function (color, i) {
                    if (itemCount && itemCount % _this2.props.itemsPerColumn === 0) {
                        curX += _this2.props.columnWidth;
                        curY = _this2.props.y;
                    }

                    var x = curX;
                    var y = curY;
                    var textX = x + _this2.props.exampleWidth + _this2.props.gutter;
                    var textY = curY + lineCenter;

                    elements.push(_react2.default.createElement(
                        "g",
                        { key: "color-" + i },
                        _react2.default.createElement("rect", {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            stroke: color.stroke,
                            fill: color.fill
                        }),
                        _react2.default.createElement(
                            "text",
                            { x: textX, y: textY, textAnchor: "begin" },
                            color.text
                        )
                    ));

                    curY += _this2.props.lineHeight;
                    itemCount += 1;
                });

                if (this.props.columns) {
                    curX += this.props.columnWidth;
                    curY = this.props.y;
                }
            }

            return _react2.default.createElement(
                "g",
                null,
                elements
            );
        }
    }]);

    return MapLegend;
}(_react2.default.Component);

MapLegend.propTypes = {
    x: _propTypes2.default.number,
    y: _propTypes2.default.number,
    radius: _propTypes2.default.number,
    lineHeight: _propTypes2.default.number,
    columns: _propTypes2.default.bool,
    itemsPerColumn: _propTypes2.default.number,
    columnWidth: _propTypes2.default.number,
    exampleWidth: _propTypes2.default.number,
    gutter: _propTypes2.default.number,
    edgeColor: _propTypes2.default.string,
    nodeTypes: _propTypes2.default.array,
    edgeTypes: _propTypes2.default.array,
    colorSwatches: _propTypes2.default.array
};

MapLegend.defaultProps = {
    x: 0,
    y: 0,
    radius: 5,
    lineHeight: 20,
    columns: true,
    itemsPerColumn: 4,
    columnWidth: 100,
    exampleWidth: 20,
    gutter: 8,
    edgeColor: "#333",
    nodeTypes: [],
    edgeTypes: [],
    colorSwatches: []
};