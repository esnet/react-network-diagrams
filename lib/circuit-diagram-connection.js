/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/**
 * A module containing a the connection drawing primative.
 *
 * @module CircuitConnection
 */

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _circuitDiagramEndpoint = require("./circuit-diagram-endpoint");

var _circuitDiagramEndpoint2 = _interopRequireDefault(_circuitDiagramEndpoint);

var _mapEdgeSimple = require("./map-edge-simple");

var _mapEdgeSimple2 = _interopRequireDefault(_mapEdgeSimple);

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-connection",

    getInitialState: function getInitialState() {
        return { highlighted: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            noNavigate: false,
            labelPosition: "top",
            radius: 2,
            endpointShape: "circle",
            classed: "circuit",
            lineShape: "linear",
            selected: false,
            muted: false,
            position: 0,
            arrow: false,
            arrowWidth: 10,
            arrowHeight: 10,
            curveDirection: "right",
            curveOffset: 20,
            size: 40
        };
    },
    /**
     * User hovers over the circuit
     */
    _mouseOver: function _mouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut: function _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    },

    _clicked: function _clicked(e, l) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, l);
        }
    },

    renderEndpoints: function renderEndpoints() {
        var eX1 = this.props.x1;
        var eX2 = this.props.x2;
        var eY1 = this.props.y1;
        var eY2 = this.props.y2;
        if (this.props.arrow) {
            return _react2["default"].createElement("g", null);
        } else {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: eX1,
                    y: eY1,
                    key: "line-begin",
                    style: this.props.style,
                    radius: this.props.radius,
                    shape: this.props.endpointShape,
                    highlighted: this.state.highlighted,
                    muted: this.props.muted,
                    selected: this.props.selected }),
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: eX2,
                    y: eY2,
                    key: "line-end",
                    style: this.props.style,
                    radius: this.props.radius,
                    shape: this.props.endpointShape,
                    highlighted: this.state.highlighted,
                    muted: this.props.muted,
                    selected: this.props.selected })
            );
        }
    },

    render: function render() {
        var styleModifier = "normal";
        var xOffset = this.props.xOffset ? this.props.xOffset : this.props.radius * 1.33;
        var yOffset = this.props.yOffset ? this.props.yOffset : this.props.radius * 1.33;

        if (this.props.lineShape === "square") {
            yOffset += this.props.size / 2;
        }
        var fontOffset = 10;

        var hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8
        };

        var labelClassed = "circuit-label";

        var width = undefined;
        var stroke = undefined;
        var fill = undefined;

        var labelX = (this.props.x1 + this.props.x2) / 2;
        var label1Y = (this.props.y1 + this.props.y2) / 2;
        var label2Y = (this.props.y1 + this.props.y2) / 2;
        var textAnchor = "middle";

        var labelLine1 = this.props.label1 || "";
        var labelLine2 = this.props.label2 || "";

        var label = labelLine1 + " " + labelLine2;

        switch (this.props.labelPosition) {
            case "top":
                if (this.props.lineShape === "angled") {
                    yOffset += Math.abs(this.props.y1 - this.props.y2) / 2;
                }
                label1Y -= yOffset + fontOffset;
                label2Y -= yOffset;
                break;

            case "bottom":
                if (this.props.lineShape === "angled") {
                    yOffset += Math.abs(this.props.y1 - this.props.y2) / 2;
                }
                if (!this.props.label1) {
                    labelLine1 = labelLine2;
                    labelLine2 = "";
                }
                label1Y += yOffset + fontOffset;
                label2Y += yOffset + 2 * fontOffset;
                break;

            case "topleft":
                labelX = this.props.x1 + xOffset;
                label1Y = this.props.y1 - yOffset - fontOffset;
                label2Y = this.props.y1 - yOffset;
                textAnchor = "start";
                break;

            case "topright":
                labelX = this.props.x2 - xOffset;
                label1Y = this.props.y2 - yOffset - fontOffset;
                label2Y = this.props.y2 - yOffset;
                textAnchor = "end";
                break;

            case "bottomleft":
                labelX = this.props.x1 + xOffset;
                if (!this.props.label1) {
                    labelLine1 = labelLine2;
                    labelLine2 = "";
                }
                label1Y = this.props.y1 + yOffset + fontOffset;
                label2Y = this.props.y1 + yOffset + 2 * fontOffset;
                textAnchor = "start";
                break;

            case "bottomright":
                labelX = this.props.x2 - xOffset;
                if (!this.props.label1) {
                    labelLine1 = labelLine2;
                    labelLine2 = "";
                }
                label1Y = this.props.y1 + yOffset + fontOffset;
                label2Y = this.props.y1 + yOffset + 2 * fontOffset;
                textAnchor = "end";
                break;

            default:
                break;
        }
        var offset = undefined;

        if (this.props.lineShape === "angled") {
            offset = this.props.bendOffset;
        } else {
            offset = this.props.curveOffset;
        }

        if (this.state.highlighted) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_mapEdgeSimple2["default"], { x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    roundedX: this.props.roundedX,
                    roundedY: this.props.roundedY,
                    color: stroke,
                    fillColor: fill,
                    width: width,
                    position: this.props.position,
                    shape: this.props.lineShape,
                    key: "line-path",
                    classed: this.props.classed,
                    name: label,
                    muted: this.props.muted,
                    selected: this.props.selected,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    curveDirection: this.props.curveDirection,
                    offset: offset,
                    size: this.props.size,
                    centerLine: this.props.centerLine })
            ),
            _react2["default"].createElement(
                "g",
                { onMouseOver: this._mouseOver,
                    onMouseOut: this._mouseOut },
                _react2["default"].createElement(_mapEdgeSimple2["default"], { x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    roundedX: this.props.roundedX,
                    roundedY: this.props.roundedY,
                    color: hitStyle.stroke,
                    fillColor: fill,
                    width: hitStyle.strokeWidth,
                    position: this.props.position,
                    shape: this.props.lineShape,
                    key: "line-path-hit",
                    classed: this.props.classed,
                    invisible: true,
                    name: label,
                    muted: this.props.muted,
                    selected: this.props.selected,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    curveDirection: this.props.curveDirection,
                    offset: offset,
                    size: this.props.size,
                    centerLine: this.props.centerLine,
                    onSelectionChange: this._clicked })
            ),
            _react2["default"].createElement(
                "g",
                null,
                this.renderEndpoints()
            ),
            _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(
                    "text",
                    { textAnchor: textAnchor,
                        style: this.props.style.label[styleModifier],
                        key: "endpoint-label",
                        className: labelClassed },
                    _react2["default"].createElement(
                        "tspan",
                        { x: labelX, y: label1Y },
                        labelLine1
                    ),
                    _react2["default"].createElement(
                        "tspan",
                        { x: labelX, y: label2Y },
                        labelLine2
                    )
                )
            )
        );
    }
});
module.exports = exports["default"];