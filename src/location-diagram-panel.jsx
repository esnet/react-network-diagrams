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

import React from "react";
import _ from "underscore";
import util from "util";
import AttachedCircuits from "./location-diagram-connection.jsx";
import AttachedEndpoint from "./location-diagram-endpoint.jsx";
import classnames from "classnames";

let PANEL_WIDTH = 851;
let COUPLER_HEIGHT = 60;
let COUPLER_WIDTH = 90;

function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

export default React.createClass({

    getInitialState() {
        return { hover: false };
    },

    getDefaultProps() {
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


    renderPanelLabel(yStart, label) {
        let y = yStart - (this.props.yOffset / 2);
        let x = (PANEL_WIDTH / 2);
        return (
            <g>
                <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fontSize: "14",fill: "#737373"}}>
                    {label}
                </text>
            </g>
        );
    },

    renderFrontBackLabel(yStart) {
        let x = (PANEL_WIDTH / 2);
        let xLeft = x - COUPLER_WIDTH + (COUPLER_WIDTH / 4);
        let xRight = x + COUPLER_WIDTH - (COUPLER_WIDTH / 4);
        let yDown = yStart;
        let front = "FRONT";
        let back = "BACK";
        return (
            <g>
                <text className="esdb-circuit-label" key="panel-front" x={xLeft} y={yDown}>
                    {front}
                </text>
                <text className="esdb-circuit-label" key="panel-back" x={xRight} y={yDown}>
                    {back}
                </text>
            </g>
        );
    },

    renderCouplerLabel(label, x, y) {
        if (label.split("-").length > 2) {
            let nLabel = label.split("-");
            if (isLetter(nLabel[0])) {
                return (
                    <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill: "#737373"}}>
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
                    <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill: "#737373"}}>
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
        _.each(panel, c => {
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


    render() {

        /* We need to group all the couplers into panels, and determine how many panels
        exist to properly size the SVG window
        */

        let panels = _.groupBy(this.props.couplers, c => {return c.panel; });
        let numPanels = _.size(panels);

        /* Panels may have submodules, which are built into the coupler name, and are allways in the 0th
        index of the name string preceding a '-'.  Modules should never start with an integer, so a parseInt of the 0th value
        of the couplerName string should return NaN if there is a module.  If no module is found, return the
        panel name to create one giant group which will be treated as a single module
        */

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

            let sortedSubModules = _.map(subModules, subModule => {
                return _.sortBy(subModule, c => {
                    return parseInt(c["couplerName"].split("/")[1], 10);
                });
            });

            /* We are spacing the modules apart so we need to take into account any panels that have multiple
            modules so we can add this value to the dynamic sizing
            */
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
        return (
                <svg className="esdb-circuit-container" width="100%" viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderPatchPanels(sortedPanels)}
                </svg>
        );
    }
});
