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
import _ from "underscore";
import { Directions } from "./constants.js";
import Endpoint from "./circuit-diagram-endpoint";
import Connection from "./circuit-diagram-connection";
import Navigate from "./circuit-diagram-navigate";

/**
 * A component for drawing a parallel circuit.
 *
 * The parallel component takes a 'circuit' prop, in addition to a
 * 'disabled' prop to display them disabled and mute events on them.
 *
 * In addition, Concatenated should have a 'branches' prop to list out the
 * branches that make up the parallel circuits.
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
            noNavigate: false
        };
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

    renderParentNavigation(parentId) {
        if (parentId) {
            return (
                <g>
                    <Navigate direction={Directions.NORTH}
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
                <rect className="circuit-overlay" style={overlayStyle}
                      x="0" y="0" width={this.props.width} height={this.props.height} />
            );
        } else {
            return null;
        }
    },

    renderCircuitElements() {
        const elements = [];
        const x1 = this.props.margin;
        const x2 = this.props.width - this.props.margin;
        const y1 = this.props.height / 4;
        const y2 = y1;
        const memberList = this.props.memberList;

        // Push the two end points for the main circuit
        elements.push(
            <Endpoint x={x1}
                      y={y1}
                      key="a"
                      style={this.props.endpointStyle}
                      labelPosition={this.props.endpointLabelPosition}
                      offset={this.props.endpointLabelOffset}
                      label={this.props.endpointLabelA} />
        );

        elements.push(
            <Endpoint x={x2}
                      y={y2}
                      key="z"
                      style={this.props.endpointStyle}
                      labelPosition={this.props.endpointLabelPosition}
                      offset={this.props.endpointLabelOffset}
                      label={this.props.endpointLabelZ} />
        );

        const yOffset = 4;
        
        let offset = 0;

        if (memberList.length > 0) {
            offset = -(memberList.length - 1) * 0.5 - 1;
        }
        
        _.each(memberList, (member, memberIndex) => {
            offset += 1;
            const position = 18 * offset;
            elements.push(
                <Connection x1={x1}
                            x2={x2}
                            y1={y1}
                            y2={y2}
                            key={"circuit-" + memberIndex}
                            style={member.styleProperties.style}
                            lineShape={member.styleProperties.lineShape}
                            label={member.circuitLabel}
                            labelPosition={this.props.connectionLabelPosition}
                            labelOffsetY={yOffset}
                            noNavigate={member.styleProperties.noNavigate}
                            navTo={member.navTo}
                            position={position}
                            onSelectionChange={this.props.onSelectionChange}/>
            );
        });
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

        const viewBox = `0 0 ${this.props.width} ${this.props.height}`;

        return (
            <svg className={className} style={svgStyle} onClick={this._deselect}>
                <svg viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderCircuitTitle(this.props.title)}
                    {this.renderCircuitElements()}
                    {this.renderParentNavigation(this.props.parentId)}
                    {this.renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
});
