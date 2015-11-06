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
 * Draw a Concatenated circuit
 *
 * This component determines the x1, x2, y1, y2 coordinates on the page
 * and then renders a group of circuits by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 *
 * This is of the form:
 *     [end, connection, end, connection, end, ...]
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

var _constantsJs = require("./constants.js");

var _constantsJs2 = _interopRequireDefault(_constantsJs);

var _circuitDiagramEndpoint = require("./circuit-diagram-endpoint");

var _circuitDiagramEndpoint2 = _interopRequireDefault(_circuitDiagramEndpoint);

var _circuitDiagramConnection = require("./circuit-diagram-connection");

var _circuitDiagramConnection2 = _interopRequireDefault(_circuitDiagramConnection);

var _circuitDiagramNavigate = require("./circuit-diagram-navigate");

var _circuitDiagramNavigate2 = _interopRequireDefault(_circuitDiagramNavigate);

var Directions = _constantsJs2["default"].Directions;
exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-concatenated",

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
            return _react2["default"].createElement("rect", { className: "circuit-overlay", style: { fill: "#FDFDFD", fillOpacity: 0.65 },
                x: "0", y: "0", width: this.props.width, height: this.props.height });
        } else {
            return null;
        }
    },

    _renderCircuitElements: function _renderCircuitElements() {
        var _this = this;

        var elements = [];

        // determine the initial position

        var y1 = this.props.height / 4;
        var y2 = y1;
        var x1 = this.props.margin;
        var x2 = this.props.width - this.props.margin;
        var memberList = this.props.memberList;

        /* Since squares may be a different width than other connections, and may appear
         * at different positions inside the concatenation, we need to determine
         * the total combined squareWidth of all the square connectors, then subtract that
         * from the total available width.  The remaining length divided by the number
         * of non-square segments is how long the remaining non-square segments can be
         */

        var memberCount = memberList.length;
        var squareMemberCount = 0;

        var totalWidth = this.props.width - this.props.margin * 2;
        var totalSquareWidth = 0;

        _underscore2["default"].each(memberList, function (member) {
            if (_underscore2["default"].has(member.styleProperties, "squareWidth")) {
                totalSquareWidth += member.styleProperties.squareWidth;
                squareMemberCount += 1;
            }
        });

        var lineWidth = (totalWidth - totalSquareWidth) / (memberCount - squareMemberCount);

        // Draw the first endpoint

        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x1,
            y: y1,
            key: "endpoint-0",
            style: memberList[0].endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: this.props.endpointLabelOffset,
            label: memberList[0].endpointLabelA }));

        /* since the Z of each member is shared with the A of the next member, render only
         * the Z for each member starting with the first member
         */

        _underscore2["default"].each(memberList, function (member, memberIndex) {
            if (member.styleProperties.lineShape === "square") {
                x2 = x1 + member.styleProperties.squareWidth;
            } else {
                x2 = x1 + lineWidth;
            }
            elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x2,
                y: y2,
                key: "endpoint-" + (memberIndex + 1),
                style: member.endpointStyle,
                labelPosition: _this.props.endpointLabelPosition,
                offset: _this.props.endpointLabelOffset,
                label: member.endpointLabelZ }));
            x1 = x2;
        });

        // reset x1
        x1 = this.props.margin;

        // Collect all the connections

        _underscore2["default"].each(memberList, function (member, memberIndex) {
            var roundedX = member.styleProperties.roundedX || _this.props.roundedX;
            var roundedY = member.styleProperties.roundedY || _this.props.roundedY;

            if (member.styleProperties.lineShape === "square") {
                x2 = x1 + member.styleProperties.squareWidth;
            } else {
                x2 = x1 + lineWidth;
            }
            elements.push(_react2["default"].createElement(_circuitDiagramConnection2["default"], { x1: x1,
                x2: x2,
                y1: y1,
                y2: y2,
                key: "circuit-" + memberIndex,
                roundedX: roundedX,
                roundedY: roundedY,
                style: member.styleProperties.style,
                lineShape: member.styleProperties.lineShape,
                label: member.circuitLabel,
                labelPosition: _this.props.connectionLabelPosition,
                labelOffsetY: _this.props.yOffset,
                noNavigate: member.styleProperties.noNavigate,
                navTo: member.navTo,
                size: member.styleProperties.size,
                centerLine: member.styleProperties.centerLine,
                onSelectionChange: _this.props.onSelectionChange }));
            x1 = x2;
        });
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