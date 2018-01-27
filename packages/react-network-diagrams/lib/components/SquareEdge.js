"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SquareEdge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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
 * This component draws a rectangle using the source and target to determine sizing and position. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. Rounding is specified with the
 * props roundedX and roundedY.
 *
 *
 * The color and width of the rectangle may also be supplied.
 */
var SquareEdge = exports.SquareEdge = function (_React$Component) {
    _inherits(SquareEdge, _React$Component);

    function SquareEdge() {
        _classCallCheck(this, SquareEdge);

        return _possibleConstructorReturn(this, (SquareEdge.__proto__ || Object.getPrototypeOf(SquareEdge)).apply(this, arguments));
    }

    _createClass(SquareEdge, [{
        key: "handleClick",
        value: function handleClick(e) {
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange("edge", this.props.name);
            }
            // e.stopPropagation();
        }
    }, {
        key: "_rotateOffset",
        value: function _rotateOffset(cx, x, y, a) {
            var r = Math.PI / 180 * a;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
            var nx = x - (x - cx) * cos;
            var ny = y - (x - cx) * sin;
            return [nx, ny];
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var classed = "edge-square";
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

            var height = this.props.size;
            var fill = this.props.fillColor || "none";

            var yCorner = this.props.y1 - this.props.size / 2;

            if (this.props.selected) {
                classed += " selected";
            }
            if (this.props.muted) {
                classed += " muted";
            }
            if (this.props.invisible) {
                classed += " edge-event-region";
            }
            if (!_underscore2.default.isUndefined(this.props.classed)) {
                classed += " " + this.props.classed;
            }

            var opacity = 1.0;
            if (this.props.invisible) {
                opacity = 0.0;
            } else if (this.props.muted) {
                opacity = 0.3;
            }

            // find the length of an angled shape
            var width = void 0;

            if (this.props.y1 === this.props.y2) {
                width = Math.abs(this.props.x2 - this.props.x1);
            } else {
                var l1 = Math.abs(this.props.y2 - this.props.y1);
                var l2 = Math.abs(this.props.x2 - this.props.x1);
                width = Math.sqrt(l1 * l1 + l2 * l2);
            }

            /* to draw a center line, find the center point, then offset
             * the line to each side by 1/2 the height.
             * Using the new x y, rotate the positive offset line by the
             * same angle as the rest of the square, and the negative by
             * the opposite angle
             */

            // find the angle to rotate
            var angle = Math.atan2(this.props.y2 - this.props.y1, this.props.x2 - this.props.x1) * 180 / Math.PI;
            var rotate = "rotate(" + angle + " " + this.props.x1 + ", " + this.props.y1 + ")";

            // find the center of the square
            var centerX = (this.props.x1 + this.props.x2) / 2;
            var centerY = (this.props.y1 + this.props.y2) / 2;

            // find the offset position
            var offset = centerX + height / 2;
            // rotate the offsets

            var rotatedOffset1 = this._rotateOffset(offset, centerX, centerY, angle + 90);
            var rotatedOffset2 = this._rotateOffset(offset, centerX, centerY, angle - 90);

            var rx1 = rotatedOffset1[0];
            var ry1 = rotatedOffset1[1];
            var rx2 = rotatedOffset2[0];
            var ry2 = rotatedOffset2[1];

            var path = "";
            path += "M" + rx1 + "," + ry1;
            path += " L " + rx2 + " " + ry2;

            var cx = void 0;
            var cy = void 0;

            switch (this.props.labelPosition) {
                case "top":
                    cx = rx2;
                    cy = ry2;
                    break;
                case "bottom":
                    cx = rx1;
                    cy = ry1;
                    break;
                default:
                    cx = centerX;
                    cy = centerY;
                    break;
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

            if (!this.props.centerLine) {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(
                        "g",
                        {
                            strokeWidth: this.props.width,
                            stroke: this.props.color,
                            opacity: opacity },
                        _react2.default.createElement("rect", {
                            className: classed,
                            width: width,
                            height: height,
                            transform: rotate,
                            x: this.props.x1,
                            y: yCorner,
                            rx: this.props.roundedX,
                            ry: this.props.roundedY,
                            fill: fill,
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } })
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
                            opacity: opacity,
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } },
                        _react2.default.createElement("rect", {
                            className: classed,
                            width: width,
                            height: height,
                            transform: rotate,
                            x: this.props.x1,
                            y: yCorner,
                            rx: this.props.roundedX,
                            ry: this.props.roundedY,
                            fill: fill }),
                        _react2.default.createElement("path", {
                            className: classed,
                            d: path,
                            fill: "none" })
                    ),
                    labelElement
                );
            }
        }
    }]);

    return SquareEdge;
}(_react2.default.Component);

;

SquareEdge.propTypes = {

    /** When the endpoint shape is a `square`, this controls the radius of corners */
    roundedX: _propTypes2.default.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners */
    roundedY: _propTypes2.default.number,

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
    muted: _propTypes2.default.bool,

    /** Controls the size of the square */
    size: _propTypes2.default.number
};

SquareEdge.defaultProps = {
    roundedX: 0,
    roundedY: 0,
    color: "#ddd",
    position: 0,
    arrow: false,
    selected: false,
    muted: false,
    size: 40
};