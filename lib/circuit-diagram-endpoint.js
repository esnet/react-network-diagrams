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

var _mapNode = require("./map-node");

var _mapNode2 = _interopRequireDefault(_mapNode);

// import "../examples/styles/circuit.css";
// These are nominal sizes for the circuit
// let CIRCUIT_WIDTH = 851;
// let CIRCUIT_HEIGHT = 200;

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-endpoint",

    getDefaultProps: function getDefaultProps() {
        return {
            radius: 7,
            shape: "circle",
            offset: 0,
            muted: false,
            selected: false,
            highlighted: false
        };
    },

    render: function render() {
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(_mapNode2["default"], { x: this.props.x,
                y: this.props.y,
                key: this.props.label,
                style: this.props.style.node,
                labelStyle: this.props.style.label,
                labelPosition: this.props.labelPosition,
                label: this.props.label,
                radius: this.props.radius,
                offset: this.props.offset,
                shape: this.props.shape,
                muted: this.props.muted,
                selected: this.props.selected,
                highlighted: this.props.highlighted })
        );
    }
});
module.exports = exports["default"];