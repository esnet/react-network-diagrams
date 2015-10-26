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

var _edgeArc = require("./edge-arc");

var _edgeArc2 = _interopRequireDefault(_edgeArc);

var _edgeLinear = require("./edge-linear");

var _edgeLinear2 = _interopRequireDefault(_edgeLinear);

var _edgeSquare = require("./edge-square");

var _edgeSquare2 = _interopRequireDefault(_edgeSquare);

var _edgeAngled = require("./edge-angled");

var _edgeAngled2 = _interopRequireDefault(_edgeAngled);

exports["default"] = _react2["default"].createClass({
    displayName: "edge-simple",

    getDefaultProps: function getDefaultProps() {
        return {
            color: "#ddd",
            width: 4,
            position: 0,
            selected: false,
            muted: false,
            invisible: false,
            arrow: false,
            fillColor: "none"
        };
    },

    render: function render() {
        // Class for edge
        var classed = "edge";
        if (this.props.selected) {
            classed += " selected";
        }
        if (this.props.muted) {
            classed += " muted";
        }
        if (!_underscore2["default"].isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        // Render based on shape
        if (this.props.shape === "curved") {
            return _react2["default"].createElement(_edgeArc2["default"], {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                key: this.props.name,
                label: this.props.label,
                labelPosition: this.props.labelPosition,
                labelStyle: this.props.labelStyle,
                labelOffsetX: this.props.labelOffsetX,
                labelOffsetY: this.props.labelOffsetY,
                textAnchor: this.props.textAnchor,
                color: this.props.color,
                width: this.props.width,
                selected: this.props.selected,
                muted: this.props.muted,
                classed: classed,
                arrow: this.props.arrow,
                arrowWidth: this.props.arrowWidth,
                arrowHeight: this.props.arrowHeight,
                position: this.props.position,
                curveDirection: this.props.curveDirection,
                offset: this.props.offset,
                name: this.props.name,
                invisible: this.props.invisible,
                onSelectionChange: this.props.onSelectionChange });
        } else if (this.props.shape === "square") {
            return _react2["default"].createElement(_edgeSquare2["default"], {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                key: this.props.name,
                label: this.props.label,
                labelPosition: this.props.labelPosition,
                labelStyle: this.props.labelStyle,
                labelOffsetX: this.props.labelOffsetX,
                labelOffsetY: this.props.labelOffsetY,
                textAnchor: this.props.textAnchor,
                color: this.props.color,
                width: this.props.width,
                selected: this.props.selected,
                muted: this.props.muted,
                classed: classed,
                roundedX: this.props.roundedX,
                roundedY: this.props.roundedY,
                fillColor: this.props.fillColor,
                size: this.props.size,
                centerLine: this.props.centerLine,
                name: this.props.name,
                invisible: this.props.invisible,
                onSelectionChange: this.props.onSelectionChange });
        } else if (this.props.shape === "angled") {
            return _react2["default"].createElement(_edgeAngled2["default"], {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                key: this.props.name,
                label: this.props.label,
                labelPosition: this.props.labelPosition,
                labelStyle: this.props.labelStyle,
                labelOffsetX: this.props.labelOffsetX,
                labelOffsetY: this.props.labelOffsetY,
                textAnchor: this.props.textAnchor,
                color: this.props.color,
                width: this.props.width,
                selected: this.props.selected,
                muted: this.props.muted,
                classed: classed,
                arrow: this.props.arrow,
                arrowWidth: this.props.arrowWidth,
                arrowHeight: this.props.arrowHeight,
                position: this.props.position,
                curveDirection: this.props.curveDirection,
                offset: this.props.offset,
                name: this.props.name,
                invisible: this.props.invisible,
                onSelectionChange: this.props.onSelectionChange });
        } else {
            return _react2["default"].createElement(_edgeLinear2["default"], {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                key: this.props.name,
                label: this.props.label,
                labelPosition: this.props.labelPosition,
                labelStyle: this.props.labelStyle,
                labelOffsetX: this.props.labelOffsetX,
                labelOffsetY: this.props.labelOffsetY,
                textAnchor: this.props.textAnchor,
                color: this.props.color,
                width: this.props.width,
                selected: this.props.selected,
                muted: this.props.muted,
                classed: classed,
                arrow: this.props.arrow,
                arrowWidth: this.props.arrowWidth,
                arrowHeight: this.props.arrowHeight,
                position: this.props.position,
                name: this.props.name,
                invisible: this.props.invisible,
                onSelectionChange: this.props.onSelectionChange });
        }
    }
});
module.exports = exports["default"];