/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import _ from "underscore";
import React from "react";
import PropTypes from "prop-types";
import Victor from "victor";

import { Label } from "./Label";

// Alias
const Vector = Victor;

/**
 * This component draws a curved path between a source and target. The
 * source and target are specified as props x1, y1 and x2, y2.
 *
 * The curve of the path arcs through a point offset from the mid-point
 * of the line between source and target. This is specified as the prop
 * offset. The offset may be "left" or "right" as specified as curveDirection.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying arrowWidth and/or arrowHeight. It defaults to
 * being the width*1.5 wide and width*2 long.0
 *
 * Stroke color and width can also be supplied.
 */
export class ArcEdge extends React.Component {
    handleClick(e) {
        e.stopPropagation();
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
    }

    render() {
        // Class
        let classed = "edge-curved";
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

        const source = new Vector(this.props.x1, this.props.y1);
        const target = new Vector(this.props.x2, this.props.y2);

        const diff = target.clone().subtract(source);
        const norm = diff.clone().norm();
        const len = diff.length();

        //
        // XXX(jdugan): this doesn't work for horizontal lines
        //
        let angle = 90;
        if (
            (diff.y < 0 && this.props.curveDirection === "left") ||
            (diff.y > 0 && this.props.curveDirection === "right")
        ) {
            angle = -90;
        }

        const perp = norm.clone().rotateDeg(angle);
        const mid = new Vector(len / 2, len / 2);
        const midpt = norm
            .clone()
            .multiply(mid)
            .add(source);

        const offset = new Vector(this.props.offset, this.props.offset);
        offset.multiply(perp);

        const control = midpt.clone().add(offset);

        //
        // If the curved edge has multiple paths, with this path being at
        // 'position' (this.props.position) then calculate those the curve
        // to be offset from the centerline of the arced path
        //

        const position = this.props.position;
        const arrowWidth = this.props.arrowWidth || this.props.width * 1.5;
        const arrowLength = this.props.arrowHeight || this.props.width * 2;

        // Positioned lines bend from source, to sourceBendControl, to
        // targetBendControl, and end at target.
        const bendOffset = 15;
        const bendScalar = new Vector(bendOffset, bendOffset);

        const sourceToControl = control.clone().subtract(source);
        const sourceToControlNormalize = sourceToControl.clone().norm();

        const targetToControl = control.clone().subtract(target);
        const targetToControlNormalize = targetToControl.clone().norm();

        const sourceBend = sourceToControlNormalize
            .clone()
            .multiply(bendScalar)
            .add(source);
        const targetBend = targetToControlNormalize
            .clone()
            .multiply(bendScalar)
            .add(target);

        const sourceBendPerp = new Vector(-sourceToControlNormalize.y, sourceToControlNormalize.x);
        const sourceBendPerpScalar = new Vector(position, position);
        const sourceBendControl = sourceBendPerp
            .clone()
            .multiply(sourceBendPerpScalar)
            .add(sourceBend);

        const targetBendPerp = new Vector(-targetToControlNormalize.y, targetToControlNormalize.x);
        const targetBendPerpScalar = new Vector(-position, -position);
        const targetBendControl = targetBendPerp
            .clone()
            .multiply(targetBendPerpScalar)
            .add(targetBend);

        // Draw an arrow at the target end
        const arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
        const arrowLeftScalar = new Vector(arrowWidth / 2, arrowWidth / 2);
        const arrowRightScalar = new Vector(-arrowWidth / 2, -arrowWidth / 2);
        const arrowHead = targetToControlNormalize
            .clone()
            .multiply(arrowLengthScalar)
            .add(targetBendControl);
        const arrowBaseLeft = targetBendPerp
            .clone()
            .multiply(arrowLeftScalar)
            .add(targetBendControl);
        const arrowBaseRight = targetBendPerp
            .clone()
            .multiply(arrowRightScalar)
            .add(targetBendControl);

        // Arc options
        const y = this.props.offset;
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

        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        // Arrow SVG path
        let arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

        let opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        // Label Positioning
        const ry = Math.abs(targetBendControl.y - sourceBendControl.y);
        const rx = Math.abs(targetBendControl.x - sourceBendControl.x);
        let labelAngle = Math.atan2(ry, rx) * 180 / Math.PI;

        const cx = control.x;
        let cy = control.y + this.props.position;

        if (
            (target.y < source.y && source.x < target.x) ||
            (source.x > target.x && target.y > source.y)
        ) {
            labelAngle = -labelAngle;
        }

        if (source.x > target.x) {
            cy = control.y - this.props.position;
        }

        let labelElement = null;

        if (this.props.label) {
            labelElement = (
                <Label
                    x={cx}
                    y={cy}
                    r={labelAngle}
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
        if (this.props.arrow) {
            return (
                <g>
                    <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                        <path
                            d={path}
                            fill="none"
                            className={classed}
                            onClick={e => this.handleClick(e)}
                        />
                        <path
                            d={arrow}
                            className={classed}
                            stroke={this.props.color}
                            fill={this.props.color}
                            strokeWidth="1"
                        />
                    </g>
                    {labelElement}
                </g>
            );
        } else {
            return (
                <g>
                    <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                        <path
                            d={path}
                            fill="none"
                            className={classed}
                            onClick={e => this.handleClick(e)}
                        />
                    </g>
                    {labelElement}
                </g>
            );
        }
    }
}

ArcEdge.propTypes = {
    /** An offset to the position of the label which can be used for fine tuning */
    offset: PropTypes.number,

    /** The width of the circuit diagram */
    width: PropTypes.number,

    color: PropTypes.string,

    curveDirection: PropTypes.string,

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: PropTypes.bool,

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: PropTypes.number,

    /** Display the endpoint selected */
    selected: PropTypes.bool,

    /** Display the endpoint muted */
    muted: PropTypes.bool
};

ArcEdge.defaultProps = {
    offset: 20,
    width: 1,
    color: "#ddd",
    curveDirection: "left",
    arrow: false,
    position: 0,
    selected: false,
    muted: false
};
