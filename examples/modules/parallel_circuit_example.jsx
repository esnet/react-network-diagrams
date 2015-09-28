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
import _ from "underscore";
import Markdown from "react-markdown-el";
import ParallelCircuit from "../../src/circuit-diagram-parallel";
import circuit from "../data/parallel_circuit.json";

export default React.createClass({

    getInitialState() {
        return {
            "circuitTypes": {
                "1": "ESnet Optical",
                "2": "Leased Circuit",
                "3": "Dark Fiber",
                "4": "Equipment-Equipment",
                "5": "Cross-Connect",
                "7": "Backplane Mate",
            },
            "couplerTypes": {
                "6": "Panel Coupler",
            },
            "endpointTypes": {
                "1": "Patch Panel",
                "2": "Equipment Port",
                "3": "Foreign"
            },
        };
    },

    render() {

        let d = false;
        let groupedByCircuitId = null;
        let h = false;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Parallel Circuit Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <ParallelCircuit circuit={circuit}
                                         parentId={groupedByCircuitId}
                                         branches={circuit.group_members}
                                         disabled={d}
                                         hideTitle={h}
                                         circuitTypes={this.state.circuitTypes}
                                         couplerTypes={this.state.couplerTypes}
                                         endpointTypes={this.state.endpointTypes}/>
                    </div>
                </div>
            </div>
        );
    }
});
