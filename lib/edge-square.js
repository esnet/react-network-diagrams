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

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

/**
 * This component draws a rectangle using the source and target to determine sizing and position. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. Rounding is specified with the
 * props roundedX and roundedY.
 *
 *
 * The color and width of the rectangle may also be supplied.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "edge-square",

    getDefaultProps: function getDefaultProps() {
        return {
            roundedX: 0,
            roundedY: 0,
            color: "#ddd",
            position: 0,
            arrow: false,
            selected: false,
            muted: false,
            size: 40
        };
    },

    _rotateOffset: function _rotateOffset(cx, x, y, a) {
        var r = Math.PI / 180 * a;
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        var nx = x - (x - cx) * cos;
        var ny = y - (x - cx) * sin;
        return [nx, ny];
    },

    render: function render() {
        var classed = "edge-square";
        var labelClassed = "edge-label";
        var styleModifier = "normal";

        if (this.props.selected) {
            classed += " selected";
            labelClassed += "selected";
            styleModifier = "selected";
        }
        if (this.props.muted) {
            classed += " muted";
            labelClassed += "muted";
            styleModifier = "muted";
        }
        if (this.props.invisible) {
            classed += " edge-event-region";
            labelClassed += " edge-event-region";
        }
        if (!_underscore2["default"].isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        var height = this.props.size;
        var fill = this.props.fillColor || "none";

        var yCorner = this.props.y1 - this.props.size / 2;

        if (this.props.selected) {
            classed += " selected";
        }
        if (this.props.muted) {
            classed += " muted";
        }
        if (this.props.invisible) {
            classed += " edge-event-region";
        }
        if (!_underscore2["default"].isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        var opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0.0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        // find the length of an angled shape
        var width = undefined;

        if (this.props.y1 === this.props.y2) {
            width = Math.abs(this.props.x2 - this.props.x1);
        } else {
            var l1 = Math.abs(this.props.y2 - this.props.y1);
            var l2 = Math.abs(this.props.x2 - this.props.x1);
            width = Math.sqrt(l1 * l1 + l2 * l2);
        }

        /* to draw a center line, find the center point, then offset
         * the line to each side by 1/2 the height.
         * Using the new x y, rotate the positive offset line by the
         * same angle as the rest of the square, and the negative by
         * the opposite angle
         */

        // find the angle to rotate
        var angle = Math.atan2(this.props.y2 - this.props.y1, this.props.x2 - this.props.x1) * 180 / Math.PI;
        var rotate = "rotate(" + angle + " " + this.props.x1 + ", " + this.props.y1 + ")";

        // find the center of the square
        var centerX = (this.props.x1 + this.props.x2) / 2;
        var centerY = (this.props.y1 + this.props.y2) / 2;

        // find the offset position
        var offset = centerX + height / 2;
        // rotate the offsets

        var rotatedOffset1 = this._rotateOffset(offset, centerX, centerY, angle + 90);
        var rotatedOffset2 = this._rotateOffset(offset, centerX, centerY, angle - 90);

        var rx1 = rotatedOffset1[0];
        var ry1 = rotatedOffset1[1];
        var rx2 = rotatedOffset2[0];
        var ry2 = rotatedOffset2[1];

        var path = "";
        path += "M" + rx1 + "," + ry1;
        path += " L " + rx2 + " " + ry2;

        var cx = undefined;
        var cy = undefined;

        switch (this.props.labelPosition) {
            case "top":
                cx = rx2;
                cy = ry2;
                break;
            case "bottom":
                cx = rx1;
                cy = ry1;
                break;
            default:
                cx = centerX;
                cy = centerY;
                break;
        }

        var labelElement = null;

        if (this.props.label) {
            labelElement = _react2["default"].createElement(_edgeLabel2["default"], {
                x: cx,
                y: cy,
                r: angle,
                textAnchor: this.props.textAnchor,
                classed: labelClassed,
                style: this.props.labelStyle[styleModifier],
                label: this.props.label,
                xOffset: this.props.labelOffsetX,
                yOffset: this.props.labelOffsetY,
                labelPosition: this.props.labelPosition });
        }

        if (!this.props.centerLine) {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(
                    "g",
                    {
                        strokeWidth: this.props.width,
                        stroke: this.props.color,
                        opacity: opacity },
                    _react2["default"].createElement("rect", {
                        className: classed,
                        width: width,
                        height: height,
                        transform: rotate,
                        x: this.props.x1,
                        y: yCorner,
                        rx: this.props.roundedX,
                        ry: this.props.roundedY,
                        fill: fill,
                        onClick: this.handleClick })
                ),
                labelElement
            );
        } else {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(
                    "g",
                    {
                        strokeWidth: this.props.width,
                        stroke: this.props.color,
                        opacity: opacity,
                        onClick: this.handleClick },
                    _react2["default"].createElement("rect", {
                        className: classed,
                        width: width,
                        height: height,
                        transform: rotate,
                        x: this.props.x1,
                        y: yCorner,
                        rx: this.props.roundedX,
                        ry: this.props.roundedY,
                        fill: fill }),
                    _react2["default"].createElement("path", {
                        className: classed,
                        d: path,
                        fill: "none" })
                ),
                labelElement
            );
        }
    },

    handleClick: function handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
        e.stopPropagation();
    }
});
module.exports = exports["default"];