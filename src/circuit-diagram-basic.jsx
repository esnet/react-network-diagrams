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

import Constants from "./constants.js";
import Endpoint from "./circuit-diagram-endpoint.jsx";
import Connection from "./circuit-diagram-connection.jsx";
import Navigate from "./circuit-diagram-navigate.jsx";

import "../examples/styles/circuit.css";

let {Directions} = Constants;

// These are nominal sizes for the circuit
let CIRCUIT_WIDTH = 851;
let CIRCUIT_HEIGHT = 250;

/**
 * Constructs a basic circuit
 */
export default React.createClass({

    getDefaultProps() {
        return {
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            disabled: false,
            titleOffsetX: 10,
            titleOffsetY: 15,
            margin: 150
        };
    },

    // Quick and dirty endpoint labels
    endpointLabel(endpoint) {
        let label = "";
        if (endpoint.endpoint_type === 1) {
            label += endpoint.panel_name ? endpoint.panel_name : "";
            label += endpoint.port_id ? ":" + endpoint.port_id : "";
            label += endpoint.port_side ? ":" + endpoint.port_side : "";
        } else if (endpoint.endpoint_type === 2) {
            label += endpoint.device_name ? endpoint.device_name : "";
            label += endpoint.interface ? ":" + endpoint.interface : "";
        } else if (endpoint.endpoint_type === 3) {
            label += endpoint.foreign_description ? endpoint.foreign_description : "";
        }
        return label;
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
                <g>
                    <Navigate direction={Directions.NORTH} ypos={0} id={this.props.parentId} />
                </g>
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

    renderCircuitElements(circuit) {
        let result = [];
        let navId = circuit.depends_on ? circuit.depends_on.id : null;
        let middle = CIRCUIT_WIDTH / 2;
        let couplerWidth = 25;
        let backplaneWidth = 40;
        let width = this.props.width - this.props.margin * 2;

        let couplerGroup = ["Panel Coupler"];
        let equipmentGroup = ["Backplane Mate"];
        let x;
        let end;

        if (_.contains(couplerGroup, this.props.circuitTypes[circuit["circuit_type"]]) ||
            _.contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            x = middle - 13;
            end = couplerWidth;
        } else if (_.contains(equipmentGroup, this.props.circuitTypes[circuit["circuit_type"]]) ||
            _.contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            x = middle - 20;
            end = backplaneWidth;
        } else {
            x = this.props.margin;
            end = width;
        }
        let y = this.props.height / 4;
        let transform = "translate(" + x + " " + y + ")";

        let endpointLabelA = circuit["endpoint_a"] && circuit["endpoint_a"].name ? this.endpointLabel(circuit["endpoint_a"]) : "";
        let endpointLabelZ = circuit["endpoint_z"] && circuit["endpoint_z"].name ? this.endpointLabel(circuit["endpoint_z"]) : "";

        let initialPos = 0;
        // The two end points of this circuit
        result.push(
            <Endpoint key="a" width={width} position={initialPos}
                      label={endpointLabelA} />
        );
        if (_.contains(couplerGroup, this.props.circuitTypes[circuit["circuit_type"]]) ||
            _.contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            let pos = initialPos + couplerWidth;
            result.push(
                <Endpoint key="z" width={width} position={pos}
                    label={endpointLabelZ} />
            );
        } else if (_.contains(equipmentGroup, this.props.circuitTypes[circuit["circuit_type"]]) ||
            _.contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            let pos = initialPos + backplaneWidth;
            result.push(
                <Endpoint key="z" width={width} position={pos}
                    label={endpointLabelZ} />
            );
        } else {
            result.push(
                <Endpoint key="z" width={width} position={width}
                    label={endpointLabelZ} />
            );
        }

        // The connections
        if (navId) {
            result.push(
                <Connection circuit={circuit}
                            circuitTypes={this.props.circuitTypes}
                            couplerTypes={this.props.couplerTypes}
                            end={end}
                            width={width} offset={0}
                            navigate={navId}/>
            );
        } else {
            result.push(
                <Connection circuit={circuit}
                            circuitTypes={this.props.circuitTypes}
                            couplerTypes={this.props.couplerTypes}
                            end={end}
                            width={width}
                            offset={0}
                            noNavigate />
            );
        }

        return (
            <g transform={transform}>
                {result}
            </g>
        );
    },

    render() {
        let circuit = this.props.circuit;
        let title = circuit["circuit_id"] || "Circuit Id pending";

        let className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }

        let svgStyle = {width: "100%", height: CIRCUIT_HEIGHT};
        let viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;

        return (
            <svg className={className} style={svgStyle} onClick={this._deselect}>
                <svg viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderCircuitTitle(title)}
                    {this.renderCircuitElements(circuit)}
                    {this.renderParentNavigation(this.props.parentId)}
                    {this.renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
});
