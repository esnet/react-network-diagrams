import React from "react";
import Vector from "victor";
import _ from "underscore";

import "./map.css";

/**
 * This component draws a linear bent path between a source and target. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'. The bend is
 * specified with the prop 'position'.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying 'arrowWidth' and/or 'arrowHeight'. Both default to
 * 10px.
 *
 * The color and width of the edge may also be supplied.
 */
export default React.createClass({

    getDefaultProps: function() {
        return {
            width: 1,
            color: "#ddd",
            position: 0,
            arrow: false,
            selected: false,
            muted: false
        };
    },

    render: function() {
        let classed = "map-edge map-linear-edge";
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
        }

        if (this.props.arrow) {
            return (
                <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                    <path className={classed} d={path} fill="none" onClick={this.handleClick}/>
                    <path className={classed} d={arrow} fill={this.props.color} strokeWidth="1"/>
                </g>
            );
        } else {
            return (
                <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                    <path className={classed} d={path} fill="none" onClick={this.handleClick}/>
                </g>
            );
        }
    },

    handleClick: function(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("edge", this.props.name);
        }
        e.stopPropagation();
    }
});
