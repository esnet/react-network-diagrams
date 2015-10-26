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

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _locationDiagramConnectionJsx = require("./location-diagram-connection.jsx");

var _locationDiagramConnectionJsx2 = _interopRequireDefault(_locationDiagramConnectionJsx);

var _locationDiagramEndpointJsx = require("./location-diagram-endpoint.jsx");

var _locationDiagramEndpointJsx2 = _interopRequireDefault(_locationDiagramEndpointJsx);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var PANEL_WIDTH = 851;
var COUPLER_HEIGHT = 60;
var COUPLER_WIDTH = 90;

function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

exports["default"] = _react2["default"].createClass({
    displayName: "location-diagram-panel",

    getInitialState: function getInitialState() {
        return { hover: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            titleOffsetX: 10,
            titleOffsetY: 20,
            yOffset: 30,
            scale: 25,
            margin: 150,
            moduleSpacing: 5
        };
    },

    renderPanelLabel: function renderPanelLabel(yStart, label) {
        var y = yStart - this.props.yOffset / 2;
        var x = PANEL_WIDTH / 2;
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "panel-label", x: x, y: y, style: { fontSize: "14", fill: "#737373" } },
                label
            )
        );
    },

    renderFrontBackLabel: function renderFrontBackLabel(yStart) {
        var x = PANEL_WIDTH / 2;
        var xLeft = x - COUPLER_WIDTH + COUPLER_WIDTH / 4;
        var xRight = x + COUPLER_WIDTH - COUPLER_WIDTH / 4;
        var yDown = yStart;
        var front = "FRONT";
        var back = "BACK";
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "panel-front", x: xLeft, y: yDown },
                front
            ),
            _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "panel-back", x: xRight, y: yDown },
                back
            )
        );
    },

    renderCouplerLabel: function renderCouplerLabel(label, x, y) {
        if (label.split("-").length > 2) {
            var nLabel = label.split("-");
            if (isLetter(nLabel[0])) {
                return _react2["default"].createElement(
                    "text",
                    { className: "esdb-circuit-label", key: "panel-label", x: x, y: y, style: { fill: "#737373" } },
                    label
                );
            } else {
                var pLabel = nLabel[0];
                nLabel.shift();
                var cLabel = nLabel.join("-");
                var moduleY = y - 7;
                var portY = y + 7;
                return _react2["default"].createElement(
                    "text",
                    { className: "esdb-circuit-label", key: "panel-label", x: x, y: y, style: { fill: "#737373" } },
                    _react2["default"].createElement(
                        "tspan",
                        { x: x, y: moduleY },
                        pLabel
                    ),
                    _react2["default"].createElement(
                        "tspan",
                        { x: x, y: portY },
                        cLabel
                    )
                );
            }
        } else {
            return _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label", key: "panel-label", x: x, y: y, style: { fill: "#737373" } },
                label
            );
        }
    },

    renderPatchPanels: function renderPatchPanels(panels) {
        var _this = this;

        var yStart = this.props.yOffset;
        var panelDiagrams = [];
        _underscore2["default"].each(panels, function (modules, panelLabel) {
            if (modules.length > 1) {
                // draw the first module
                var couplerCount = modules[0].length;
                panelDiagrams.push(_this.renderFrontBackLabel(yStart));
                panelDiagrams.push(_this.renderPatchPanel(yStart, modules[0], panelLabel));
                yStart = yStart + COUPLER_HEIGHT * couplerCount + _this.props.moduleSpacing;
                // draw the rest of the modules
                _underscore2["default"].each(modules, function (module, index) {
                    if (index > 0) {
                        var cCount = module.length;
                        var blankLabel = "";
                        panelDiagrams.push(_this.renderPatchPanel(yStart, module, blankLabel));
                        if (index === modules.length - 1) {
                            yStart = yStart + COUPLER_HEIGHT * cCount + _this.props.yOffset * 2;
                        } else {
                            yStart = yStart + COUPLER_HEIGHT * cCount + _this.props.moduleSpacing;
                        }
                    }
                });
            } else {
                _underscore2["default"].each(modules, function (module) {
                    var couplerCount = module.length;
                    panelDiagrams.push(_this.renderFrontBackLabel(yStart));
                    panelDiagrams.push(_this.renderPatchPanel(yStart, module, panelLabel));
                    yStart = yStart + COUPLER_HEIGHT * couplerCount + _this.props.yOffset * 2;
                });
            }
        });
        return { panelDiagrams: panelDiagrams };
    },

    renderPatchPanel: function renderPatchPanel(yStart, panel, label) {
        var typeClass = "panel";
        var ClassSet = _classnames2["default"];

        var cc = { "esdb-circuit-edge": true,
            hover: this.props.placeholder ? false : this.state.hover,
            placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }
        var coupler = ClassSet(cc);
        var height = panel.length * COUPLER_HEIGHT;
        var b = PANEL_WIDTH / 2 - COUPLER_WIDTH / 2;
        var e = PANEL_WIDTH / 2 + COUPLER_WIDTH / 2;
        var y = yStart;
        var rectLength = COUPLER_WIDTH;
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement("rect", { width: rectLength, x: b, y: y, height: height, rx: 2, ry: 2, style: { fill: "#E8E8E8" } }),
            this.renderCouplerLine(y, panel, b, e),
            _react2["default"].createElement("rect", { className: coupler, width: rectLength, x: b, y: y, height: height, rx: 2, ry: 2 }),
            this.renderPanelLabel(y, label),
            this.renderCoupler(y, panel, b, e)
        );
    },

    renderCouplerLine: function renderCouplerLine(yStart, panel, b, e) {
        var typeClass = "panel-delimiter";
        var ClassSet = _classnames2["default"];

        var cc = { "esdb-circuit-edge": true,
            hover: this.props.placeholder ? false : this.state.hover,
            placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }
        var coupler = ClassSet(cc);

        var Pos = yStart + COUPLER_HEIGHT;
        var elements = [];
        _underscore2["default"].each(panel, function () {
            var lpts = [];
            lpts.push(_util2["default"].format("%d,%d", b, Pos));
            lpts.push(_util2["default"].format("%d,%d", e, Pos));
            var lpoints = lpts.join(" ");
            elements.push(_react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement("polyline", { className: coupler, points: lpoints })
            ));
            Pos += COUPLER_HEIGHT;
        });
        return elements;
    },

    renderCoupler: function renderCoupler(yStart, panel, b, e) {
        var _this2 = this;

        var typeClass = "coupler";
        var ClassSet = _classnames2["default"];

        var cc = { "esdb-circuit-edge": true,
            hover: this.props.placeholder ? false : this.state.hover,
            placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        var coupler = ClassSet(cc);

        var Pos = yStart + COUPLER_HEIGHT;
        var elements = [];
        _underscore2["default"].each(panel, function (c) {
            var fb = b - COUPLER_WIDTH / 10;
            var bb = e - COUPLER_WIDTH / 10;
            var y = Pos - COUPLER_HEIGHT / 2 - COUPLER_HEIGHT / 4;
            var rectLength = COUPLER_WIDTH / 5;
            var height = COUPLER_HEIGHT / 2;
            var ly = Pos - COUPLER_HEIGHT / 2;
            var lx = PANEL_WIDTH / 2;
            var lb = e + COUPLER_WIDTH / 10;

            var xbegin = _this2.props.margin;
            var xend = PANEL_WIDTH - _this2.props.margin;

            elements.push(_react2["default"].createElement(
                "g",
                null,
                _this2.renderEndpoint(c.couplerFrontCircuit, xbegin, ly, c.frontLabel),
                _this2.renderEndpoint(c.couplerFrontCircuit, fb, ly, null),
                _this2.renderEndpoint(c.couplerBackCircuit, lb, ly, null),
                _this2.renderEndpoint(c.couplerBackCircuit, xend, ly, c.backLabel),
                _react2["default"].createElement("rect", { className: coupler, width: rectLength,
                    x: fb, y: y, height: height, rx: 2, ry: 2,
                    style: { fill: "#F8F8F8" } }),
                _react2["default"].createElement("rect", { className: coupler, width: rectLength,
                    x: bb, y: y, height: height, rx: 2, ry: 2,
                    style: { fill: "#F8F8F8" } }),
                _this2.renderCircuit(c.couplerFrontCircuit, xbegin, fb, ly, xbegin, fb),
                _this2.renderCircuit(c.couplerBackCircuit, lb, xend, ly, xend, lb),
                _this2.renderCouplerLabel(c.couplerName, lx, ly)
            ));
            Pos += COUPLER_HEIGHT;
        });
        return elements;
    },

    renderCircuit: function renderCircuit(coupler, b, e, y, ex, ex2) {
        return _react2["default"].createElement(_locationDiagramConnectionJsx2["default"], { circuit: coupler,
            begin: b,
            end: e,
            yOffset: y,
            endpointX: ex,
            endpointX2: ex2 });
    },

    renderEndpoint: function renderEndpoint(coupler, b, y, label) {
        return _react2["default"].createElement(_locationDiagramEndpointJsx2["default"], { circuit: coupler,
            begin: b,
            yOffset: y,
            label: label });
    },

    render: function render() {
        var _this3 = this;

        /* We need to group all the couplers into panels, and determine how many panels
        exist to properly size the SVG window
        */

        var panels = _underscore2["default"].groupBy(this.props.couplers, function (c) {
            return c.panel;
        });
        var numPanels = _underscore2["default"].size(panels);

        /* Panels may have submodules, which are built into the coupler name, and are allways in the 0th
        index of the name string preceding a '-'.  Modules should never start with an integer, so a parseInt of the 0th value
        of the couplerName string should return NaN if there is a module.  If no module is found, return the
        panel name to create one giant group which will be treated as a single module
        */

        var moduleOffset = 0;
        var sortedPanels = {};
        _underscore2["default"].each(panels, function (panel, name) {
            // We assume submodule names are a string with no hyphenation, and not a single number
            var subModules = _underscore2["default"].groupBy(panel, function (c) {
                if (isNaN(c["couplerName"].split("-")[0]) && c["couplerName"].split("-").length > 2) {
                    return c["couplerName"].split("-")[0];
                } else {
                    return c["panel"];
                }
            });

            /* The couplers in each module may be unordered depending on when they were created.  These
            need to be sorted incrementally by their port number which is safely after the first "/" in the
            panel name
            */

            var sortedSubModules = _underscore2["default"].map(subModules, function (subModule) {
                return _underscore2["default"].sortBy(subModule, function (c) {
                    return parseInt(c["couplerName"].split("/")[1], 10);
                });
            });

            /* We are spacing the modules apart so we need to take into account any panels that have multiple
            modules so we can add this value to the dynamic sizing
            */
            if (sortedSubModules.length > 1) {
                moduleOffset += (sortedSubModules.length - 1) * _this3.props.moduleSpacing;
            }

            sortedPanels[name] = sortedSubModules;
        });
        // determine the viewbox height
        var heightFromCouplers = this.props.couplers.length * COUPLER_HEIGHT;
        var offsetTotal = (numPanels - 1) * (this.props.yOffset * 2);
        var topAndBottomOffset = this.props.yOffset * 2;

        var viewBoxHeight = heightFromCouplers + offsetTotal + moduleOffset + topAndBottomOffset;
        var viewBox = "0 0 " + PANEL_WIDTH + " " + viewBoxHeight;
        return _react2["default"].createElement(
            "svg",
            { className: "esdb-circuit-container", width: "100%", viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
            this.renderPatchPanels(sortedPanels)
        );
    }
});
module.exports = exports["default"];