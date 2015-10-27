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

// import Connection from "./circuit-diagram-connection.jsx";
// import Endpoint from "./circuit-diagram-endpoint.jsx";
// import Label from "./edge-label.jsx";

exports["default"] = _react2["default"].createClass({
    displayName: "location-diagram-panel",

    getInitialState: function getInitialState() {
        return { hover: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            width: 851,
            disabled: false,
            titleOffsetX: 10,
            titleOffsetY: 20,
            yOffset: 30,
            scale: 25,
            margin: 150,
            moduleSpacing: 5,
            panelSpacing: 20
        };
    },

    _renderPanelLabel: function _renderPanelLabel(yStart, label) {
        var y = yStart - this.props.yOffset / 2;
        var x = this.props.width / 2;
        return _react2["default"].createElement(
            "g",
            null,
            _react2["default"].createElement(
                "text",
                { className: "esdb-circuit-label",
                    key: "panel-label", x: x, y: y,
                    style: { fontSize: "14", fill: "#737373" } },
                label
            )
        );
    },

    _renderFrontBackLabel: function _renderFrontBackLabel(yStart) {
        var x = this.props.width / 2;
        var xLeft = x - this.props.width + this.props.width / 4;
        var xRight = x + this.props.width - this.props.width / 4;
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

    _renderPanels: function _renderPanels(panelMap) {
        var _this = this;

        var elements = [];
        var panelWidthOffset = 20;
        var panelStyle = {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#E8E8E8"
        };

        var midpt = this.props.width / 2;
        var panelX = midpt - (this.props.couplerStyle.squareWidth / 2 - panelWidthOffset);
        var width = this.props.couplerStyle + panelWidthOffset * 2;
        // set the start of the panel at the offset from the top

        var panelY = this.props.yOffset;

        _underscore2["default"].each(this.props.panels, function (panel) {
            elements.push(_react2["default"].createElement(
                "g",
                null,
                _react2["default"].createElement("rect", {
                    className: "panel",
                    width: width,
                    height: panelMap[panel.panelName],
                    key: panel.panelName,
                    style: panelStyle,
                    x: panelX,
                    y: panelY,
                    rx: 2,
                    ry: 2 })
            ));
            // set the start of the module group at the spacing below the panel start
            // at the middle of the coupler group
            var moduleY = panelY + _this.props.moduleSpacing + _this.props.couplerStyle.size / 2;
            _underscore2["default"].each(panel.modules, function (module) {
                elements.push(_this._renderModule(module, moduleY));
                // after each module is finished, space the next module start at the middle
                // of the first coupler group, offset by the module spacing
                moduleY += _this.props.moduleSpacing + module.length * _this.props.couplerStyle.size;
            });
            // once all panel modules are done, start the next module at the next panel
            // using the spacing derived from the svg box height
            panelY += _this.props.panelSpacing + panelMap[panel.panelName];
        });
        return _react2["default"].createElement(
            "g",
            null,
            elements
        );
    },

    _renderModule: function _renderModule(module, moduleY) {
        var _this2 = this;

        // moduleY is y1, y2 of the first circuitGroup in the module

        var elements = [];
        var y = moduleY;
        _underscore2["default"].each(module, function (circuitGroup) {
            elements.push(_this2._renderEndpoints(circuitGroup, y));
            elements.push(_this2._renderConnection(circuitGroup, y));
            y += _this2.props.couplerStyle.size;
        });
        return _react2["default"].createElement(
            "g",
            null,
            elements
        );
    },

    _renderEndpoints: function _renderEndpoints(circuitGroup, y) {
        var elements = [];
        var side = "front";
        elements.push(this._renderCircuitEndpoints(circuitGroup.frontCircuit, y, side));
        side = "back";
        elements.push(this._renderCircuitEndpoints(circuitGroup.backCircuit, y, side));
        return elements;
    },

    _renderCircuitEndpoints: function _renderCircuitEndpoints() /* circuit, label, y */{},
    /*
     return (
        <g>
            <Endpoint x=
                      y=
                      key=
                      style={this.props.style.node}
                      labelStyle=
                      labelPosition={this.props.labelPosition}
                      label={this.props.label}
                      radius={this.props.radius}
                      offset={this.props.offset}
                      shape={this.props.shape}
                      muted={this.props.muted}
                      selected={this.props.selected}
                      highlighted={this.props.highlighted} />
        </g>
    }
    */

    render: function render() {
        var _this3 = this;

        // Styling
        var classed = "panel-container";
        var circuitContainer = {
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#EFEFEF",
            width: "100%",
            height: this.props.height
        };

        var numPanels = 0;
        var viewBoxHeight = 0;
        var yOffset = this.props.yOffset;
        var moduleSpacing = this.props.moduleSpacing;
        var panelSpacing = this.props.panelSpacing;
        var panelMap = {};

        // Calculate the height for each panel and store this in a mapping by panel name

        _underscore2["default"].each(this.props.panels, function (panel) {
            numPanels += 1;
            var moduleCount = panel.modules.length;
            var couplerCount = 0;
            _underscore2["default"].each(panel.modules, function (module) {
                couplerCount = module.length; // 6
            });
            var panelHeight = couplerCount * _this3.props.couplerStyle.size + (moduleCount + 1) * moduleSpacing;
            viewBoxHeight += panelHeight;
            panelMap[panel.panelName] = panelHeight;
        });

        // dynamic viewBoxHeight
        viewBoxHeight += yOffset * 2 + (numPanels - 1) * panelSpacing;
        var viewBox = "0 0 " + this.props.width + " " + viewBoxHeight;

        // Draw in order - Panel Rectangles, Circuit Endpoints, Circuit Connections
        return _react2["default"].createElement(
            "svg",
            { className: classed, style: circuitContainer, onClick: this._deselect },
            _react2["default"].createElement(
                "svg",
                { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                this._renderPanels(panelMap)
            )
        );
    }
});

/*

function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

renderCouplerLabel(label, x, y) {
        if (label.split("-").length > 2) {
            let nLabel = label.split("-");
            if (isLetter(nLabel[0])) {
                return (
                    <text className="esdb-circuit-label"
                          key="panel-label" x={x} y={y}
                          style={{fill: "#737373"}}>
                        {label}
                    </text>
                );
            } else {
                let pLabel = nLabel[0];
                nLabel.shift();
                let cLabel = nLabel.join("-");
                let moduleY = y - 7;
                let portY = y + 7;
                return (
                    <text className="esdb-circuit-label"
                          key="panel-label" x={x} y={y}
                          style={{fill: "#737373"}}>
                        <tspan x={x} y={moduleY}>{pLabel}</tspan>
                        <tspan x={x} y={portY}>{cLabel}</tspan>
                    </text>
                );
            }
        } else {
            return (
                <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill: "#737373"}}>
                    {label}
                </text>
            );
        }
    },

    renderPatchPanels(panels) {
        let yStart = this.props.yOffset;
        let panelDiagrams = [];
        _.each(panels, (modules, panelLabel) => {
            if (modules.length > 1) {
                // draw the first module
                let couplerCount = modules[0].length;
                panelDiagrams.push(this.renderFrontBackLabel(yStart));
                panelDiagrams.push(this.renderPatchPanel(yStart, modules[0], panelLabel));
                yStart = yStart + (COUPLER_HEIGHT * couplerCount) + (this.props.moduleSpacing);
                // draw the rest of the modules
                _.each(modules, (module, index) => {
                    if (index > 0) {
                        let cCount = module.length;
                        let blankLabel = "";
                        panelDiagrams.push(this.renderPatchPanel(yStart, module, blankLabel));
                        if (index === (modules.length - 1)) {
                            yStart = yStart + (COUPLER_HEIGHT * cCount) + (this.props.yOffset * 2);
                        } else {
                            yStart = yStart + (COUPLER_HEIGHT * cCount) + (this.props.moduleSpacing);
                        }
                    }
                });
            } else {
                _.each(modules, module => {
                    let couplerCount = module.length;
                    panelDiagrams.push(this.renderFrontBackLabel(yStart));
                    panelDiagrams.push(this.renderPatchPanel(yStart, module, panelLabel));
                    yStart = yStart + (COUPLER_HEIGHT * couplerCount) + (this.props.yOffset * 2);
                });
            }
        });
        return (
            {panelDiagrams}
        );
    },

    renderPatchPanel(yStart, panel, label) {
        let typeClass = "panel";
        let ClassSet = classnames;

        let cc = {"esdb-circuit-edge": true,
                  hover: this.props.placeholder ? false : this.state.hover,
                  placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }
        let coupler = ClassSet(cc);
        let height = panel.length * COUPLER_HEIGHT;
        let b = (PANEL_WIDTH / 2) - (COUPLER_WIDTH / 2);
        let e = (PANEL_WIDTH / 2) + (COUPLER_WIDTH / 2);
        let y = yStart;
        let rectLength = COUPLER_WIDTH;
        return (
            <g>
                <rect width={rectLength} x={b} y={y} height={height} rx={2} ry={2} style={{fill: "#E8E8E8"}}/>
                {this.renderCouplerLine(y, panel, b, e)}
                <rect className={coupler} width={rectLength} x={b} y={y} height={height} rx={2} ry={2}/>
                {this.renderPanelLabel(y, label)}
                {this.renderCoupler(y, panel, b, e)}
            </g>
        );
    },

    renderCouplerLine(yStart, panel, b, e) {
        let typeClass = "panel-delimiter";
        let ClassSet = classnames;

        let cc = {"esdb-circuit-edge": true,
                  hover: this.props.placeholder ? false : this.state.hover,
                  placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }
        let coupler = ClassSet(cc);

        let Pos = yStart + COUPLER_HEIGHT;
        let elements = [];
        _.each(panel, () => {
            let lpts = [];
            lpts.push(util.format("%d,%d", b, Pos));
            lpts.push(util.format("%d,%d", e, Pos));
            let lpoints = lpts.join(" ");
            elements.push(
                <g>
                    <polyline className={coupler} points={lpoints}/>
                </g>
            );
            Pos += COUPLER_HEIGHT;
        });
        return elements;
    },

    renderCoupler(yStart, panel, b, e) {
        let typeClass = "coupler";
        let ClassSet = classnames;

        let cc = {"esdb-circuit-edge": true,
                  hover: this.props.placeholder ? false : this.state.hover,
                  placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        let coupler = ClassSet(cc);

        let Pos = yStart + COUPLER_HEIGHT;
        let elements = [];
        _.each(panel, c => {
            let fb = b - (COUPLER_WIDTH / 10);
            let bb = e - (COUPLER_WIDTH / 10);
            let y = Pos - (COUPLER_HEIGHT / 2) - (COUPLER_HEIGHT / 4);
            let rectLength = COUPLER_WIDTH / 5;
            let height = COUPLER_HEIGHT / 2;
            let ly = Pos - (COUPLER_HEIGHT / 2);
            let lx = PANEL_WIDTH / 2;
            let lb = e + (COUPLER_WIDTH / 10);

            let xbegin = this.props.margin;
            let xend = PANEL_WIDTH - this.props.margin;

            elements.push(
                <g>
                    {this.renderEndpoint(c.couplerFrontCircuit, xbegin, ly, c.frontLabel)}
                    {this.renderEndpoint(c.couplerFrontCircuit, fb, ly, null)}
                    {this.renderEndpoint(c.couplerBackCircuit, lb, ly, null)}
                    {this.renderEndpoint(c.couplerBackCircuit, xend, ly, c.backLabel)}
                    <rect className={coupler} width={rectLength}
                                              x={fb} y={y} height={height} rx={2} ry={2}
                                              style={{fill: "#F8F8F8"}}/>
                    <rect className={coupler} width={rectLength}
                                              x={bb} y={y} height={height} rx={2} ry={2}
                                              style={{fill: "#F8F8F8"}}/>
                    {this.renderCircuit(c.couplerFrontCircuit, xbegin, fb, ly, xbegin, fb)}
                    {this.renderCircuit(c.couplerBackCircuit, lb, xend, ly, xend, lb)}
                    {this.renderCouplerLabel(c.couplerName, lx, ly)}
                </g>
            );
            Pos += COUPLER_HEIGHT;
        });
        return elements;
    },

    renderCircuit(coupler, b, e, y, ex, ex2) {
        return (
            <AttachedCircuits circuit={coupler}
                              begin={b}
                              end={e}
                              yOffset={y}
                              endpointX={ex}
                              endpointX2={ex2}/>
        );
    },

    renderEndpoint(coupler, b, y, label) {
        return (
            <AttachedEndpoint circuit={coupler}
                              begin={b}
                              yOffset={y}
                              label={label}/>
        );
    },
/* We need to group all the couplers into panels, and determine how many panels
exist to properly size the SVG window
*/

/*
let panels = _.groupBy(this.props.couplers, c => {return c.panel; });
let numPanels = _.size(panels);

/* Panels may have submodules, which are built into the coupler name, and are allways in the 0th
index of the name string preceding a '-'.  Modules should never start with an integer,
so a parseInt of the 0th value
of the couplerName string should return NaN if there is a module.  If no module is found, return the
panel name to create one giant group which will be treated as a single module
*/

/*
let moduleOffset = 0;
let sortedPanels = {};
_.each(panels, (panel, name) => {
    // We assume submodule names are a string with no hyphenation, and not a single number
    let subModules = _.groupBy(panel, c => {
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
/*
    let sortedSubModules = _.map(subModules, subModule => {
        return _.sortBy(subModule, c => {
            return parseInt(c["couplerName"].split("/")[1], 10);
        });
    });

    /* We are spacing the modules apart so we need to take into account any panels that have multiple
    modules so we can add this value to the dynamic sizing
    */
/*
    if (sortedSubModules.length > 1) {
        moduleOffset += (sortedSubModules.length - 1) * this.props.moduleSpacing;
    }

    sortedPanels[name] = sortedSubModules;
});
// determine the viewbox height
let heightFromCouplers = this.props.couplers.length * COUPLER_HEIGHT;
let offsetTotal = (numPanels - 1) * (this.props.yOffset * 2);
let topAndBottomOffset = (this.props.yOffset * 2);

let viewBoxHeight = heightFromCouplers + offsetTotal + moduleOffset + topAndBottomOffset;
let viewBox = "0 0 " + PANEL_WIDTH + " " + viewBoxHeight;

console.log(sortedPanels)
*/
module.exports = exports["default"];