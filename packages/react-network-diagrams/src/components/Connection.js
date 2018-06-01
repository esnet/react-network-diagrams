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

import { Endpoint } from "./Endpoint";
import { SimpleEdge as Line } from "./SimpleEdge";

/**
 * The `x1`, `x2`, `y1`, and `y2` properties determine the position of the endpoints on the `<svg>` element.
 * A path is then drawn betwween the endpoints. If the lineShape property is set to "square",
 * the width of the square will be the distance between x1 and x2, with the height of the square
 * determined by the size prop.
 *
 * The `labelPosition`, determines where the label will be positioned around the line. The `xOffset` and
 * `yOffset` properties allow you to customize the distance the label is from the `x` and `y` properties.
 *
 * The `label` property is the name that will be displayed on the line. If you want to display multiple
 * lines, the label can take an array of strings, with each array element displayed on a separate line.
 */
export class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: false
        };
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    }

    /**
     * User hovers over the circuit
     */
    handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    }

    /**
     * Use stops hovering over circuit
     */
    handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    }

    handleSelectionChanged(e, value) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    }

    renderEndpoints() {
        if (this.props.arrow) {
            return <g />;
        } else {
            return (
                <g>
                    <Endpoint
                        x={this.props.x1}
                        y={this.props.y1}
                        key={"line-begin"}
                        style={this.props.style}
                        radius={this.props.radius}
                        shape={this.props.endpointShape}
                        roundedX={this.props.endPointRoundedX}
                        roundedY={this.props.endPointRoundedY}
                        highlighted={this.state.highlighted}
                        muted={this.props.muted}
                        selected={this.props.selected}
                    />
                    <Endpoint
                        x={this.props.x2}
                        y={this.props.y2}
                        key={"line-end"}
                        style={this.props.style}
                        radius={this.props.radius}
                        shape={this.props.endpointShape}
                        roundedX={this.props.endPointRoundedX}
                        roundedY={this.props.endPointRoundedY}
                        highlighted={this.state.highlighted}
                        muted={this.props.muted}
                        selected={this.props.selected}
                    />
                </g>
            );
        }
    }

    render() {
        let xOffset;
        let yOffset;

        if (this.props.labelOffsetX === undefined) {
            xOffset = this.props.radius * 1.33;
        } else {
            xOffset = this.props.labelOffsetX;
        }

        if (this.props.labelOffsetY === undefined) {
            yOffset = this.props.radius * 1.33;
        } else {
            yOffset = this.props.labelOffsetY;
        }

        const hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8
        };

        const navTo = this.props.navTo;

        let width;
        let stroke;
        let fill;
        let offset;

        if (this.props.lineShape === "angled") {
            offset = this.props.bendOffset;
        } else {
            offset = this.props.curveOffset;
        }

        if (this.state.highlighted) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }

        return (
            <g>
                <g>
                    <Line
                        x1={this.props.x1}
                        x2={this.props.x2}
                        y1={this.props.y1}
                        y2={this.props.y2}
                        shape={this.props.lineShape}
                        key={"line-path"}
                        label={this.props.label}
                        labelPosition={this.props.labelPosition}
                        labelStyle={this.props.style.label}
                        labelOffsetX={xOffset}
                        labelOffsetY={yOffset}
                        textAnchor={this.props.textAnchor}
                        color={stroke}
                        width={width}
                        muted={this.props.muted}
                        selected={this.props.selected}
                        classed={this.props.classed}
                        roundedX={this.props.roundedX}
                        roundedY={this.props.roundedY}
                        fillColor={fill}
                        size={this.props.size}
                        centerLine={this.props.centerLine}
                        arrow={this.props.arrow}
                        arrowWidth={this.props.arrowWidth}
                        arrowHeight={this.props.arrowHeight}
                        position={this.props.position}
                        offset={offset}
                        curveDirection={this.props.curveDirection}
                        name={navTo}
                    />
                </g>
                <g onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <Line
                        // Positional Props used by all shapes
                        x1={this.props.x1}
                        x2={this.props.x2}
                        y1={this.props.y1}
                        y2={this.props.y2}
                        // Identity Props used by all shapes
                        shape={this.props.lineShape} // controls shape of the line
                        key={"line-path-hit"} // needed for react element
                        // Label Props used by all shapes
                        label={this.props.label} // provides label to be displayed
                        labelPosition={this.props.labelPosition} // controls where label
                        // is situated around the line
                        labelStyle={this.props.style.label} // controls the
                        // style of the label
                        labelOffsetX={xOffset} // controls the +/- x offset from labelPosition
                        labelOffsetY={yOffset} // controls the +/- y offset from labelPosition
                        textAnchor={this.props.textAnchor} // controls the positioning of the text
                        // Style Props
                        color={hitStyle.stroke} // controls color of the line
                        width={hitStyle.strokeWidth} // controls the stroke thickness
                        muted={this.props.muted} // controls style
                        selected={this.props.selected} // controls style
                        classed={this.props.classed} // provides a psuedo css class for the line
                        // Square props
                        roundedX={this.props.roundedX} // controls corner rounding
                        roundedY={this.props.roundedY} // controls corner rounding
                        fillColor={fill} // controls color of the fill
                        size={this.props.size} // controls height of square
                        centerLine={this.props.centerLine} // controls display of horizontal center line
                        // Arrow props, not used by square
                        arrow={this.props.arrow} // determines whether to
                        // display nodes or arrows at ends of line
                        arrowWidth={this.props.arrowWidth} // controls width of arrow
                        arrowHeight={this.props.arrowHeight} // controls height of arrow
                        // Line offset props, used by angle and arc
                        position={this.props.position} // controls angle of offset
                        offset={offset} // controls length of offset line
                        curveDirection={this.props.curveDirection} // controls left / right
                        // line path with reference
                        // to line center

                        // Navigation props
                        name={navTo} // returned value for _onSelection change - all
                        onSelectionChange={this.handleSelectionChanged} // callback function to
                        // control what happens if the
                        // element is clicked
                        invisible={true} // Internal prop for hiding this line
                    />
                </g>
                <g>{this.renderEndpoints()}</g>
            </g>
        );
    }
}

Connection.propTypes = {
    /**
     * Controls shape of the line, can be "linear", "square", "angled", "arc".
     */
    lineShape: PropTypes.oneOf(["linear", "square", "angled", "arc"]),

    //
    // Positional Props used by all shapes
    //

    /** Controls the x-coordinate of the line beginning. */
    x1: PropTypes.number,

    /** Controls the x-coordinate of the line end. */
    x2: PropTypes.number,

    /** Controls the y-coordinate of the line beginning. */
    y1: PropTypes.number,

    /** Controls the y-coordinate of the line end. */
    y2: PropTypes.number,

    //
    // Label Props used by all shapes
    //

    /**
     * Provides label to be displayed; Takes either a string, or an array of
     * strings for multi-line labels.
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

    /**
     * Controls where label is situated around the line.
     */
    labelPosition: PropTypes.oneOf(["top", "bottom", "center"]),

    /**
     * Controls the x pixel offset from labelPosition
     */
    labelOffsetX: PropTypes.number,

    /**
     * Controls the y pixel offset from labelPosition
     */
    labelOffsetY: PropTypes.number,

    /**
     * Controls the justification of the text label
     */
    textAnchor: PropTypes.oneOf(["begin", "middle", "end"]),

    //
    // Style Props, used by all shapes
    //

    /**
     * Object prop that controls the inline style for the react element.
     *
     * The style has three components, one for the two Line-caps (`node`),
     * one for the label (`label`) and one for the line (`line`). Each group
     * has up to four different possible options depending on the way the
     * line and endpoint should be rendered:
     *  * `normal` - provides the standard view of the component
     *  * `selected` - for when the component is clicked
     *  * `muted` - for when the component is in the background
     *  * `highlighted` - is used when the component is hovered over
     *
     * The muted and selected props are boolean values that tell the lower
     * level primitive that you want to use these styles. They will default
     * to false unless specified. The `fill` css style on each category is used
     * for line-caps and square connections, allowing different colors to be
     * specified for the interior of the shapes.
     */
    style: PropTypes.object,

    /** Display the endpoint muted */
    muted: PropTypes.bool,

    /** Display the endpoint selected */
    selected: PropTypes.bool,

    //
    // Props for "square" shape
    //

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedX: PropTypes.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedY: PropTypes.number,

    /**
     * Used to determine the height of the square if the endpoint shape is a `square`,
     * as well as when calculating the label position around a square.
     */
    size: PropTypes.number,

    /** Boolean value that controls if a horizontal line is drawn down the center of a square. */
    centerLine: PropTypes.bool,

    //
    // Line offset Props, used by "angle" and "curved" shapes
    //

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: PropTypes.number,

    /**
     * Controls the distance from the center x axis the curve will arc through
     */
    curveOffset: PropTypes.number,

    /**
     * Controls the length of the offset line
     */
    bendOffset: PropTypes.number,

    /**
     * The curveDirection property determines whether the curve moves to the
     * left or the right of the non-horizontal vector between x1,y1 and x2,y2.
     * The curveOffset property specifies the distance of the curve from the vector
     * between x1, y1 and x2, y2. When position is specified, this will offset a linear,
     * or curved line from the x1, y1, x2, y2 corrdinates using a combination of
     * vectors.
     *
     * This functions slightly differently for angled connections and
     * will instead rotate a point offset from the x and y by an angle. If the
     * curveDirection is left, this will move clockwise, and will move counterClockwise if right.
     */
    curveDirection: PropTypes.oneOf(["left", "right"]),

    //
    // Linecap props, used by all shapes
    //

    /**
     * Controls the size of the Line-cap
     */
    radius: PropTypes.number,

    /**
     * Controls the shape of the line-cap.
     */
    endpointShape: PropTypes.oneOf(["circle", "square", "cloud"]),

    /**
     * If a square endpoint shape is used, controls the corner rounding of the x-axis of the square
     */
    endPointRoundedX: PropTypes.number,

    /**
     * If a square endpoint shape is used, controls the corner rounding of the y-axis of the square
     */
    endPointRoundedY: PropTypes.number,

    //
    // Arrow props, not used by "square"
    //

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: PropTypes.bool,

    /**
     * Controls the width of an arrow head
     */
    arrowWidth: PropTypes.number,

    /**
     * Controls the height of an arrow head
     */
    arrowHeight: PropTypes.number,

    //
    // Navigation Props, used by all shapes
    //

    /**
     * Boolean value that determines if the element uses the onSelectionChange change and can be clicked
     */
    noNavigate: PropTypes.bool,

    /**
     * Callback specified to handle selection of the circuit. The value supplied
     * to the callback is whatever was specified in the navTo prop.
     */
    onSelectionChange: PropTypes.func,

    /**
     * Value passed down to the click handler at the lowest level primitive.
     * Will return to the onSelectionChange its value.
     */
    navTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Connection.defaultProps = {
    noNavigate: false,
    labelPosition: "top",
    radius: 2,
    endpointShape: "circle",
    classed: "circuit",
    lineShape: "linear",
    selected: false,
    muted: false,
    position: 0,
    arrow: false,
    arrowWidth: 10,
    arrowHeight: 10,
    curveDirection: "right",
    curveOffset: 20,
    size: 40
};
