"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Navigate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("../js/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2018, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
var Navigate = exports.Navigate = function (_React$Component) {
    _inherits(Navigate, _React$Component);

    function Navigate(props) {
        _classCallCheck(this, Navigate);

        var _this = _possibleConstructorReturn(this, (Navigate.__proto__ || Object.getPrototypeOf(Navigate)).call(this, props));

        _this.state = {
            hover: false
        };
        _this.handleMouseClick = _this.handleMouseClick.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        return _this;
    }

    /**
     * User hovers over the navigational arrow
     */


    _createClass(Navigate, [{
        key: "handleMouseOver",
        value: function handleMouseOver() {
            this.setState({ hover: true });
        }

        /**
         * User stops hovering over navigational arrow
         */

    }, {
        key: "handleMouseOut",
        value: function handleMouseOut() {
            this.setState({ hover: false });
        }
    }, {
        key: "handleMouseClick",
        value: function handleMouseClick() {
            if (this.props.id) {
                this.props.onSelectionChange(this.props.direction, this.props.id);
            }
        }
    }, {
        key: "render",
        value: function render() {
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
                    x: x - dx * 2,
                    y: y - dy / 2,
                    width: dx * 4,
                    height: dy * 2,
                    onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut,
                    onClick: this.handleMouseClick
                });
            } else if (this.props.direction === _constants.Directions.SOUTH) {
                hitRect = _react2.default.createElement("rect", {
                    className: "circuit-hitrect",
                    style: hitStyle,
                    x: x - dx * 2,
                    y: y - dy / 2 * 3,
                    width: dx * 4,
                    height: dy * 2,
                    onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut,
                    onClick: this.handleMouseClick
                });
            }

            if (this.props.id) {
                return _react2.default.createElement(
                    "g",
                    { key: "navigation-group" },
                    _react2.default.createElement("path", { d: path, className: "circuit-navigate", style: navStyle }),
                    hitRect
                );
            } else {
                return null;
            }
        }
    }]);

    return Navigate;
}(_react2.default.Component);

Navigate.propTypes = {
    navTo: _propTypes2.default.oneOfType([
    // Value passed down to the click
    _propTypes2.default.string, // handler at the lowest level primitive.
    _propTypes2.default.number // Will return to the onSelectionChange
    ]),
    direction: _propTypes2.default.oneOf([
    // Should the navigation go at the top or
    _constants.Directions.NORTH, // bottom of the container
    _constants.Directions.SOUTH]),
    margin: _propTypes2.default.number, // How far to inset the navigation
    width: _propTypes2.default.number, // Height and width of the container to
    height: _propTypes2.default.number, // guide positioning of the navigation
    onSelectionChange: _propTypes2.default.func // Callback for when the navigation is pressed
};

Navigate.defaultProps = {
    direction: _constants.Directions.SOUTH,
    margin: 50,
    width: 851,
    height: 200
};