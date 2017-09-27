"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _edgeLinear = require("./edge-linear");

var _edgeLinear2 = _interopRequireDefault(_edgeLinear);

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import _ from "underscore";
exports.default = _react2.default.createClass({
    displayName: "rack",
    getDefaultProps: function getDefaultProps() {
        return {
            yOffset: 50,
            width: 851,
            rackHeight: 42, // Expressed in RMU
            rackWidth: 19, // Expressed in Inches
            pxToInch: 10,
            widthOffset: .875,
            rackStyle: "telco"
        };
    },
    drawSide: function drawSide(width, height, xCorner, yCorner, key) {
        return _react2.default.createElement("rect", {
            key: key,
            className: "rack-edge",
            width: width,
            height: height,
            style: this.props.rackStyle,
            x: xCorner,
            y: yCorner,
            fill: this.props.fill });
    },
    drawRack: function drawRack(rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu) {
        var middle = this.props.width / 2;
        // get the 4 'x' coordinates of the rectangles
        var x1 = middle - rackPxWidth / 2;
        var x2 = middle + (rackPxWidth / 2 - rackPxOffset);

        var y1 = this.props.yOffset;
        var y2 = y1 + rackPxOffset;
        var y3 = y2 + rackPxHeight;

        var elements = [];
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y1, "topBar"));
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y3, "bottomBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x1, y2, "leftBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x2, y2, "rightBar"));
        elements.push(this.drawLabel(middle, y3));
        elements.push(this.drawHeightMarkers(inchToRmu, middle, x1, y3));

        return _react2.default.createElement(
            "g",
            null,
            elements
        );
    },
    drawHeightMarkers: function drawHeightMarkers(inchToRmu, middle, x, initialY) {
        var x1 = x - 20;
        var x2 = x - 2;
        var labelStyle = {
            normal: {
                fill: "#9D9D9D",
                fontSize: 10,
                fontFamily: "verdana, sans-serif"
            }
        };
        var elements = [];
        var classed = "height-marker";
        var y = initialY;

        for (var i = 0; i < this.props.rackHeight + 1; i++) {
            var name = void 0;
            var label = void 0;
            if (i === 0) {
                name = "";
                label = "";
            } else {
                name = i;
                name = name.toString();
                label = i;
                label = label.toString();
            }

            elements.push(_react2.default.createElement(_edgeLinear2.default, {
                x1: x1,
                x2: x2,
                y1: y,
                y2: y,
                key: name,
                label: label,
                labelPosition: "bottom",
                labelStyle: labelStyle,
                labelOffsetX: 6,
                labelOffsetY: 2,
                textAnchor: "end",
                color: this.props.rackStyle.stroke,
                width: this.props.rackStyle.strokewidth,
                classed: classed,
                position: 0 }));
            y -= inchToRmu * this.props.pxToInch;
        }
        return elements;
    },
    drawLabel: function drawLabel(x, y) {
        var labelStyle = {
            normal: {
                fill: "#9D9D9D",
                fontSize: 10,
                fontFamily: "verdana, sans-serif"
            }
        };
        var cy = y + 20;
        var labelClassed = "rack-label";
        var labelElement = _react2.default.createElement(_edgeLabel2.default, {
            key: "rack-label",
            x: x,
            y: cy,
            classed: labelClassed,
            style: labelStyle.normal,
            label: this.props.label,
            labelPosition: "center" });
        return labelElement;
    },
    renderChildren: function renderChildren(childElements, rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu) {
        var _this = this;

        var newChildren = _react2.default.Children.map(this.props.children, function (child) {
            var equipmentPxHeight = child.props.equipmentHeight * _this.props.pxToInch;
            var heightFromBottom = inchToRmu * (child.props.rmu - 1) * _this.props.pxToInch;
            var rackPxStart = rackPxHeight + _this.props.yOffset + rackPxOffset;
            var y = rackPxStart - equipmentPxHeight - heightFromBottom;

            var middle = _this.props.width / 2;
            var equipmentPxWidth = child.props.equipmentWidth * _this.props.pxToInch;
            var x = middle - equipmentPxWidth / 2;

            var props = {
                y: y,
                x: x,
                pxToInch: _this.props.pxToInch
            };

            /*
            XXX Scott: What about other props like
                selected={this.state.selectedStyle}
                muted={this.state.mutedStyle}
                textAnchor={this.state.textAnchor}
                labelOffsetX={this.state.labelOffsetX}
                labelOffsetY={this.state.labelOffsetY}
                noNavigate={this.state.noNavigate}
            */
            var newChild = _react2.default.cloneElement(child, props);
            return newChild;
        });
        return newChildren;
    },
    render: function render() {
        // 1 RMU is 1.75 inches
        var inchToRmu = 1.75;

        // total height of a 42U rack is 73.5 inches
        // Pixel height is 730px
        var rackPxHeight = inchToRmu * this.props.rackHeight * this.props.pxToInch;

        // Width of the inside of a rack of actually 17.25 inches wide
        // Pixel width is 172.5
        var rackPxWidth = this.props.rackWidth * this.props.pxToInch;

        // Pixel offset is 8.75
        var rackPxOffset = this.props.widthOffset * this.props.pxToInch;

        var totalHeight = rackPxHeight + this.props.yOffset * 2;

        var rackContainer = {
            normal: {
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderWidth: 1,
                borderTopColor: "#FFFFFF",
                borderBottomColor: "#EFEFEF",
                width: "100%",
                height: totalHeight
            }
        };

        var className = "rack-container";
        var svgStyle = rackContainer.normal;

        /* If child Equipment elements are present, the rack injects the x and y for each child equipment.
        It uses the rmu prop and the equipment height on each child element to derive the position
        in the rack.  It then injects an x, y and pixel to inch ratio prop to each child.
        Other style based props for the equipment are also injected.
        */

        var childElements = void 0;

        if (_react2.default.Children.count(this.props.children) >= 1) {
            childElements = this.renderChildren(this.props.children, rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu);
        }

        return (
            // Draw in this order:  Left Side, Right Side, Top Bar, Bottom Bar, RMU Units
            _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "svg",
                    {
                        className: className,
                        style: svgStyle },
                    this.drawRack(rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu),
                    childElements
                )
            )
        );
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