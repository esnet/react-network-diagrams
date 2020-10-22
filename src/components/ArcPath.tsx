/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import _ from "lodash";
import React, { ReactElement, SyntheticEvent } from "react";
import Victor from "victor";

import { Label, LABEL_DEFAULT_STYLE, TextAnchor, VerticalAlign } from "./Label";
import { SelectableStyle, CurveDirection } from "./types";

// Alias
const Vector = Victor;

export interface ArcPathProps {
    id: string;

    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    /** An offset to the position of the label which can be used for fine tuning */
    offset: number;

    /** The path stroke width, i.e how thick the line is. */
    width?: number;

    /** The color of the path */
    color?: string;

    /** Determines if the arc curves to the left or right */
    curveDirection?: CurveDirection;

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
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
     * Controls the angle of the offset from the center of the line.
     */
    position?: number;

    /** Display the path selected */
    selected?: boolean;

    /** Display the path muted */
    muted?: boolean;

    /** Display the path or not */
    invisible?: boolean;

    /** CSS class to put on the end */
    classed?: string;

    /** Callback which is called when the user selects this path */
    onSelectionChange?: (type: string, id: string) => void;
}

/**
 * This component draws a curved path between a source and target. The
 * source and target are specified as props x1, y1 and x2, y2.
 *
 * The curve of the path arcs through a point offset from the mid-point
 * of the line between source and target. This is specified as the prop
 * `offset`. The offset may curve "left" or "right" as specified as `curveDirection`.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying `arrowWidth` and/or `arrowHeight`. It defaults to
 * being the `width * 1.5` wide and `width * 2` long.
 *
 * Stroke `color` and `width` can also be supplied.
 */
export const ArcPath = (props: ArcPathProps): ReactElement => {
    const {
        id,
        x1,
        y1,
        x2,
        y2,
        offset = 20,
        width = 1,
        color = "#ddd",
        curveDirection = CurveDirection.Left,
        arrow = false,
        label,
        labelStyle = LABEL_DEFAULT_STYLE,
        labelTextAnchor,
        labelOffsetX = 0,
        labelOffsetY = 5,
        labelVerticalAlign = VerticalAlign.Top,
        position = 0,
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

    // Class
    let classed = "path-curved";
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
        classed += " edge-event-region";
        labelClassed += " edge-event-region";
    }
    if (!_.isUndefined(classed)) {
        classed += " " + classed;
    }

    const source = new Vector(x1, y1);
    const target = new Vector(x2, y2);

    const diff = target.clone().subtract(source);
    const norm = diff.clone().norm();
    const len = diff.length();

    //
    // TODO: this doesn't work for horizontal lines
    //
    let angle = 90;
    if (
        (diff.y < 0 && curveDirection === CurveDirection.Left) ||
        (diff.y > 0 && curveDirection === CurveDirection.Right)
    ) {
        angle = -90;
    }

    const perp = norm.clone().rotateDeg(angle);
    const mid = new Vector(len / 2, len / 2);
    const midpt = norm.clone().multiply(mid).add(source);

    const offsetV = new Vector(offset, offset);
    offsetV.multiply(perp);

    const control = midpt.clone().add(offsetV);

    //
    // If the curved edge has multiple paths, with this path being at
    // 'position' then calculate those the curve to be offset from the
    // centerline of the arced path
    //

    const arrowWidth = props.arrowWidth || width * 1.5;
    const arrowLength = props.arrowHeight || width * 2;

    // Positioned lines bend from source, to sourceBendControl, to
    // targetBendControl, and end at target.
    const bendOffset = 15;
    const bendScalar = new Vector(bendOffset, bendOffset);

    const sourceToControl = control.clone().subtract(source);
    const sourceToControlNormalize = sourceToControl.clone().norm();

    const targetToControl = control.clone().subtract(target);
    const targetToControlNormalize = targetToControl.clone().norm();

    const sourceBend = sourceToControlNormalize.clone().multiply(bendScalar).add(source);
    const targetBend = targetToControlNormalize.clone().multiply(bendScalar).add(target);

    const sourceBendPerp = new Vector(-sourceToControlNormalize.y, sourceToControlNormalize.x);
    const sourceBendPerpScalar = new Vector(position, position);
    const sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

    const targetBendPerp = new Vector(-targetToControlNormalize.y, targetToControlNormalize.x);
    const targetBendPerpScalar = new Vector(-position, -position);
    const targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

    // Draw an arrow at the target end
    const arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
    const arrowLeftScalar = new Vector(arrowWidth / 2, arrowWidth / 2);
    const arrowRightScalar = new Vector(-arrowWidth / 2, -arrowWidth / 2);
    const arrowHead = targetToControlNormalize.clone().multiply(arrowLengthScalar).add(targetBendControl);
    const arrowBaseLeft = targetBendPerp.clone().multiply(arrowLeftScalar).add(targetBendControl);
    const arrowBaseRight = targetBendPerp.clone().multiply(arrowRightScalar).add(targetBendControl);

    // Arc options
    const y = offset;
    const radius = (len * len + 4 * y * y) / (8 * y);
    const rotation = 0;
    const largeArcFlag = 0;
    const sweepFlag = angle === 90 ? 0 : 1;

    // Line and Arc SVG path
    let path = "";
    path += "M" + source.x + "," + source.y;
    path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
    path +=
        " A " +
        radius +
        " " +
        radius +
        " " +
        rotation +
        " " +
        largeArcFlag +
        " " +
        sweepFlag +
        " " +
        targetBendControl.x +
        " " +
        targetBendControl.y;

    if (!arrow) {
        path += " L " + target.x + " " + target.y;
    }

    // Arrow SVG path
    let arrowPath = "M" + arrowHead.x + "," + arrowHead.y + " ";
    arrowPath += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
    arrowPath += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

    let opacity = 1.0;
    if (invisible) {
        opacity = 0;
    } else if (muted) {
        opacity = 0.3;
    }

    // Label Positioning
    const ry = Math.abs(targetBendControl.y - sourceBendControl.y);
    const rx = Math.abs(targetBendControl.x - sourceBendControl.x);
    let labelAngle = (Math.atan2(ry, rx) * 180) / Math.PI;

    const cx = control.x;
    let cy = control.y + position;

    if ((target.y < source.y && source.x < target.x) || (source.x > target.x && target.y > source.y)) {
        labelAngle = -labelAngle;
    }

    if (source.x > target.x) {
        cy = control.y - position;
    }

    let labelElement = null;
    if (label) {
        labelElement = (
            <Label
                x={cx}
                y={cy}
                angle={labelAngle}
                labelTextAnchor={labelTextAnchor}
                style={labelStyle[styleModifier]}
                label={label}
                labelClassed={labelClassed}
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
                    <path d={path} fill="none" className={classed} onClick={handleClick} />
                    <path d={arrowPath} className={classed} stroke={color} fill={color} strokeWidth="1" />
                </g>
                {labelElement}
            </g>
        );
    } else {
        return (
            <g>
                <g strokeWidth={width} stroke={color} opacity={opacity}>
                    <path d={path} fill="none" className={classed} onClick={handleClick} />
                </g>
                {labelElement}
            </g>
        );
    }
};
