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
 * Gets an x, y, labelPosition, textAnchor anf rotation 
 * renders a label based on the position.
 * The label can be a single string, or an array of strings
 * to display on multiple lines.
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

// labelPosition: "top",
exports["default"] = _react2["default"].createClass({
    displayName: "edge-label",

    getDefaultProps: function getDefaultProps() {
        return {
            r: 0,
            xOffset: 0,
            yOffset: 0
        };
    },

    render: function render() {
        var _this = this;

        console.log("edge-label", this.props);
        var label = [];
        if (!_underscore2["default"].isArray(this.props.label)) {
            label.push(this.props.label);
        } else {
            label = _underscore2["default"].clone(this.props.label);
        }

        var elements = [];

        var labelX = this.props.x;
        var labelY = this.props.y;
        var labelR = this.props.r;
        var textAnchor = this.props.textAnchor ? this.props.textAnchor : "middle";

        var rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";

        var fontOffset = this.props.style.fontSize ? this.props.style.fontSize : 10;
        var yOffset = this.props.yOffset;
        var xOffset = this.props.xOffset;

        if (this.props.labelPosition === "top" ||
        // this.props.labelPosition === "topright" ||
        // this.props.labelPosition === "topleft" ||
        this.props.labelPosition === "center") {
            label.reverse();
        }

        var x = undefined;
        var y = undefined;
        var centerY = undefined;

        if (this.props.labelPosition === "center") {
            centerY = labelY + label.length / 2 * fontOffset;
        }

        // centerY = labelY - ((label.length / 2) * fontOffset);
        /* else if (this.props.labelPosition === "top") {
            centerY = labelY - yOffset - (label.length * fontOffset);
        } else if (this.props.labelPosition === "topright") {
            centerY = this.props.y2 - yOffset - (label.length * fontOffset);
        } else if (this.props.labelPosition === "topleft") {
            centerY = this.props.y1 - yOffset - (label.length * fontOffset);
        }
        */

        _underscore2["default"].each(label, function (line, lineIndex) {
            switch (_this.props.labelPosition) {
                case "top":
                    y = labelY - yOffset - lineIndex * fontOffset;
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    break;

                case "bottom":
                    y = labelY + yOffset + fontOffset + lineIndex * fontOffset;
                    x = labelX + xOffset;
                    break;

                case "center":
                    y = centerY - yOffset - lineIndex * fontOffset;
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    break;
                /*
                case "topright":
                    y = labelY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX - xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "end";
                    break;
                 case "topleft":
                    y = labelY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "start";
                    break;
                 case "bottomright":
                    y = labelY + yOffset + fontOffset + (lineIndex * fontOffset);
                    x = labelX - xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    console.log(x,y,rotate);
                    //textAnchor = "end";
                    break;
                 case "bottomleft":
                    y = labelY + yOffset + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "start";
                    break;
                */
                default:
                    break;
            }
            elements.push(_react2["default"].createElement(
                "tspan",
                { x: x, y: y, key: "label-line-" + lineIndex },
                line
            ));
        });

        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "text",
                { textAnchor: textAnchor,
                    style: this.props.style,
                    key: "connection-label",
                    transform: rotate,
                    className: this.props.labelClassed },
                elements
            )
        );
    }
});
module.exports = exports["default"];