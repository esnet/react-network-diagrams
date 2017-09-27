"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _equipmentBase = require("./equipment-base");

var _equipmentBase2 = _interopRequireDefault(_equipmentBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//17.52(w) 25.39(d) 24.49(h)

/* An equipment is an svg rect that needs to know its width, height, and style.
It receives its x and y starting position from the parent rack element, or a
default derived from a specified offset value.

It takes a label as well in the form of a string or list of strings if multilines are desired,
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

exports.default = _react2.default.createClass({
    displayName: "equipment",
    getInitialState: function getInitialState() {
        return { highlighted: false };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            noNavigate: false,
            labelPosition: "top",
            classed: "equipment",
            selected: false,
            muted: false
        };
    },


    /**
     * User hovers over the equipment
     */
    handleMouseOver: function handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },


    /**
     * Use stops hovering over equipment
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
    render: function render() {
        var hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8
        };

        var navTo = this.props.navTo;

        var width = void 0;
        var stroke = void 0;
        var fill = void 0;

        if (this.state.highlighted) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }

        return _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement(
                "g",
                null,
                _react2.default.createElement(_equipmentBase2.default, {
                    key: "equipment-base",
                    positionX: this.props.x,
                    positionY: this.props.y,
                    equipmentHeight: this.props.equipmentHeight,
                    equipmentWidth: this.props.equipmentWidth,
                    pxToInch: this.props.pxToInch,
                    classed: this.props.classed,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    color: stroke,
                    width: width,
                    fill: fill,
                    textAnchor: this.props.textAnchor,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.style.label,
                    label: this.props.label,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    showHeight: this.props.showHeight,
                    name: navTo })
            ),
            _react2.default.createElement(
                "g",
                { onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut },
                _react2.default.createElement(_equipmentBase2.default, {
                    key: "equipment-base-hit",
                    positionX: this.props.x,
                    positionY: this.props.y,
                    equipmentHeight: this.props.equipmentHeight,
                    equipmentWidth: this.props.equipmentWidth,
                    pxToInch: this.props.pxToInch,
                    classed: this.props.classed,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    color: hitStyle.stroke,
                    width: hitStyle.strokeWidth,
                    fill: fill,
                    textAnchor: this.props.textAnchor,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.style.label,
                    label: this.props.label,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    name: navTo,
                    onSelectionChange: this.handleSelectionChanged,
                    showHeight: this.props.showHeight,
                    invisible: true })
            )
        );
    }
});