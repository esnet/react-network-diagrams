/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Endpoint from "./circuit-diagram-endpoint";
import Connection from "./circuit-diagram-connection";
import Navigate from "./circuit-diagram-navigate";
import { Directions } from "./constants.js";

/**
 * Renders a horizontal circuit by determining x1, x2, y1, y2
 * coordinates on the page and then render a basic circuit by combining the
 * connection and endpoint props. Connection shape, style, and label information,
 * are passed in as props
 */
export default React.createClass({

    getDefaultProps() {
        return {
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
    },

    propTypes: {
        lineStyle: React.PropTypes.object,
        lineShape: React.PropTypes.oneOf([
            "linear",
            "curved",
            "square",
            "angled"
        ]),
        connectionLabelPosition: React.PropTypes.oneOf([
            "top",
            "center",
            "bottom"
        ]),
        circuitLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.arrayOf(React.PropTypes.string)
        ]),
        yOffset: React.PropTypes.number,
        title: React.PropTypes.string,
        noNavigate: React.PropTypes.bool,
        size: React.PropTypes.number,          // controls size of square
        centerLine: React.PropTypes.bool,      // controls if a horizontal line is drawn down the center
                                               // of a square
        squareWidth: React.PropTypes.number,   // This value is used to determine X coordinates
                                               // for a square, if you want the square to be smaller
                                               // than the default line width. Overrides the margin prop
                                               // if a square is displayed

        endpointStyle: React.PropTypes.object, // the style of the endpoint
                                               // TODO: be more explicit here about the expected shape
        endpointLabelPosition: React.PropTypes.oneOf([ // The position of the label around the endpoint.
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
            "toprightangled"]),
        endpointLabelA: React.PropTypes.string, // Left side endpoint label
        endpointLabelZ: React.PropTypes.string, // Right side endpoint label
        disabled: React.PropTypes.bool,         // Disables the circuit
        onSelectionChange: React.PropTypes.func, // Callback used to handle clicks.

        navTo: React.PropTypes.oneOfType([      // Value passed down to the click
            React.PropTypes.string,             // handler at the lowest level primitive.
            React.PropTypes.number              // Will return to the onSelectionChange
        ]),                                     // it's value

        parentId: React.PropTypes.oneOfType([   // If provided, will render a small nav arrow
            React.PropTypes.string,             // that when clicked, navigates to that element.
            React.PropTypes.number              // Used mainly when we want to show a parent / child
        ])                                      // relationship between two circuits.        
    },

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
                    y={this.props.titleOffsetY}>
                    {title}
                </text>
            );
        } else {
            return null;
        }
    },

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
                        onSelectionChange={this.props.onSelectionChange} />
                </g>
            );
        } else {
            return null;
        }
    },

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
                    x="0" y="0"
                    width={this.props.width}
                    height={this.props.height} />

            );
        } else {
            return null;
        }
    },

    renderCircuitElements() {
        const elements = [];
        const middle = this.props.width / 2;
        let x1;
        let x2;

        // Render a square in the middle of the SVG grid by default
        if (this.props.lineShape === "square") {
            x1 = middle - (this.props.squareWidth / 2);
            x2 = middle + (this.props.squareWidth / 2);
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
                label={this.props.endpointLabelA} />
        );

        elements.push(
            <Endpoint
                x={x2}
                y={y2}
                key="z"
                style={this.props.endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={labelOffset}
                label={this.props.endpointLabelZ} />
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
                onSelectionChange={this.props.onSelectionChange}/>
        );

        return (
            <g>
                {elements}
            </g>
        );
    },

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
});
