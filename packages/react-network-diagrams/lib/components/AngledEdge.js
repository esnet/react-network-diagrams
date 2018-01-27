"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AngledEdge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _victor = require("victor");

var _victor2 = _interopRequireDefault(_victor);

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

// Alias
var Vector = _victor2.default;

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

var AngledEdge = exports.AngledEdge = function (_React$Component) {
    _inherits(AngledEdge, _React$Component);

    function AngledEdge() {
        _classCallCheck(this, AngledEdge);

        return _possibleConstructorReturn(this, (AngledEdge.__proto__ || Object.getPrototypeOf(AngledEdge)).apply(this, arguments));
    }

    _createClass(AngledEdge, [{
        key: "handleClick",
        value: function handleClick(e) {
            console.log("angledEdge handleClick e, this ", e, this);
            e.stopPropagation();
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange("edge", this.props.name);
            }
        }
    }, {
        key: "rotateOffset",
        value: function rotateOffset(cx, x, y, a) {
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
            if (!_underscore2.default.isUndefined(this.props.classed)) {
                classed += " " + this.props.classed;
            }

            var angle = this.props.position;
            var offset = this.props.offset;

            // set the source and target vectors
            var source = new Vector(this.props.x1, this.props.y1);
            var target = new Vector(this.props.x2, this.props.y2);

            var sourceAngle = void 0;
            var targetAngle = void 0;
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
                labelElement = _react2.default.createElement(_Label.Label, {
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
                            d: path,
                            fill: "none", className: classed,
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } }),
                        _react2.default.createElement("path", {
                            d: arrow,
                            className: classed,
                            stroke: this.props.color,
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
                            d: path,
                            fill: "none",
                            className: classed,
                            onClick: function onClick(e) {
                                return _this2.handleClick(e);
                            } })
                    ),
                    labelElement
                );
            }
        }
    }]);

    return AngledEdge;
}(_react2.default.Component);

;

AngledEdge.propTypes = {
    /** An offset to the position of the label which can be used for fine tuning */
    offset: _propTypes2.default.number,

    /** The width of the circuit diagram */
    width: _propTypes2.default.number,

    color: _propTypes2.default.string,

    curveDirection: _propTypes2.default.string,

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: _propTypes2.default.bool,

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: _propTypes2.default.number,

    /** Display the endpoint selected */
    selected: _propTypes2.default.bool,

    /** Display the endpoint muted */
    muted: _propTypes2.default.bool
};

AngledEdge.defaultProps = {
    offset: 15,
    width: 1,
    color: "#ddd",
    curveDirection: "left",
    arrow: false,
    position: 30,
    selected: false,
    muted: false
};