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

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("../examples/styles/circuit.css");

var PANEL_WIDTH = 851;

exports["default"] = _react2["default"].createClass({
    displayName: "location-diagram-connection",

    getInitialState: function getInitialState() {
        return { hover: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            width: PANEL_WIDTH,
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
            this.setState({ hover: true });
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut: function _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ hover: false });
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

    renderLabel: function renderLabel(label, x, y) {
        var yOffset = y - 10;
        return _react2["default"].createElement(
            "text",
            { className: "esdb-circuit-label", key: "endpoint-label", x: x, y: yOffset },
            label
        );
    },

    renderEndpoints: function renderEndpoints(x, y) {
        var ClassSet = _classnames2["default"];
        var c = ClassSet({
            "esdb-circuit-dot": true,
            hover: this.state.hover,
            placeholder: this.props.placeholder
        });

        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement("circle", { className: c, key: "line-begin",
                cx: x, cy: y, r: this.props.endPointRadius })
        );
    },

    renderLine: function renderLine(type, b, e, dx, dy, y) {
        var typeClass = undefined;

        // Mapping circuit_type ids to classes
        if (type === 1) {
            typeClass = "esnet-optical";
        } else if (type === 2) {
            typeClass = "leased-circuit";
        } else if (type === 3) {
            typeClass = "dark-fiber";
        } else if (type === 4) {
            typeClass = "equipment-equipment";
        } else if (type === 5) {
            typeClass = "cross-connect";
        }

        // Classes
        var ClassSet = _classnames2["default"];

        var cc = { "esdb-circuit-edge": true,
            hover: this.props.placeholder ? false : this.state.hover,
            placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        var edge = ClassSet(cc);
        var hit = ClassSet({
            "esdb-circuit-hitstroke": true,
            inactive: this.props.noNavigate
        });

        var pts = [];
        pts.push(_util2["default"].format("%d,%d", b, y));
        pts.push(_util2["default"].format("%d,%d", e, y));
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
    },

    render: function render() {
        var type = undefined;
        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];
        }
        var dy = this.props.offset * this.props.scale;
        var dx = this.props.scale * 2;
        var begin = this.props.begin;
        var end = this.props.end;
        var y = this.props.yOffset;
        var middle = begin + (end - begin) / 2;

        var label = this.props.circuit ? this.props.circuit["circuit_id"] : "";

        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];
            return _react2["default"].createElement(
                "g",
                null,
                this.renderLine(type, begin, end, dx, dy, y),
                this.renderEndpoints(this.props.endpointX, y),
                this.renderEndpoints(this.props.endpointX2, y),
                this.renderLabel(label, middle, y)
            );
        } else {
            return _react2["default"].createElement("g", null);
        }
    }
});
module.exports = exports["default"];