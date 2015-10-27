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

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("../examples/styles/circuit.css");

var PANEL_WIDTH = 851;

exports["default"] = _react2["default"].createClass({
    displayName: "location-diagram-endpoint",

    getDefaultProps: function getDefaultProps() {
        return {
            margin: 50,
            radius: 7,
            width: PANEL_WIDTH,
            labelOffsetY: 20
        };
    },

    render: function render() {
        var x = this.props.begin; // * this.props.width;
        var y = this.props.yOffset;
        var transform = "translate(" + x + " " + y + ")";
        var ClassSet = _classnames2["default"];
        var c = ClassSet({
            "esdb-circuit-endpoint": true
        });

        var label = this.props.label || "";
        if (this.props.circuit) {
            return _react2["default"].createElement(
                "g",
                { key: "endpoint-group", transform: transform },
                _react2["default"].createElement("circle", { className: c, key: "endpoint-circle",
                    cx: 0, cy: 0, r: this.props.radius }),
                _react2["default"].createElement(
                    "text",
                    { className: "esdb-circuit-label",
                        key: "endpoint-label",
                        x: 0,
                        y: this.props.labelOffsetY },
                    label
                )
            );
        } else {
            return _react2["default"].createElement("g", null);
        }
    }
});
module.exports = exports["default"];