"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//17.52(w) 25.39(d) 24.49(h)

/* An equipment is an svg rect that needs to know its width, height, and style.
It receives its x and y starting position from the parent rack element, or a
default derived from a specified offset value.

It takes a label as well in the form of a string or list of strings if multilines are desired,
*/

exports.default = _react2.default.createClass({
    displayName: "equipment-base",
    getDefaultProps: function getDefaultProps() {
        return {
            yOffset: 25,
            xOffset: 25,
            //equipmentHeight: 24.49, // Expressed in inches
            //equipmentWidth: 17.52, // Expressed in Inches
            //rmu: 1, // the RMU position in the rack
            pxToInch: 10
            //widthOffset: .875
        };
    },
    render: function render() {
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

        var equipmentPxHeight = this.props.equipmentHeight * this.props.pxToInch;
        // Height is 244.9 px

        var equipmentPxWidth = this.props.equipmentWidth * this.props.pxToInch;
        // Width is 175.2 px

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
            equipmentLabel = _react2.default.createElement(_edgeLabel2.default, {
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

        var heightLabel = _react2.default.createElement(_edgeLabel2.default, {
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

        // default to the front view.  Only show the back view if the
        // equipment is back facing on the front of the rack,
        // or front facing on the back of the rack
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

        //const eqStyle = this.props.facing === "Front" && ? frontStyle : backStyle;);

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
    },
    handleClick: function handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("equipment", this.props.name);
        }
        e.stopPropagation();
    }
}); /**
     *  Copyright (c) 2015, The Regents of the University of California,
     *  through Lawrence Berkeley National Laboratory (subject to receipt
     *  of any required approvals from the U.S. Dept. of Energy).
     *  All rights reserved.
     *
     *  This source code is licensed under the BSD-style license found in the
     *  LICENSE file in the root directory of this source tree.
     */