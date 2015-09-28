/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
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
var CIRCUIT_HEIGHT = 250;

/**
 * Constructs a basic circuit
 */
exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-basic",

    getDefaultProps: function getDefaultProps() {
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
    endpointLabel: function endpointLabel(endpoint) {
        var label = "";
        if (endpoint.endpoint_type === 1) {
            label += endpoint.panel_name ? endpoint.panel_name : "";
            label += endpoint.port_id ? ":" + endpoint.port_id : "";
            label += endpoint.port_side ? ":" + endpoint.port_side : "";
        } else if (endpoint.endpoint_type === 2) {
            label += endpoint.device_name ? endpoint.device_name : "";
            label += endpoint["interface"] ? ":" + endpoint["interface"] : "";
        } else if (endpoint.endpoint_type === 3) {
            label += endpoint.foreign_description ? endpoint.foreign_description : "";
        }
        return label;
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
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement(_circuitDiagramNavigateJsx2["default"], { direction: Directions.NORTH, ypos: 0, id: this.props.parentId })
            );
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

    renderCircuitElements: function renderCircuitElements(circuit) {
        var result = [];
        var navId = circuit.depends_on ? circuit.depends_on.id : null;
        var middle = CIRCUIT_WIDTH / 2;
        var couplerWidth = 25;
        var backplaneWidth = 40;
        var width = this.props.width - this.props.margin * 2;

        var couplerGroup = ["Panel Coupler"];
        var equipmentGroup = ["Backplane Mate"];
        var x = undefined;
        var end = undefined;

        if (_underscore2["default"].contains(couplerGroup, this.props.circuitTypes[circuit["circuit_type"]]) || _underscore2["default"].contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            x = middle - 13;
            end = couplerWidth;
        } else if (_underscore2["default"].contains(equipmentGroup, this.props.circuitTypes[circuit["circuit_type"]]) || _underscore2["default"].contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            x = middle - 20;
            end = backplaneWidth;
        } else {
            x = this.props.margin;
            end = width;
        }
        var y = this.props.height / 4;
        var transform = "translate(" + x + " " + y + ")";

        var endpointLabelA = circuit["endpoint_a"] && circuit["endpoint_a"].name ? this.endpointLabel(circuit["endpoint_a"]) : "";
        var endpointLabelZ = circuit["endpoint_z"] && circuit["endpoint_z"].name ? this.endpointLabel(circuit["endpoint_z"]) : "";

        var initialPos = 0;
        // The two end points of this circuit
        result.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "a", width: width, position: initialPos,
            label: endpointLabelA }));
        if (_underscore2["default"].contains(couplerGroup, this.props.circuitTypes[circuit["circuit_type"]]) || _underscore2["default"].contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            var pos = initialPos + couplerWidth;
            result.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "z", width: width, position: pos,
                label: endpointLabelZ }));
        } else if (_underscore2["default"].contains(equipmentGroup, this.props.circuitTypes[circuit["circuit_type"]]) || _underscore2["default"].contains(couplerGroup, this.props.couplerTypes[circuit["circuit_type"]])) {
            var pos = initialPos + backplaneWidth;
            result.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "z", width: width, position: pos,
                label: endpointLabelZ }));
        } else {
            result.push(_react2["default"].createElement(_circuitDiagramEndpointJsx2["default"], { key: "z", width: width, position: width,
                label: endpointLabelZ }));
        }

        // The connections
        if (navId) {
            result.push(_react2["default"].createElement(_circuitDiagramConnectionJsx2["default"], { circuit: circuit,
                circuitTypes: this.props.circuitTypes,
                couplerTypes: this.props.couplerTypes,
                end: end,
                width: width, offset: 0,
                navigate: navId }));
        } else {
            result.push(_react2["default"].createElement(_circuitDiagramConnectionJsx2["default"], { circuit: circuit,
                circuitTypes: this.props.circuitTypes,
                couplerTypes: this.props.couplerTypes,
                end: end,
                width: width,
                offset: 0,
                noNavigate: true }));
        }

        return _react2["default"].createElement(
            "g",
            { transform: transform },
            result
        );
    },

    render: function render() {
        var circuit = this.props.circuit;
        var title = circuit["circuit_id"] || "Circuit Id pending";

        var className = "esdb-circuit-container";
        if (this.props.disabled) {
            className += " disabled";
        }

        var svgStyle = { width: "100%", height: CIRCUIT_HEIGHT };
        var viewBox = "0 0 " + CIRCUIT_WIDTH + " " + CIRCUIT_HEIGHT;

        return _react2["default"].createElement(
            "svg",
            { className: className, style: svgStyle, onClick: this._deselect },
            _react2["default"].createElement(
                "svg",
                { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                this.renderCircuitTitle(title),
                this.renderCircuitElements(circuit),
                this.renderParentNavigation(this.props.parentId),
                this.renderDisabledOverlay(this.props.disabled)
            )
        );
    }
});
module.exports = exports["default"];