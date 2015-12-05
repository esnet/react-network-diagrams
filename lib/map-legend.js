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

exports["default"] = _react2["default"].createClass({
    displayName: "map-legend",

    getDefaultProps: function getDefaultProps() {
        return {
            x: 0,
            y: 0,
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
    },

    render: function render() {
        var _this = this;

        var curX = this.props.x;
        var curY = this.props.y;
        var lineCenter = this.props.lineHeight / 2;

        var elements = [];
        if (this.props.nodeTypes.length > 0) {
            _underscore2["default"].each(this.props.nodeTypes, function (node) {
                var textX = curX + _this.props.exampleWidth;
                var textY = curY + lineCenter;
                var classed = "map-node " + node.classed;
                var style = { stroke: node.stroke, fill: node.fill };

                elements.push(_react2["default"].createElement(
                    "g",
                    null,
                    _react2["default"].createElement("circle", { style: style,
                        cx: curX,
                        cy: textY,
                        r: node.radius,
                        className: classed }),
                    _react2["default"].createElement(
                        "text",
                        { x: textX,
                            y: textY + 4,
                            textAnchor: "begin" },
                        node.text
                    )
                ));
                curY += _this.props.lineHeight;
            });

            if (this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.edgeTypes.length > 0) {
            _underscore2["default"].each(this.props.edgeTypes, function (edge) {
                var x = curX;
                var y = curY + lineCenter - edge.strokeWidth / 2;
                var textX = x + _this.props.exampleWidth + _this.props.gutter;
                var textY = curY + lineCenter;

                elements.push(_react2["default"].createElement(
                    "g",
                    null,
                    _react2["default"].createElement("line", {
                        x1: x,
                        y1: y,
                        x2: x + _this.props.exampleWidth,
                        y2: y,
                        stroke: _this.props.edgeColor,
                        strokeWidth: edge.strokeWidth }),
                    _react2["default"].createElement(
                        "text",
                        { x: textX, y: textY, textAnchor: "begin" },
                        edge.text
                    )
                ));

                curY += _this.props.lineHeight;
            });

            if (this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.colorSwatches.length > 0) {
            (function () {
                var width = _this.props.exampleWidth;
                var height = _this.props.lineHeight - 4;
                var itemCount = 0;

                _underscore2["default"].each(_this.props.colorSwatches, function (color) {
                    if (itemCount && itemCount % _this.props.itemsPerColumn === 0) {
                        curX += _this.props.columnWidth;
                        curY = _this.props.y;
                    }

                    var x = curX;
                    var y = curY;
                    var textX = x + _this.props.exampleWidth + _this.props.gutter;
                    var textY = curY + lineCenter;

                    elements.push(_react2["default"].createElement(
                        "g",
                        null,
                        _react2["default"].createElement("rect", {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            stroke: color.stroke,
                            fill: color.fill }),
                        _react2["default"].createElement(
                            "text",
                            { x: textX, y: textY, textAnchor: "begin" },
                            color.text
                        )
                    ));

                    curY += _this.props.lineHeight;
                    itemCount += 1;
                });

                if (_this.props.columns) {
                    curX += _this.props.columnWidth;
                    curY = _this.props.y;
                }
            })();
        }

        return _react2["default"].createElement(
            "g",
            null,
            elements
        );
    }
});
module.exports = exports["default"];