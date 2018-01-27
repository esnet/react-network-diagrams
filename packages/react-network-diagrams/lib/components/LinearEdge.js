"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinearEdge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _victor = require("victor");

var _victor2 = _interopRequireDefault(_victor);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _Label = require("./Label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import createReactClass from "create-react-class";

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
var LinearEdge = exports.LinearEdge = function (_React$Component) {
    _inherits(LinearEdge, _React$Component);

    function LinearEdge() {
        _classCallCheck(this, LinearEdge);

        return _possibleConstructorReturn(this, (LinearEdge.__proto__ || Object.getPrototypeOf(LinearEdge)).apply(this, arguments));
    }

    _createClass(LinearEdge, [{
        key: "handleClick",
        value: function handleClick(e) {
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange("edge", this.props.name);
            }
            e.stopPropagation();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

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
            if (!_underscore2.default.isUndefined(this.props.classed)) {
                classed += " " + this.props.classed;
            }

            var source = new _victor2.default(this.props.x1, this.props.y1);
            var target = new _victor2.default(this.props.x2, this.props.y2);

            var diff = target.clone().subtract(source);
            var norm = diff.clone().norm();
            var perp = new _victor2.default(-norm.y, norm.x);

            var offset = new _victor2.default(this.props.offset, this.props.offset);
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
            var bendScalar = new _victor2.default(bendOffset, bendOffset);

            var sourceToTarget = target.clone().subtract(source);
            var sourceToTargetNormalize = sourceToTarget.clone().norm();

            var targetToSource = source.clone().subtract(target);
            var targetToSourceNormalize = targetToSource.clone().norm();

            var sourceBend = sourceToTargetNormalize.clone().multiply(bendScalar).add(source);

            var targetBend = targetToSourceNormalize.clone().multiply(bendScalar).add(target);

            var sourceBendPerp = new _victor2.default(-sourceToTargetNormalize.y, sourceToTargetNormalize.x);
            var sourceBendPerpScalar = new _victor2.default(position, position);
            var sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

            var targetBendPerp = new _victor2.default(-targetToSourceNormalize.y, targetToSourceNormalize.x);
            var targetBendPerpScalar = new _victor2.default(-position, -position);
            var targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

            // Arrow at the target end
            var arrowLengthScalar = new _victor2.default(-arrowLength, -arrowLength);
            var arrowLeftScalar = new _victor2.default(arrowWidth / 2, arrowWidth / 2);
            var arrowRightScalar = new _victor2.default(-arrowWidth / 2, -arrowWidth / 2);
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
                labelElement = _react2.default.createElement(_Label.Label, {
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
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(
                        "g",
                        {
                            strokeWidth: this.props.width,
                            stroke: this.props.color,
                            opacity: opacity },
                        _react2.default.createElement("path", {
                            className: classed,
                            d: path,
                            fill: "none",
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } }),
                        _react2.default.createElement("path", {
                            className: classed,
                            d: arrow,
                            fill: this.props.color,
                            strokeWidth: "1" })
                    ),
                    labelElement
                );
            } else {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(
                        "g",
                        {
                            strokeWidth: this.props.width,
                            stroke: this.props.color,
                            opacity: opacity },
                        _react2.default.createElement("path", {
                            className: classed,
                            d: path,
                            fill: "none",
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } })
                    ),
                    labelElement
                );
            }
        }
    }]);

    return LinearEdge;
}(_react2.default.Component);

;

LinearEdge.propTypes = {
    /** The width of the circuit diagram */
    width: _propTypes2.default.number,

    color: _propTypes2.default.string,

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: _propTypes2.default.number,

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: _propTypes2.default.bool,

    /** Display the endpoint selected */
    selected: _propTypes2.default.bool,

    /** Display the endpoint muted */
    muted: _propTypes2.default.bool
};

LinearEdge.defaultProps = {
    width: 1,
    color: "#ddd",
    position: 0,
    arrow: false,
    selected: false,
    muted: false
};