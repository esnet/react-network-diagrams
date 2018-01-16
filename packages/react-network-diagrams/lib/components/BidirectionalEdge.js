"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BidirectionalEdge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ArcEdge = require("./ArcEdge");

var _LinearEdge = require("./LinearEdge");

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

var BidirectionalEdge = exports.BidirectionalEdge = function (_React$Component) {
    _inherits(BidirectionalEdge, _React$Component);

    function BidirectionalEdge() {
        _classCallCheck(this, BidirectionalEdge);

        return _possibleConstructorReturn(this, (BidirectionalEdge.__proto__ || Object.getPrototypeOf(BidirectionalEdge)).apply(this, arguments));
    }

    _createClass(BidirectionalEdge, [{
        key: "render",
        value: function render() {
            var paths = [];
            var sourceToTargetName = this.props.source + "--" + this.props.target;
            var targetToSourceName = this.props.target + "--" + this.props.source;

            // Position of the bidirectional lines relative to the center line
            var position = this.props.width * 0.75;

            if (this.props.shape === "curved") {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_ArcEdge.ArcEdge, {
                        name: this.props.name,
                        x1: this.props.x1,
                        y1: this.props.y1,
                        x2: this.props.x2,
                        y2: this.props.y2,
                        arrow: true,
                        position: position,
                        color: this.props.sourceTargetColor,
                        width: this.props.width,
                        classed: this.props.classed,
                        key: sourceToTargetName,
                        curveDirection: this.props.curveDirection,
                        offset: this.props.offset,
                        selected: this.props.selected,
                        onSelectionChange: this.props.onSelectionChange,
                        muted: this.props.muted }),
                    _react2.default.createElement(_ArcEdge.ArcEdge, {
                        name: this.props.name,
                        x1: this.props.x2,
                        y1: this.props.y2,
                        x2: this.props.x1,
                        y2: this.props.y1,
                        arrow: true,
                        position: position,
                        color: this.props.targetSourceColor,
                        width: this.props.width,
                        classed: this.props.classed,
                        key: targetToSourceName,
                        curveDirection: this.props.curveDirection,
                        offset: this.props.offset,
                        selected: this.props.selected,
                        onSelectionChange: this.props.onSelectionChange,
                        muted: this.props.muted }),
                    _react2.default.createElement(_ArcEdge.ArcEdge, {
                        name: this.props.name,
                        x1: this.props.x2,
                        y1: this.props.y2,
                        x2: this.props.x1,
                        y2: this.props.y1,
                        position: 0,
                        width: 5,
                        classed: this.props.classed,
                        key: sourceToTargetName + "-event-region",
                        onSelectionChange: this.props.onSelectionChange,
                        curveDirection: this.props.curveDirection,
                        offset: this.props.offset,
                        invisible: true })
                );
            } else {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_LinearEdge.LinearEdge, {
                        name: this.props.name,
                        x1: this.props.x1,
                        y1: this.props.y1,
                        x2: this.props.x2,
                        y2: this.props.y2,
                        arrow: true,
                        color: this.props.sourceTargetColor,
                        width: this.props.width,
                        position: position,
                        className: this.props.classed,
                        key: sourceToTargetName,
                        selected: this.props.selected,
                        muted: this.props.muted,
                        onSelectionChange: this.props.onSelectionChange }),
                    _react2.default.createElement(_LinearEdge.LinearEdge, {
                        name: this.props.name,
                        x1: this.props.x2,
                        y1: this.props.y2,
                        x2: this.props.x1,
                        y2: this.props.y1,
                        arrow: true,
                        color: this.props.targetSourceColor,
                        width: this.props.width,
                        position: position,
                        className: this.props.classed,
                        key: targetToSourceName,
                        selected: this.props.selected,
                        muted: this.props.muted,
                        onSelectionChange: this.props.onSelectionChange }),
                    _react2.default.createElement(_LinearEdge.LinearEdge, {
                        name: this.props.name,
                        x1: this.props.x2,
                        y1: this.props.y2,
                        x2: this.props.x1,
                        y2: this.props.y1,
                        width: 5,
                        position: 0,
                        className: this.props.classed,
                        key: targetToSourceName + "-event-region",
                        onSelectionChange: this.props.onSelectionChange,
                        invisible: true })
                );
            }

            return _react2.default.createElement(
                "g",
                null,
                paths
            );
        }
    }]);

    return BidirectionalEdge;
}(_react2.default.Component);

;

BidirectionalEdge.propTypes = {
    /** The width of the circuit diagram */
    width: _propTypes2.default.number,

    /**
     * This is the vertical spacing
     */
    spacing: _propTypes2.default.number,

    /** An offset to the position of the label which can be used for fine tuning */
    offset: _propTypes2.default.number,

    sourceTargetColor: _propTypes2.default.string,
    targetSourceColor: _propTypes2.default.string,

    /** Display the endpoint selected */
    selected: _propTypes2.default.bool,

    /** Display the endpoint muted */
    muted: _propTypes2.default.bool
};

BidirectionalEdge.defaultProps = {
    width: 1,
    spacing: 3.5,
    offset: 18,
    sourceTargetColor: "#C9CACC",
    targetSourceColor: "#C9CACC",
    selected: false,
    muted: false
};