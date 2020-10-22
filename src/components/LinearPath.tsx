/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { ReactElement, SyntheticEvent } from "react";
import Vector from "victor";
import _ from "lodash";

import { Label, TextAnchor, VerticalAlign, LABEL_DEFAULT_STYLE } from "./Label";
import { SelectableStyle } from "./types";

/**
 * LinearPath
 */
export interface LinearPathProps {
    id: string;

    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    /** The path stroke width, i.e how thick the line is. */
    width?: number;

    /** The color of the path */
    color?: string;

    /**
     * Controls the angle of the offset from the center of the path. This will
     * cause the line to bend out as it leaves the start point and then back in
     * as it approaches the end point. You can use this to assemble parallel
     * lines between two points.
     */
    position?: number;

    /**
     *
     */
    offset?: number;

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * `arrowWidth` and `arrowHeight` property.
     */
    arrow?: boolean;

    /** Size of the arrowhead */
    arrowWidth?: number;

    /** Size of the arrowhead */
    arrowHeight?: number;

    /**
     * A label to display along the path
     */
    label?: string;

    labelStyle?: SelectableStyle;

    labelTextAnchor?: TextAnchor;

    /**
     * Tweak the label position in the x direction
     */
    labelOffsetX?: number;

    /**
     * Tweak the label position in the y direction
     */
    labelOffsetY?: number;

    /**
     * Position the label above, below or on the line. This props should be
     * either VericalAlign.Top, VericalAlign.Bottom, or VericalAlign.Center.
     */
    labelVerticalAlign?: VerticalAlign;

    /**
     * Display the path selected
     */
    selected?: boolean;

    /**
     * Display the path muted
     */
    muted?: boolean;

    /**
     * Don't display this path at all
     */
    invisible?: boolean;

    /**
     * CSS class to add onto this path
     */
    classed?: string;

    onSelectionChange?: (type: string, id: string) => void;
}

/**
 * This component draws a linear path between a source and target. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'.
 *
 * The path may have a bend, which is controlled with the prop 'position'.
 *
 * An arrow may be added by passing an `arrow` prop of true and may be
 * customized by supplying `arrowWidth` and/or `arrowHeight`. If the path
 * has a bend then the final section of the path is skipped and replaced
 * with just the arrow.
 *
 * The `color` and `width` of the path may also be supplied.
 */
export const LinearPath = (props: LinearPathProps): ReactElement => {
    const {
        id,
        x1,
        y1,
        x2,
        y2,
        width = 2,
        color = "#ddd",
        position = 0,
        offset = 0,
        arrow = false,
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

    let classed = "path-linear";
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

    if (!_.isUndefined(classed)) {
        classed += " " + classed;
    }

    const source = new Vector(x1, y1);
    const target = new Vector(x2, y2);

    const diff = target.clone().subtract(source);
    const norm = diff.clone().norm();
    const perp = new Vector(-norm.y, norm.x);

    const offsetV = new Vector(offset, offset);
    offsetV.multiply(perp);

    //
    // If the path has multiple paths, with this path being at
    // 'position' (props.position), then calculate those
    //

    const arrowWidth = props.arrowWidth || width * 1.5;
    const arrowLength = props.arrowHeight || width * 2;

    // Positioned lines bend between:
    //
    //   \ - source
    //     \
    //      | - sourceBendControl
    //      |
    //      | - targetBendControl
    //     /
    //    /- target

    const bendOffset = position !== 0 ? 15 : 8;
    const bendScalar = new Vector(bendOffset, bendOffset);

    const sourceToTarget = target.clone().subtract(source);
    const sourceToTargetNormalize = sourceToTarget.clone().norm();

    const targetToSource = source.clone().subtract(target);
    const targetToSourceNormalize = targetToSource.clone().norm();

    const sourceBend = sourceToTargetNormalize.clone().multiply(bendScalar).add(source);

    const targetBend = targetToSourceNormalize.clone().multiply(bendScalar).add(target);

    const sourceBendPerp = new Vector(-sourceToTargetNormalize.y, sourceToTargetNormalize.x);
    const sourceBendPerpScalar = new Vector(position, position);
    const sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

    const targetBendPerp = new Vector(-targetToSourceNormalize.y, targetToSourceNormalize.x);
    const targetBendPerpScalar = new Vector(-position, -position);
    const targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

    // Arrow at the target end
    const arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
    const arrowLeftScalar = new Vector(arrowWidth / 2, arrowWidth / 2);
    const arrowRightScalar = new Vector(-arrowWidth / 2, -arrowWidth / 2);
    const arrowHead = targetToSourceNormalize.clone().multiply(arrowLengthScalar).add(targetBendControl);
    const arrowBaseLeft = targetBendPerp.clone().multiply(arrowLeftScalar).add(targetBendControl);
    const arrowBaseRight = targetBendPerp.clone().multiply(arrowRightScalar).add(targetBendControl);

    // Line and Arc SVG path
    let path = "";
    path += "M" + source.x + "," + source.y;
    path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
    path += " L " + targetBendControl.x + " " + targetBendControl.y;

    // Arrow SVG path
    if (!arrow) {
        path += " L " + target.x + " " + target.y;
    }

    // Arrow SVG path
    let arrowPath = "M" + arrowHead.x + "," + arrowHead.y + " ";
    arrowPath += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
    arrowPath += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

    let opacity = 1.0;
    if (invisible) {
        opacity = 0.0;
    } else if (muted) {
        opacity = 0.3;
    }

    // Label Positioning
    const ry = Math.abs(targetBendControl.y - sourceBendControl.y);
    const rx = Math.abs(targetBendControl.x - sourceBendControl.x);
    let angle = (Math.atan2(ry, rx) * 180) / Math.PI;

    const cx = (sourceBendControl.x + targetBendControl.x) / 2;
    const cy = (sourceBendControl.y + targetBendControl.y) / 2;

    if ((target.y < source.y && source.x < target.x) || (source.x > target.x && target.y > source.y)) {
        angle = -angle;
    }

    let labelElement = null;

    if (label) {
        labelElement = (
            <Label
                x={cx}
                y={cy}
                angle={angle}
                labelTextAnchor={labelTextAnchor}
                labelClassed={labelClassed}
                style={labelStyle[styleModifier]}
                label={label}
                xOffset={labelOffsetX}
                yOffset={labelOffsetY}
                textVerticalAlign={labelVerticalAlign}
            />
        );
    }

    if (arrow) {
        return (
            <g>
                <g strokeWidth={width} stroke={color} opacity={opacity}>
                    <path className={classed} d={path} fill="none" onClick={handleClick} />
                    <path className={classed} d={arrowPath} fill={color} strokeWidth="1" />
                </g>
                {labelElement}
            </g>
        );
    } else {
        return (
            <g>
                <g strokeWidth={width} stroke={color} opacity={opacity}>
                    <path className={classed} d={path} fill="none" onClick={handleClick} />
                </g>
                {labelElement}
            </g>
        );
    }
};
