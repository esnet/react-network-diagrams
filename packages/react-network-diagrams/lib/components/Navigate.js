"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("./constants.js");

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

exports.default = (0, _createReactClass2.default)({

    displayName: "Navigate",

    getInitialState: function getInitialState() {
        return {
            hover: false
        };
    },


    propTypes: {
        navTo: _propTypes2.default.oneOfType([// Value passed down to the click
        _propTypes2.default.string, // handler at the lowest level primitive.
        _propTypes2.default.number // Will return to the onSelectionChange
        ]),
        direction: _propTypes2.default.oneOf([// Should the navigation go at the top or
        _constants.Directions.NORTH, // bottom of the container
        _constants.Directions.SOUTH]),
        margin: _propTypes2.default.number, // How far to inset the navigation
        width: _propTypes2.default.number, // Height and width of the container to
        height: _propTypes2.default.number, // guide positioning of the navigation
        onSelectionChange: _propTypes2.default.func // Callback for when the navigation is pressed
    },

    getDefaultProps: function getDefaultProps() {
        return {
            direction: _constants.Directions.SOUTH,
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

        var yflip = void 0;
        if (this.props.direction === _constants.Directions.NORTH) {
            yflip = 1;
        } else if (this.props.direction === _constants.Directions.SOUTH) {
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
        var hitRect = void 0;
        if (this.props.direction === _constants.Directions.NORTH) {
            hitRect = _react2.default.createElement("rect", {
                className: "circuit-hitrect",
                style: hitStyle,
                x: x - dx * 2, y: y - dy / 2,
                width: dx * 4, height: dy * 2,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleMouseClick });
        } else if (this.props.direction === _constants.Directions.SOUTH) {
            hitRect = _react2.default.createElement("rect", {
                className: "circuit-hitrect",
                style: hitStyle,
                x: x - dx * 2, y: y - dy / 2 * 3,
                width: dx * 4, height: dy * 2,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleMouseClick });
        }

        if (this.props.id) {
            return _react2.default.createElement(
                "g",
                { key: "navigation-group" },
                _react2.default.createElement("path", {
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