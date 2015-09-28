/**
 * Draw a Concatenated circuits
 *
 * The concatenated circuit component takes a 'circuit' prop, in addition
 * to 'disabled' to display them as disabled and mute events on them.
 *
 * In addition, the concatenated circuit component should have a 'segments'
 * prop to list out the segments that make up the concatenation.
 *
 * This is of the form:
 *     [end, connection, end, connection, end, ...]
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
                <Navigate direction={Directions.NORTH} ypos={0} id={this.props.parentId} />
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

    renderCircuitElements(segments) {
        let numSegments = segments.length;
        let couplerGroup = ["Panel Coupler", "Fiber Splice"];
        let equipmentGroup = ["Backplane Mate"];
        // get a count of the number of couplers or backplane mate circuits
        let couplerNumber = 0;
        let equipmentNumber = 0;
        _.each(segments, segment => {
            if (_.contains(couplerGroup, this.props.couplerTypes[segment["circuit_type"]])) {
                couplerNumber += 1;
            } else if (_.contains(equipmentGroup, this.props.circuitTypes[segment["circuit_type"]])) {
                equipmentNumber += 1;
            }
        });
        let width = this.props.width - this.props.margin * 2;
        // Calculate how much each segment should be at
        let couplerWidth = 25;
        let equipmentWidth = 40;
        let nonStandardSegments = couplerNumber + equipmentNumber;
        let remSegments = numSegments - nonStandardSegments;
        let remWidth = width - (couplerNumber * couplerWidth) - (equipmentNumber * equipmentWidth);
        let segmentWidth = remWidth / remSegments;

        let x = this.props.margin;
        let y = this.props.height / 4;
        let transform = "translate(" + x + " " + y + ")";
        let elements = [];
        if (numSegments > 0) {
            // place the first endpoint - Allways at position 0
            let endpointALabel;
            let endpointZLabel;
            if (_.contains(couplerGroup, this.props.couplerTypes[segments[0]["circuit_type"]])) {
                endpointALabel = segments[0].endpoint_a ? (segments[0].endpoint_a.port_id + ":" + segments[0].endpoint_a.port_side) : "(no endpoint)";
            } else {
                endpointALabel = segments[0].endpoint_a ? segments[0].endpoint_a.name : "(no endpoint)";
            }
            elements.push(
                <Endpoint key={"endpoint-0"}
                          width={width}
                          position={0}
                          label={endpointALabel} />
            );
            /* After the first endpoint is placed, determine the position on the x-axis between 0 and the max width
               Set the initial EP to 0
               Check if the first segment is a coupler or equipment - if it is, place the Z endpoint of the segment at
               0 + coupler/equipment length, if not, place it at 0 + segment length
               Set the initial EP to the end position calculated to determine the next endpoint position
            */

            let initialPos = 0;
            let pos = 0;
            _.each(segments, (segment, segmentIndex) => {
                if (_.contains(couplerGroup, this.props.couplerTypes[segment["circuit_type"]])) {
                    pos = initialPos + couplerWidth;
                } else if (_.contains(equipmentGroup, this.props.circuitTypes[segment["circuit_type"]])) {
                    pos = initialPos + equipmentWidth;
                } else {
                    pos = initialPos + segmentWidth;
                }
                if (segment.endpoint_z["endpoint_type"] === 1) {
                    endpointZLabel = segment.endpoint_z["port_id"] ? segment.endpoint_z["port_id"] : "(no endpoint)";
                    endpointZLabel += segment.endpoint_z["port_side"] ? ":" + segment.endpoint_z["port_side"] : "(no endpoint)";
                } else {
                    endpointZLabel = segment.endpoint_z ? segment.endpoint_z.name : "(no endpoint)";
                }
                elements.push(
                    <Endpoint key={"endpoint-" + (segmentIndex + 1)}
                              width={width}
                              position={pos}
                              label={endpointZLabel} />
                );
                initialPos = pos;
            });

            // Collect all the connections - draws inside circles and lines
            let begin = 0;
            let end = 0;
            _.each(segments, segment => {
                if (_.contains(couplerGroup, this.props.couplerTypes[segment["circuit_type"]])) {
                    end = begin + couplerWidth;
                } else if (_.contains(equipmentGroup, this.props.circuitTypes[segment["circuit_type"]])) {
                    end = begin + equipmentWidth;
                } else {
                    end = begin + segmentWidth;
                }
                elements.push(
                    <Connection key={"circuit-" + segment.id}
                                width={width}
                                circuit={segment}
                                circuitTypes={this.props.circuitTypes}
                                couplerTypes={this.props.couplerTypes}
                                begin={begin}
                                end={end}
                                offset={0}/>
                );
                begin = end;
            });

        } else {
            // Placeholder rendering
            elements.push(<Endpoint width={width} key="a" position={0} />);
            elements.push(<Endpoint width={width} key="z" position={1} />);
            elements.push(<Connection width={width} key="placeholder-1" placeholder begin={0} end={0.33}/>);
            elements.push(<Connection width={width} key="placeholder-2" placeholder begin={0.33} end={0.67}/>);
            elements.push(<Connection width={width} key="placeholder-3" placeholder begin={0.67} end={1}/>);
        }
        return (
            <g transform={transform}>
                {elements}
            </g>
        );
    },

    render() {
        let segments = this.props.segments ? this.props.segments : [];
        let title = this.props.circuit["circuit_id"];
        let className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }
        let viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;
        let svgStyle = {width: "100%", height: CIRCUIT_HEIGHT};

        return (
            <svg className={className} style={svgStyle} onClick={this._deselect}>
                <svg viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderCircuitTitle(title)}
                    {this.renderCircuitElements(segments)}
                    {this.renderParentNavigation(this.props.parentId)}
                    {this.renderDisabledOverlay(this.props.disabled)}
                </svg>
            </svg>
        );
    }
});
