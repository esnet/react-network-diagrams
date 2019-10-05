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

        const cx = ((this.props.x1 + this.props.x2) / 2);
        const cy = ((this.props.y1 + this.props.y2) / 2);

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
                        dashed={this.props.dashed}
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
                        dashed={this.props.dashed}
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
                        dashed={this.props.dashed}
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
                        dashed={this.props.dashed}
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
                    {this.props.maintenance &&
                        <path
                            d={"M" + (cx-8) + "," + (cy-12) + "l3.771 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.771-3.77c-.172.584-.258 1.188-.258 1.792 0 1.602.607 3.202 1.83 4.426 1.351 1.351 3.164 1.958 4.931 1.821.933-.072 1.852.269 2.514.931l9.662 9.662c.578.578 1.337.868 2.097.868 1.661 0 3.001-1.364 2.966-3.03-.016-.737-.306-1.47-.868-2.033l-9.662-9.663c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.83-4.428-1.83-.603 0-1.207.086-1.791.257zm17.5 20.743c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"}
                            fill={"#39444e"}
                            style={{stroke: '#ffffff'}}
                        />
                    }
                    {this.props.down &&
                        <path
                            d={"M " + (cx + 10) + "," + (cy + 4) + "l-7.062,-11.828c-0.536,-0.899,-1.477,-1.438,-2.524,-1.438c-1.047,0,-1.988,0.539,-2.523,1.438l-7.059,11.828c-0.547,0.918,-0.559,2.02,-0.031,2.945c0.531,0.93,1.484,1.485,2.551,1.485l14.125,0c1.066,0,2.019,-0.555,2.55,-1.485c0.528,-0.925,0.516,-2.027,-0.027,-2.945zm-9.586,-9.648c0.649,0,1.172,0.523,1.172,1.171l0,4.696c0,0.644,-0.523,1.172,-1.172,1.172c-0.648,0,-1.172,-0.528,-1.172,-1.172l0,-4.696c0,-0.648,0.524,-1.171,1.172,-1.171zm0,11.73c-0.969,0,-1.758,-0.789,-1.758,-1.757c0,-0.973,0.789,-1.762,1.758,-1.762c0.969,0,1.758,0.789,1.758,1.762c0,0.968,-0.789,1.757,-1.758,1.757zm0,0"}
                            fill={"#ff0001"}
                            style={{stroke: '#ffffff'}}
                        />
                    }

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
    muted: PropTypes.bool,

    dashed: PropTypes.bool,

    maintenance: PropTypes.bool,

    down: PropTypes.bool

};

BidirectionalEdge.defaultProps = {
    width: 1,
    spacing: 3.5,
    offset: 18,
    sourceTargetColor: "#C9CACC",
    targetSourceColor: "#C9CACC",
    selected: false,
    muted: false,
    dashed: false,
    maintenance: false,
    down: false
};
