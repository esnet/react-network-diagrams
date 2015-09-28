/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/**
 * A component for drawing a parallel circuit.
 *
 * The parallel component takes a 'circuit' prop, in addition to a
 * 'disabled' prop to display them disabled and mute events on them.
 *
 * In addition, Concatenated should have a 'branches' prop to list out the
 * branches that make up the parallel circuits.
 */

"use strict";

import React from "react";
import _ from "underscore";

import Constants from "./constants.js";
import Endpoint from "./circuit-diagram-endpoint.jsx";
import Connection from "./circuit-diagram-connection.jsx";
import Navigate from "./circuit-diagram-navigate.jsx";
import "../examples/styles/circuit.css";

let {Directions} = Constants;

// These are nominal sizes for the circuit
let CIRCUIT_WIDTH = 851;
let CIRCUIT_HEIGHT = 200;

export default React.createClass({

    getDefaultProps() {
        return {
            disabled: false,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            titleOffsetX: 10,
            titleOffsetY: 15,
            margin: 100
        };
    },

    renderCircuitTitle(title) {
        if (!this.props.hideTitle) {
            return (
                <text className="esdb-circuit-title" key="circuit-title"
                      x={this.props.titleOffsetX} y={this.props.titleOffsetY}>
                    {title}
                </text>
            );
        } else {
            return (
                 <text className="esdb-circuit-title" key="circuit-title"
                      x={this.props.titleOffsetX} y={this.props.titleOffsetY}>
                </text>
            );
        }
    },

    renderParentNavigation(parentId) {
        if (parentId) {
            return (
                <Navigate direction={Directions.NORTH} ypos={25} id={this.props.parentId} />
            );
        } else {
            return null;
        }
    },

    renderDisabledOverlay(disabled) {
        if (disabled) {
            return (
                <rect className="esdb-circuit-overlay"
                      x="0" y="0" width={CIRCUIT_WIDTH} height={CIRCUIT_HEIGHT}
                      style={{fill: "#FDFDFD", fillOpacity: 0.65}}/>
            );
        } else {
            return null;
        }
    },

    renderCircuitElements(branches, a, z) {
        let numBranches = branches.length;
        let width = this.props.width - this.props.margin * 2;
        let x = this.props.margin;
        let y = this.props.height / 2;
        let transform = "translate(" + x + " " + y + ")";

        let elements = [];
        let offset = 0;

        // Push the two end points for the main circuit
        elements.push(<Endpoint key="a" width={width} position={0} label={a.name} />);
        elements.push(<Endpoint key="z" width={width} position={width} label={z.name}/>);

        // Push all the branch connections
        if (numBranches > 0) {
            offset = -(numBranches - 1) * 0.5 - 1;
            _.each(branches, circuit => {
                offset += 1;
                elements.push(
                    <Connection width={width}
                                key={circuit.id}
                                circuit={circuit}
                                circuitTypes={this.props.circuitTypes}
                                offset={offset}/>
                );
            });
        } else {
            // Placeholder
            elements.push(<Connection width={width} key="placeholder-top" placeholder offset={0.25}/>);
            elements.push(<Connection width={width} key="placeholder-bottom" placeholder offset={-0.25}/>);
        }

        return (
            <g transform={transform}>
                {elements}
            </g>
        );
    },

    render() {
        let circuit = this.props.circuit;
        let title = circuit["circuit_id"];
        let branches = this.props.branches ? this.props.branches : [];
        let endpointA = circuit["endpoint_a"];
        let endpointZ = circuit["endpoint_z"];

        let className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }

        let viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;
        let svgStyle = {width: "100%", height: CIRCUIT_HEIGHT};

        return (
            <svg className={className} style={svgStyle}>
                <svg viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderCircuitTitle(title)}
                    {this.renderCircuitElements(branches, endpointA, endpointZ)}
                    {this.renderParentNavigation(this.props.parentId)}
                    {this.renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
});
