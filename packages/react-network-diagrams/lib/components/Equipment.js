"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Equipment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EquipmentBase = require("./EquipmentBase");

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

/**
 * An equipment is an svg rect that needs to know its width, height, and style.
 * It receives its x and y starting position from the parent rack element, or a 
 * default derived from a specified offset value.
 * 
 * It takes a label as well in the form of a string or list of strings if multilines are desired
 */
var Equipment = exports.Equipment = function (_React$Component) {
    _inherits(Equipment, _React$Component);

    function Equipment(props) {
        _classCallCheck(this, Equipment);

        var _this = _possibleConstructorReturn(this, (Equipment.__proto__ || Object.getPrototypeOf(Equipment)).call(this, props));

        _this.state = {
            highlighted: false,
            noNavigate: _this.props.facing === "Front" && _this.props.rackFacing === "Back" || _this.props.facing === "Back" && _this.props.rackFacing === "Front" ? true : _this.props.noNavigate
        };
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        return _this;
    }

    /**
     * User hovers over the equipment
     */


    _createClass(Equipment, [{
        key: "handleMouseOver",
        value: function handleMouseOver() {
            if (!this.state.noNavigate) {
                this.setState({ highlighted: true });
            }
        }

        /**
         * Use stops hovering over equipment
         */

    }, {
        key: "handleMouseOut",
        value: function handleMouseOut() {
            if (!this.state.noNavigate) {
                this.setState({ highlighted: false });
            }
        }
    }, {
        key: "handleSelectionChanged",
        value: function handleSelectionChanged(e, value) {
            if (!this.state.noNavigate) {
                this.props.onSelectionChange(e, value);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var hitStyle = {
                cursor: this.props.noNavigate ? "default" : "pointer",
                stroke: "#FFF",
                strokeWidth: 8
            };

            var navTo = this.props.navTo;

            var width = void 0;
            var stroke = void 0;
            var fill = void 0;
            var backFill = this.props.backStyle.fill;
            var overlapFill = this.props.overlapStyle.fill;

            if (this.state.highlighted && !this.props.selected) {
                width = this.props.style.line.highlighted.strokeWidth;
                stroke = this.props.style.line.highlighted.stroke;
                fill = this.props.style.line.highlighted.fill;
            } else if (this.props.selected) {
                width = this.props.style.line.selected.strokeWidth;
                stroke = this.props.style.line.selected.stroke;
                fill = this.props.style.line.selected.fill;
            } else {
                width = this.props.style.line.normal.strokeWidth;
                stroke = this.props.style.line.normal.stroke;
                fill = this.props.style.line.normal.fill;
            }

            return _react2.default.createElement(
                "g",
                null,
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_EquipmentBase.EquipmentBase, {
                        key: "equipment-base",
                        positionX: this.props.x,
                        positionY: this.props.y,
                        equipmentHeight: this.props.equipmentHeight,
                        equipmentWidth: this.props.equipmentWidth,
                        pxToInch: this.props.pxToInch,
                        classed: this.props.classed,
                        selected: this.props.selected,
                        muted: this.props.muted,
                        color: stroke,
                        width: width,
                        fill: fill,
                        backFill: backFill,
                        textAnchor: this.props.textAnchor,
                        labelPosition: this.props.labelPosition,
                        labelStyle: this.props.style.label,
                        label: this.props.label,
                        labelDirection: this.props.labelDirection,
                        labelOffsetX: this.props.labelOffsetX,
                        labelOffsetY: this.props.labelOffsetY,
                        showHeight: this.props.showHeight,
                        name: navTo,
                        facing: this.props.facing,
                        rackFacing: this.props.rackFacing,
                        usePattern: this.props.usePattern,
                        overlapping: this.props.overlapping,
                        overlapFill: overlapFill
                    })
                ),
                _react2.default.createElement(
                    "g",
                    { onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
                    _react2.default.createElement(_EquipmentBase.EquipmentBase, {
                        key: "equipment-base-hit",
                        positionX: this.props.x,
                        positionY: this.props.y,
                        equipmentHeight: this.props.equipmentHeight,
                        equipmentWidth: this.props.equipmentWidth,
                        pxToInch: this.props.pxToInch,
                        classed: this.props.classed,
                        selected: this.props.selected,
                        muted: this.props.muted,
                        color: hitStyle.stroke,
                        width: hitStyle.strokeWidth,
                        fill: fill,
                        backFill: backFill,
                        textAnchor: this.props.textAnchor,
                        labelPosition: this.props.labelPosition,
                        labelStyle: this.props.style.label,
                        label: this.props.label,
                        labelDirection: this.props.labelDirection,
                        labelOffsetX: this.props.labelOffsetX,
                        labelOffsetY: this.props.labelOffsetY,
                        name: navTo,
                        onSelectionChange: function onSelectionChange(e, value) {
                            return _this2.handleSelectionChanged(e, value);
                        },
                        showHeight: this.props.showHeight,
                        invisible: true,
                        facing: this.props.facing,
                        rackFacing: this.props.rackFacing,
                        usePattern: this.props.usePattern,
                        overlapping: this.props.overlapping,
                        overlapFill: overlapFill
                    })
                )
            );
        }
    }]);

    return Equipment;
}(_react2.default.Component);

;

Equipment.propTypes = {
    noNavigate: _propTypes2.default.bool,

    labelPosition: _propTypes2.default.string,

    classed: _propTypes2.default.string,

    labelDirection: _propTypes2.default.string,

    selected: _propTypes2.default.bool,

    muted: _propTypes2.default.bool
};

Equipment.defaultProps = {
    noNavigate: false,
    labelPosition: "top",
    classed: "equipment",
    labelDirection: "horizontal",
    selected: false,
    muted: false
};