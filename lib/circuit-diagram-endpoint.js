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
 * A module containing a the endpoint drawing primative. This essentially renders
 * the shape we use to represent and endpoint on the circuit diagrams.
 * The result is a <g> element containing the endpoint rendering, so this needs
 * to be used within the context of an <svg> block.
 *
 * @module CircuitEndpoint
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

// These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var CIRCUIT_HEIGHT = 200;

/**
 *
 * @class
 *
 * Renders the shape we use to represent an endpoint.
 *
 * **Props**
 *
 * * position - Where to place the endpoint defined on a 0 to 1 scale
 * * label    - The label to attach to the endpoint
 *
 * **State**
 * * none
 */
exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-endpoint",

    getDefaultProps: function getDefaultProps() {
        return {
            margin: 50,
            radius: 7,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            labelOffsetX: -25
        };
    },

    render: function render() {
        var x = this.props.position; // * this.props.width;
        var transform = "translate(" + x + " " + 0 + ")";
        var rotate = "rotate(" + -40 + " " + 30 + "," + -25 + ")";
        var ClassSet = _classnames2["default"];
        var c = ClassSet({
            "esdb-circuit-endpoint": true
        });

        return _react2["default"].createElement(
            "g",
            { key: "endpoint-group", transform: transform },
            _react2["default"].createElement("circle", { className: c, key: "endpoint-circle",
                cx: 0, cy: 0, r: this.props.radius }),
            _react2["default"].createElement(
                "text",
                { className: "esdb-endpoint-label", key: "endpoint-label", x: this.props.labelOffsetX, y: 0, transform: rotate },
                this.props.label
            )
        );
    }
});
module.exports = exports["default"];