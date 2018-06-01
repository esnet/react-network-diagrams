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
 * This component draws an angled path between a source and target. The
 * source and target are specified as props x1, y1 and x2, y2.
 *
 * The angle of the path is either left aligned (vertical, then horizontal)
 * or right aligned (horizontal, then vertical) as specified by curve
 * direction.  The offset and position prop are used to position the line
 * in relation to the endpoints for bi-directional purposes.

 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying arrowWidth and/or arrowHeight. It defaults to
 * being the width*1.5 wide and width*2 long.
 *
 * Stroke color and width can also be supplied.
 */
export class AngledEdge extends React.Component {
    handleClick(e) {
        e.stopPropagation();
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
    }

    rotateOffset(cx, x, y, a) {
        const r = Math.PI / 180 * a;
        const cos = Math.cos(r);
        const sin = Math.sin(r);
        const nx = x - (x - cx) * cos;
        const ny = y - (x - cx) * sin;
        return [nx, ny];
    }

    render() {
        // Class
        let classed = "edge-angled";
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

        const angle = this.props.position;
        const offset = this.props.offset;

        // set the source and target vectors
        const source = new Vector(this.props.x1, this.props.y1);
        const target = new Vector(this.props.x2, this.props.y2);

        let sourceAngle;
        let targetAngle;
        const arrowWidth = this.props.arrowWidth || this.props.width * 1.5;
        const arrowLength = this.props.arrowHeight || this.props.width * 2;

        switch (this.props.curveDirection) {
            case "left":
                if (source.x < target.x && source.y < target.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = -angle;
                } else if (target.x < source.x && target.y < source.y) {
                    sourceAngle = 180 + angle;
                    targetAngle = -90 - angle;
                } else if (source.x < target.x && source.y > target.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = angle;
                } else if (target.x < source.x && target.y > source.y) {
                    sourceAngle = 180 - angle;
                    targetAngle = 90 + angle;
                } else if (source.x > target.x && source.y === target.y) {
                    sourceAngle = 180 - angle;
                    targetAngle = 180 + angle;
                } else if (source.x === target.x && source.y > target.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = -90 + angle;
                } else if (source.x === target.x && source.y < target.y) {
                    sourceAngle = 90 - angle;
                    targetAngle = 90 + angle;
                } else {
                    sourceAngle = -angle;
                    targetAngle = angle;
                }
                break;
            case "right":
                if (source.x < target.x && source.y < target.y) {
                    sourceAngle = -angle;
                    targetAngle = 90 + angle;
                } else if (target.x < source.x && target.y < source.y) {
                    sourceAngle = -90 - angle;
                    targetAngle = 180 + angle;
                } else if (source.x < target.x && source.y > target.y) {
                    sourceAngle = angle;
                    targetAngle = -90 - angle;
                } else if (target.x < source.x && target.y > source.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = 180 - angle;
                } else if (source.x > target.x && source.y === target.y) {
                    sourceAngle = 180 + angle;
                    targetAngle = 180 - angle;
                } else if (source.x === target.x && source.y > target.y) {
                    sourceAngle = -90 + angle;
                    targetAngle = -90 - angle;
                } else if (source.x === target.x && source.y < target.y) {
                    sourceAngle = 90 + angle;
                    targetAngle = 90 - angle;
                } else {
                    sourceAngle = angle;
                    targetAngle = -angle;
                }
                break;
            default:
                break;
        }

        const sourceRotated = this.rotateOffset(source.x + offset, source.x, source.y, sourceAngle);
        const targetRotated = this.rotateOffset(target.x - offset, target.x, target.y, targetAngle);

        const sourceOffset = new Vector(sourceRotated[0], sourceRotated[1]);
        const targetOffset = new Vector(targetRotated[0], targetRotated[1]);

        const arrowBase = targetOffset.clone();

        const diff = offset - arrowLength;

        const arrowHeadLocation = this.rotateOffset(
            target.x - diff,
            target.x,
            target.y,
            targetAngle
        );

        const arrowLeftSide = this.rotateOffset(
            arrowBase.x - arrowWidth / 2,
            arrowBase.x,
            arrowBase.y,
            90 + targetAngle
        );
        const arrowRightSide = this.rotateOffset(
            arrowBase.x + arrowWidth / 2,
            arrowBase.x,
            arrowBase.y,
            90 + targetAngle
        );

        const arrowBaseLeft = new Vector(arrowLeftSide[0], arrowLeftSide[1]);
        const arrowBaseRight = new Vector(arrowRightSide[0], arrowRightSide[1]);
        const arrowHead = new Vector(arrowHeadLocation[0], arrowHeadLocation[1]);

        let path = "";
        path += "M " + source.x + "," + source.y;
        path += " L " + sourceOffset.x + "," + sourceOffset.y;

        // Label Positioning
        const cx = (source.x + target.x) / 2;
        let cy = (source.y + target.y) / 2;

        switch (this.props.curveDirection) {
            case "left":
                if (
                    (source.x < target.x && source.y < target.y) ||
                    (source.x < target.x && source.y > target.y)
                ) {
                    path += " L " + sourceOffset.x + "," + targetOffset.y;
                    cy = target.y;
                } else {
                    path += " L " + targetOffset.x + "," + sourceOffset.y;
                    cy = source.y;
                }
                break;
            case "right":
                if (
                    (source.x < target.x && source.y < target.y) ||
                    (source.x < target.x && source.y > target.y)
                ) {
                    path += " L " + targetOffset.x + "," + sourceOffset.y;
                    cy = source.y;
                } else {
                    path += " L " + sourceOffset.x + "," + targetOffset.y;
                    cy = target.y;
                }
                break;
            default:
                break;
        }

        path += " L " + targetOffset.x + "," + targetOffset.y;

        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        // Draw an arrow at the target end
        // Arrow SVG

        let arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;
        arrow += "L" + arrowHead.x + "," + arrowHead.y;

        let opacity = 1.0;
        if (this.props.invisible) {
            opacity = 0;
        } else if (this.props.muted) {
            opacity = 0.3;
        }

        let labelElement = null;

        if (this.props.label) {
            labelElement = (
                <Label
                    x={cx}
                    y={cy}
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

AngledEdge.propTypes = {
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

AngledEdge.defaultProps = {
    offset: 15,
    width: 1,
    color: "#ddd",
    curveDirection: "left",
    arrow: false,
    position: 30,
    selected: false,
    muted: false
};
