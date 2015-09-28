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

var React = require("react");
var _ = require("underscore");
var util = require("util");

var Constants = require("../../constants/esnet-esdb-constants.js");
var Endpoint = require("./circuit-diagram-endpoint.jsx");
var Connection = require("./circuit-diagram-connection.jsx");
var Navigate = require("./circuit-diagram-navigate.jsx");

var Directions = Constants.Directions;

//These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var CIRCUIT_HEIGHT = 200;

var ParallelCircuit = React.createClass({

    displayName: "ParallelCircuit",

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
            return React.createElement(Navigate, { direction: Directions.NORTH, ypos: 25, id: this.props.parentId });
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

    renderCircuitElements: function renderCircuitElements(branches, a, z) {
        var self = this;

        var numBranches = branches.length;
        var width = this.props.width - this.props.margin * 2;
        var x = this.props.margin;
        var y = this.props.height / 2;
        var transform = "translate(" + x + " " + y + ")";

        var elements = [];
        var offset = 0;

        //Push the two end points for the main circuit
        elements.push(React.createElement(Endpoint, { key: "a", width: width, position: 0, label: a.name }));
        elements.push(React.createElement(Endpoint, { key: "z", width: width, position: 1, label: z.name }));

        //Push all the branch connections
        if (numBranches > 0) {
            offset = -(numBranches - 1) * 0.5 - 1;
            _.each(branches, function (circuit) {
                offset += 1;
                elements.push(React.createElement(Connection, { width: width,
                    key: circuit.id,
                    circuit: circuit,
                    circuitTypes: self.props.circuitTypes,
                    offset: offset }));
            });
        } else {
            //Placeholder
            elements.push(React.createElement(Connection, { width: width, key: "placeholder-top", placeholder: true, offset: 0.25 }));
            elements.push(React.createElement(Connection, { width: width, key: "placeholder-bottom", placeholder: true, offset: -0.25 }));
        }

        return React.createElement(
            "g",
            { transform: transform },
            elements
        );
    },

    render: function render() {
        var circuit = this.props.circuit;
        var title = circuit["circuit_id"];
        var branches = this.props.branches ? this.props.branches : [];
        var endpointA = circuit["endpoint_a"];
        var endpointZ = circuit["endpoint_z"];

        var className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }

        var viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;
        var svgStyle = { width: "100%", height: CIRCUIT_HEIGHT };

        return React.createElement(
            "svg",
            { className: className, style: svgStyle },
            React.createElement(
                "svg",
                { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                this.renderCircuitTitle(title),
                this.renderCircuitElements(branches, endpointA, endpointZ),
                this.renderParentNavigation(this.props.parentId),
                this.renderDisabledOverlay(this.props.disabled)
            )
        );
    }
});

// Exports
module.exports = ParallelCircuit;