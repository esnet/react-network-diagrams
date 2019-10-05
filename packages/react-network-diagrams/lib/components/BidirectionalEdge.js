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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2018, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

            var cx = (this.props.x1 + this.props.x2) / 2;
            var cy = (this.props.y1 + this.props.y2) / 2;

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
                        muted: this.props.muted,
                        dashed: this.props.dashed
                    }),
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
                        muted: this.props.muted,
                        dashed: this.props.dashed
                    }),
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
                        invisible: true
                    })
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
                        onSelectionChange: this.props.onSelectionChange,
                        dashed: this.props.dashed
                    }),
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
                        onSelectionChange: this.props.onSelectionChange,
                        dashed: this.props.dashed
                    }),
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
                        invisible: true
                    }),
                    this.props.maintenance && _react2.default.createElement("path", {
                        d: "M" + (cx - 8) + "," + (cy - 12) + "l3.771 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.771-3.77c-.172.584-.258 1.188-.258 1.792 0 1.602.607 3.202 1.83 4.426 1.351 1.351 3.164 1.958 4.931 1.821.933-.072 1.852.269 2.514.931l9.662 9.662c.578.578 1.337.868 2.097.868 1.661 0 3.001-1.364 2.966-3.03-.016-.737-.306-1.47-.868-2.033l-9.662-9.663c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.83-4.428-1.83-.603 0-1.207.086-1.791.257zm17.5 20.743c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z",
                        fill: "#39444e",
                        style: { stroke: '#ffffff' }
                    }),
                    this.props.down && _react2.default.createElement("path", {
                        d: "M " + (cx + 10) + "," + (cy + 4) + "l-7.062,-11.828c-0.536,-0.899,-1.477,-1.438,-2.524,-1.438c-1.047,0,-1.988,0.539,-2.523,1.438l-7.059,11.828c-0.547,0.918,-0.559,2.02,-0.031,2.945c0.531,0.93,1.484,1.485,2.551,1.485l14.125,0c1.066,0,2.019,-0.555,2.55,-1.485c0.528,-0.925,0.516,-2.027,-0.027,-2.945zm-9.586,-9.648c0.649,0,1.172,0.523,1.172,1.171l0,4.696c0,0.644,-0.523,1.172,-1.172,1.172c-0.648,0,-1.172,-0.528,-1.172,-1.172l0,-4.696c0,-0.648,0.524,-1.171,1.172,-1.171zm0,11.73c-0.969,0,-1.758,-0.789,-1.758,-1.757c0,-0.973,0.789,-1.762,1.758,-1.762c0.969,0,1.758,0.789,1.758,1.762c0,0.968,-0.789,1.757,-1.758,1.757zm0,0",
                        fill: "#ff0001",
                        style: { stroke: '#ffffff' }
                    })
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
    muted: _propTypes2.default.bool,

    dashed: _propTypes2.default.bool,

    maintenance: _propTypes2.default.bool,

    down: _propTypes2.default.bool

};

BidirectionalEdge.defaultProps = {
    width: 1,
    spacing: 3.5,
    offset: 18,
    sourceTargetColor: "#C9CACC",
    targetSourceColor: "#C9CACC",
    selected: false,
    muted: false,
    dashed: false,
    maintenance: false,
    down: false
};