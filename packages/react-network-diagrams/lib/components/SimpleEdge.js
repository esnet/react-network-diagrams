"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AngledEdge = require("./AngledEdge");

var _AngledEdge2 = _interopRequireDefault(_AngledEdge);

var _ArcEdge = require("./ArcEdge");

var _ArcEdge2 = _interopRequireDefault(_ArcEdge);

var _LinearEdge = require("./LinearEdge");

var _LinearEdge2 = _interopRequireDefault(_LinearEdge);

var _SquareEdge = require("./SquareEdge");

var _SquareEdge2 = _interopRequireDefault(_SquareEdge);

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

var SimpleEdge = function (_React$Component) {
    _inherits(SimpleEdge, _React$Component);

    function SimpleEdge() {
        _classCallCheck(this, SimpleEdge);

        return _possibleConstructorReturn(this, (SimpleEdge.__proto__ || Object.getPrototypeOf(SimpleEdge)).apply(this, arguments));
    }

    _createClass(SimpleEdge, [{
        key: "render",
        value: function render() {
            // Class for edge
            var classed = "edge";
            if (this.props.selected) {
                classed += " selected";
            }
            if (this.props.muted) {
                classed += " muted";
            }
            if (!_underscore2.default.isUndefined(this.props.classed)) {
                classed += " " + this.props.classed;
            }

            // Render based on shape
            if (this.props.shape === "curved") {
                return _react2.default.createElement(_ArcEdge2.default, {
                    x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    key: this.props.name,
                    label: this.props.label,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.labelStyle,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    textAnchor: this.props.textAnchor,
                    color: this.props.color,
                    width: this.props.width,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    classed: classed,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    position: this.props.position,
                    curveDirection: this.props.curveDirection,
                    offset: this.props.offset,
                    name: this.props.name,
                    invisible: this.props.invisible,
                    onSelectionChange: this.props.onSelectionChange });
            } else if (this.props.shape === "square") {
                return _react2.default.createElement(_SquareEdge2.default, {
                    x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    key: this.props.name,
                    label: this.props.label,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.labelStyle,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    textAnchor: this.props.textAnchor,
                    color: this.props.color,
                    width: this.props.width,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    classed: classed,
                    roundedX: this.props.roundedX,
                    roundedY: this.props.roundedY,
                    fillColor: this.props.fillColor,
                    size: this.props.size,
                    centerLine: this.props.centerLine,
                    name: this.props.name,
                    invisible: this.props.invisible,
                    onSelectionChange: this.props.onSelectionChange });
            } else if (this.props.shape === "angled") {
                return _react2.default.createElement(_AngledEdge2.default, {
                    x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    key: this.props.name,
                    label: this.props.label,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.labelStyle,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    textAnchor: this.props.textAnchor,
                    color: this.props.color,
                    width: this.props.width,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    classed: classed,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    position: this.props.position,
                    curveDirection: this.props.curveDirection,
                    offset: this.props.offset,
                    name: this.props.name,
                    invisible: this.props.invisible,
                    onSelectionChange: this.props.onSelectionChange });
            } else {
                return _react2.default.createElement(_LinearEdge2.default, {
                    x1: this.props.x1,
                    x2: this.props.x2,
                    y1: this.props.y1,
                    y2: this.props.y2,
                    key: this.props.name,
                    label: this.props.label,
                    labelPosition: this.props.labelPosition,
                    labelStyle: this.props.labelStyle,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    textAnchor: this.props.textAnchor,
                    color: this.props.color,
                    width: this.props.width,
                    selected: this.props.selected,
                    muted: this.props.muted,
                    classed: classed,
                    arrow: this.props.arrow,
                    arrowWidth: this.props.arrowWidth,
                    arrowHeight: this.props.arrowHeight,
                    position: this.props.position,
                    name: this.props.name,
                    invisible: this.props.invisible,
                    onSelectionChange: this.props.onSelectionChange });
            }
        }
    }]);

    return SimpleEdge;
}(_react2.default.Component);

exports.default = SimpleEdge;
;

SimpleEdge.propTypes = {
    color: _propTypes2.default.string,

    /** The width of the circuit diagram */
    width: _propTypes2.default.number,

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: _propTypes2.default.number,

    /** Display the edge selected */
    selected: _propTypes2.default.bool,

    /** Display the edge muted */
    muted: _propTypes2.default.bool,

    /** Display the edge invisible */
    invisible: _propTypes2.default.bool,

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: _propTypes2.default.bool,

    /** Color of the edge */
    fillColor: _propTypes2.default.string
};

SimpleEdge.defaultProps = {
    color: "#ddd",
    width: 4,
    position: 0,
    selected: false,
    muted: false,
    invisible: false,
    arrow: false,
    fillColor: "none"
};