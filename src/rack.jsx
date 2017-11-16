/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import LinearEdge from "./edge-linear";
import Label from "./edge-label";

export default React.createClass({
    getDefaultProps() {
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

    drawSide(width, height, xCorner, yCorner, key) {
        return (
            <rect
                key={key}
                className={`rack-edge`}
                width={width}
                height={height}
                style={this.props.rackStyle}
                x={xCorner}
                y={yCorner}
                fill={this.props.fill}
            />
        );
    },

    drawFrontRack(rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop) {
        const middle = this.props.width / 2;
        // get the 4 'x' coordinates of the rectangles
        const x1 = middle - rackPxWidth / 2;
        const x2 = middle + (rackPxWidth / 2 - rackPxOffset);

        const y1 = yOffsetTop;
        const y2 = y1 + rackPxOffset;
        const y3 = y2 + rackPxHeight;

        // define the points around the rack where power nodes may be present

        const elements = [];
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y1, "topBar"));
        elements.push(this.drawSide(rackPxWidth, rackPxOffset, x1, y3, "bottomBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x1, y2, "leftBar"));
        elements.push(this.drawSide(rackPxOffset, rackPxHeight, x2, y2, "rightBar"));
        elements.push(this.drawLabel(middle, y3, this.props.label, "center", true));
        elements.push(this.drawHeightMarkers(inchToRmu, middle, x1, y3));
        return <g>{elements}</g>;
    },

    drawHeightMarkers(inchToRmu, middle, x, initialY) {
        const x1 = x - 20;
        const x2 = x - 2;
        const labelStyle = {
            normal: {
                fill: "#9D9D9D",
                fontSize: 10,
                fontFamily: "verdana, sans-serif"
            }
        };
        const elements = [];
        const classed = "height-marker";
        let y = initialY;

        if (this.props.descending) {
            for (let i = this.props.rackHeight + 1; i > 0; i--) {
                let name;
                let label;
                if (i === this.props.rackHeight + 1) {
                    name = "";
                    label = "";
                } else {
                    name = i;
                    name = name.toString();
                    label = i;
                    label = label.toString();
                }

                elements.push(
                    <LinearEdge
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        key={name}
                        label={label}
                        labelPosition={"bottom"}
                        labelStyle={labelStyle}
                        labelOffsetX={6}
                        labelOffsetY={2}
                        textAnchor={"end"}
                        color={this.props.rackStyle.stroke}
                        width={this.props.rackStyle.strokewidth}
                        classed={classed}
                        position={0}
                    />
                );
                y -= inchToRmu * this.props.pxToInch;
            }
        } else {
            for (let i = 0; i < this.props.rackHeight + 1; i++) {
                let name;
                let label;
                if (i === 0) {
                    name = "";
                    label = "";
                } else {
                    name = i;
                    name = name.toString();
                    label = i;
                    label = label.toString();
                }

                elements.push(
                    <LinearEdge
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        key={name}
                        label={label}
                        labelPosition={"bottom"}
                        labelStyle={labelStyle}
                        labelOffsetX={6}
                        labelOffsetY={2}
                        textAnchor={"end"}
                        color={this.props.rackStyle.stroke}
                        width={this.props.rackStyle.strokewidth}
                        classed={classed}
                        position={0}
                    />
                );
                y -= inchToRmu * this.props.pxToInch;
            }
        }
        return elements;
    },

    drawLabel(x, y, label, position, offset) {
        let cy = y;
        if (offset) {
            cy = y + 20;
        }
        const labelClassed = "rack-label";
        const labelElement = (
            <Label
                key="rack-label"
                x={x}
                y={cy}
                classed={labelClassed}
                style={this.props.labelStyle.normal}
                label={`${label} - ${this.props.facing}`}
                labelPosition={position}
            />
        );
        return labelElement;
    },

    renderChildren(childElements, rackPxHeight, rackPxWidth, rackPxOffset, inchToRmu, yOffsetTop) {
        const newChildren = React.Children.map(this.props.children, child => {
            const equipmentPxHeight = child.props.equipmentHeight * this.props.pxToInch;
            const heightFromBottom = inchToRmu * (child.props.rmu - 1) * this.props.pxToInch;
            const rackPxStart = rackPxHeight + yOffsetTop + rackPxOffset;
            const y = rackPxStart - equipmentPxHeight - heightFromBottom;
            const middle = this.props.width / 2;
            const equipmentPxWidth = child.props.equipmentWidth * this.props.pxToInch;
            const x = middle - equipmentPxWidth / 2;
            const props = {
                y,
                x,
                pxToInch: this.props.pxToInch,
                rackFacing: this.props.facing,
                usePattern: this.props.pattern ? true : false
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
            const newChild = React.cloneElement(child, props);
            return newChild;
        });
        return newChildren;
    },

    render() {
        // 1 RMU is 1.75 inches
        const inchToRmu = 1.75;

        // total height of a 42U rack is 73.5 inches
        // Pixel height is 730px
        const rackPxHeight = inchToRmu * this.props.rackHeight * this.props.pxToInch;

        // Width of the inside of a rack of actually 17.25 inches wide
        // Pixel width is 172.5
        const rackPxWidth = this.props.rackWidth * this.props.pxToInch;

        // Pixel offset is 8.75
        const rackPxOffset = this.props.widthOffset * this.props.pxToInch;

        const yOffsetTop = this.props.yOffsetTop;
        const yOffsetBottom = this.props.yOffsetBottom;

        const totalHeight = rackPxHeight + yOffsetTop + yOffsetBottom;

        const rackContainer = {
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

        let className = "rack-container";
        const svgStyle = rackContainer.normal;

        /* If child Equipment elements are present, the rack injects the x and y for each child equipment.
        It uses the rmu prop and the equipment height on each child element to derive the position
        in the rack.  It then injects an x, y and pixel to inch ratio prop to each child.
        Other style based props for the equipment are also injected.
        */
        let childElements;

        if (React.Children.count(this.props.children) >= 1) {
            childElements = this.renderChildren(
                this.props.children,
                rackPxHeight,
                rackPxWidth,
                rackPxOffset,
                inchToRmu,
                yOffsetTop
            );
        }
        return (
            // Draw in this order:  Left Side, Right Side, Top Bar, Bottom Bar, RMU Units
            <div>
                <svg className={className} style={svgStyle}>
                    <defs>{this.props.pattern}</defs>
                    {this.drawFrontRack(
                        rackPxHeight,
                        rackPxWidth,
                        rackPxOffset,
                        inchToRmu,
                        yOffsetTop
                    )}
                    {childElements}
                </svg>
            </div>
        );
    }
});
