"use strict";

var React  = require("react");
var Vector = require("victor");
var _      = require("underscore");

require("../styles/map.css");

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
var LinearEdge = React.createClass({

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
        var classed = "map-edge map-linear-edge";

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

        var source = new Vector(this.props.x1, this.props.y1);
        var target = new Vector(this.props.x2, this.props.y2);

        var diff = target.clone().subtract(source);
        var norm = diff.clone().norm();
        var perp = new Vector(-norm.y, norm.x);

        var offset = new Vector(this.props.offset, this.props.offset);
        offset.multiply(perp);

        //
        // If the edge has multiple paths, with this edge being at
        // 'position' (this.props.position) then calculate those
        //
        
        var position = this.props.position;
        var arrowWidth = this.props.arrowWidth || this.props.width*1.5;
        var arrowLength = this.props.arrowHeight || this.props.width*2;

        //Positioned lines bend from source, to sourceBendControl, to
        //targetBendControl, and end at target.
        var bendOffset = this.props.position !== 0 ? 15 : 8;
        var bendScalar = new Vector(bendOffset, bendOffset);

        var sourceToTarget = target.clone().subtract(source);
        var sourceToTargetNormalize = sourceToTarget.clone().norm();

        var targetToSource = source.clone().subtract(target);
        var targetToSourceNormalize = targetToSource.clone().norm();
        
        var sourceBend = sourceToTargetNormalize.clone().multiply(bendScalar).add(source);
        var targetBend = targetToSourceNormalize.clone().multiply(bendScalar).add(target);

        var sourceBendPerp = new Vector(-sourceToTargetNormalize.y, sourceToTargetNormalize.x);
        var sourceBendPerpScalar = new Vector(position, position);
        var sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

        var targetBendPerp = new Vector(-targetToSourceNormalize.y, targetToSourceNormalize.x);
        var targetBendPerpScalar = new Vector(-position, -position);
        var targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

        //Arrow at the target end
        var arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
        var arrowLeftScalar = new Vector(arrowWidth/2, arrowWidth/2);
        var arrowRightScalar = new Vector(-arrowWidth/2, -arrowWidth/2);
        var arrowHead = targetToSourceNormalize.clone().multiply(arrowLengthScalar).add(targetBendControl);
        var arrowBaseLeft = targetBendPerp.clone().multiply(arrowLeftScalar).add(targetBendControl);
        var arrowBaseRight= targetBendPerp.clone().multiply(arrowRightScalar).add(targetBendControl);

        //Line and Arc SVG path
        var path = "";
        path += "M" + source.x + "," + source.y;
        path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
        path += " L " + targetBendControl.x + " " + targetBendControl.y;

        //Arrow SVG path
        if (!this.props.arrow) {
            path += " L " + target.x + " " + target.y;
        }

        //Arrow SVG path
        var arrow = "M" + arrowHead.x + "," + arrowHead.y + " ";
        arrow += "L" + arrowBaseLeft.x + "," + arrowBaseLeft.y;
        arrow += "L" + arrowBaseRight.x + "," + arrowBaseRight.y;

        var opacity = 1.0;
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
    },
});

module.exports = LinearEdge;
