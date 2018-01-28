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
import Vector from "victor";
import _ from "underscore";

import { Label } from "./Label";

/**
 * This component draws a linear bent path between a source and target. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. The
 * bend is specified with the prop 'position'.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying 'arrowWidth' and/or 'arrowHeight'. Both default to
 * 10px.
 *
 * The color and width of the edge may also be supplied.
 */
export class LinearEdge extends React.Component {
    handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
        e.stopPropagation();
    }

    render() {
        let classed = "edge-linear";
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
        const perp = new Vector(-norm.y, norm.x);

        const offset = new Vector(this.props.offset, this.props.offset);
        offset.multiply(perp);

        //
        // If the edge has multiple paths, with this edge being at
        // 'position' (this.props.position) then calculate those
        //

        const position = this.props.position;
        const arrowWidth = this.props.arrowWidth || this.props.width * 1.5;
        const arrowLength = this.props.arrowHeight || this.props.width * 2;

        // Positioned lines bend from source, to sourceBendControl, to
        // targetBendControl, and end at target.
        const bendOffset = this.props.position !== 0 ? 15 : 8;
        const bendScalar = new Vector(bendOffset, bendOffset);

        const sourceToTarget = target.clone().subtract(source);
        const sourceToTargetNormalize = sourceToTarget.clone().norm();

        const targetToSource = source.clone().subtract(target);
        const targetToSourceNormalize = targetToSource.clone().norm();

        const sourceBend = sourceToTargetNormalize
            .clone()
            .multiply(bendScalar)
            .add(source);

        const targetBend = targetToSourceNormalize
            .clone()
            .multiply(bendScalar)
            .add(target);

        const sourceBendPerp = new Vector(-sourceToTargetNormalize.y, sourceToTargetNormalize.x);
        const sourceBendPerpScalar = new Vector(position, position);
        const sourceBendControl = sourceBendPerp
            .clone()
            .multiply(sourceBendPerpScalar)
            .add(sourceBend);

        const targetBendPerp = new Vector(-targetToSourceNormalize.y, targetToSourceNormalize.x);
        const targetBendPerpScalar = new Vector(-position, -position);
        const targetBendControl = targetBendPerp
            .clone()
            .multiply(targetBendPerpScalar)
            .add(targetBend);

        // Arrow at the target end
        const arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
        const arrowLeftScalar = new Vector(arrowWidth / 2, arrowWidth / 2);
        const arrowRightScalar = new Vector(-arrowWidth / 2, -arrowWidth / 2);
        const arrowHead = targetToSourceNormalize
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

        // Line and Arc SVG path
        let path = "";
        path += "M" + source.x + "," + source.y;
        path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
        path += " L " + targetBendControl.x + " " + targetBendControl.y;

        // Arrow SVG path
        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        // Arrow SVG path
        let arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

        let opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0.0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        // Label Positioning

        const ry = Math.abs(targetBendControl.y - sourceBendControl.y);
        const rx = Math.abs(targetBendControl.x - sourceBendControl.x);
        let angle = Math.atan2(ry, rx) * 180 / Math.PI;

        const cx = (sourceBendControl.x + targetBendControl.x) / 2;
        const cy = (sourceBendControl.y + targetBendControl.y) / 2;

        if (
            (target.y < source.y && source.x < target.x) ||
            (source.x > target.x && target.y > source.y)
        ) {
            angle = -angle;
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

        if (this.props.arrow) {
            return (
                <g>
                    <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                        <path
                            className={classed}
                            d={path}
                            fill="none"
                            onClick={e => this.handleClick(e)}
                        />
                        <path
                            className={classed}
                            d={arrow}
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
                            className={classed}
                            d={path}
                            fill="none"
                            onClick={e => this.handleClick(e)}
                        />
                    </g>
                    {labelElement}
                </g>
            );
        }
    }
}

LinearEdge.propTypes = {
    /** The width of the circuit diagram */
    width: PropTypes.number,

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
    muted: PropTypes.bool
};

LinearEdge.defaultProps = {
    width: 1,
    color: "#ddd",
    position: 0,
    arrow: false,
    selected: false,
    muted: false
};
