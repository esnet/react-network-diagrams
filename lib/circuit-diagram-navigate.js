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
 * A component to draw a directional arrow to navigate between circuits
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

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _constantsJs = require("./constants.js");

var _constantsJs2 = _interopRequireDefault(_constantsJs);

var Directions = _constantsJs2["default"].Directions;

// These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var CIRCUIT_HEIGHT = 200;

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-navigate",

    getInitialState: function getInitialState() {
        return { "hover": false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            direction: Directions.SOUTH,
            margin: 50,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            xpos: CIRCUIT_WIDTH / 2,
            ypos: CIRCUIT_HEIGHT - 25

        };
    },

    /**
     * User hovers over the navigational arrow
     */
    _mouseOver: function _mouseOver() {
        this.setState({ "hover": true });
    },

    /**
     * Use stops hovering over navigational arrow
     */
    _mouseOut: function _mouseOut() {
        this.setState({ "hover": false });
    },

    _click: function _click() {
        if (this.props.id) {
            Backbone.history.navigate("circuit/view/" + this.props.id, { trigger: true });
        }
    },

    render: function render() {
        var dx = 5;
        var dy = 10;
        var x = this.props.xpos;
        var y = this.props.ypos;

        // Points for the svg path
        var pts = [];

        var yflip = undefined;
        if (this.props.direction === Directions.NORTH) {
            yflip = 1;
        } else if (this.props.direction === Directions.SOUTH) {
            yflip = -1;
        }

        // Arrow points
        pts.push(_util2["default"].format("%d,%d", x, y));
        pts.push(_util2["default"].format("%d,%d", x + dx, y + yflip * dy));
        pts.push(_util2["default"].format("%d,%d", x - dx, y + yflip * dy));
        pts.push(_util2["default"].format("%d,%d", x, y));
        var points = pts.join(" ");

        // Classes
        var ClassSet = _react2["default"].addons.classSet;
        var classes = ClassSet({
            "esdb-circuit-navigation": true,
            "hover": this.props.selected ? false : this.state.hover
        });

        // Hit area
        var hitRect = undefined;
        if (this.props.direction === Directions.NORTH) {
            hitRect = _react2["default"].createElement("rect", { className: "esdb-circuit-hitrect",
                x: x - dx * 2, y: y - dy / 2,
                width: dx * 4, height: dy * 2,
                onMouseOver: this._mouseOver,
                onMouseOut: this._mouseOut,
                onClick: this._click });
        } else if (this.props.direction === Directions.SOUTH) {
            hitRect = _react2["default"].createElement("rect", { className: "esdb-circuit-hitrect",
                x: x - dx * 2, y: y - dy / 2 * 3,
                width: dx * 4, height: dy * 2,
                onMouseOver: this._mouseOver,
                onMouseOut: this._mouseOut,
                onClick: this._click });
        }

        if (this.props.id) {
            return _react2["default"].createElement(
                "g",
                { key: "navigation-group" },
                _react2["default"].createElement("polyline", { points: points,
                    className: classes
                }),
                hitRect
            );
        } else {
            return null;
        }
    }
});
module.exports = exports["default"];