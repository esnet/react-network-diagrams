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

import { Connection } from "./Connection";
import { Endpoint } from "./Endpoint";
import { Navigate } from "./Navigate";
import { Directions } from "../js/constants";

/**
 * A component for drawing parallel sets of circuits.
 */
export class ParallelCircuit extends React.Component {
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
        const x1 = this.props.margin;
        const x2 = this.props.width - this.props.margin;
        const y1 = this.props.height / 4;
        const y2 = y1;
        const memberList = this.props.memberList;

        // Push the two end points for the main circuit
        elements.push(
            <Endpoint
                x={x1}
                y={y1}
                key="a"
                style={this.props.endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={this.props.endpointLabelOffset}
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
                offset={this.props.endpointLabelOffset}
                label={this.props.endpointLabelZ}
            />
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
                <Connection
                    x1={x1}
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
                    onSelectionChange={this.props.onSelectionChange}
                />
            );
        });
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
}

ParallelCircuit.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    noNavigate: false,
    lineShape: "linear"
};

ParallelCircuit.propTypes = {
    /** The width of the circuit diagram */
    width: PropTypes.number,

    /** The height of the circuit diagram */
    height: PropTypes.number,

    /** The position of the title relative to the left side of the diagram */
    titleOffsetX: PropTypes.number,

    /** The position of the title relative to the top of the diagram */
    titleOffsetY: PropTypes.number,

    /** The blank margin around the diagram drawing */
    margin: PropTypes.number,

    /**
     * Controls shape of the line but currenly only can be "linear".
     */
    lineShape: PropTypes.oneOf(["linear"]),

    /**
     * To accurately display each of the member circuits, the concatenated circuit
     * requires an ordered array of circuit objects, where each object contains
     * the props to be used by the lower level connection and endpoint primitives.
     * Since the list renders sequentially, it assumes that the member circuits are in order. The list can be any length and needs to be constructed as such:
     *
     * ```
     * const memberList = [
     *     {
     *         styleProperties: darkFiberStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 1",
     *         endpointLabelZ: "Endpoint 2",
     *         circuitLabel: "Member 1",
     *         navTo: "Member 1"
     *     }, {
     *         styleProperties: couplerStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 2",
     *         endpointLabelZ: "Endpoint 3",
     *         circuitLabel: "Member 2",
     *         navTo: "Member 2"
     *     }, {
     *         styleProperties: leasedStyle,
     *         endpointStyle: stylesMap.endpoint,
     *         endpointLabelA: "Endpoint 3",
     *         endpointLabelZ: "Endpoint 4",
     *         circuitLabel: "Member 3",
     *         navTo: "Member 3"
     *     }
     * ];
     * ```
     */
    memberList: PropTypes.array.isRequired,

    /**
     * Described the position of the connection label; accepts **"top"**, **"center"**, or **"bottom"**
     */
    connectionLabelPosition: PropTypes.oneOf(["top", "center", "bottom"]),

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
     * This is the distance from the endpoint that the endpoint
     * label will be rendered.
     */
    endpointLabelOffset: PropTypes.number,

    /**
     * The string to display in the top left corner of the diagram
     */
    title: PropTypes.string,

    /**
     * Value that determines whether or not the upper left corner title is displayed
     */
    hideTitle: PropTypes.bool,

    /**
     * Determines if the circuit view is muted.  Typically used in
     * conjunction with `parentID`
     */
    disabled: PropTypes.bool,

    /**
     * Callback function used to handle clicks.
     */
    onSelectionChange: PropTypes.func,

    /**
     * Value that if provided, will render a small nav arrow that
     * when clicked, navigates to that element. Used mainly when we want
     * to show a parent / child relationship between two circuits.
     */
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Boolean value that determines if the element uses the onSelectionChange
     * change and can be clicked
     */
    noNavigate: PropTypes.bool
};
