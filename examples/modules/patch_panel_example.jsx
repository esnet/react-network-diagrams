/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Markdown from "react-markdown";
import APIDocs from "./docs";
import LocationPanelDiagram from "../../src/circuit-diagram-patchpanel";
import Resizable from "../../src/resizable";
import {stylesMap} from "../styles/styles.js";

const text = require("raw!../markdown/patch-panel.md");


const circuitTypeProperties = {
    optical: {
        style: stylesMap.optical,
        lineShape: "linear"
    },
    leased: {
        style: stylesMap.leased,
        lineShape: "linear"
    },
    darkFiber: {
        style: stylesMap.darkFiber,
        lineShape: "linear"
    },
    equipmentToEquipment: {
        style: stylesMap.equipmentToEquipment,
        lineShape: "linear"
    },
    crossConnect: {
        style: stylesMap.crossConnect,
        lineShape: "linear"
    },
    panelCoupler: {
        style: stylesMap.panelCoupler,
        lineShape: "square",
        size: 60,
        squareWidth: 90
    }
};

const panels = [
    {
        panelName: "Panel 1",
        modules: [
            [  // 1st Module
                { // 0
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1"
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2-SC",
                        navTo: "Coupler 1/2"
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3"
                    },
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                },
                { // 1
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4-SC",
                        navTo: "Coupler 3/4"
                    },
                    backCircuit: null,
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                }
            ]
        ]
    },
    {
        panelName: "Panel 2",
        modules: [
            [  // 1st Module
                { // 0
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1"
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2-SC",
                        navTo: "Coupler 1/2"
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3"
                    },
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z With a really long label"
                },
                { // 1
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4-SC",
                        navTo: "Coupler 3/4"
                    },
                    backCircuit: null,
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                },
                { // 2
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.optical,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1"
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "5/6-SC",
                        navTo: "Coupler 5/6"
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.darkFiber,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3"
                    },
                    frontLabel: "Endpoint A With a really long label",
                    backLabel: "Endpoint Z"
                }
            ],
            [   // 2nd Module
                {
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1"
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2-LC",
                        navTo: "Coupler 1/2"
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3"

                    },
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                },
                {
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1"
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4-LC",
                        navTo: "Coupler 3/4"
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.darkFiber,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3"
                    },
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                },
                {
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "5/6-LC",
                        navTo: "Coupler 5/6"
                    },
                    backCircuit: null,
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z"
                }
            ]
        ]
    }
];

/*

*/

export default React.createClass({

    getInitialState() {
        return {
            yOffset: 50,
            moduleSpacing: 15,
            panelWidth: 30,
            panelSpacing: 40,
            couplerSpacing: 3
        };
    },

    _onSelectionChange(e,val) {
        const message = `You clicked connection ${e} with name ${val}`;
        window.alert(message);
    },

    render() {
        // determine the total numbers of couplers, panels and modules across all panels
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Patch Panel Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <LocationPanelDiagram
                                panels={panels}
                                panelStyle={stylesMap.panel}
                                couplerStyle={circuitTypeProperties.panelCoupler}
                                yOffset={this.state.yOffset}
                                moduleSpacing={this.state.moduleSpacing}
                                panelSpacing={this.state.panelSpacing}
                                couplerSpacing={this.state.couplerSpacing}
                                panelWidth={this.state.panelWidth}
                                onSelectionChange={this._onSelectionChange}
                                endpointLabelOffset={18} />
                        </Resizable>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <Markdown source={text} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <APIDocs file="src/circuit-diagram-patchpanel.jsx"/>
                    </div>
                </div>
            </div>
        );
    }
});
