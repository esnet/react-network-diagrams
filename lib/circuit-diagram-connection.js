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
 * A module containing a the connection drawing primative.
 *
 * @module CircuitConnection
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

var _edgeSimple = require("./edge-simple");

var _edgeSimple2 = _interopRequireDefault(_edgeSimple);

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-connection",

    getInitialState: function getInitialState() {
        return { highlighted: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            noNavigate: false,
            labelPosition: "top",
            radius: 2,
            endpointShape: "circle",
            classed: "circuit",
            lineShape: "linear",
            selected: false,
            muted: false,
            position: 0,
            arrow: false,
            arrowWidth: 10,
            arrowHeight: 10,
            curveDirection: "right",
            curveOffset: 20,
            size: 40
        };
    },

    /**
     * User hovers over the circuit
     */
    handleMouseOver: function handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },

    /**
     * Use stops hovering over circuit
     */
    handleMouseOut: function handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    },

    handleSelectionChanged: function handleSelectionChanged(e, value) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    },

    renderEndpoints: function renderEndpoints() {
        if (this.props.arrow) {
            return _react2["default"].createElement("g", null);
        } else {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: this.props.x1,
                    y: this.props.y1,
                    key: "line-begin",
                    style: this.props.style,
                    radius: this.props.radius,
                    shape: this.props.endpointShape,
                    roundedX: this.props.endPointRoundedX,
                    roundedY: this.props.endPointRoundedY,
                    highlighted: this.state.highlighted,
                    muted: this.props.muted,
                    selected: this.props.selected }),
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: this.props.x2,
                    y: this.props.y2,
                    key: "line-end",
                    style: this.props.style,
                    radius: this.props.radius,
                    shape: this.props.endpointShape,
                    roundedX: this.props.endPointRoundedX,
                    roundedY: this.props.endPointRoundedY,
                    highlighted: this.state.highlighted,
                    muted: this.props.muted,
                    selected: this.props.selected })
            );
        }
    },

    render: function render() {
        var xOffset = undefined;
        var yOffset = undefined;

        if (this.props.labelOffsetX === undefined) {
            xOffset = this.props.radius * 1.33;
        } else {
            xOffset = this.props.labelOffsetX;
        }

        if (this.props.labelOffsetY === undefined) {
            yOffset = this.props.radius * 1.33;
        } else {
            yOffset = this.props.labelOffsetY;
        }

        var hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8
        };

        var navTo = this.props.navTo;

        var width = undefined;
        var stroke = undefined;
        var fill = undefined;
        var offset = undefined;

        if (this.props.lineShape === "angled") {
            offset = this.props.bendOffset;
        } else {
            offset = this.props.curveOffset;
        }

        if (this.state.highlighted) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }

        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_edgeSimple2["default"],
                // Positional Props used by all shapes
                {
                    x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    shape: this.props.lineShape,
                    key: "line-path",
                    label: this.props.label,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.style.label,
                    labelOffsetX: xOffset,
                    labelOffsetY: yOffset,
                    textAnchor: this.props.textAnchor,
                    color: stroke,
                    width: width,
                    muted: this.props.muted,
                    selected: this.props.selected,
                    classed: this.props.classed,
                    roundedX: this.props.roundedX,
                    roundedY: this.props.roundedY,
                    fillColor: fill,
                    size: this.props.size,
                    centerLine: this.props.centerLine,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    position: this.props.position,
                    offset: offset,
                    curveDirection: this.props.curveDirection,
                    name: navTo })
            ),
            _react2["default"].createElement(
                "g",
                { onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut },
                _react2["default"].createElement(_edgeSimple2["default"], { x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,

                    // Identity Props used by all shapes
                    shape: this.props.lineShape, // controls shape of the line
                    key: "line-path-hit", // needed for react element

                    // Label Props used by all shapes
                    label: this.props.label, // provides label to be displayed
                    labelPosition: this.props.labelPosition, // controls where label
                    // is situated around the line
                    labelStyle: this.props.style.label, // controls the
                    // style of the label
                    labelOffsetX: xOffset, // controls the +/- x offset from labelPosition
                    labelOffsetY: yOffset, // controls the +/- y offset from labelPosition
                    textAnchor: this.props.textAnchor, // controls the positioning of the text

                    // Style Props
                    color: hitStyle.stroke, // controls color of the line
                    width: hitStyle.strokeWidth, // controls the stroke thickness
                    muted: this.props.muted, // controls style
                    selected: this.props.selected, // controls style
                    classed: this.props.classed, // provides a psuedo css class for the line

                    // Square props
                    roundedX: this.props.roundedX, // controls corner rounding
                    roundedY: this.props.roundedY, // controls corner rounding
                    fillColor: fill, // controls color of the fill
                    size: this.props.size, // controls height of square
                    centerLine: this.props.centerLine, // controls display of horizontal center line

                    // Arrow props, not used by square
                    arrow: this.props.arrow, // determines whether to
                    // display nodes or arrows at ends of line
                    arrowWidth: this.props.arrowWidth, // controls width of arrow
                    arrowHeight: this.props.arrowHeight, // controls height of arrow

                    // Line offset props, used by angle and arc
                    position: this.props.position, // controls angle of offset
                    offset: offset, // controls length of offset line
                    curveDirection: this.props.curveDirection, // controls left / right
                    // line path with reference
                    // to line center

                    // Navigation props
                    name: navTo, // returned value for _onSelection change - all
                    onSelectionChange: this.handleSelectionChanged, // callback function to
                    // control what happens if the
                    // element is clicked
                    invisible: true // Internal prop for hiding this line
                })
            ),
            _react2["default"].createElement(
                "g",
                null,
                this.renderEndpoints()
            )
        );
    }
});
module.exports = exports["default"];