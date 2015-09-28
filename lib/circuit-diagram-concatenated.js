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

"use strict";

var React = require("react");
var _ = require("underscore");
var Copy = require("deepcopy");

var Constants = require("../../constants/esnet-esdb-constants.js");
var Endpoint = require("./circuit-diagram-endpoint.jsx");
var Connection = require("./circuit-diagram-connection.jsx");
var Navigate = require("./circuit-diagram-navigate.jsx");

var CircuitUtil = require("../../utils/esnet-esdb-circuit-util.js");

var CircuitSegmentTypes = Constants.CircuitSegmentTypes;
var Directions = Constants.Directions;

//These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var CIRCUIT_HEIGHT = 250;

var ConcatenatedCircuit = React.createClass({

    displayName: "ConcatenatedCircuit",

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            titleOffsetX: 10,
            titleOffsetY: 15,
            margin: 100
        };
    },

    renderCircuitTitle: function renderCircuitTitle(title) {
        if (!this.props.hideTitle) {
            return React.createElement(
                "text",
                { className: "esdb-circuit-title", key: "circuit-title",
                    x: this.props.titleOffsetX, y: this.props.titleOffsetY },
                title
            );
        } else {
            return React.createElement("text", { className: "esdb-circuit-title", key: "circuit-title",
                x: this.props.titleOffsetX, y: this.props.titleOffsetY });
        }
    },

    renderParentNavigation: function renderParentNavigation(parentId) {
        if (parentId) {
            return React.createElement(Navigate, { direction: Directions.NORTH, ypos: 0, id: this.props.parentId });
        } else {
            return null;
        }
    },

    renderDisabledOverlay: function renderDisabledOverlay(disabled) {
        if (disabled) {
            return React.createElement("rect", { className: "esdb-circuit-overlay",
                x: "0", y: "0", width: CIRCUIT_WIDTH, height: CIRCUIT_HEIGHT,
                style: { fill: "#FDFDFD", fillOpacity: 0.65 } });
        } else {
            return null;
        }
    },

    renderCircuitElements: function renderCircuitElements(segments) {
        var self = this;
        var numSegments = segments.length;
        var couplerGroup = ["Panel Coupler", "Fiber Splice"];
        var equipmentGroup = ["Backplane Mate"];
        // get a count of the number of couplers or backplane mate circuits
        var couplerNumber = 0;
        var equipmentNumber = 0;
        _.each(segments, function (segment) {
            if (_.contains(couplerGroup, self.props.couplerTypes[segment["circuit_type"]])) {
                couplerNumber += 1;
            } else if (_.contains(equipmentGroup, self.props.circuitTypes[segment["circuit_type"]])) {
                equipmentNumber += 1;
            };
        });
        var width = this.props.width - this.props.margin * 2;
        //Calculate how much each segment should be at
        var couplerWidth = 25;
        var equipmentWidth = 40;
        var nonStandardSegments = couplerNumber + equipmentNumber;
        var remSegments = numSegments - nonStandardSegments;
        var remWidth = width - couplerNumber * couplerWidth - equipmentNumber * equipmentWidth;
        var segmentWidth = remWidth / remSegments;

        var x = this.props.margin;
        var y = this.props.height / 4;
        var transform = "translate(" + x + " " + y + ")";
        var elements = [];
        if (numSegments > 0) {

            //place the first endpoint - Allways at position 0
            if (_.contains(couplerGroup, self.props.couplerTypes[segments[0]["circuit_type"]])) {
                var endpointALabel = segments[0].endpoint_a ? segments[0].endpoint_a.port_id + ":" + segments[0].endpoint_a.port_side : "(no endpoint)";
            } else {
                var endpointALabel = segments[0].endpoint_a ? segments[0].endpoint_a.name : "(no endpoint)";
            }
            elements.push(React.createElement(Endpoint, { key: "endpoint-0",
                width: width,
                position: 0,
                label: endpointALabel }));

            //After the first endpoint is placed, determine the position on the x-axis between 0 and the max width
            //Set the initial EP to 0
            //Check if the first segment is a coupler or equipment - if it is, place the Z endpoint of the segment at
            //0 + coupler/equipment length, if not, place it at 0 + segment length
            //Set the initial EP to the end position calculated to determine the next endpoint position

            var initialPos = 0;
            _.each(segments, function (segment, segmentIndex) {
                if (_.contains(couplerGroup, self.props.couplerTypes[segment["circuit_type"]])) {
                    var pos = initialPos + couplerWidth;
                } else if (_.contains(equipmentGroup, self.props.circuitTypes[segment["circuit_type"]])) {
                    var pos = initialPos + equipmentWidth;
                } else {
                    var pos = initialPos + segmentWidth;
                };

                if (segment.endpoint_z["endpoint_type"] == 1) {
                    var endpointZLabel = segment.endpoint_z["port_id"] ? segment.endpoint_z["port_id"] : "(no endpoint)";
                    endpointZLabel += segment.endpoint_z["port_side"] ? ":" + segment.endpoint_z["port_side"] : "(no endpoint)";
                } else {
                    var endpointZLabel = segment.endpoint_z ? segment.endpoint_z.name : "(no endpoint)";
                };

                elements.push(React.createElement(Endpoint, { key: "endpoint-" + (segmentIndex + 1),
                    width: width,
                    position: pos,
                    label: endpointZLabel }));
                initialPos = pos;
            });

            //Collect all the connections - draws inside circles and lines
            var begin = 0;
            _.each(segments, function (segment, segmentIndex) {
                if (_.contains(couplerGroup, self.props.couplerTypes[segment["circuit_type"]])) {
                    var end = begin + couplerWidth;
                } else if (_.contains(equipmentGroup, self.props.circuitTypes[segment["circuit_type"]])) {
                    var end = begin + equipmentWidth;
                } else {
                    var end = begin + segmentWidth;
                };
                elements.push(React.createElement(Connection, { key: "circuit-" + segment.id,
                    width: width,
                    circuit: segment,
                    circuitTypes: self.props.circuitTypes,
                    couplerTypes: self.props.couplerTypes,
                    begin: begin,
                    end: end,
                    offset: 0 }));
                begin = end;
            });
        } else {
            //Placeholder rendering
            elements.push(React.createElement(Endpoint, { width: width, key: "a", position: 0 }));
            elements.push(React.createElement(Endpoint, { width: width, key: "z", position: 1 }));
            elements.push(React.createElement(Connection, { width: width, key: "placeholder-1", placeholder: true, begin: 0, end: 0.33 }));
            elements.push(React.createElement(Connection, { width: width, key: "placeholder-2", placeholder: true, begin: 0.33, end: 0.67 }));
            elements.push(React.createElement(Connection, { width: width, key: "placeholder-3", placeholder: true, begin: 0.67, end: 1 }));
        }
        return React.createElement(
            "g",
            { transform: transform },
            elements
        );
    },

    render: function render() {
        var segments = this.props.segments ? this.props.segments : [];
        var title = this.props.circuit["circuit_id"];
        var className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }
        var viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;
        var svgStyle = { width: "100%", height: CIRCUIT_HEIGHT };

        return React.createElement(
            "svg",
            { className: className, style: svgStyle, onClick: this._deselect },
            React.createElement(
                "svg",
                { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                this.renderCircuitTitle(title),
                this.renderCircuitElements(CircuitUtil.getOrderedGroupMembers(segments)),
                this.renderParentNavigation(this.props.parentId),
                this.renderDisabledOverlay(this.props.disabled)
            )
        );
    }
});

// Exports
module.exports = ConcatenatedCircuit;