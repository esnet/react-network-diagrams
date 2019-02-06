import React from "react";
import _ from "underscore";
import PropTypes from "prop-types";

import { Connection } from "./Connection";
import { Endpoint } from "./Endpoint";
import { Navigate } from "./Navigate";
import { Directions } from "../js/constants";

export class MultipointCircuit extends React.Component {
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
                        width={this.props.width}
                        height={this.props.height}
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
        const style = { fill: "#FDFDFD", fillOpacity: 0.65 };
        if (disabled) {
            return (
                <rect
                    className="circuit-overlay"
                    style={style}
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
    /**
        const multipointList = [
            {
                styleProperties: {
                    style: stylesMap.crossConnect,
                    lineShape: "linear"
                },
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: `Endpoint 1`,
                endpointLabelZ: `Endpoint 2`,
                circuitLabel: `Segment 1`,
                navTo: `Segment 1`,
            },
            {
                styleProperties: {
                    style: stylesMap.crossConnect,
                    lineShape: "linear"
                },
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: `Endpoint 1`,
                endpointLabelZ: `Endpoint 3`,
                circuitLabel: `Segment 2`,
                navTo: `Segment 2`,
            }
        ]
    **/
    renderCircuitElements() {
        const elements = [];

        // Determine the initial position
        const y1 = this.props.height / 4;

        let y2 = y1;
        const start = this.props.start ? this.props.start : this.props.margin;
        const end = this.props.end ? this.props.end : this.props.width - this.props.margin;
        const x1 = start;
        const x2 = end;
        const memberList = this.props.memberList;

        let spread = 0;

        if (memberList.length > 1) {
            spread = this.props.spread * memberList.length;
        }
        const yOffset = 4;
        // spread is the max distance from top to bottom
        console.log("spread", spread);
        // Draw the left endpoint
        elements.push(
            <Endpoint
                x={x1}
                y={y1}
                key={"endpoint-0"}
                style={memberList[0].endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={this.props.endpointLabelOffset}
                label={memberList[0].endpointLabelA}
            />
        );

        // Draw the first right endpoint
        y2 = y1 - spread / 2;
        elements.push(
            <Endpoint
                x={x2}
                y={y2}
                key={"endpoint-1"}
                style={memberList[0].endpointStyle}
                labelPosition={this.props.endpointLabelPosition}
                offset={this.props.endpointLabelOffset}
                label={memberList[0].endpointLabelZ}
            />
        );
        elements.push(
            <Connection
                x1={x1}
                x2={x2}
                y1={y1}
                y2={y2}
                key={"circuit-1"}
                curveDirection={"left"}
                bendOffset={memberList[0].styleProperties.bendOffset}
                position={memberList[0].styleProperties.position}
                style={memberList[0].styleProperties.style}
                lineShape={memberList[0].styleProperties.lineShape}
                label={memberList[0].circuitLabel}
                labelPosition={this.props.connectionLabelPosition}
                labelOffsetY={yOffset}
                noNavigate={memberList[0].styleProperties.noNavigate}
                navTo={memberList[0].navTo}
                onSelectionChange={this.props.onSelectionChange}
            />
        );

        /* since the A of each member is the same as the A of the next member, render only
         * the Z for each member starting with the first member
         */
        _.each(memberList, (member, memberIndex) => {
            if (memberIndex !== 0) {
                y2 += spread / (memberList.length - 1);
                elements.push(
                    <Endpoint
                        x={x2}
                        y={y2}
                        key={"endpoint-" + (memberIndex + 1)}
                        style={member.endpointStyle}
                        labelPosition={this.props.endpointLabelPosition}
                        offset={this.props.endpointLabelOffset}
                        label={member.endpointLabelZ}
                    />
                );
                elements.push(
                    <Connection
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                        key={"circuit-1" + (memberIndex + 1)}
                        curveDirection={"left"}
                        bendOffset={member.styleProperties.bendOffset}
                        position={member.styleProperties.position}
                        style={member.styleProperties.style}
                        lineShape={member.styleProperties.lineShape}
                        label={member.circuitLabel}
                        labelPosition={this.props.connectionLabelPosition}
                        labelOffsetY={yOffset}
                        noNavigate={member.styleProperties.noNavigate}
                        navTo={member.navTo}
                        onSelectionChange={this.props.onSelectionChange}
                    />
                );
            }

            /*y2 =
                y1 -
                spread / (memberList.length ) +
                (memberIndex / memberList.length - 1) * spread;
            console.log(
                "y1, y2, memberIndex+1, spread, memberList.length",
                y1,
                y2,
                memberIndex + 1,
                spread,
                memberList.length,
                memberIndex / memberList.length
            );*/
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

        const viewBox = this.props.viewBox
            ? this.props.viewBox
            : `0 0 ${this.props.width} ${this.props.height}`;

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

MultipointCircuit.defaultProps = {
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
    spread: 40
};
