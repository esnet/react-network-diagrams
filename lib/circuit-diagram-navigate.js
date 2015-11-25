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

var _constantsJs = require("./constants.js");

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-navigate",

    getInitialState: function getInitialState() {
        return {
            hover: false
        };
    },

    propTypes: {
        navTo: _react2["default"].PropTypes.oneOfType([// Value passed down to the click
        _react2["default"].PropTypes.string, // handler at the lowest level primitive.
        _react2["default"].PropTypes.number // Will return to the onSelectionChange
        ]),
        direction: _react2["default"].PropTypes.oneOf([// Should the navigation go at the top or
        _constantsJs.Directions.NORTH, // bottom of the container
        _constantsJs.Directions.SOUTH]),
        margin: _react2["default"].PropTypes.number, // How far to inset the navigation
        width: _react2["default"].PropTypes.number, // Height and width of the container to
        height: _react2["default"].PropTypes.number, // guide positioning of the navigation
        onSelectionChange: _react2["default"].PropTypes.func // Callback for when the navigation is pressed
    },

    getDefaultProps: function getDefaultProps() {
        return {
            direction: _constantsJs.Directions.SOUTH,
            margin: 50,
            width: 851,
            height: 200
        };
    },

    /**
     * User hovers over the navigational arrow
     */
    handleMouseOver: function handleMouseOver() {
        this.setState({ hover: true });
    },

    /**
     * User stops hovering over navigational arrow
     */
    handleMouseOut: function handleMouseOut() {
        this.setState({ hover: false });
    },

    handleMouseClick: function handleMouseClick() {
        if (this.props.id) {
            this.props.onSelectionChange(this.props.direction, this.props.id);
        }
    },

    render: function render() {
        var x = this.props.xpos >= 0 ? this.props.xpos : this.props.width / 2;
        var y = this.props.ypos >= 0 ? this.props.ypos : this.props.height - 25;
        var dx = 5;
        var dy = 10;

        var yflip = undefined;
        if (this.props.direction === _constantsJs.Directions.NORTH) {
            yflip = 1;
        } else if (this.props.direction === _constantsJs.Directions.SOUTH) {
            yflip = -1;
        }

        // Arrow points
        var path = "";
        path += "M" + x + "," + y;
        path += " L " + (x + dx) + "," + (y + yflip * dy);
        path += " L " + (x - dx) + "," + (y + yflip * dy);
        path += " L " + x + "," + y;

        var style = {
            normal: {
                fill: "#4EC1E0",
                opacity: 0.65
            },
            highlighted: {
                cursor: "pointer",
                fill: "#4EC1E0",
                opacity: 0.95
            }
        };

        var hitStyle = {
            cursor: "pointer",
            fillOpacity: 0
        };

        var navStyle = style.normal;

        if (this.state.hover) {
            navStyle = style.highlighted;
        }

        // Hit area
        var hitRect = undefined;
        if (this.props.direction === _constantsJs.Directions.NORTH) {
            hitRect = _react2["default"].createElement("rect", {
                className: "circuit-hitrect",
                style: hitStyle,
                x: x - dx * 2, y: y - dy / 2,
                width: dx * 4, height: dy * 2,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleMouseClick });
        } else if (this.props.direction === _constantsJs.Directions.SOUTH) {
            hitRect = _react2["default"].createElement("rect", {
                className: "circuit-hitrect",
                style: hitStyle,
                x: x - dx * 2, y: y - dy / 2 * 3,
                width: dx * 4, height: dy * 2,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleMouseClick });
        }

        if (this.props.id) {
            return _react2["default"].createElement(
                "g",
                { key: "navigation-group" },
                _react2["default"].createElement("path", {
                    d: path,
                    className: "circuit-navigate",
                    style: navStyle }),
                hitRect
            );
        } else {
            return null;
        }
    }
});
module.exports = exports["default"];