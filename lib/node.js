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

exports["default"] = _react2["default"].createClass({
    displayName: "node",

    getDefaultProps: function getDefaultProps() {
        return {
            radius: 5,
            selected: false,
            shape: "circle",
            style: {},
            isDragging: false,
            labelOffsetX: 0,
            labelOffsetY: 0,
            rx: 0,
            ry: 0
        };
    },

    statics: {
        /**
         * Provides a spec for the editor UI to render properties
         * for this node
         */
        spec: function spec() {
            return [{ attr: "name", label: "Name", type: "text" }, { attr: "x", label: "Position x", type: "integer" }, { attr: "y", label: "Position y", type: "integer" }, { attr: "label_dx", label: "Label offset x", type: "integer" }, { attr: "label_dy", label: "Label offset y", type: "integer" }, {
                attr: "label_position",
                label: "Label position",
                type: "choice",
                options: [{ value: "top", label: "Top" }, { value: "bottom", label: "Bottom" }, { value: "left", label: "Left" }, { value: "right", label: "Right" }, { value: "topleft", label: "Top left" }, { value: "topright", label: "Top right" }, { value: "bottomleft", label: "Bottom left" }, { value: "bottomright", label: "Bottom right" }]
            }];
        }
    },

    handMouseClick: function handMouseClick(e) {
        e.stopPropagation();
        var id = this.props.id || this.props.name;
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("node", id);
        }
    },

    handleMouseOver: function handleMouseOver() {},

    handleMouseDown: function handleMouseDown(e) {
        e.stopPropagation();
        var id = this.props.id || this.props.name;
        if (this.props.onMouseDown) {
            this.props.onMouseDown(id, e);
        }
    },

    render: function render() {
        var nodeClasses = "map-node";
        var labelClasses = "map-node-label";
        var styleModifier = "normal";
        if (this.props.selected) {
            styleModifier = "selected";
            nodeClasses += " selected";
            labelClasses += " selected";
        }
        if (this.props.muted) {
            styleModifier = "muted";
            nodeClasses += " muted";
            labelClasses += " muted";
        }
        if (this.props.highlighted) {
            styleModifier = "highlighted";
            nodeClasses += " highlighted";
            labelClasses += " highlighted";
        }

        var basicOffset = this.props.offset ? this.props.offset : this.props.radius * 1.33;

        // 0.8 * font size? ish..
        var fontOffset = 8;

        var labelX = this.props.x;
        var labelY = this.props.y;
        var labelR = 0;
        var textAnchor = "middle";
        var rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
        switch (this.props.labelPosition) {
            case "left":
                labelX -= basicOffset;
                labelY += 5;
                textAnchor = "end";
                break;

            case "right":
                labelX += basicOffset;
                labelY += 5;
                textAnchor = "start";
                break;

            case "top":
                labelY -= basicOffset;
                break;

            case "topright":
                labelY -= basicOffset;
                labelX += basicOffset;
                textAnchor = "start";
                break;

            case "topleft":
                labelY -= basicOffset;
                labelX -= basicOffset;
                textAnchor = "end";
                break;

            case "bottom":
                labelY += basicOffset + fontOffset;
                break;

            case "bottomright":
                labelY += basicOffset + fontOffset;
                labelX += basicOffset;
                textAnchor = "start";
                break;

            case "bottomleft":
                labelY += basicOffset + fontOffset;
                labelX -= basicOffset;
                textAnchor = "end";
                break;

            case "bottomleftangled":
                labelX += 2;
                labelY += basicOffset + fontOffset;
                labelR = -45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "end";
                break;

            case "bottomrightangled":
                labelX -= 2;
                labelY += basicOffset + fontOffset;
                labelR = 45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "start";
                break;

            case "topleftangled":
                labelY -= basicOffset;
                labelR = 45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "end";
                break;

            case "toprightangled":
                labelY -= basicOffset;
                labelR = -45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "start";
                break;

            default:
                break;
        }

        labelX += this.props.labelOffsetX;
        labelY += this.props.labelOffsetY;

        var nodeElement = undefined;
        if (this.props.shape === "cloud") {
            nodeClasses += " map-node-shape-cloud";
            labelClasses += " map-node-label-cloud";

            var cloudPath = "M" + this.props.x + "," + (this.props.y + 5);
            cloudPath += "l-25,0 c-10,0 -10,-10 -5,-15";
            cloudPath += "c5,-5 15,-5 15,0 c0,-15 25,-15 25,-5 c10,-10 25,15 10,20 Z";

            nodeElement = _react2["default"].createElement("path", {
                d: cloudPath,
                style: this.props.style[styleModifier],
                className: nodeClasses });

            switch (this.props.labelPosition) {
                case "top":
                case "topright":
                case "topleft":
                    labelY += 7;
                    break;
                case "bottom":
                case "bottomleft":
                case "bottomright":
                    labelY -= 15;
                    break;
                default:
                    break;
            }
            labelX -= 3;
        } else if (this.props.shape === "square") {
            nodeClasses += " map-node-shape-square";
            labelClasses += " map-node-shape-square";
            var x = this.props.x - this.props.radius;
            var y = this.props.y - this.props.radius;
            var width = 2 * this.props.radius;
            nodeElement = _react2["default"].createElement("rect", { x: x,
                y: y,
                rx: this.props.rx,
                ry: this.props.ry,
                width: width,
                height: width,
                style: this.props.style[styleModifier],
                className: nodeClasses });

            switch (this.props.labelPosition) {
                case "left":
                    labelX -= 2;
                    break;
                case "right":
                    labelX += 2;
                    break;
                default:
                    break;
            }
        } else {
            nodeClasses += " map-node-shape-circle";
            labelClasses += " map-node-label-circle";
            nodeElement = _react2["default"].createElement("circle", { cx: this.props.x,
                cy: this.props.y,
                r: this.props.radius,
                style: this.props.style[styleModifier],
                className: nodeClasses });
        }

        if (this.props.label) {
            return _react2["default"].createElement(
                "g",
                { onClick: this.handMouseClick,
                    onMouseOver: this.handleMouseOver,
                    onMouseDown: this.handleMouseDown,
                    onMouseMove: this.handleMouseMove },
                nodeElement,
                _react2["default"].createElement(
                    "text",
                    { x: labelX,
                        y: labelY,
                        textAnchor: textAnchor,
                        transform: rotate,
                        style: this.props.labelStyle[styleModifier],
                        className: labelClasses },
                    this.props.label
                )
            );
        } else {
            return _react2["default"].createElement(
                "g",
                { onClick: this.handMouseClick,
                    onMouseOver: this.handleMouseOver,
                    onMouseDown: this.handleMouseDown,
                    onMouseMove: this.handleMouseMove,
                    onMouseUp: this.handleMouseUp },
                nodeElement
            );
        }
    }
});
module.exports = exports["default"];