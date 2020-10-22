/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { ReactElement, SyntheticEvent } from "react";
import _ from "lodash";

import { Label, LABEL_DEFAULT_STYLE, TextAnchor, VerticalAlign } from "./Label";
import { SelectableStyle } from "./types";

export interface SquarePathProps {
    id: string;

    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    /** The size of the box */
    size: number;

    /** Radius of the box corners */
    roundedX: number;

    /** Radius of the box corners */
    roundedY: number;

    /**
     * Display a centerline, dividing the box in half
     */
    showCenterLine?: boolean;

    /** The color of outline of the box */
    color?: string;

    /** The color to fill the inside of the box */
    fillColor?: string;

    /** The opacity of the box */
    opacity?: number;

    /** The stroke width of the box outline */
    thickness?: number;

    /** A label to display along the path */
    label?: string;

    /** CSS style for the label */
    labelStyle?: SelectableStyle;

    /** Text positioning of the label */
    labelTextAnchor?: TextAnchor;

    /** Tweak the label position in the x direction */
    labelOffsetX?: number;

    /** Tweak the label position in the y direction */
    labelOffsetY?: number;

    /**
     * Position the label above, below or on the line. This props should be
     * either VericalAlign.Top, VericalAlign.Bottom, or VericalAlign.Center.
     */
    labelVerticalAlign?: VerticalAlign;

    /** Display the path selected */
    selected?: boolean;

    /** Display the path muted */
    muted?: boolean;

    /** Display the path or not */
    invisible?: boolean;

    /** Callback which is called when the user selects this path */
    onSelectionChange?: (type: string, id: string) => void;

    // Optional CSS class to add to path
    classed?: string;
}

const rotateOffset = (cx: number, x: number, y: number, a: number): [nx: number, ny: number] => {
    const r = (Math.PI / 180) * a;
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    const nx = x - (x - cx) * cos;
    const ny = y - (x - cx) * sin;
    return [nx, ny];
};

export const SquarePath = (props: SquarePathProps): ReactElement => {
    const {
        id,
        x1,
        y1,
        x2,
        y2,
        size,
        showCenterLine = false,
        roundedX = 0,
        roundedY = 0,
        thickness = 3,
        color = "#ddd",
        fillColor = "none",
        opacity = 1,
        label,
        labelStyle = LABEL_DEFAULT_STYLE,
        labelTextAnchor,
        labelOffsetX = 0,
        labelOffsetY = 5,
        labelVerticalAlign = VerticalAlign.Top,
        selected = false,
        muted = false,
        invisible = false,
        onSelectionChange,
    } = props;

    const handleClick = (e: SyntheticEvent) => {
        if (onSelectionChange) {
            onSelectionChange("edge", id);
        }
        e.stopPropagation();
    };

    // Build class string
    let classed = "path-square";
    let labelClassed = "path-label";
    let styleModifier = "normal";

    if (selected) {
        classed += " selected";
        labelClassed += "selected";
        styleModifier = "selected";
    }
    if (muted) {
        classed += " muted";
        labelClassed += "muted";
        styleModifier = "muted";
    }
    if (invisible) {
        classed += " path-event-region";
        labelClassed += " path-event-region";
    }
    if (!_.isUndefined(props.classed)) {
        classed += " " + props.classed;
    }

    const yCorner = y1 - size / 2;

    // find the length of an angled shape
    let width;
    if (y1 === y2) {
        width = Math.abs(x2 - x1);
    } else {
        const l1 = Math.abs(y2 - y1);
        const l2 = Math.abs(x2 - x1);
        width = Math.sqrt(l1 * l1 + l2 * l2);
    }

    /* to draw a center line, find the center point, then offset
     * the line to each side by 1/2 the size.
     * Using the new x y, rotate the positive offset line by the
     * same angle as the rest of the square, and the negative by
     * the opposite angle
     */

    // find the angle to rotate
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    const rotate = `rotate(${angle} ${x1}, ${y1})`;

    // find the center of the square
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    // find the offset position
    const offset = centerX + size / 2;

    // rotate the offsets
    const rotatedOffset1 = rotateOffset(offset, centerX, centerY, angle + 90);
    const rotatedOffset2 = rotateOffset(offset, centerX, centerY, angle - 90);

    const rx1 = rotatedOffset1[0];
    const ry1 = rotatedOffset1[1];
    const rx2 = rotatedOffset2[0];
    const ry2 = rotatedOffset2[1];

    let path = "";
    path += "M" + rx1 + "," + ry1;
    path += " L " + rx2 + " " + ry2;

    let cx;
    let cy;
    switch (labelVerticalAlign) {
        case VerticalAlign.Top:
            cx = rx2;
            cy = ry2;
            break;
        case VerticalAlign.Bottom:
            cx = rx1;
            cy = ry1;
            break;
        default:
            cx = centerX;
            cy = centerY;
            break;
    }

    let labelElement = null;

    if (label) {
        labelElement = (
            <Label
                x={cx}
                y={cy}
                angle={angle}
                labelClassed={labelClassed}
                style={labelStyle[styleModifier]}
                label={label}
                xOffset={labelOffsetX}
                yOffset={labelOffsetY}
                labelTextAnchor={labelTextAnchor}
                textVerticalAlign={labelVerticalAlign}
            />
        );
    }

    if (!showCenterLine) {
        return (
            <g>
                <g strokeWidth={thickness} stroke={color} opacity={opacity}>
                    <rect
                        className={classed}
                        width={width}
                        height={size}
                        transform={rotate}
                        x={x1}
                        y={yCorner}
                        rx={roundedX}
                        ry={roundedY}
                        fill={fillColor}
                        onClick={(e) => handleClick(e)}
                    />
                </g>
                {labelElement}
            </g>
        );
    } else {
        return (
            <g>
                <g strokeWidth={thickness} stroke={color} opacity={opacity} onClick={handleClick}>
                    <rect
                        className={classed}
                        width={width}
                        height={size}
                        transform={rotate}
                        x={x1}
                        y={yCorner}
                        rx={roundedX}
                        ry={roundedY}
                        fill={fillColor}
                    />
                    <path className={classed} d={path} fill="none" />
                </g>
                {labelElement}
            </g>
        );
    }
};

SquarePath.defaultProps = {
    thickness: 1.5,
    roundedX: 0,
    roundedY: 0,
    color: "#ddd",
    arrow: false,
    selected: false,
    muted: false,
    height: 40,
};
