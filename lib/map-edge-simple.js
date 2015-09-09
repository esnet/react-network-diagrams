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
    displayName: "map-edge-simple",

    getDefaultProps: function getDefaultProps() {
        return {
            color: "#ddd",
            width: 4,
            position: 0,
            selected: false,
            muted: false
        };
    },

    render: function render() {
        // Class for edge
        var classed = "map-edge";
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
            return _react2["default"].createElement(ArcEdge, {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                color: this.props.color,
                width: this.props.width,
                position: this.props.position,
                curveDirection: this.props.curveDirection,
                classed: this.props.classed,
                key: this.props.name,
                name: this.props.name,
                selected: this.props.selected,
                muted: this.props.muted });
        } else {
            return _react2["default"].createElement(LinearEdge, {
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                color: this.props.color,
                width: this.props.width,
                position: this.props.position,
                classed: this.props.classed,
                key: this.props.name,
                name: this.props.name,
                selected: this.props.selected,
                muted: this.props.muted });
        }
    }
});
module.exports = exports["default"];