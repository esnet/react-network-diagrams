/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";

import { Label } from "./Label";

/**
 * This component draws a rectangle using the source and target to determine sizing and position. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. Rounding is specified with the
 * props roundedX and roundedY.
 *
 *
 * The color and width of the rectangle may also be supplied.
 */
export class SquareEdge extends React.Component {
    handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
        e.stopPropagation();
    }

    _rotateOffset(cx, x, y, a) {
        const r = Math.PI / 180 * a;
        const cos = Math.cos(r);
        const sin = Math.sin(r);
        const nx = x - (x - cx) * cos;
        const ny = y - (x - cx) * sin;
        return [nx, ny];
    }

    render() {
        let classed = "edge-square";
        let labelClassed = "edge-label";
        let styleModifier = "normal";

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
        if (this.props.invisible) {
            classed += " edge-event-region";
            labelClassed += " edge-event-region";
        }
        if (!_.isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        const height = this.props.size;
        const fill = this.props.fillColor || "none";

        const yCorner = this.props.y1 - this.props.size / 2;

        if (this.props.selected) {
            classed += " selected";
        }
        if (this.props.muted) {
            classed += " muted";
        }
        if (this.props.invisible) {
            classed += " edge-event-region";
        }
        if (!_.isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        let opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0.0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        // find the length of an angled shape
        let width;

        if (this.props.y1 === this.props.y2) {
            width = Math.abs(this.props.x2 - this.props.x1);
        } else {
            const l1 = Math.abs(this.props.y2 - this.props.y1);
            const l2 = Math.abs(this.props.x2 - this.props.x1);
            width = Math.sqrt(l1 * l1 + l2 * l2);
        }

        /* to draw a center line, find the center point, then offset
         * the line to each side by 1/2 the height.
         * Using the new x y, rotate the positive offset line by the
         * same angle as the rest of the square, and the negative by
         * the opposite angle
         */

        // find the angle to rotate
        const angle =
            Math.atan2(this.props.y2 - this.props.y1, this.props.x2 - this.props.x1) *
            180 /
            Math.PI;
        const rotate = `rotate(${angle} ${this.props.x1}, ${this.props.y1})`;

        // find the center of the square
        const centerX = (this.props.x1 + this.props.x2) / 2;
        const centerY = (this.props.y1 + this.props.y2) / 2;

        // find the offset position
        const offset = centerX + height / 2;
        // rotate the offsets

        const rotatedOffset1 = this._rotateOffset(offset, centerX, centerY, angle + 90);
        const rotatedOffset2 = this._rotateOffset(offset, centerX, centerY, angle - 90);

        const rx1 = rotatedOffset1[0];
        const ry1 = rotatedOffset1[1];
        const rx2 = rotatedOffset2[0];
        const ry2 = rotatedOffset2[1];

        let path = "";
        path += "M" + rx1 + "," + ry1;
        path += " L " + rx2 + " " + ry2;

        let cx;
        let cy;

        switch (this.props.labelPosition) {
            case "top":
                cx = rx2;
                cy = ry2;
                break;
            case "bottom":
                cx = rx1;
                cy = ry1;
                break;
            default:
                cx = centerX;
                cy = centerY;
                break;
        }

        let labelElement = null;

        if (this.props.label) {
            labelElement = (
                <Label
                    x={cx}
                    y={cy}
                    r={angle}
                    textAnchor={this.props.textAnchor}
                    classed={labelClassed}
                    style={this.props.labelStyle[styleModifier]}
                    label={this.props.label}
                    xOffset={this.props.labelOffsetX}
                    yOffset={this.props.labelOffsetY}
                    labelPosition={this.props.labelPosition}
                />
            );
        }

        if (!this.props.centerLine) {
            return (
                <g>
                    <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                        <rect
                            className={classed}
                            width={width}
                            height={height}
                            transform={rotate}
                            x={this.props.x1}
                            y={yCorner}
                            rx={this.props.roundedX}
                            ry={this.props.roundedY}
                            fill={fill}
                            onClick={e => this.handleClick(e)}
                        />
                    </g>
                    {labelElement}
                </g>
            );
        } else {
            return (
                <g>
                    <g
                        strokeWidth={this.props.width}
                        stroke={this.props.color}
                        opacity={opacity}
                        onClick={e => this.handleClick(e)}
                    >
                        <rect
                            className={classed}
                            width={width}
                            height={height}
                            transform={rotate}
                            x={this.props.x1}
                            y={yCorner}
                            rx={this.props.roundedX}
                            ry={this.props.roundedY}
                            fill={fill}
                        />
                        <path className={classed} d={path} fill="none" />
                    </g>
                    {labelElement}
                </g>
            );
        }
    }
}

SquareEdge.propTypes = {
    /** When the endpoint shape is a `square`, this controls the radius of corners */
    roundedX: PropTypes.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners */
    roundedY: PropTypes.number,

    color: PropTypes.string,

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: PropTypes.number,

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: PropTypes.bool,

    /** Display the endpoint selected */
    selected: PropTypes.bool,

    /** Display the endpoint muted */
    muted: PropTypes.bool,

    /** Controls the size of the square */
    size: PropTypes.number
};

SquareEdge.defaultProps = {
    roundedX: 0,
    roundedY: 0,
    color: "#ddd",
    position: 0,
    arrow: false,
    selected: false,
    muted: false,
    size: 40
};
