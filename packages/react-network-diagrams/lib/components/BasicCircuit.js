"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicCircuit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Connection = require("./Connection");

var _Endpoint = require("./Endpoint");

var _Navigate = require("./Navigate");

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
 * Renders a horizontal circuit by determining `x1`, `x2`, `y1`, `y2`
 * coordinates on the page and then render a basic circuit by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 */
var BasicCircuit = exports.BasicCircuit = function (_React$Component) {
    _inherits(BasicCircuit, _React$Component);

    function BasicCircuit() {
        _classCallCheck(this, BasicCircuit);

        return _possibleConstructorReturn(this, (BasicCircuit.__proto__ || Object.getPrototypeOf(BasicCircuit)).apply(this, arguments));
    }

    _createClass(BasicCircuit, [{
        key: "renderCircuitTitle",
        value: function renderCircuitTitle(title) {
            var titleStyle = {
                textAnchor: "left",
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 14
            };

            if (!this.props.hideTitle) {
                return _react2.default.createElement(
                    "text",
                    {
                        className: "circuit-title",
                        key: "circuit-title",
                        style: titleStyle,
                        x: this.props.titleOffsetX,
                        y: this.props.titleOffsetY },
                    title
                );
            } else {
                return null;
            }
        }
    }, {
        key: "renderParentNavigation",
        value: function renderParentNavigation(parentId) {
            if (parentId) {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_Navigate.Navigate, {
                        direction: _constants.Directions.NORTH,
                        width: this.props.width,
                        height: this.props.height,
                        ypos: 0,
                        id: this.props.parentId,
                        onSelectionChange: this.props.onSelectionChange })
                );
            } else {
                return null;
            }
        }
    }, {
        key: "renderDisabledOverlay",
        value: function renderDisabledOverlay(disabled) {
            if (disabled) {
                var overlayStyle = {
                    fill: "#FDFDFD",
                    fillOpacity: "0.65"
                };
                return _react2.default.createElement("rect", {
                    className: "circuit-overlay",
                    style: overlayStyle,
                    x: "0", y: "0",
                    width: this.props.width,
                    height: this.props.height });
            } else {
                return null;
            }
        }
    }, {
        key: "renderCircuitElements",
        value: function renderCircuitElements() {
            var elements = [];
            var middle = this.props.width / 2;
            var x1 = void 0;
            var x2 = void 0;

            // Render a square in the middle of the SVG grid by default
            if (this.props.lineShape === "square") {
                x1 = middle - this.props.squareWidth / 2;
                x2 = middle + this.props.squareWidth / 2;
            } else {
                x1 = this.props.margin;
                x2 = this.props.width - this.props.margin;
            }

            var y1 = this.props.height / 4;
            var y2 = y1;
            var labelOffset = this.props.size ? this.props.size / 2 : 0;

            // The two endpoints of this circuit
            elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                x: x1,
                y: y1,
                key: "a",
                style: this.props.endpointStyle,
                labelPosition: this.props.endpointLabelPosition,
                offset: labelOffset,
                label: this.props.endpointLabelA }));

            elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                x: x2,
                y: y2,
                key: "z",
                style: this.props.endpointStyle,
                labelPosition: this.props.endpointLabelPosition,
                offset: labelOffset,
                label: this.props.endpointLabelZ }));

            // The connection
            elements.push(_react2.default.createElement(_Connection.Connection, {
                x1: x1,
                x2: x2,
                y1: y1,
                y2: y2,
                key: "line",
                roundedX: this.props.roundedX,
                roundedY: this.props.roundedY,
                style: this.props.lineStyle,
                lineShape: this.props.lineShape,
                label: this.props.circuitLabel,
                labelPosition: this.props.connectionLabelPosition,
                labelOffsetY: this.props.yOffset,
                noNavigate: this.props.noNavigate,
                navTo: this.props.navTo,
                size: this.props.size,
                centerLine: this.props.centerLine,
                onSelectionChange: this.props.onSelectionChange }));

            return _react2.default.createElement(
                "g",
                null,
                elements
            );
        }
    }, {
        key: "render",
        value: function render() {
            var circuitContainer = {
                normal: {
                    borderTopStyle: "solid",
                    borderBottomStyle: "solid",
                    borderWidth: 1,
                    borderTopColor: "#FFFFFF",
                    borderBottomColor: "#EFEFEF",
                    width: "100%",
                    height: this.props.height
                },
                disabled: {
                    width: "100%",
                    height: this.props.height
                }
            };

            var className = "circuit-container";
            var svgStyle = void 0;
            if (this.props.disabled) {
                className += " disabled";
                svgStyle = circuitContainer.disabled;
            } else {
                svgStyle = circuitContainer.normal;
            }

            return _react2.default.createElement(
                "svg",
                { className: className, style: svgStyle, onClick: this._deselect },
                this.renderCircuitTitle(this.props.title),
                this.renderCircuitElements(),
                this.renderParentNavigation(this.props.parentId),
                this.renderDisabledOverlay(this.props.disabled)
            );
        }
    }]);

    return BasicCircuit;
}(_react2.default.Component);

;

BasicCircuit.propTypes = {

    /** The style of the line */
    lineStyle: _propTypes2.default.object.isRequired,

    /** Text value describing the shape of the line, "linear", "curved", etc. */
    lineShape: _propTypes2.default.oneOf(["linear", "curved", "square", "angled"]),

    /**
     * Describes the position of the connection label.
     */
    connectionLabelPosition: _propTypes2.default.oneOf(["top", "center", "bottom"]),

    /**
     * String to be displayed for the connection. If an array of strings is
     * supplied they will be displayed in a multi-line layout.
     */
    circuitLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),

    /**
     * Vertical distance from the center line to offset the connection label.
     */
    yOffset: _propTypes2.default.number,

    /**
     * The string to display in the top left corner of the diagram.
     */
    title: _propTypes2.default.string,

    /**
     * Boolean value that determines if the element uses the onSelectionChange
     * change and can be clicked
     */
    noNavigate: _propTypes2.default.bool,

    /** Controls the size of the square */
    size: _propTypes2.default.number,

    /** controls if a horizontal line is drawn down the center of a square */
    centerLine: _propTypes2.default.bool,

    /**
     * This value is used to determine X coordinates for a square, if you want
     * the square to be smaller than the default line width. Overrides the
     * margin prop if a square is displayed
     */
    squareWidth: _propTypes2.default.number,

    /**
     * The style of the endpoint.
     * TODO: be more explicit here about the expected shape.
     */
    endpointStyle: _propTypes2.default.object,

    /**
     * The position of the label around the endpoint.
     */
    endpointLabelPosition: _propTypes2.default.oneOf(["left", "right", "top", "topright", "topleft", "bottom", "bottomright", "bottomleft", "bottomleftangled", "bottomrightangled", "topleftangled", "toprightangled"]),

    /**
     * Left side endpoint label
     */
    endpointLabelA: _propTypes2.default.string,

    /**
     * Right side endpoint label
     */
    endpointLabelZ: _propTypes2.default.string,

    /**
     * Disables the circuit by muting the colors and disabling events.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Callback specified to handle selection of the circuit. The value supplied
     * to the callback is whatever was specified in the navTo prop.
     */
    onSelectionChange: _propTypes2.default.func,

    /**
     * Value passed down to the click handler at the lowest level primitive.
     * Will return to the onSelectionChange its value.
     */
    navTo: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

    /**
     * If provided, will render a small nav arrow that when clicked,
     * navigates to that element. Used mainly when we want to show a parent / child
     * relationship between two circuits.
     */
    parentId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

    /** The width of the circuit diagram */
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    titleOffsetX: _propTypes2.default.number,
    titleOffsetY: _propTypes2.default.number,

    /** The blank margin around the diagram drawing */
    margin: _propTypes2.default.number,
    roundedX: _propTypes2.default.number,
    roundedY: _propTypes2.default.number
};

BasicCircuit.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    noNavigate: false,
    squareWidth: 25,
    roundedX: 5,
    roundedY: 5
};