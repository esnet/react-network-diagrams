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
 * A component for drawing a parallel circuit.
 *
 * The parallel component takes a 'circuit' prop, in addition to a
 * 'disabled' prop to display them disabled and mute events on them.
 *
 * In addition, Concatenated should have a 'branches' prop to list out the
 * branches that make up the parallel circuits.
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
    displayName: "circuit-diagram-parallel",

    getDefaultProps: function getDefaultProps() {
        return {
            width: 851,
            height: 250,
            disabled: false,
            titleOffsetX: 10,
            titleOffsetY: 15,
            margin: 100,
            noNavigate: false
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
                fill: "#FFFFFF",
                fillOpacity: "0.65"
            };
            return _react2["default"].createElement("rect", { className: "circuit-overlay", style: overlayStyle,
                x: "0", y: "0", width: this.props.width, height: this.props.height,
                style: { fill: "#FDFDFD", fillOpacity: 0.65 } });
        } else {
            return null;
        }
    },

    _renderCircuitElements: function _renderCircuitElements() {
        var _this = this;

        var elements = [];
        var x1 = this.props.margin;
        var x2 = this.props.width - this.props.margin;
        var y1 = this.props.height / 4;
        var y2 = y1;
        var memberList = this.props.memberList;

        // Push the two end points for the main circuit
        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x1,
            y: y1,
            key: "a",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: this.props.endpointLabelOffset,
            label: this.props.endpointLabelA }));

        elements.push(_react2["default"].createElement(_circuitDiagramEndpoint2["default"], { x: x2,
            y: y2,
            key: "z",
            style: this.props.endpointStyle,
            labelPosition: this.props.endpointLabelPosition,
            offset: this.props.endpointLabelOffset,
            label: this.props.endpointLabelZ }));

        var position = -8;
        var val = true;
        var rx1 = undefined;
        var rx2 = undefined;
        var ry1 = undefined;
        var ry2 = undefined;
        var yOffset = 0;

        /* Alternate rendering a circuit back and forth, incrementing the position
         * from the center each time, starting with the top for a single circuit
         * This will render the following order
         *      Circuit 3, Circuit 1, Circuit 2, Circuit 4
         */

        _underscore2["default"].each(memberList, function (member, memberIndex) {
            if ((memberIndex + 1) % 2) {
                position += 16;
            }
            switch (val) {
                case true:
                    rx1 = x2;
                    rx2 = x1;
                    ry1 = y2;
                    ry2 = y1;
                    break;
                case false:
                    rx1 = x1;
                    rx2 = x2;
                    ry1 = y1;
                    ry2 = y2;
                    break;
                default:
                    break;
            }
            elements.push(_react2["default"].createElement(_circuitDiagramConnection2["default"], { x1: rx1,
                x2: rx2,
                y1: ry1,
                y2: ry2,
                key: "circuit-" + memberIndex,
                style: member.styleProperties.style,
                lineShape: member.styleProperties.lineShape,
                label: member.circuitLabel,
                labelPosition: _this.props.connectionLabelPosition,
                labelOffsetY: yOffset,
                noNavigate: member.styleProperties.noNavigate,
                navTo: member.navTo,
                position: position,
                onSelectionChange: _this.props.onSelectionChange }));
            val = !val;
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