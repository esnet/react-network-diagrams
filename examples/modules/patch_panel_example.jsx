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
// import _ from "underscore";
// import Markdown from "react-markdown-el";
import LocationPanelDiagram from "../../src/location-diagram-panel";
import {stylesMap} from "../styles/styles.js";

const circuitTypeProperties = {
    optical: {
        style: stylesMap.optical,
        lineShape: "linear",
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
        squareWidth: 90,
    },
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
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2",
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                    },
                    frontLabel: "Endpoint A",
                    backlabel: "Endpoint Z",
                    couplerName: "1/2",
                },
                { // 1
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4",
                    },
                    backCircuit: null,
                    frontLabel: "Endpoint A",
                    backlabel: "Endpoint Z",
                    couplerName: "1/2",
                },
                { // 2
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.optical,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "5/6",
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.darkFiber,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                    },
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
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2",
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                    },
                },
                {
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4",
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.darkFiber,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                    },
                },
                {
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "5/6",
                    },
                    backCircuit: null,
                }
            ]
        ]
    }
];

/*
<LocationPanelDiagram panels={panels}
      couplerStyle={circuitTypeProperties.panelCoupler}
      yOffset={this.state.yOffset}
      moduleSpacing={this.state.moduleSpacing}
      panelSpacing={this.state.panelSpacing}
      endpointLabelPosition={this.state.endpointLabelPositionChoice}
      connectionLabelPosition={this.state.circuitLabelPositionChoice}
      disabled={this.state.disabled}
      onSelectionChange={this._onSelectionChange}
      endpointLabelOffset={18} />
*/

export default React.createClass({

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
                         Example Forthcoming
                    </div>
                </div>
            </div>
        );
    }
});
