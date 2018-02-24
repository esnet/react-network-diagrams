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

function buildRmuArray(childElements, rmuCount, inchToRmu) {
    //initialize an array of objects the size of the rack for the front and back

    var frontRmuArray = Array(rmuCount + 1).fill({});
    var rearRmuArray = Array(rmuCount + 1).fill({});

    //Lets place the equipment at the RMU position on the front and on the back
    //and fill the other spots up to its height
    childElements.forEach(function (child) {
        var childValues = child.props;
        var rmuHeight = childValues.equipmentHeight / inchToRmu;
        var start = childValues.rmu;
        var end = childValues.rmu + rmuHeight;
        var values = { name: childValues.label + "-" + childValues.rmu + "-" + childValues.facing };
        if (childValues.facing === "Front" && start != 0) {
            frontRmuArray.fill(values, start, end);
        } else if (childValues.facing === "Back" && start != 0) {
            rearRmuArray.fill(values, start, end);
        }
    });
    var frontIndexedRmuArray = frontRmuArray.map(function (val, index) {
        return {
            name: val.name ? val.name : null,
            position: index
        };
    });
    var rearIndexedRmuArray = rearRmuArray.map(function (val, index) {
        return {
            name: val.name ? val.name : null,
            position: index
        };
    });

    return {
        front: frontIndexedRmuArray,
        back: rearIndexedRmuArray
    };
} /**
   *  Copyright (c) 2015, The Regents of the University of California,
   *  through Lawrence Berkeley National Laboratory (subject to receipt
   *  of any required approvals from the U.S. Dept. of Energy).
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree.
   */

exports.default = _react2.default.createClass({
    displayName: "rack",
    getDefaultProps: function getDefaultProps() {
        return {
            yOffsetTop: 30,
            yOffsetBottom: 40,
            width: 851,
            rackHeight: 42, // Expressed in RMU
            rackWidth: 19, // Expressed in Inches
            pxToInch: 10,
            widthOffset: 0.875,
            rackStyle: "telco",
            labelStyle: {
                normal: {
                    fill: "#9D9D9D",
                    fontSize: 10,
                    fontFamily: "verdana, sans-serif"
                }
            }
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
            fill: this.props.fill
        });
    },
    drawRack: function drawRack(rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop, pxToInch) {
        var middle = this.props.width / 2;
        // get the 4 'x' coordinates of the rectangles
        var x1 = middle - rackPxWidth / 2;
        var x2 = middle + (rackPxWidth / 2 - rackPxOffset);

        var y1 = yOffsetTop;
        var y2 = y1 + rackPxOffset;
        var y3 = y2 + rackPxHeight;

        // define the points around the rack where power nodes may be present

        var elements = [];
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y1, "topBar"));
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y3, "bottomBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x1, y2, "leftBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x2, y2, "rightBar"));
        elements.push(this.drawLabel(middle, y3, this.props.label, "center", true));
        if (this.props.displayRmu) {
            elements.push(this.drawHeightMarkers(inchToRmu, middle, x1, y3, pxToInch));
        }
        return _react2.default.createElement(
            "g",
            null,
            elements
        );
    },
    drawHeightMarkers: function drawHeightMarkers(inchToRmu, middle, x, initialY, pxToInch) {
        var x1 = x - 20 * pxToInch / 10;
        var x2 = x - 2 * pxToInch / 10;
        var labelStyle = {
            normal: {
                fill: "#9D9D9D",
                fontSize: pxToInch,
                fontFamily: "verdana, sans-serif"
            }
        };
        var elements = [];
        var classed = "height-marker";
        var y = initialY;

        if (this.props.descending) {
            for (var i = this.props.rackHeight + 1; i > 0; i--) {
                var name = void 0;
                var label = void 0;
                if (i === this.props.rackHeight + 1) {
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
                    labelOffsetX: 6 * pxToInch / 10,
                    labelOffsetY: 2 * pxToInch / 10,
                    textAnchor: "end",
                    color: this.props.rackStyle.stroke,
                    width: this.props.rackStyle.strokewidth,
                    classed: classed,
                    position: 0
                }));
                y -= inchToRmu * pxToInch;
            }
        } else {
            for (var _i = 0; _i < this.props.rackHeight + 1; _i++) {
                var _name = void 0;
                var _label = void 0;
                if (_i === 0) {
                    _name = "";
                    _label = "";
                } else {
                    _name = _i;
                    _name = _name.toString();
                    _label = _i;
                    _label = _label.toString();
                }

                elements.push(_react2.default.createElement(_edgeLinear2.default, {
                    x1: x1,
                    x2: x2,
                    y1: y,
                    y2: y,
                    key: _name,
                    label: _label,
                    labelPosition: "bottom",
                    labelStyle: labelStyle,
                    labelOffsetX: 6 * pxToInch / 10,
                    labelOffsetY: 2 * pxToInch / 10,
                    textAnchor: "end",
                    color: this.props.rackStyle.stroke,
                    width: this.props.rackStyle.strokewidth,
                    classed: classed,
                    position: 0
                }));
                y -= inchToRmu * pxToInch;
            }
        }
        return elements;
    },
    drawLabel: function drawLabel(x, y, label, position, offset) {
        var cy = y;
        if (offset) {
            cy = y + 20;
        }
        var labelClassed = "rack-label";
        var labelElement = _react2.default.createElement(_edgeLabel2.default, {
            key: "rack-label",
            x: x,
            y: cy,
            classed: labelClassed,
            style: this.props.labelStyle.normal,
            label: label + " - " + this.props.facing,
            labelPosition: position
        });
        return labelElement;
    },
    renderChildren: function renderChildren(childElements, rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop, pxToInch, childMap) {
        var _this = this;

        var newChildren = _react2.default.Children.map(childElements, function (child) {
            var x = void 0;
            var heightFromBottom = void 0;
            var equipmentPxHeight = child.props.equipmentHeight * pxToInch;
            var rackPxStart = rackPxHeight + yOffsetTop + rackPxOffset;
            var middle = _this.props.width / 2;
            var equipmentPxWidth = child.props.equipmentWidth * pxToInch;

            if (child.props.rmu > 0) {
                heightFromBottom = inchToRmu * (child.props.rmu - 1) * pxToInch;
                x = middle - equipmentPxWidth / 2;
            } else {
                heightFromBottom = inchToRmu * 2 * pxToInch;
                switch (child.props.side) {
                    case "L":
                        x = middle - rackPxWidth / 2 - rackPxOffset * 2 - 40 * pxToInch / 10;
                        break;
                    case "R":
                        x = middle + rackPxWidth / 2 + 40 * pxToInch / 10;
                        break;
                    default:
                        x = middle - equipmentPxWidth / 2 * (pxToInch / 10);
                        break;
                }
            }
            var y = rackPxStart - equipmentPxHeight - heightFromBottom;

            /*
            XXX Scott: What about other props like
                selected={this.state.selectedStyle}
                muted={this.state.mutedStyle}
                textAnchor={this.state.textAnchor}
                labelOffsetX={this.state.labelOffsetX}
                labelOffsetY={this.state.labelOffsetY}
                noNavigate={this.state.noNavigate}
            */
            // We get the position from the childMap where this child should sit in the rack
            // returning an array of U positions for front and back eg. [1,2]
            var currentRmuFrontPositions = childMap.front.filter(function (c) {
                return c.name === child.props.label + "-" + child.props.rmu + "-" + child.props.facing;
            }).map(function (v) {
                return v.position;
            });
            var currentRmuBackPositions = childMap.back.filter(function (c) {
                return c.name === child.props.label + "-" + child.props.rmu + "-" + child.props.facing;
            }).map(function (v) {
                return v.position;
            });

            // if the child was a front facing element, look in the back to see if there is a value
            // in the back facing rmu array at any position
            //console.log(currentRmuFrontPositions, currentRmuBackPositions);
            var overlappingBack = void 0,
                overlappingFront = false;
            if (child.props.facing === "Front") {
                overlappingFront = currentRmuFrontPositions.some(function (v) {
                    return childMap.back[v].name !== null;
                });
            } else if (child.props.facing === "Back") {
                overlappingBack = currentRmuBackPositions.some(function (v) {
                    return childMap.front[v].name !== null;
                });
            }
            var overlapping = overlappingFront || overlappingBack;

            var props = {
                y: y,
                x: x,
                pxToInch: pxToInch,
                rackFacing: _this.props.facing,
                usePattern: _this.props.pattern ? true : false,
                overlapping: overlapping
            };
            var newChild = _react2.default.cloneElement(child, props);
            return newChild;
        });
        return newChildren;
    },
    render: function render() {
        var _this2 = this;

        // 1 RMU is 1.75 inches
        var inchToRmu = 1.75;
        // Minimum total width is 350 at px to inch of 10, so divide anything
        // smaller than 350 by 35 to achieve the right ratio
        var pxToInch = void 0;
        if (this.props.width >= 350) {
            pxToInch = this.props.pxToInch;
        } else {
            pxToInch = this.props.width / 35;
        }
        // total height of a 42U rack is 73.5 inches
        // Pixel height is 730px
        var rackPxHeight = inchToRmu * this.props.rackHeight * pxToInch;

        // Width of the inside of a rack of actually 17.25 inches wide
        // Pixel width is 172.5
        var rackPxWidth = this.props.rackWidth * pxToInch;

        // Pixel offset is 8.75
        var rackPxOffset = this.props.widthOffset * pxToInch;

        var yOffsetTop = this.props.yOffsetTop;
        var yOffsetBottom = this.props.yOffsetBottom;

        var totalHeight = rackPxHeight + yOffsetTop + yOffsetBottom;

        var rackContainer = {
            normal: {
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderWidth: 1,
                borderTopColor: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
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

        // We render the child elements in a layering fashion to display back and front elements
        // If the rack facing is front, the bottom elements are back facing and top elements are front facing and vice versa
        var childElementsBottom = void 0;
        var childElementsTop = void 0;

        var bottomChildren = [];
        var topChildren = [];

        this.props.children.forEach(function (child) {
            if (_this2.props.facing === "Front" && child.props.facing === "Front") {
                topChildren.push(child);
            } else if (_this2.props.facing === "Front" && child.props.facing == "Back") {
                bottomChildren.push(child);
            } else if (_this2.props.facing === "Back" && child.props.facing === "Back") {
                topChildren.push(child);
            } else if (_this2.props.facing === "Back" && child.props.facing == "Front") {
                bottomChildren.push(child);
            }
        });
        if (_react2.default.Children.count(this.props.children) >= 1) {
            var childMap = buildRmuArray(this.props.children, this.props.rackHeight, inchToRmu);
            childElementsBottom = this.renderChildren(bottomChildren, //this.props.children,
            rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop, pxToInch, childMap);
            childElementsTop = this.renderChildren(topChildren, //this.props.children,
            rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop, pxToInch, childMap);
        }
        return (
            // Draw in this order:  Left Side, Right Side, Top Bar, Bottom Bar, RMU Units
            _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "svg",
                    { className: className, style: svgStyle },
                    _react2.default.createElement(
                        "defs",
                        null,
                        this.props.pattern
                    ),
                    this.drawRack(rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop, pxToInch),
                    childElementsBottom,
                    childElementsTop
                )
            )
        );
    }
});