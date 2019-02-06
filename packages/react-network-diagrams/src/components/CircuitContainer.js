import _ from "underscore";
import React from "react";
import PropTypes from "prop-types";

import { Navigate } from "./Navigate";
import { Directions } from "../js/constants";

import { ParallelCircuit } from "./ParallelCircuit";
import { MultipointCircuit } from "./MultipointCircuit";
import { ConcatenatedCircuit } from "./ConcatenatedCircuit";
import { BasicCircuit } from "./BasicCircuit";

export class CircuitContainer extends React.Component {
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

    renderCircuits() {
        const combined = this.props.combinedList;
        const elements = [];
        let start = this.props.margin;
        const increment = this.props.width / combined.length - start;
        _.each(combined, (circuitSet, circuitSetIndex) => {
            switch (circuitSet.type) {
                case "parallel":
                    elements.push(
                        <ParallelCircuit
                            key={"group-" + (circuitSetIndex + 1)}
                            hideTitle={circuitSet.hideTitle}
                            title={circuitSet.title}
                            titleOffsetX={start}
                            titleOffsetY={50}
                            memberList={circuitSet.values}
                            disabled={circuitSet.disabled}
                            onSelectionChange={circuitSet.handleSelectionChange}
                            endpointLabelA={circuitSet.endpointLabelA}
                            endpointLabelZ={circuitSet.endpointLabelZ}
                            endpointStyle={circuitSet.endpointStyle}
                            endpointLabelOffset={circuitSet.endpointLabelOffset}
                            parentId={circuitSet.parentId}
                            start={start}
                            height={this.props.height}
                            end={start + increment}
                            viewBox={`0 0 ${this.props.width} ${this.props.height}`}
                        />
                    );
                    break;
                case "concatenated":
                    break;
                case "multipoint":
                    elements.push(
                        <MultipointCircuit
                            key={"group-" + (circuitSetIndex + 1)}
                            hideTitle={circuitSet.hideTitle}
                            title={circuitSet.title}
                            memberList={circuitSet.values}
                            disabled={circuitSet.disabled}
                            onSelectionChange={circuitSet.handleSelectionChange}
                            endpointStyle={circuitSet.endpointStyle}
                            endpointLabelOffset={circuitSet.endpointLabelOffset}
                            parentId={circuitSet.parentId}
                            titleOffsetX={start}
                            titleOffsetY={50}
                            start={start}
                            spread={this.props.spread}
                            height={this.props.height}
                            end={start + increment}
                            viewBox={`0 0 ${this.props.width} ${this.props.height}`}
                        />
                    );
                    break;
                case "basic":
                    break;
                default:
                    break;
            }
            start += increment;
        });
        return elements;
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
                    {this.renderCircuits()}
                    {this.renderParentNavigation(this.props.parentId)}
                    {this.renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
}

CircuitContainer.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    spread: 40,
    noNavigate: false,
    lineShape: "linear"
};
