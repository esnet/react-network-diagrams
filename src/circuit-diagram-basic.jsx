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

import Constants from "./constants.js";
import Endpoint from "./circuit-diagram-endpoint";
import Connection from "./circuit-diagram-connection";
import Navigate from "./circuit-diagram-navigate";

const {Directions} = Constants;

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
            roundedY: 5,
        };
    },

    _renderCircuitTitle(title) {
        const titleStyle = {
            textAnchor: "left",
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 14,
        };

        if (!this.props.hideTitle) {
            return (
                <text className="circuit-title"
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

    // Revisit this to make it work

    _renderParentNavigation(parentId) {
        if (parentId) {
            return (
                <g>
                    <Navigate direction={Directions.NORTH} ypos={0} id={this.props.parentId} />
                </g>
            );
        } else {
            return null;
        }
    },

    _renderDisabledOverlay(disabled) {
        if (disabled) {
            const overlayStyle = {
                fill: "#FFFFFF",
                fillOpacity: "0.65",
            };
            return (
                <rect className="circuit-overlay" style={overlayStyle}
                      x="0" y="0" width={this.props.width} height={this.props.height}
                      style={{fill: "#FDFDFD", fillOpacity: 0.65}}/>
            );
        } else {
            return null;
        }
    },

    _renderCircuitElements() {
        const elements = [];
        const navId = this.props.navTo || null;
        const middle = this.props.width / 2;
        let x1;
        let x2;

        // render a square in the middle of the SVG grid by default
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
            <Endpoint x={x1}
                      y={y1}
                      key="a"
                      style={this.props.endpointStyle}
                      labelPosition={this.props.endpointLabelPosition}
                      offset={labelOffset}
                      label={this.props.endpointLabelA} />
        );

        elements.push(
            <Endpoint x={x2}
                      y={y2}
                      key="z"
                      style={this.props.endpointStyle}
                      labelPosition={this.props.endpointLabelPosition}
                      offset={labelOffset}
                      label={this.props.endpointLabelZ} />
        );

        // The connection

        if (navId) {
            // Need to fix navId

            elements.push(
                <Connection x1={x1}
                            x2={x2}
                            y1={y1}
                            y2={y2}
                            roundedX={this.props.roundedX}
                            roundedY={this.props.roundedY}
                            style={this.props.lineStyle}
                            lineShape={this.props.lineShape}
                            label={this.props.circuitLabel}
                            labelPosition={this.props.connectionLabelPosition}
                            yOffset={this.props.yOffset}
                            noNavigate={this.props.noNavigate}
                            navTo={this.props.navTo}
                            size={this.props.size}
                            centerLine={this.props.centerLine}
                            onSelectionChange={this.props.onSelectionChange}
                            navigate={navId}/>
            );
        } else {
            elements.push(
                <Connection x1={x1}
                            x2={x2}
                            y1={y1}
                            y2={y2}
                            roundedX={this.props.roundedX}
                            roundedY={this.props.roundedY}
                            style={this.props.lineStyle}
                            lineShape={this.props.lineShape}
                            label={this.props.circuitLabel}
                            labelPosition={this.props.connectionLabelPosition}
                            yOffset={this.props.yOffset}
                            noNavigate={this.props.noNavigate}
                            navTo={this.props.navTo}
                            size={this.props.size}
                            centerLine={this.props.centerLine}
                            onSelectionChange={this.props.onSelectionChange}/>
            );
        }
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
                height: this.props.height,
            },
            disabled: {
                width: "100%",
                height: this.props.height,
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

        const viewBox = `0 0 ${this.props.width} ${this.props.height}`;

        return (
            <svg className={className} style={svgStyle} onClick={this._deselect}>
                <svg viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this._renderCircuitTitle(this.props.title)}
                    {this._renderCircuitElements()}
                    {this._renderParentNavigation(this.props.parentId)}
                    {this._renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
});
