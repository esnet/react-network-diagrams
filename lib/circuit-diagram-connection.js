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
 * A module containing a the connection drawing primative.
 *
 * @module CircuitConnection
 */

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("../examples/styles/circuit.css");

// These are nominal sizes for the circuit
var CIRCUIT_WIDTH = 851;
var COUPLER_HEIGHT = 36;

/**
 *
 * @class
 *
 * Renders the a connection between two points defined as begin and end.
 * The connection can also be offset from the center line by an amount.
 * The result is a <g> element containing the connection, so this needs
 * to be used within the context of an <svg> block.
 *
 * **Props**
 *
 * * offset   - How far to offset the connection from the center line
 * * begin    - Where to begin the connection, between 0 and CIRCUIT_WIDTH (defauts to 0)
 * * end      - Where to end the connection, between 0 and CIRCUIT_WIDTH ()
 *
 * **State**
 * * none
 */
exports["default"] = _react2["default"].createClass({

    displayName: "Connection",

    getInitialState: function getInitialState() {
        return { "hover": false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            width: CIRCUIT_WIDTH,
            offset: 0,
            scale: 25,
            begin: 0,
            end: 651,
            endPointRadius: 2
        };
    },

    /**
     * User hovers over the circuit
     */
    _mouseOver: function _mouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ "hover": true });
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut: function _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ "hover": false });
        }
    },

    /**
     * User selects the circuit
     */
    _click: function _click(e) {
        if (this.props.noNavigate) {
            return;
        }
        if (this.props.navigate) {
            Backbone.history.navigate("circuit/view/" + this.props.navigate, { trigger: true });
        } else if (this.props.circuit.id) {
            Backbone.history.navigate("circuit/view/" + this.props.circuit.id, { trigger: true });
        }
        e.stopPropagation();
    },

    renderLabel: function renderLabel(circuit, type, label, x, y) {
        var height = undefined;
        if (type === "Panel Coupler") {
            height = y - 20;
            var newLabel = circuit["endpoint_a"]["panel_name"];
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "endpoint-label", x: x, y: height },
                newLabel
            );
        } else if (type === "Backplane Mate") {
            height = y - 20;
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "endpoint-label", x: x, y: height },
                label
            );
        } else if (type === "Fiber Splice") {
            height = y - 20;
            var newLabel = "Splice";
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "endpoint-label", x: x, y: height },
                newLabel
            );
        } else {
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "endpoint-label", x: x, y: y },
                label
            );
        }
    },

    renderEndpoints: function renderEndpoints(b, e) {
        var ClassSet = _classnames2["default"];
        var c = ClassSet({
            "esdb-circuit-dot": true,
            "hover": this.state.hover,
            "placeholder": this.props.placeholder
        });

        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement("circle", { className: c, key: "line-begin",
                cx: b, cy: 0, r: this.props.endPointRadius }),
            _react2["default"].createElement("circle", { className: c, key: "line-end",
                cx: e, cy: 0, r: this.props.endPointRadius })
        );
    },

    renderLine: function renderLine(type, b, e, dx, dy) {
        var typeClass = undefined;

        // Mapping circuit_type ids to classes
        if (type === "Equipment-Equipment") {
            typeClass = "equipment-equipment";
        } else if (type === "ESnet Optical") {
            typeClass = "esnet-optical";
        } else if (type === "Leased Circuit") {
            typeClass = "leased-circuit";
        } else if (type === "Dark Fiber") {
            typeClass = "dark-fiber";
        } else if (type === "Cross-Connect") {
            typeClass = "cross-connect";
        } else if (type === "Panel Coupler") {
            typeClass = "coupler";
        } else if (type === "Backplane Mate") {
            typeClass = "backplane-mate";
        } else if (type === "Fiber Splice") {
            typeClass = "dark-fiber";
        }

        // Classes
        var ClassSet = _classnames2["default"];

        var cc = { "esdb-circuit-edge": true,
            "hover": this.props.placeholder ? false : this.state.hover,
            "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        var coupler = ClassSet(cc);
        var edge = ClassSet(cc);
        var hit = ClassSet({
            "esdb-circuit-hitstroke": true,
            "inactive": this.props.noNavigate
        });

        if (type === "Panel Coupler") {
            var height = COUPLER_HEIGHT;
            var y = -18;
            var rectLength = 25;
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement("rect", { className: coupler, width: rectLength, x: b, y: y, height: height, rx: 5, ry: 5 })
            );
        } else if (type === "Backplane Mate") {
            var height = COUPLER_HEIGHT;
            var y = -18;
            var rectLength = 40;
            var rectMiddle = b + 20;
            var vpts = [];
            // b = 0, e = 25, dy = 0, dx = 50, coupler height = 26
            vpts.push(_util2["default"].format("%d,%d", rectMiddle, -18));
            vpts.push(_util2["default"].format("%d,%d", rectMiddle, 18));
            var vpoints = vpts.join(" ");
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement("rect", { className: edge, width: rectLength, x: b, y: y, height: height, rx: 5, ry: 5 }),
                _react2["default"].createElement("polyline", { className: edge, key: "line-polypath", points: vpoints }),
                _react2["default"].createElement("polyline", { className: hit, key: "line-polypath-hit", points: vpoints,
                    onMouseOver: this._mouseOver,
                    onMouseOut: this._mouseOut,
                    onClick: this._click })
            );
        } else {
            var pts = [];
            pts.push(_util2["default"].format("%d,%d", b, 0));
            pts.push(_util2["default"].format("%d,%d", b + dx, -dy));
            pts.push(_util2["default"].format("%d,%d", e - dx, -dy));
            pts.push(_util2["default"].format("%d,%d", e, 0));
            var points = pts.join(" ");
            return _react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement("polyline", { className: edge, key: "line-polypath", points: points }),
                _react2["default"].createElement("polyline", { className: hit, key: "line-polypath-hit", points: points,
                    onMouseOver: this._mouseOver,
                    onMouseOut: this._mouseOut,
                    onClick: this._click })
            );
        }
    },

    render: function render() {
        var type = undefined;
        if (this.props.circuit && this.props.circuitTypes && this.props.couplerTypes && this.props.circuit.circuit_type) {
            if (_underscore2["default"].has(this.props.circuitTypes, this.props.circuit["circuit_type"])) {
                type = this.props.circuitTypes[this.props.circuit["circuit_type"]];
            } else if (_underscore2["default"].has(this.props.couplerTypes, this.props.circuit["circuit_type"])) {
                type = this.props.couplerTypes[this.props.circuit["circuit_type"]];
            }
        }
        var dy = this.props.offset * this.props.scale;
        var dx = this.props.scale * 2;
        var begin = this.props.begin;
        var end = this.props.end;
        var middle = begin + (end - begin) / 2;

        var label = this.props.circuit ? this.props.circuit["circuit_id"] : "";
        var circuit = this.props.circuit;
        // Build up our svg elements
        return _react2["default"].createElement(
            "g",
            { key: "line-group" },
            this.renderLine(type, begin, end, dx, dy, middle),
            this.renderEndpoints(begin, end),
            this.renderLabel(circuit, type, label, middle, -dy - 3)
        );
    }
});
module.exports = exports["default"];