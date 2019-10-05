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
                    {this.props.nodata &&
                        <path
                            d={"M"+(cx+6)+","+(cy-4)+"c-0.672,-1.148,-1.578,-2.055,-2.727,-2.727c-1.148,-0.668,-2.402,-1.003,-3.761,-1.003c-1.36,0,-2.614,0.335,-3.762,1.003c-1.148,0.672,-2.055,1.579,-2.727,2.727c-0.668,1.148,-1.003,2.402,-1.003,3.762c0,1.359,0.335,2.613,1.003,3.761c0.672,1.149,1.579,2.055,2.727,2.727c1.148,0.668,2.402,1.004,3.762,1.004c1.359,0,2.613,-0.336,3.761,-1.004c1.149,-0.672,2.055,-1.578,2.727,-2.727c0.668,-1.148,1.004,-2.402,1.004,-3.761c0,-1.36,-0.336,-2.614,-1.004,-3.762zm-5.238,8.445c0,0.09,-0.032,0.164,-0.09,0.223c-0.059,0.059,-0.133,0.09,-0.223,0.09l-1.875,0c-0.09,0,-0.164,-0.031,-0.222,-0.09c-0.059,-0.059,-0.09,-0.133,-0.09,-0.223l0,-1.875c0,-0.09,0.031,-0.164,0.09,-0.222c0.058,-0.059,0.132,-0.09,0.222,-0.09l1.875,0c0.09,0,0.164,0.031,0.223,0.09c0.058,0.058,0.09,0.132,0.09,0.222zm2.375,-5.766c-0.082,0.239,-0.172,0.438,-0.273,0.59c-0.102,0.153,-0.247,0.309,-0.434,0.469c-0.191,0.156,-0.34,0.273,-0.449,0.34c-0.11,0.07,-0.27,0.16,-0.481,0.277c-0.211,0.125,-0.39,0.285,-0.531,0.485c-0.137,0.199,-0.207,0.359,-0.207,0.484c0,0.09,-0.031,0.164,-0.09,0.223c-0.058,0.058,-0.133,0.085,-0.223,0.085l-1.875,0c-0.089,0,-0.164,-0.027,-0.222,-0.085c-0.059,-0.059,-0.09,-0.133,-0.09,-0.223l0,-0.352c0,-0.437,0.172,-0.843,0.516,-1.226c0.339,-0.379,0.714,-0.66,1.125,-0.844c0.312,-0.141,0.531,-0.289,0.664,-0.437c0.129,-0.153,0.195,-0.348,0.195,-0.598c0,-0.215,-0.121,-0.406,-0.367,-0.574c-0.242,-0.168,-0.524,-0.254,-0.832,-0.254c-0.34,0,-0.621,0.078,-0.84,0.234c-0.215,0.156,-0.496,0.457,-0.84,0.899c-0.059,0.078,-0.141,0.117,-0.242,0.117c-0.078,0,-0.141,-0.02,-0.188,-0.059l-1.289,-0.976c-0.148,-0.118,-0.172,-0.254,-0.078,-0.411c0.836,-1.382,2.039,-2.078,3.621,-2.078c0.567,0,1.117,0.133,1.66,0.403c0.54,0.265,0.989,0.644,1.348,1.129c0.363,0.488,0.543,1.019,0.543,1.589c0,0.289,-0.039,0.551,-0.121,0.793zm0,0"}
                            fill={"#808080"}
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

    down: PropTypes.bool,
    nodata: PropTypes.bool

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
    down: false,
    nodata: false
};
