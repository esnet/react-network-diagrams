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

var _constantsJs2 = _interopRequireDefault(_constantsJs);

var _circuitDiagramEndpoint = require("./circuit-diagram-endpoint");

var _circuitDiagramEndpoint2 = _interopRequireDefault(_circuitDiagramEndpoint);

var _circuitDiagramConnection = require("./circuit-diagram-connection");

var _circuitDiagramConnection2 = _interopRequireDefault(_circuitDiagramConnection);

var _circuitDiagramNavigate = require("./circuit-diagram-navigate");

var _circuitDiagramNavigate2 = _interopRequireDefault(_circuitDiagramNavigate);

var Directions = _constantsJs2["default"].Directions;

/**
 * Renders a horizontal circuit by determining x1, x2, y1, y2
 * coordinates on the page and then render a basic circuit by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 */

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-basic",

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

    _renderCircuitTitle: function _renderCircuitTitle(title) {
        var titleStyle = {
            textAnchor: "left",
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 14
        };

        if (!this.props.hideTitle) {
            return _react2["default"].createElement(
                "text",
                { className: "circuit-title",
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

    _renderParentNavigation: function _renderParentNavigation(parentId) {
        if (parentId) {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_circuitDiagramNavigate2["default"], { direction: Directions.NORTH,
                    ypos: 0,
                    id: this.props.parentId,
                    onSelectionChange: this.props.onSelectionChange })
            );
        } else {
            return null;
        }
    },

    _renderDisabledOverlay: function _renderDisabledOverlay(disabled) {
        if (disabled) {
            var overlayStyle = {
                fill: "#FDFDFD",
                fillOpacity: "0.65"
            };
            return _react2["default"].createElement("rect", { className: "circuit-overlay", style: overlayStyle,
                x: "0", y: "0", width: this.props.width, height: this.props.height });
        } else {
            return null;
        }
    },

    _renderCircuitElements: function _renderCircuitElements() {
        var elements = [];
        // const navId = this.props.navTo || null;
        var middle = this.props.width / 2;
        var x1 = undefined;
        var x2 = undefined;

        // render a square in the middle of the SVG grid by default
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
        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x1,
            y: y1,
            key: "a",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: labelOffset,
            label: this.props.endpointLabelA }));

        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x2,
            y: y2,
            key: "z",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: labelOffset,
            label: this.props.endpointLabelZ }));

        // The connection
        elements.push(_react2["default"].createElement(_circuitDiagramConnection2["default"], { x1: x1,
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

        var viewBox = "0 0 " + this.props.width + " " + this.props.height;

        return _react2["default"].createElement(
            "svg",
            { className: className, style: svgStyle, onClick: this._deselect },
            _react2["default"].createElement(
                "svg",
                { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                this._renderCircuitTitle(this.props.title),
                this._renderCircuitElements(),
                this._renderParentNavigation(this.props.parentId),
                this._renderDisabledOverlay(this.props.disabled)
            )
        );
    }
});
module.exports = exports["default"];