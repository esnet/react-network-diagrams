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

var _circuitDiagramEndpoint = require("./circuit-diagram-endpoint");

var _circuitDiagramEndpoint2 = _interopRequireDefault(_circuitDiagramEndpoint);

var _circuitDiagramConnection = require("./circuit-diagram-connection");

var _circuitDiagramConnection2 = _interopRequireDefault(_circuitDiagramConnection);

var _circuitDiagramNavigate = require("./circuit-diagram-navigate");

var _circuitDiagramNavigate2 = _interopRequireDefault(_circuitDiagramNavigate);

var _constantsJs = require("./constants.js");

/**
 * Renders a horizontal circuit by determining `x1`, `x2`, `y1`, `y2`
 * coordinates on the page and then render a basic circuit by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 */
exports["default"] = _react2["default"].createClass({

    displayName: "BasicDiagram",

    getDefaultProps: function getDefaultProps() {
        return {
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
    },

    propTypes: {
        /** The style of the line */
        lineStyle: _react2["default"].PropTypes.object.isRequired,

        /** Text value describing the shape of the line, "linear", "curved", etc. */
        lineShape: _react2["default"].PropTypes.oneOf(["linear", "curved", "square", "angled"]),

        /**
         * Describes the position of the connection label.
         */
        connectionLabelPosition: _react2["default"].PropTypes.oneOf(["top", "center", "bottom"]),

        /**
         * String to be displayed for the connection. If an array of strings is
         * supplied they will be displayed in a multi-line layout.
         */
        circuitLabel: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string)]),

        /**
         * Vertical distance from the center line to offset the connection label.
         */
        yOffset: _react2["default"].PropTypes.number,

        /**
         * The string to display in the top left corner of the diagram.
         */
        title: _react2["default"].PropTypes.string,

        /**
         * Boolean value that determines if the element uses the onSelectionChange
         * change and can be clicked
         */
        noNavigate: _react2["default"].PropTypes.bool,

        /** Controls the size of the square */
        size: _react2["default"].PropTypes.number,

        /** controls if a horizontal line is drawn down the center of a square */
        centerLine: _react2["default"].PropTypes.bool,

        /**
         * This value is used to determine X coordinates for a square, if you want
         * the square to be smaller than the default line width. Overrides the
         * margin prop if a square is displayed
         */
        squareWidth: _react2["default"].PropTypes.number,

        /**
         * The style of the endpoint.
         * TODO: be more explicit here about the expected shape.
         */
        endpointStyle: _react2["default"].PropTypes.object,

        /**
         * The position of the label around the endpoint.
         */
        endpointLabelPosition: _react2["default"].PropTypes.oneOf(["left", "right", "top", "topright", "topleft", "bottom", "bottomright", "bottomleft", "bottomleftangled", "bottomrightangled", "topleftangled", "toprightangled"]),

        /**
         * Left side endpoint label
         */
        endpointLabelA: _react2["default"].PropTypes.string,

        /**
         * Right side endpoint label
         */
        endpointLabelZ: _react2["default"].PropTypes.string,

        /**
         * Disables the circuit by muting the colors and disabling events.
         */
        disabled: _react2["default"].PropTypes.bool,

        /**
         * Callback specified to handle selection of the circuit. The value supplied
         * to the callback is whatever was specified in the navTo prop.
         */
        onSelectionChange: _react2["default"].PropTypes.func,

        /**
         * Value passed down to the click handler at the lowest level primitive.
         * Will return to the onSelectionChange its value.
         */
        navTo: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number]),

        /**
         * If provided, will render a small nav arrow that when clicked,
         * navigates to that element. Used mainly when we want to show a parent / child
         * relationship between two circuits.
         */
        parentId: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number])
    },

    renderCircuitTitle: function renderCircuitTitle(title) {
        var titleStyle = {
            textAnchor: "left",
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 14
        };

        if (!this.props.hideTitle) {
            return _react2["default"].createElement(
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
    },

    renderParentNavigation: function renderParentNavigation(parentId) {
        if (parentId) {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_circuitDiagramNavigate2["default"], {
                    direction: _constantsJs.Directions.NORTH,
                    width: this.props.width,
                    height: this.props.height,
                    ypos: 0,
                    id: this.props.parentId,
                    onSelectionChange: this.props.onSelectionChange })
            );
        } else {
            return null;
        }
    },

    renderDisabledOverlay: function renderDisabledOverlay(disabled) {
        if (disabled) {
            var overlayStyle = {
                fill: "#FDFDFD",
                fillOpacity: "0.65"
            };
            return _react2["default"].createElement("rect", {
                className: "circuit-overlay",
                style: overlayStyle,
                x: "0", y: "0",
                width: this.props.width,
                height: this.props.height });
        } else {
            return null;
        }
    },

    renderCircuitElements: function renderCircuitElements() {
        var elements = [];
        var middle = this.props.width / 2;
        var x1 = undefined;
        var x2 = undefined;

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
        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
            x: x1,
            y: y1,
            key: "a",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: labelOffset,
            label: this.props.endpointLabelA }));

        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
            x: x2,
            y: y2,
            key: "z",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: labelOffset,
            label: this.props.endpointLabelZ }));

        // The connection
        elements.push(_react2["default"].createElement(_circuitDiagramConnection2["default"], {
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

        return _react2["default"].createElement(
            "g",
            null,
            elements
        );
    },

    render: function render() {
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
        var svgStyle = undefined;
        if (this.props.disabled) {
            className += " disabled";
            svgStyle = circuitContainer.disabled;
        } else {
            svgStyle = circuitContainer.normal;
        }

        return _react2["default"].createElement(
            "svg",
            { className: className, style: svgStyle, onClick: this._deselect },
            this.renderCircuitTitle(this.props.title),
            this.renderCircuitElements(),
            this.renderParentNavigation(this.props.parentId),
            this.renderDisabledOverlay(this.props.disabled)
        );
    }
});
module.exports = exports["default"];