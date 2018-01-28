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

import { Connection } from "./Connection";
import { Endpoint } from "./Endpoint";
import { Navigate } from "./Navigate";
import { Directions } from "../js/constants";

/**
 * Renders a horizontal circuit by determining `x1`, `x2`, `y1`, `y2`
 * coordinates on the page and then render a basic circuit by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 */
export class BasicCircuit extends React.Component {
    renderCircuitTitle(title) {
        const titleStyle = {
            textAnchor: "left",
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 14
        };

        if (!this.props.hideTitle) {
            return (
                <text
                    className="circuit-title"
                    key="circuit-title"
                    style={titleStyle}
                    x={this.props.titleOffsetX}
                    y={this.props.titleOffsetY}
                >
                    {title}
                </text>
            );
        } else {
            return null;
        }
    }

    renderParentNavigation(parentId) {
        if (parentId) {
            return (
                <g>
                    <Navigate
                        direction={Directions.NORTH}
                        width={this.props.width}
                        height={this.props.height}
                        ypos={0}
                        id={this.props.parentId}
                        onSelectionChange={this.props.onSelectionChange}
                    />
                </g>
            );
        } else {
            return null;
        }
    }

    renderDisabledOverlay(disabled) {
        if (disabled) {
            const overlayStyle = {
                fill: "#FDFDFD",
                fillOpacity: "0.65"
            };
            return (
                <rect
                    className="circuit-overlay"
                    style={overlayStyle}
                    x="0"
                    y="0"
                    width={this.props.width}
                    height={this.props.height}
                />
            );
        } else {
            return null;
        }
    }

    renderCircuitElements() {
        const elements = [];
        const middle = this.props.width / 2;
        let x1;
        let x2;

        // Render a square in the middle of the SVG grid by default
        if (this.props.lineShape === "square") {
            x1 = middle - this.props.squareWidth / 2;
            x2 = middle + this.props.squareWidth / 2;
        } else {
            x1 = this.props.margin;
            x2 = this.props.width - this.props.margin;
        }

        const y1 = this.props.height / 4;
        const y2 = y1;
        const labelOffset = this.props.size ? this.props.size / 2 : 0;

        // The two endpoints of this circuit
        elements.push(
            <Endpoint
                x={x1}
                y={y1}
                key="a"
                style={this.props.endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={labelOffset}
                label={this.props.endpointLabelA}
            />
        );

        elements.push(
            <Endpoint
                x={x2}
                y={y2}
                key="z"
                style={this.props.endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={labelOffset}
                label={this.props.endpointLabelZ}
            />
        );

        // The connection
        elements.push(
            <Connection
                x1={x1}
                x2={x2}
                y1={y1}
                y2={y2}
                key={"line"}
                roundedX={this.props.roundedX}
                roundedY={this.props.roundedY}
                style={this.props.lineStyle}
                lineShape={this.props.lineShape}
                label={this.props.circuitLabel}
                labelPosition={this.props.connectionLabelPosition}
                labelOffsetY={this.props.yOffset}
                noNavigate={this.props.noNavigate}
                navTo={this.props.navTo}
                size={this.props.size}
                centerLine={this.props.centerLine}
                onSelectionChange={this.props.onSelectionChange}
            />
        );

        return <g>{elements}</g>;
    }

    render() {
        const circuitContainer = {
            normal: {
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderWidth: 1,
                borderTopColor: "#FFFFFF",
                borderBottomColor: "#EFEFEF",
                width: "100%",
                height: this.props.height
            },
            disabled: {
                width: "100%",
                height: this.props.height
            }
        };

        let className = "circuit-container";
        let svgStyle;
        if (this.props.disabled) {
            className += " disabled";
            svgStyle = circuitContainer.disabled;
        } else {
            svgStyle = circuitContainer.normal;
        }

        return (
            <svg className={className} style={svgStyle} onClick={this._deselect}>
                {this.renderCircuitTitle(this.props.title)}
                {this.renderCircuitElements()}
                {this.renderParentNavigation(this.props.parentId)}
                {this.renderDisabledOverlay(this.props.disabled)}
            </svg>
        );
    }
}

BasicCircuit.propTypes = {
    /** The style of the line */
    lineStyle: PropTypes.object.isRequired,

    /** Text value describing the shape of the line, "linear", "curved", etc. */
    lineShape: PropTypes.oneOf(["linear", "curved", "square", "angled"]),

    /**
     * Describes the position of the connection label.
     */
    connectionLabelPosition: PropTypes.oneOf(["top", "center", "bottom"]),

    /**
     * String to be displayed for the connection. If an array of strings is
     * supplied they will be displayed in a multi-line layout.
     */
    circuitLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

    /**
     * Vertical distance from the center line to offset the connection label.
     */
    yOffset: PropTypes.number,

    /**
     * The string to display in the top left corner of the diagram.
     */
    title: PropTypes.string,

    /**
     * Boolean value that determines if the element uses the onSelectionChange
     * change and can be clicked
     */
    noNavigate: PropTypes.bool,

    /** Controls the size of the square */
    size: PropTypes.number,

    /** controls if a horizontal line is drawn down the center of a square */
    centerLine: PropTypes.bool,

    /**
     * This value is used to determine X coordinates for a square, if you want
     * the square to be smaller than the default line width. Overrides the
     * margin prop if a square is displayed
     */
    squareWidth: PropTypes.number,

    /**
     * The style of the endpoint.
     * TODO: be more explicit here about the expected shape.
     */
    endpointStyle: PropTypes.object,

    /**
     * The position of the label around the endpoint.
     */
    endpointLabelPosition: PropTypes.oneOf([
        "left",
        "right",
        "top",
        "topright",
        "topleft",
        "bottom",
        "bottomright",
        "bottomleft",
        "bottomleftangled",
        "bottomrightangled",
        "topleftangled",
        "toprightangled"
    ]),

    /**
     * Left side endpoint label
     */
    endpointLabelA: PropTypes.string,

    /**
     * Right side endpoint label
     */
    endpointLabelZ: PropTypes.string,

    /**
     * Disables the circuit by muting the colors and disabling events.
     */
    disabled: PropTypes.bool,

    /**
     * Callback specified to handle selection of the circuit. The value supplied
     * to the callback is whatever was specified in the navTo prop.
     */
    onSelectionChange: PropTypes.func,

    /**
     * Value passed down to the click handler at the lowest level primitive.
     * Will return to the onSelectionChange its value.
     */
    navTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * If provided, will render a small nav arrow that when clicked,
     * navigates to that element. Used mainly when we want to show a parent / child
     * relationship between two circuits.
     */
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** The width of the circuit diagram */
    width: PropTypes.number,
    height: PropTypes.number,
    titleOffsetX: PropTypes.number,
    titleOffsetY: PropTypes.number,

    /** The blank margin around the diagram drawing */
    margin: PropTypes.number,
    roundedX: PropTypes.number,
    roundedY: PropTypes.number
};

BasicCircuit.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    noNavigate: false,
    squareWidth: 25,
    roundedX: 5,
    roundedY: 5
};
