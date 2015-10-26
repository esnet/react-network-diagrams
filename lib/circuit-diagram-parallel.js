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

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _constantsJs = require("./constants.js");

var _constantsJs2 = _interopRequireDefault(_constantsJs);

var _circuitDiagramEndpointJsx = require("./circuit-diagram-endpoint.jsx");

var _circuitDiagramEndpointJsx2 = _interopRequireDefault(_circuitDiagramEndpointJsx);

var _circuitDiagramConnectionJsx = require("./circuit-diagram-connection.jsx");

var _circuitDiagramConnectionJsx2 = _interopRequireDefault(_circuitDiagramConnectionJsx);

var _circuitDiagramNavigateJsx = require("./circuit-diagram-navigate.jsx");

var _circuitDiagramNavigateJsx2 = _interopRequireDefault(_circuitDiagramNavigateJsx);

require("../examples/styles/circuit.css");

var Directions = _constantsJs2["default"].Directions;

// These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var CIRCUIT_HEIGHT = 200;

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-parallel",

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
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-title", key: "circuit-title",
                    x: this.props.titleOffsetX, y: this.props.titleOffsetY },
                title
            );
        } else {
            return _react2["default"].createElement("text", { className: "esdb-circuit-title", key: "circuit-title",
                x: this.props.titleOffsetX, y: this.props.titleOffsetY });
        }
    },

    renderParentNavigation: function renderParentNavigation(parentId) {
        if (parentId) {
            return _react2["default"].createElement(_circuitDiagramNavigateJsx2["default"], { direction: Directions.NORTH, ypos: 25, id: this.props.parentId });
        } else {
            return null;
        }
    },

    renderDisabledOverlay: function renderDisabledOverlay(disabled) {
        if (disabled) {
            return _react2["default"].createElement("rect", { className: "esdb-circuit-overlay",
                x: "0", y: "0", width: CIRCUIT_WIDTH, height: CIRCUIT_HEIGHT,
                style: { fill: "#FDFDFD", fillOpacity: 0.65 } });
        } else {
            return null;
        }
    },

    renderCircuitElements: function renderCircuitElements(branches, a, z) {
        var _this = this;

        var numBranches = branches.length;
        var width = this.props.width - this.props.margin * 2;
        var x = this.props.margin;
        var y = this.props.height / 2;
        var transform = "translate(" + x + " " + y + ")";

        var elements = [];
        var offset = 0;

        // Push the two end points for the main circuit
        elements.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "a", width: width, position: 0, label: a.name }));
        elements.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "z", width: width, position: width, label: z.name }));

        // Push all the branch connections
        if (numBranches > 0) {
            offset = -(numBranches - 1) * 0.5 - 1;
            _underscore2["default"].each(branches, function (circuit) {
                offset += 1;
                elements.push(_react2["default"].createElement(_circuitDiagramConnectionJsx2["default"], { width: width,
                    key: circuit.id,
                    circuit: circuit,
                    circuitTypes: _this.props.circuitTypes,
                    offset: offset }));
            });
        } else {
            // Placeholder
            elements.push(_react2["default"].createElement(_circuitDiagramConnectionJsx2["default"], { width: width, key: "placeholder-top", placeholder: true, offset: 0.25 }));
            elements.push(_react2["default"].createElement(_circuitDiagramConnectionJsx2["default"], { width: width, key: "placeholder-bottom", placeholder: true, offset: -0.25 }));
        }

        return _react2["default"].createElement(
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

        return _react2["default"].createElement(
            "svg",
            { className: className, style: svgStyle },
            _react2["default"].createElement(
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
module.exports = exports["default"];