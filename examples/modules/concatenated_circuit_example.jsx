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
import Markdown from "react-markdown";
import APIDocs from "./docs";
import ConcatenatedCircuit from "../../src/circuit-diagram-concatenated";
import Resizable from "../../src/resizable";
import { stylesMap } from "../styles/styles.js";

const text = require("raw!../markdown/concatenated-circuit.md");

const circuitTypeList = [
    "optical",
    "leased",
    "darkFiber",
    "equipmentToEquipment",
    "crossConnect",
    "coupler",
    "backplaneMate",
    "none"
];

const circuitLabelMap = {
    none: "--",
    optical: "Optical",
    leased: "Leased",
    darkFiber: "Dark Fiber",
    equipmentToEquipment: "Equipment-Equipment",
    crossConnect: "Cross-Connect",
    coupler: "Panel Coupler",
    backplaneMate: "Backplane Mate"
};

const labelPositionChoiceList = [
    "top",
    "bottom"
];

const positionLabelMap = {
    top: "Top",
    bottom: "Bottom",
    bottomleftangled: "Bottom (left angled)",
    bottomrightangled: "Bottom (right angled)"
};

const endpointPositionChoiceList = [
    "top",
    "bottom",
    "bottomleftangled",
    "bottomrightangled"
];

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
    coupler: {
        style: stylesMap.coupler,
        lineShape: "square",
        size: 36,
        squareWidth: 25,
        noNavigate: true
    },
    backplaneMate: {
        style: stylesMap.coupler,
        lineShape: "square",
        size: 36,
        squareWidth: 40,
        centerLine: true
    }
};

const Selector = React.createClass({

    handleChange(e) {
        const value = e.target.value;
        this.props.handleChange(value);
    },

    render() {
        const options = _.map(this.props.selectionList, option => {
            const label = this.props.labelMap ? this.props.labelMap[option] : option;
            return (
                <option value={option} key={option}>{label}</option>
            );
        });
        const selected = _.isNull(this.props.selected) ? "none" : this.props.selected;
        return (
            <select ref="menu" value={selected} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
});

export default React.createClass({

    getInitialState() {
        return {
            circuits: [
                "crossConnect",
                "coupler",
                "optical",
                "none",
                "none"
            ],
            circuitLabelPositionChoice: labelPositionChoiceList[0],
            endpointLabelPositionChoice: endpointPositionChoiceList[2],
            disabled: false,
            hideTitle: false
        };
    },

    handleSelectionChange(e,l) {
        const message = `You clicked connection ${e} with name ${l}`;
        window.alert(message);
    },

    handleDisabledChange() {
        this.setState({
            disabled: this.state.disabled ? false : true
        });
    },

    handleHideTitleChange() {
        this.setState({
            hideTitle: this.state.hideTitle ? false : true
        });
    },

    handleSelectCircuitType(index, circuitType) {
        const circuits = this.state.circuits;
        circuits[index] = circuitType;
        this.setState({circuits});
    },

    renderSegmentChoices() {
        return (
            <div>
                <Selector
                    selected={this.state.circuits[0]}
                    selectionList={circuitTypeList}
                    labelMap={circuitLabelMap}
                    handleChange={value => this.handleSelectCircuitType(0, value)} />
                <p>Select the circuit type for segment 1</p>

                <Selector
                    selected={this.state.circuits[1]}
                    selectionList={circuitTypeList}
                    labelMap={circuitLabelMap}
                    handleChange={value => this.handleSelectCircuitType(1, value)} />
                <p>Select the circuit type for segment 2</p>
                
                <Selector
                    selected={this.state.circuits[2]}
                    selectionList={circuitTypeList}
                    labelMap={circuitLabelMap}
                    handleChange={value => this.handleSelectCircuitType(2, value)} />
                <p>Select the circuit type for segment 3</p>
                
                <Selector
                    selected={this.state.circuits[3]}
                    selectionList={circuitTypeList}
                    labelMap={circuitLabelMap}
                    handleChange={value => this.handleSelectCircuitType(3, value)} />
                <p>Select the circuit type for segment 4</p>
                
                <Selector
                    selected={this.state.circuits[4]}
                    selectionList={circuitTypeList}
                    labelMap={circuitLabelMap}
                    handleChange={value => this.handleSelectCircuitType(4, value)} />
                <p>Select the circuit type for segment 5</p>
            </div>
        );
    },

    renderChoices() {
        return (
            <div>
                <Selector
                    selected={this.state.circuitLabelPositionChoice}
                    selectionList={labelPositionChoiceList}
                    labelMap={positionLabelMap}
                    handleChange={
                        circuitLabelPositionChoice => this.setState({circuitLabelPositionChoice})
                    } />
                <p>Select the position of the circuit label</p>

                <Selector
                    selected={this.state.endpointLabelPositionChoice}
                    selectionList={endpointPositionChoiceList}
                    labelMap={positionLabelMap}
                    handleChange={
                        endpointLabelPositionChoice => this.setState({endpointLabelPositionChoice})
                    } />
                <p>Select the position of the endpoint labels</p>

                <input
                    type="checkbox"
                    name="disable"
                    value={this.state.disabled}
                    onChange={this.handleDisabledChange} /> Disable
                <p>Select whether to render the circuit as disabled</p>

                <input
                    type="checkbox"
                    name="disable"
                    value={this.state.hideTitle}
                    onChange={this.handleHideTitleChange} /> Hide
                <p>Select whether to hide the circuit title </p>

            </div>
        );
    },

    render() {
        const memberList = [];
        let endpoint = 1;
        let segment = 1;
        _.each(this.state.circuits, circuit => {
            if (circuit !== "none") {
                memberList.push({
                    styleProperties: circuitTypeProperties[circuit],
                    endpointStyle: stylesMap.endpoint,
                    endpointLabelA: `Endpoint ${endpoint++}`,
                    endpointLabelZ: `Endpoint ${endpoint++}`,
                    circuitLabel: `Segment ${segment}`,
                    navTo: `Segment ${segment++}`
                });
            }
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Concatenated Circuit Example</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ConcatenatedCircuit
                                hideTitle={this.state.hideTitle}
                                memberList={memberList}
                                endpointLabelPosition={this.state.endpointLabelPositionChoice}
                                connectionLabelPosition={this.state.circuitLabelPositionChoice}
                                yOffset={7}
                                disabled={this.state.disabled}
                                title={"Example Concatenated Circuit"}
                                onSelectionChange={this.handleSelectionChange}
                                endpointLabelOffset={18}
                                parentId={"Test Navigation"} />
                        </Resizable>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.renderChoices()}
                    </div>
                    <div className="col-md-6">
                        {this.renderSegmentChoices()}
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
                        <APIDocs file="src/circuit-diagram-concatenated.jsx"/>
                    </div>
                </div>
            </div>
        );
    }
});
