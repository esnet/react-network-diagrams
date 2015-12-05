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

var _victor = require("victor");

var _victor2 = _interopRequireDefault(_victor);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

// Alias
var Vector = _victor2["default"];

/**
 * This component draws an angled path between a source and target. The
 * source and target are specified as props x1, y1 and x2, y2.
 *
 * The angle of the path is either left aligned (vertical, then horizontal)
 * or right aligned (horizontal, then vertical) as specified by curve
 * direction.  The offset and position prop are used to position the line
 * in relation to the endpoints for bi-directional purposes.

 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying arrowWidth and/or arrowHeight. It defaults to
 * being the width*1.5 wide and width*2 long.
 *
 * Stroke color and width can also be supplied.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "edge-angled",

    getDefaultProps: function getDefaultProps() {
        return {
            offset: 15,
            width: 1,
            color: "#ddd",
            curveDirection: "left",
            arrow: false,
            position: 30,
            selected: false,
            muted: false
        };
    },

    rotateOffset: function rotateOffset(cx, x, y, a) {
        var r = Math.PI / 180 * a;
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        var nx = x - (x - cx) * cos;
        var ny = y - (x - cx) * sin;
        return [nx, ny];
    },

    render: function render() {
        // Class
        var classed = "edge-angled";
        var labelClassed = "edge-label";
        var styleModifier = "normal";

        if (this.props.selected) {
            classed += " selected";
            labelClassed += "selected";
            styleModifier = "selected";
        }
        if (this.props.muted) {
            classed += " muted";
            labelClassed += "muted";
            styleModifier = "muted";
        }
        if (this.props.invisible) {
            classed += " edge-event-region";
            labelClassed += " edge-event-region";
        }
        if (!_underscore2["default"].isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        var angle = this.props.position;
        var offset = this.props.offset;

        // set the source and target vectors
        var source = new Vector(this.props.x1, this.props.y1);
        var target = new Vector(this.props.x2, this.props.y2);

        var sourceAngle = undefined;
        var targetAngle = undefined;
        var arrowWidth = this.props.arrowWidth || this.props.width * 1.5;
        var arrowLength = this.props.arrowHeight || this.props.width * 2;

        switch (this.props.curveDirection) {
            case "left":
                if (source.x < target.x && source.y < target.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = -angle;
                } else if (target.x < source.x && target.y < source.y) {
                    sourceAngle = 180 + angle;
                    targetAngle = -90 - angle;
                } else if (source.x < target.x && source.y > target.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = angle;
                } else if (target.x < source.x && target.y > source.y) {
                    sourceAngle = 180 - angle;
                    targetAngle = 90 + angle;
                } else if (source.x > target.x && source.y === target.y) {
                    sourceAngle = 180 - angle;
                    targetAngle = 180 + angle;
                } else if (source.x === target.x && source.y > target.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = -90 + angle;
                } else if (source.x === target.x && source.y < target.y) {
                    sourceAngle = 90 - angle;
                    targetAngle = 90 + angle;
                } else {
                    sourceAngle = -angle;
                    targetAngle = angle;
                }
                break;
            case "right":
                if (source.x < target.x && source.y < target.y) {
                    sourceAngle = -angle;
                    targetAngle = 90 + angle;
                } else if (target.x < source.x && target.y < source.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = 180 + angle;
                } else if (source.x < target.x && source.y > target.y) {
                    sourceAngle = angle;
                    targetAngle = -90 - angle;
                } else if (target.x < source.x && target.y > source.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = 180 - angle;
                } else if (source.x > target.x && source.y === target.y) {
                    sourceAngle = 180 + angle;
                    targetAngle = 180 - angle;
                } else if (source.x === target.x && source.y > target.y) {
                    sourceAngle = -90 + angle;
                    targetAngle = -90 - angle;
                } else if (source.x === target.x && source.y < target.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = 90 - angle;
                } else {
                    sourceAngle = angle;
                    targetAngle = -angle;
                }
                break;
            default:
                break;
        }

        var sourceRotated = this.rotateOffset(source.x + offset, source.x, source.y, sourceAngle);
        var targetRotated = this.rotateOffset(target.x - offset, target.x, target.y, targetAngle);

        var sourceOffset = new Vector(sourceRotated[0], sourceRotated[1]);
        var targetOffset = new Vector(targetRotated[0], targetRotated[1]);

        var arrowBase = targetOffset.clone();

        var diff = offset - arrowLength;

        var arrowHeadLocation = this.rotateOffset(target.x - diff, target.x, target.y, targetAngle);

        var arrowLeftSide = this.rotateOffset(arrowBase.x - arrowWidth / 2, arrowBase.x, arrowBase.y, 90 + targetAngle);
        var arrowRightSide = this.rotateOffset(arrowBase.x + arrowWidth / 2, arrowBase.x, arrowBase.y, 90 + targetAngle);

        var arrowBaseLeft = new Vector(arrowLeftSide[0], arrowLeftSide[1]);
        var arrowBaseRight = new Vector(arrowRightSide[0], arrowRightSide[1]);
        var arrowHead = new Vector(arrowHeadLocation[0], arrowHeadLocation[1]);

        var path = "";
        path += "M " + source.x + "," + source.y;
        path += " L " + sourceOffset.x + "," + sourceOffset.y;

        // Label Positioning
        var cx = (source.x + target.x) / 2;
        var cy = (source.y + target.y) / 2;

        switch (this.props.curveDirection) {
            case "left":
                if (source.x < target.x && source.y < target.y || source.x < target.x && source.y > target.y) {
                    path += " L " + sourceOffset.x + "," + targetOffset.y;
                    cy = target.y;
                } else {
                    path += " L " + targetOffset.x + "," + sourceOffset.y;
                    cy = source.y;
                }
                break;
            case "right":
                if (source.x < target.x && source.y < target.y || source.x < target.x && source.y > target.y) {
                    path += " L " + targetOffset.x + "," + sourceOffset.y;
                    cy = source.y;
                } else {
                    path += " L " + sourceOffset.x + "," + targetOffset.y;
                    cy = target.y;
                }
                break;
            default:
                break;
        }

        path += " L " + targetOffset.x + "," + targetOffset.y;

        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        // Draw an arrow at the target end
        // Arrow SVG

        var arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;
        arrow += "L" + arrowHead.x + "," + arrowHead.y;

        var opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        var labelElement = null;

        if (this.props.label) {
            labelElement = _react2["default"].createElement(_edgeLabel2["default"], {
                x: cx,
                y: cy,
                textAnchor: this.props.textAnchor,
                classed: labelClassed,
                style: this.props.labelStyle[styleModifier],
                label: this.props.label,
                xOffset: this.props.labelOffsetX,
                yOffset: this.props.labelOffsetY,
                labelPosition: this.props.labelPosition });
        }

        if (this.props.arrow) {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(
                    "g",
                    {
                        strokeWidth: this.props.width,
                        stroke: this.props.color,
                        opacity: opacity },
                    _react2["default"].createElement("path", {
                        d: path,
                        fill: "none", className: classed,
                        onClick: this.handleClick }),
                    _react2["default"].createElement("path", {
                        d: arrow,
                        className: classed,
                        stroke: this.props.color,
                        fill: this.props.color,
                        strokeWidth: "1" })
                ),
                labelElement
            );
        } else {
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(
                    "g",
                    {
                        strokeWidth: this.props.width,
                        stroke: this.props.color,
                        opacity: opacity },
                    _react2["default"].createElement("path", {
                        d: path,
                        fill: "none",
                        className: classed,
                        onClick: this.handleClick })
                ),
                labelElement
            );
        }
    },

    handleClick: function handleClick(e) {
        e.stopPropagation();
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
    }
});
module.exports = exports["default"];