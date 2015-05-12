"use strict";

var React  = require("react");
var Vector = require("victor");
var _      = require("underscore");

require("../styles/map.css");

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
var ArcEdge = React.createClass({

    getDefaultProps: function() {
        return {
            offset: 20,
            width: 1,
            color: "#ddd",
            curveDirection: "left",
            arrow: false,
            position: 0,
            selected: false,
            muted: false
        };
    },

    render: function() {
        var classed = "map-edge map-curved-edge";
        
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
        var len = diff.length();

        //
        // XXX(jdugan): this doesn't work for horizontal lines
        //
        var angle = 90;
        if (diff.y < 0 && this.props.curveDirection === "left" ||
            diff.y > 0 && this.props.curveDirection === "right") {
            angle = -90;
        }

        var perp = norm.clone().rotateDeg(angle);
        var mid = new Vector(len/2, len/2);
        var midpt = norm.clone().multiply(mid).add(source);

        var offset = new Vector(this.props.offset, this.props.offset);
        offset.multiply(perp);

        var control = midpt.clone().add(offset);

        //
        // If the curved edge has multiple paths, with this path being at
        // 'position' (this.props.position) then calculate those the curve
        // to be offset from the centerline of the arced path
        //
        
        var position = this.props.position;
        var arrowWidth = this.props.arrowWidth || this.props.width*1.5;
        var arrowLength = this.props.arrowHeight || this.props.width*2;

        //Positioned lines bend from source, to sourceBendControl, to
        //targetBendControl, and end at target.
        var bendOffset = 15; //this.props.position !== 0 ? 15 : 8;
        var bendScalar = new Vector(bendOffset, bendOffset);

        var sourceToControl = control.clone().subtract(source);
        var sourceToControlNormalize = sourceToControl.clone().norm();

        var targetToControl = control.clone().subtract(target);
        var targetToControlNormalize = targetToControl.clone().norm();
        
        var sourceBend = sourceToControlNormalize.clone().multiply(bendScalar).add(source);
        var targetBend = targetToControlNormalize.clone().multiply(bendScalar).add(target);

        var sourceBendPerp = new Vector(-sourceToControlNormalize.y, sourceToControlNormalize.x);
        var sourceBendPerpScalar = new Vector(position, position);
        var sourceBendControl = sourceBendPerp.clone().multiply(sourceBendPerpScalar).add(sourceBend);

        var targetBendPerp = new Vector(-targetToControlNormalize.y, targetToControlNormalize.x);
        var targetBendPerpScalar = new Vector(-position, -position);
        var targetBendControl = targetBendPerp.clone().multiply(targetBendPerpScalar).add(targetBend);

        //Draw an arrow at the target end
        var arrowLengthScalar = new Vector(-arrowLength, -arrowLength);
        var arrowLeftScalar = new Vector(arrowWidth/2, arrowWidth/2);
        var arrowRightScalar = new Vector(-arrowWidth/2, -arrowWidth/2);
        var arrowHead = targetToControlNormalize.clone().multiply(arrowLengthScalar).add(targetBendControl);
        var arrowBaseLeft = targetBendPerp.clone().multiply(arrowLeftScalar).add(targetBendControl);
        var arrowBaseRight= targetBendPerp.clone().multiply(arrowRightScalar).add(targetBendControl);

        //Arc options
        var y = this.props.offset;
        var radius = (len*len + 4*y*y)/(8*y);
        var rotation = 0;
        var largeArcFlag = 0;
        var sweepFlag = angle === 90 ? 0 : 1;

        //Line and Arc SVG path
        var path = "";
        path += "M" + source.x + "," + source.y;
        path += " L " + sourceBendControl.x + " " + sourceBendControl.y;
        path += " A " + radius + " " + radius + " " + rotation + " " +
                largeArcFlag + " " + sweepFlag + " "+ targetBendControl.x + " " + targetBendControl.y;

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
                    <path d={path} fill="none" className={classed} onClick={this.handleClick}/>
                    <path d={arrow} className={classed} stroke={this.props.color} fill={this.props.color} strokeWidth="1"/>
                </g>
            );
        } else {
            return (
                <g strokeWidth={this.props.width} stroke={this.props.color} opacity={opacity}>
                    <path d={path} fill="none" className={classed} onClick={this.handleClick}/>
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

module.exports = ArcEdge;
