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

import { ArcEdge } from "./ArcEdge";
import { LinearEdge } from "./LinearEdge";

export class BidirectionalEdge extends React.Component {
    render() {
        const paths = [];
        const sourceToTargetName = `${this.props.source}--${this.props.target}`;
        const targetToSourceName = `${this.props.target}--${this.props.source}`;

        // Position of the bidirectional lines relative to the center line
        const position = this.props.width * 0.75;

        if (this.props.shape === "curved") {
            return (
                <g>
                    <ArcEdge
                        name={this.props.name}
                        x1={this.props.x1}
                        y1={this.props.y1}
                        x2={this.props.x2}
                        y2={this.props.y2}
                        arrow={true}
                        position={position}
                        color={this.props.sourceTargetColor}
                        width={this.props.width}
                        classed={this.props.classed}
                        key={sourceToTargetName}
                        curveDirection={this.props.curveDirection}
                        offset={this.props.offset}
                        selected={this.props.selected}
                        onSelectionChange={this.props.onSelectionChange}
                        muted={this.props.muted}
                    />

                    <ArcEdge
                        name={this.props.name}
                        x1={this.props.x2}
                        y1={this.props.y2}
                        x2={this.props.x1}
                        y2={this.props.y1}
                        arrow={true}
                        position={position}
                        color={this.props.targetSourceColor}
                        width={this.props.width}
                        classed={this.props.classed}
                        key={targetToSourceName}
                        curveDirection={this.props.curveDirection}
                        offset={this.props.offset}
                        selected={this.props.selected}
                        onSelectionChange={this.props.onSelectionChange}
                        muted={this.props.muted}
                    />

                    <ArcEdge
                        name={this.props.name}
                        x1={this.props.x2}
                        y1={this.props.y2}
                        x2={this.props.x1}
                        y2={this.props.y1}
                        position={0}
                        width={5}
                        classed={this.props.classed}
                        key={`${sourceToTargetName}-event-region`}
                        onSelectionChange={this.props.onSelectionChange}
                        curveDirection={this.props.curveDirection}
                        offset={this.props.offset}
                        invisible={true}
                    />
                </g>
            );
        } else {
            return (
                <g>
                    <LinearEdge
                        name={this.props.name}
                        x1={this.props.x1}
                        y1={this.props.y1}
                        x2={this.props.x2}
                        y2={this.props.y2}
                        arrow={true}
                        color={this.props.sourceTargetColor}
                        width={this.props.width}
                        position={position}
                        className={this.props.classed}
                        key={sourceToTargetName}
                        selected={this.props.selected}
                        muted={this.props.muted}
                        onSelectionChange={this.props.onSelectionChange}
                    />

                    <LinearEdge
                        name={this.props.name}
                        x1={this.props.x2}
                        y1={this.props.y2}
                        x2={this.props.x1}
                        y2={this.props.y1}
                        arrow={true}
                        color={this.props.targetSourceColor}
                        width={this.props.width}
                        position={position}
                        className={this.props.classed}
                        key={targetToSourceName}
                        selected={this.props.selected}
                        muted={this.props.muted}
                        onSelectionChange={this.props.onSelectionChange}
                    />

                    <LinearEdge
                        name={this.props.name}
                        x1={this.props.x2}
                        y1={this.props.y2}
                        x2={this.props.x1}
                        y2={this.props.y1}
                        width={5}
                        position={0}
                        className={this.props.classed}
                        key={`${targetToSourceName}-event-region`}
                        onSelectionChange={this.props.onSelectionChange}
                        invisible={true}
                    />
                </g>
            );
        }

        return <g>{paths}</g>;
    }
}

BidirectionalEdge.propTypes = {
    /** The width of the circuit diagram */
    width: PropTypes.number,

    /**
     * This is the vertical spacing
     */
    spacing: PropTypes.number,

    /** An offset to the position of the label which can be used for fine tuning */
    offset: PropTypes.number,

    sourceTargetColor: PropTypes.string,
    targetSourceColor: PropTypes.string,

    /** Display the endpoint selected */
    selected: PropTypes.bool,

    /** Display the endpoint muted */
    muted: PropTypes.bool
};

BidirectionalEdge.defaultProps = {
    width: 1,
    spacing: 3.5,
    offset: 18,
    sourceTargetColor: "#C9CACC",
    targetSourceColor: "#C9CACC",
    selected: false,
    muted: false
};
