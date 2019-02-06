/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import _ from "underscore";
import { ParallelCircuit, Resizable, MultipointCircuit, CircuitContainer } from "react-network-diagrams";
import { stylesMap } from "../../styles/styles.js";

import combined_docs from "./combined_docs.md";

const bendOffset = 20
const position = -40

const concatList = [
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "linear"
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 1`,
        endpointLabelZ: `Endpoint 2`,
        circuitLabel: `Segment 1`,
        navTo: `Segment 1`,
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "linear"
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 2`,
        endpointLabelZ: `Endpoint 3`,
        circuitLabel: `Segment 2`,
        navTo: `Segment 2`,
    }
]

const parallelList = [
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "linear"
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 1`,
        endpointLabelZ: `Endpoint 2`,
        circuitLabel: `Segment 5`,
        navTo: `Segment 5`
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "linear"
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 1`,
        endpointLabelZ: `Endpoint 2`,
        circuitLabel: `Segment 6`,
        navTo: `Segment 6`
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "linear"
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 1`,
        endpointLabelZ: `Endpoint 2`,
        circuitLabel: `Segment 7`,
        navTo: `Segment 7`
    }
]

const multipointList = [
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "angled",
            position: position,
            bendOffset: bendOffset -10

        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 2`,
        endpointLabelZ: `Endpoint 3`,
        circuitLabel: `Segment 1`,
        navTo: `Segment 1`,
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "angled",
            position: position - 15,
            bendOffset: bendOffset
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 2`,
        endpointLabelZ: `Endpoint 4`,
        circuitLabel: `Segment 2`,
        navTo: `Segment 2`,
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "angled",
            position: position - 15,
            bendOffset: bendOffset
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 2`,
        endpointLabelZ: `Endpoint 5`,
        circuitLabel: `Segment 3`,
        navTo: `Segment 3`,
    },
    {
        styleProperties: {
            style: stylesMap.crossConnect,
            lineShape: "angled",
            position: position,
            bendOffset: bendOffset -10
        },
        endpointStyle: stylesMap.endpoint,
        endpointLabelA: `Endpoint 2`,
        endpointLabelZ: `Endpoint 6`,
        circuitLabel: `Segment 4`,
        navTo: `Segment 4`,
    }
]



class combined extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circuits: [
                "crossConnect",
                "coupler",
                "optical",
                "none",
                "none"
            ],
            disabled: false,
            hideTitle: false
        };

        this.handleDisabledChange = this.handleDisabledChange.bind(this);
        this.handleHideTitleChange = this.handleHideTitleChange.bind(this);
        
    }
    
    handleSelectionChange(e,l) {
        const message = `You clicked connection ${e} with name ${l}`;
        window.alert(message);
    }

    handleDisabledChange() {
        this.setState({
            disabled: this.state.disabled ? false : true
        });
    }

    handleHideTitleChange() {
        this.setState({
            hideTitle: this.state.hideTitle ? false : true
        });
    }

    
    render() {
        const width = 851
        const combinedList = [
            {
                type: "parallel",
                values: parallelList,
                hideTitle: this.state.hideTitle,
                title:"Parallel Circuit",
                disabled: this.state.disabled,
                handleSelectionChange: this.state.handleSelectionChange,
                endpointStyle: stylesMap.endpoint,

                endpointLabelOffset: 18,
                endpointLabelA: "Endpoint 1",
                endpointLabelZ: "Endpoint 2",
                parentId: "Test Navigation"
            },
            {
                type: "multipoint",
                values: multipointList,
                hideTitle: this.state.hideTitle,
                title:"Multipoint Circuit",
                disabled: this.state.disabled,
                handleSelectionChange: this.state.handleSelectionChange,
                endpointStyle: stylesMap.endpoint,
                endpointLabelOffset: 18,
                parentId: "Test Navigation"
            }
        ]
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                       <Resizable>
                            <ParallelCircuit
                                hideTitle={this.state.hideTitle}
                                memberList={parallelList}
                                disabled={this.state.disabled}
                                title="Example Parallel Circuit"
                                onSelectionChange={this.handleSelectionChange}
                                endpointLabelA="Endpoint 1"
                                endpointLabelZ="Endpoint 2"
                                endpointStyle={stylesMap.endpoint}
                                endpointLabelOffset={18}
                                parentId="Test Navigation" />
                        </Resizable>
                        <Resizable>
                            <MultipointCircuit
                                hideTitle={this.state.hideTitle}
                                memberList={multipointList}
                                disabled={this.state.disabled}
                                title="Example Multipoint Circuit"
                                onSelectionChange={this.handleSelectionChange}
                                endpointStyle={stylesMap.endpoint}
                                endpointLabelOffset={18}
                                height={600}
                                parentId="Test Navigation" />
                        </Resizable>
                        <Resizable>
                            <CircuitContainer
                                title="Example Circuit Container"
                                combinedList={combinedList}
                                spread={60}
                                height={1000}
                            />
                        </Resizable>
                    </div>
                </div>
            </div>
        );
    }
};

export default {combined, combined_docs};
