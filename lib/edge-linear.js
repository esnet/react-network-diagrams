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

/**
 * This component draws a linear bent path between a source and target. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. The
 * bend is specified with the prop 'position'.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying 'arrowWidth' and/or 'arrowHeight'. Both default to
 * 10px.
 *
 * The color and width of the edge may also be supplied.
 */
exports["default"] = _react2["default"].createClass({
    displayName: "edge-linear",

    getDefaultProps: function getDefaultProps() {
        return {
            width: 1,
            color: "#ddd",
            position: 0,
            arrow: false,
            selected: false,
            muted: false
        };
    },

    render: function render() {
        var classed = "edge-linear";
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

        var source = new _victor2["default"](this.props.x1, this.props.y1);
        var target = new _victor2["default"](this.props.x2, this.props.y2);

        var diff = target.clone().subtract(source);
        var norm = diff.clone().norm();
        var perp = new _victor2["default"](-norm.y, norm.x);

        var offset = new _victor2["default"](this.props.offset, this.props.offset);
        offset.multiply(perp);

        //
        // If the edge has multiple paths, with this edge being at
        // 'position' (this.props.position) then calculate those
        //

        var position = this.props.position;
        var arrowWidth = this.props.arrowWidth || this.props.width * 1.5;
        var arrowLength = this.props.arrowHeight || this.props.width * 2;

        // Positioned lines bend from source, to sourceBendControl, to
        // targetBendControl, and end at target.
        var bendOffset = this.props.position !== 0 ? 15 : 8;
        var bendScalar = new _victor2["default"](bendOffset, bendOffset);

        var sourceToTarget = target.clone().subtract(source);
        var sourceToTargetNormalize = sourceToTarget.clone().norm();

        var targetToSource = source.clone().subtract(target);
        var targetToSourceNormalize = targetToSource.clone().norm();

        var sourceBend = sourceToTargetNormalize.clone().multiply(bendScalar).add(source);

        var targetBend = targetToSourceNormalize.clone().multiply(bendScalar).add(target);

        var sourceBendPerp = new _victor2["default"](-sourceToTargetNormalize.y, sourceToTargetNormalize.x);
        var sourceBendPerpScalar = new _victor2["default"](position, position);
        var sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

        var targetBendPerp = new _victor2["default"](-targetToSourceNormalize.y, targetToSourceNormalize.x);
        var targetBendPerpScalar = new _victor2["default"](-position, -position);
        var targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

        // Arrow at the target end
        var arrowLengthScalar = new _victor2["default"](-arrowLength, -arrowLength);
        var arrowLeftScalar = new _victor2["default"](arrowWidth / 2, arrowWidth / 2);
        var arrowRightScalar = new _victor2["default"](-arrowWidth / 2, -arrowWidth / 2);
        var arrowHead = targetToSourceNormalize.clone().multiply(arrowLengthScalar).add(targetBendControl);
        var arrowBaseLeft = targetBendPerp.clone().multiply(arrowLeftScalar).add(targetBendControl);
        var arrowBaseRight = targetBendPerp.clone().multiply(arrowRightScalar).add(targetBendControl);

        // Line and Arc SVG path
        var path = "";
        path += "M" + source.x + "," + source.y;
        path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
        path += " L " + targetBendControl.x + " " + targetBendControl.y;

        // Arrow SVG path
        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        // Arrow SVG path
        var arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

        var opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0.0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        // Label Positioning

        var ry = Math.abs(targetBendControl.y - sourceBendControl.y);
        var rx = Math.abs(targetBendControl.x - sourceBendControl.x);
        var angle = Math.atan2(ry, rx) * 180 / Math.PI;

        var cx = (sourceBendControl.x + targetBendControl.x) / 2;
        var cy = (sourceBendControl.y + targetBendControl.y) / 2;

        if (target.y < source.y && source.x < target.x || source.x > target.x && target.y > source.y) {
            angle = -angle;
        }

        var labelElement = null;

        if (this.props.label) {
            labelElement = _react2["default"].createElement(_edgeLabel2["default"], {
                x: cx,
                y: cy,
                r: angle,
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
                        className: classed,
                        d: path,
                        fill: "none",
                        onClick: this.handleClick }),
                    _react2["default"].createElement("path", {
                        className: classed,
                        d: arrow,
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
                        className: classed,
                        d: path,
                        fill: "none",
                        onClick: this.handleClick })
                ),
                labelElement
            );
        }
    },

    handleClick: function handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
        e.stopPropagation();
    }
});
module.exports = exports["default"];