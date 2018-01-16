"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Label = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

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
 * Gets an x, y, labelPosition, textAnchor and rotation and
 * renders a label based on the position.
 * The label can be a single string, or an array of strings
 * to display on multiple lines.
 */
var Label = exports.Label = function (_React$Component) {
    _inherits(Label, _React$Component);

    function Label() {
        _classCallCheck(this, Label);

        return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
    }

    _createClass(Label, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var label = [];
            if (!_underscore2.default.isArray(this.props.label)) {
                label.push(this.props.label);
            } else {
                label = _underscore2.default.clone(this.props.label);
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

            if (this.props.labelPosition === "top" || this.props.labelPosition === "center") {
                label.reverse();
            }

            var x = void 0;
            var y = void 0;
            var centerY = void 0;

            if (this.props.labelPosition === "center") {
                centerY = labelY + label.length / 2 * fontOffset;
            }

            _underscore2.default.each(label, function (line, lineIndex) {
                x = labelX + xOffset;
                switch (_this2.props.labelPosition) {
                    case "top":
                        y = labelY - yOffset - lineIndex * fontOffset;
                        break;

                    case "bottom":
                        y = labelY + yOffset + fontOffset + lineIndex * fontOffset;
                        break;

                    case "center":
                        y = centerY - yOffset - lineIndex * fontOffset;
                        break;
                    default:
                        break;
                }
                elements.push(_react2.default.createElement(
                    "tspan",
                    { x: x, y: y, key: "label-line-" + lineIndex },
                    line
                ));
            });

            return _react2.default.createElement(
                "g",
                null,
                _react2.default.createElement(
                    "text",
                    {
                        textAnchor: textAnchor,
                        style: this.props.style,
                        key: "connection-label",
                        transform: rotate,
                        className: this.props.labelClassed },
                    elements
                )
            );
        }
    }]);

    return Label;
}(_react2.default.Component);

;

Label.propTypes = {
    r: _propTypes2.default.number,

    /**
     * Horizontal distance from the center line to offset the connection label.
     */
    xOffset: _propTypes2.default.number,

    /**
     * Vertical distance from the center line to offset the connection label.
     */
    yOffset: _propTypes2.default.number
};

Label.defaultProps = {
    r: 0,
    xOffset: 0,
    yOffset: 0
};