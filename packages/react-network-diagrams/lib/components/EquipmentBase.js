"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EquipmentBase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _Label = require("./Label");

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

//17.52(w) 25.39(d) 24.49(h)

/**
 * An equipment is an svg rect that needs to know its width, height, and style.
 * It receives its x and y starting position from the parent rack element, or a 
 * default derived from a specified offset value.
 * 
 * It takes a label as well in the form of a string or list of strings if multilines are desired
 */

var EquipmentBase = exports.EquipmentBase = function (_React$Component) {
    _inherits(EquipmentBase, _React$Component);

    function EquipmentBase(props) {
        _classCallCheck(this, EquipmentBase);

        var _this = _possibleConstructorReturn(this, (EquipmentBase.__proto__ || Object.getPrototypeOf(EquipmentBase)).call(this, props));

        _this.state = {
            yOffset: 25,
            xOffset: 25,
            pxToInch: 10
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(EquipmentBase, [{
        key: "handleClick",
        value: function handleClick(e) {
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange("equipment", this.props.name);
            }
            e.stopPropagation();
        }
    }, {
        key: "render",
        value: function render() {
            var classed = "equipment";
            var labelClassed = "equipment-label";
            var styleModifier = "normal";

            if (!_underscore2.default.isUndefined(this.props.classed)) {
                classed += " " + this.props.classed;
            }

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

            var opacity = 1.0;
            if (this.props.invisible) {
                opacity = 0.0;
            } else if (this.props.muted) {
                opacity = 0.3;
            }

            // Height is 244.9 px
            var equipmentPxHeight = this.props.equipmentHeight * this.props.pxToInch;

            // Width is 175.2 px
            var equipmentPxWidth = this.props.equipmentWidth * this.props.pxToInch;

            var posX = this.props.positionX || 25;
            var posY = this.props.positionY || 25;

            var centerX = equipmentPxWidth / 2 + posX;
            var centerY = equipmentPxHeight / 2 + posY;

            var labelOffsetX = this.props.labelOffsetX || 0;
            var labelOffsetY = this.props.labelOffsetY || 0;

            var cx = void 0;
            var cy = void 0;
            var cr = 0;

            if (this.props.labelDirection === "vertical") {
                cr = 90;
            }

            switch (this.props.labelPosition) {
                case "top":
                    cx = centerX;
                    cy = posY + 12;
                    break;
                case "bottom":
                    cx = centerX;
                    cy = posY + equipmentPxHeight - 15;
                    break;
                default:
                    cx = centerX;
                    cy = centerY;
                    break;
            }

            var equipmentLabel = null;

            if (this.props.label && !(this.props.facing === "Front" && this.props.rackFacing === "Back") && !(this.props.facing === "Back" && this.props.rackFacing === "Front")) {
                equipmentLabel = _react2.default.createElement(_Label.Label, {
                    x: cx,
                    y: cy,
                    r: cr,
                    textAnchor: this.props.textAnchor,
                    classed: labelClassed,
                    style: this.props.labelStyle[styleModifier],
                    label: this.props.label,
                    xOffset: labelOffsetX,
                    yOffset: labelOffsetY,
                    labelPosition: this.props.labelPosition
                });
            }

            // let widthLine = null;

            var vPath = "";
            vPath += "M" + (posX + 10) + "," + (posY + 5);
            vPath += " L " + (posX + 10) + " " + (posY + equipmentPxHeight - 5);

            var hTopPath = "";
            hTopPath += "M" + (posX + 7) + "," + (posY + 5);
            hTopPath += " L " + (posX + 13) + " " + (posY + 5);

            var hBottomPath = "";
            hBottomPath += "M" + (posX + 7) + "," + (posY + equipmentPxHeight - 5);
            hBottomPath += " L " + (posX + 13) + " " + (posY + equipmentPxHeight - 5);

            var heightFill = this.props.labelStyle[styleModifier];

            var heightPath = _react2.default.createElement(
                "g",
                { strokeWidth: this.props.width, stroke: heightFill.fill, opacity: opacity },
                _react2.default.createElement("path", { className: labelClassed, d: vPath, fill: heightFill.fill }),
                _react2.default.createElement("path", { className: labelClassed, d: hTopPath, fill: heightFill.fill }),
                _react2.default.createElement("path", { className: labelClassed, d: hBottomPath, fill: heightFill.fill })
            );

            var heightInRmu = this.props.equipmentHeight / 1.75;

            var heightLabel = _react2.default.createElement(_Label.Label, {
                x: posX + 15,
                y: centerY,
                textAnchor: "begin",
                classed: labelClassed,
                style: this.props.labelStyle[styleModifier],
                label: heightInRmu + "U",
                labelPosition: "center"
            });

            var backStyle = { fill: this.props.backFill, fillOpacity: "0.7" };
            if (this.props.usePattern) {
                backStyle = { fill: "url(#Pattern)" };
            }

            var frontStyle = { fill: this.props.fill };

            /**
             * Default to the front view. Only show the back view if the
             * equipment is back facing on the front of the rack,
             * or front facing on the back of the rack
             */

            var eqStyle = frontStyle;

            if (this.props.rackFacing === "Front" && this.props.facing === "Back") {
                eqStyle = backStyle;
                heightLabel = _react2.default.createElement("g", null);
                heightPath = _react2.default.createElement("g", null);
            } else if (this.props.rackFacing === "Back" && this.props.facing === "Front") {
                eqStyle = backStyle;
                heightLabel = _react2.default.createElement("g", null);
                heightPath = _react2.default.createElement("g", null);
            }

            // const eqStyle = this.props.facing === "Front" && ? frontStyle : backStyle;);

            if (!this.props.showHeight) {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(
                        "g",
                        { strokeWidth: this.props.width, stroke: this.props.color, opacity: opacity },
                        _react2.default.createElement("rect", {
                            className: classed,
                            width: equipmentPxWidth,
                            height: equipmentPxHeight,
                            x: posX,
                            y: posY,
                            style: eqStyle,
                            onClick: this.handleClick
                        })
                    ),
                    equipmentLabel
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
                            onClick: this.handleClick
                        },
                        _react2.default.createElement("rect", {
                            className: classed,
                            width: equipmentPxWidth,
                            height: equipmentPxHeight,
                            x: posX,
                            y: posY,
                            style: eqStyle
                        })
                    ),
                    equipmentLabel,
                    heightPath,
                    heightLabel
                );
            }
        }
    }]);

    return EquipmentBase;
}(_react2.default.Component);

;