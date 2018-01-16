"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConcatenatedCircuit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Connection = require("./Connection");

var _Endpoint = require("./Endpoint");

var _Navigate = require("./Navigate");

var _constants = require("./constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import createReactClass from "create-react-class";

/**
 * Draw a Concatenated circuit
 *
 * This component determines the (x1, y1), (x2, y2) coordinates on the page
 * and then renders a group of circuits by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props.
 *
 * This is of the form:
 *     [endpoint, connection, endpoint, connection, endpoint, ...]
 */
var ConcatenatedCircuit = exports.ConcatenatedCircuit = function (_React$Component) {
    _inherits(ConcatenatedCircuit, _React$Component);

    function ConcatenatedCircuit() {
        _classCallCheck(this, ConcatenatedCircuit);

        return _possibleConstructorReturn(this, (ConcatenatedCircuit.__proto__ || Object.getPrototypeOf(ConcatenatedCircuit)).apply(this, arguments));
    }

    _createClass(ConcatenatedCircuit, [{
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
                        ypos: 0,
                        width: this.props.width,
                        height: this.props.height,
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
            var style = { fill: "#FDFDFD", fillOpacity: 0.65 };
            if (disabled) {
                return _react2.default.createElement("rect", {
                    className: "circuit-overlay",
                    style: style,
                    x: "0",
                    y: "0",
                    width: this.props.width,
                    height: this.props.height });
            } else {
                return null;
            }
        }
    }, {
        key: "renderCircuitElements",
        value: function renderCircuitElements() {
            var _this2 = this;

            var elements = [];

            // Determine the initial position
            var y1 = this.props.height / 4;
            var y2 = y1;
            var x1 = this.props.margin;
            var x2 = this.props.width - this.props.margin;
            var memberList = this.props.memberList;

            //
            // Since squares may be a different width than other connections, and may appear
            // at different positions inside the concatenation, we need to determine
            // the total combined squareWidth of all the square connectors, then subtract that
            // from the total available width.  The remaining length divided by the number
            // of non-square segments is how long the remaining non-square segments can be
            //

            var memberCount = memberList.length;
            var squareMemberCount = 0;

            var totalWidth = this.props.width - this.props.margin * 2;
            var totalSquareWidth = 0;

            _underscore2.default.each(memberList, function (member) {
                if (_underscore2.default.has(member.styleProperties, "squareWidth")) {
                    totalSquareWidth += member.styleProperties.squareWidth;
                    squareMemberCount += 1;
                }
            });

            var lineWidth = (totalWidth - totalSquareWidth) / (memberCount - squareMemberCount);

            // Draw the first endpoint
            elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                x: x1,
                y: y1,
                key: "endpoint-0",
                style: memberList[0].endpointStyle,
                labelPosition: this.props.endpointLabelPosition,
                offset: this.props.endpointLabelOffset,
                label: memberList[0].endpointLabelA }));

            /* since the Z of each member is shared with the A of the next member, render only
             * the Z for each member starting with the first member
             */

            _underscore2.default.each(memberList, function (member, memberIndex) {
                if (member.styleProperties.lineShape === "square") {
                    x2 = x1 + member.styleProperties.squareWidth;
                } else {
                    x2 = x1 + lineWidth;
                }
                elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                    x: x2,
                    y: y2,
                    key: "endpoint-" + (memberIndex + 1),
                    style: member.endpointStyle,
                    labelPosition: _this2.props.endpointLabelPosition,
                    offset: _this2.props.endpointLabelOffset,
                    label: member.endpointLabelZ }));
                x1 = x2;
            });

            // reset x1
            x1 = this.props.margin;

            // Collect all the connections

            _underscore2.default.each(memberList, function (member, memberIndex) {
                var roundedX = member.styleProperties.roundedX || _this2.props.roundedX;
                var roundedY = member.styleProperties.roundedY || _this2.props.roundedY;

                if (member.styleProperties.lineShape === "square") {
                    x2 = x1 + member.styleProperties.squareWidth;
                } else {
                    x2 = x1 + lineWidth;
                }
                elements.push(_react2.default.createElement(_Connection.Connection, {
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2,
                    key: "circuit-" + memberIndex,
                    roundedX: roundedX,
                    roundedY: roundedY,
                    style: member.styleProperties.style,
                    lineShape: member.styleProperties.lineShape,
                    label: member.circuitLabel,
                    labelPosition: _this2.props.connectionLabelPosition,
                    labelOffsetY: _this2.props.yOffset,
                    noNavigate: member.styleProperties.noNavigate,
                    navTo: member.navTo,
                    size: member.styleProperties.size,
                    centerLine: member.styleProperties.centerLine,
                    onSelectionChange: _this2.props.onSelectionChange }));
                x1 = x2;
            });
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

    return ConcatenatedCircuit;
}(_react2.default.Component);

;

ConcatenatedCircuit.propTypes = {

    /** The width of the circuit diagram */
    width: _propTypes2.default.number,

    /** The height of the circuit diagram */
    height: _propTypes2.default.number,

    /** The position of the title relative to the left side of the diagram */
    titleOffsetX: _propTypes2.default.number,

    /** The position of the title relative to the top of the diagram */
    titleOffsetY: _propTypes2.default.number,

    /** The blank margin around the diagram drawing */
    margin: _propTypes2.default.number,

    /**
     * Controls shape of the line, can be "linear", "square", "angled", "arc".
     */
    lineShape: _propTypes2.default.oneOf(["linear", "square", "angled", "arc"]),

    /**
     * To accurately display each of the member circuits, the concatenated circuit
     * requires an ordered array of circuit objects, where each object contains
     * the props to be used by the lower level connection and endpoint primitives.
     * Since the list renders sequentially, it assumes that the member circuits are in order. The list can be any length and needs to be constructed as such:
     *
     * ```
     * const memberList = [
     *     {
     *         styleProperties: darkFiberStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 1",
     *         endpointLabelZ: "Endpoint 2",
     *         circuitLabel: "Member 1",
     *         navTo: "Member 1"
     *     }, {
     *         styleProperties: couplerStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 2",
     *         endpointLabelZ: "Endpoint 3",
     *         circuitLabel: "Member 2",
     *         navTo: "Member 2"
     *     }, {
     *         styleProperties: leasedStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 3",
     *         endpointLabelZ: "Endpoint 4",
     *         circuitLabel: "Member 3",
     *         navTo: "Member 3"
     *     }
     * ];
     * ```
     */
    memberList: _propTypes2.default.array.isRequired,

    /**
     * Described the position of the connection label; accepts **"top"**, **"center"**, or **"bottom"**
     */
    connectionLabelPosition: _propTypes2.default.oneOf(["top", "center", "bottom"]),

    /**
     * The position of the label around the endpoint.
     */
    endpointLabelPosition: _propTypes2.default.oneOf(["left", "right", "top", "topright", "topleft", "bottom", "bottomright", "bottomleft", "bottomleftangled", "bottomrightangled", "topleftangled", "toprightangled"]),

    /**
     * This is the vertical distance from the center line to offset
     * the connection label.
     */
    yOffset: _propTypes2.default.number,

    /**
     * This is the distance from the endpoint that the endpoint
     * label will be rendered.
     */
    endpointLabelOffset: _propTypes2.default.number,

    /**
     * The string to display in the top left corner of the diagram
     */
    title: _propTypes2.default.string,

    /**
     * Value that determines whether or not the upper left corner title is displayed
     */
    hideTitle: _propTypes2.default.bool,

    /**
     * Determines if the circuit view is muted.  Typically used in
     * conjunction with `parentID`
     */
    disabled: _propTypes2.default.bool,

    /**
     * Callback function used to handle clicks.
     */
    onSelectionChange: _propTypes2.default.func,

    /**
     * Value that if provided, will render a small nav arrow that
     * when clicked, navigates to that element. Used mainly when we want
     * to show a parent / child relationship between two circuits.
     */
    parentId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.Number]),

    /**
     * Boolean value that determines if the element uses the onSelectionChange
     * change and can be clicked
     */
    noNavigate: _propTypes2.default.bool,

    /**
     * This value is used to determine X coordinates for a square, if you want
     * the square to be smaller than the default line width. Overrides the
     * margin prop if a square is displayed
     */
    squareWidth: _propTypes2.default.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedX: _propTypes2.default.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedY: _propTypes2.default.number
};

ConcatenatedCircuit.defaultProps = {
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