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
import {stylesMap} from "../styles/styles.js";

const text = require("raw!../markdown/parallel-circuit.md");

const circuitTypeList = ["Optical", "Leased", "Dark Fiber", "Equipment-Equipment",
                         "Cross-Connect", "None"];
const labelPositionChoiceList = ["top", "bottom"];
const endpointPositionChoiceList = ["top", "bottom", "bottomleftangled",
                                    "bottomrightangled"];
const disabledChoiceList = ["Yes", "No"];

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
};

const Selector = React.createClass({

    _handleChange(e) {
        const l = e.target.value;
        this.props.handleChange(l);
    },

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>{option}</option>
            );
        });
        return (
            <select ref="menu" value={this.props.selected} onChange={this._handleChange}>
                {options}
            </select>
        );
    }
});

export default React.createClass({

    getInitialState() {
        return {
            circuitType1: circuitTypeProperties.crossConnect,
            circuitType2: circuitTypeProperties.crossConnect,
            circuitType3: circuitTypeProperties.crossConnect,
            circuitType4: circuitTypeProperties.crossConnect,
            member1TypeChoice: circuitTypeList[4],
            member2TypeChoice: circuitTypeList[4],
            member3TypeChoice: circuitTypeList[4],
            member4TypeChoice: circuitTypeList[4],
            circuitLabelPositionChoice: labelPositionChoiceList[0],
            endpointLabelPositionChoice: endpointPositionChoiceList[2],
            disabledChoice: disabledChoiceList[1],
            disabled: false,
            hideTitleChoice: disabledChoiceList[1],
            hideTitle: false,
        };
    },

    _renderMember1Choice() {
        return (
            <div>
                <Selector selected={this.state.member1TypeChoice}
                          selectionList={circuitTypeList}
                          handleChange={l => {
                                switch (l) {
                                    case "Optical":
                                        this.setState({circuitType1: circuitTypeProperties.optical});
                                        break;
                                    case "Leased":
                                        this.setState({circuitType1: circuitTypeProperties.leased});
                                        break;
                                    case "Dark Fiber":
                                        this.setState({circuitType1: circuitTypeProperties.darkFiber});
                                        break;
                                    case "Equipment-Equipment":
                                        this.setState({circuitType1: circuitTypeProperties.equipmentToEquipment});
                                        break;
                                    case "Cross-Connect":
                                        this.setState({circuitType1: circuitTypeProperties.crossConnect});
                                        break;
                                    case "None":
                                        this.setState({circuitType1: null});
                                    default:
                                        break;
                                }
                                this.setState({member1TypeChoice: l});
                          }} />
                <p>Select the circuit type for Member 1</p>
            </div>
        );
    },

    _renderMember2Choice() {
        return (
            <div>
                <Selector selected={this.state.member2TypeChoice}
                          selectionList={circuitTypeList}
                          handleChange={l => {
                                switch (l) {
                                    case "Optical":
                                        this.setState({circuitType2: circuitTypeProperties.optical});
                                        break;
                                    case "Leased":
                                        this.setState({circuitType2: circuitTypeProperties.leased});
                                        break;
                                    case "Dark Fiber":
                                        this.setState({circuitType2: circuitTypeProperties.darkFiber});
                                        break;
                                    case "Equipment-Equipment":
                                        this.setState({circuitType2: circuitTypeProperties.equipmentToEquipment});
                                        break;
                                    case "Cross-Connect":
                                        this.setState({circuitType2: circuitTypeProperties.crossConnect});
                                        break;
                                    case "None":
                                        this.setState({circuitType2: null});
                                    default:
                                        break;
                                }
                                this.setState({member2TypeChoice: l});
                          }} />
                <p>Select the circuit type for Member 2</p>
            </div>
        );
    },

    _renderMember3Choice() {
        return (
            <div>
                <Selector selected={this.state.member3TypeChoice}
                          selectionList={circuitTypeList}
                          handleChange={l => {
                                switch (l) {
                                    case "Optical":
                                        this.setState({circuitType3: circuitTypeProperties.optical});
                                        break;
                                    case "Leased":
                                        this.setState({circuitType3: circuitTypeProperties.leased});
                                        break;
                                    case "Dark Fiber":
                                        this.setState({circuitType3: circuitTypeProperties.darkFiber});
                                        break;
                                    case "Equipment-Equipment":
                                        this.setState({circuitType3: circuitTypeProperties.equipmentToEquipment});
                                        break;
                                    case "Cross-Connect":
                                        this.setState({circuitType3: circuitTypeProperties.crossConnect});
                                        break;
                                    case "None":
                                        this.setState({circuitType3: null});
                                    default:
                                        break;
                                }
                                this.setState({member3TypeChoice: l});
                          }} />
                <p>Select the circuit type for Member 3</p>
            </div>
        );
    },

    _renderMember4Choice() {
        return (
            <div>
                <Selector selected={this.state.member4TypeChoice}
                          selectionList={circuitTypeList}
                          handleChange={l => {
                                switch (l) {
                                    case "Optical":
                                        this.setState({circuitType4: circuitTypeProperties.optical});
                                        break;
                                    case "Leased":
                                        this.setState({circuitType4: circuitTypeProperties.leased});
                                        break;
                                    case "Dark Fiber":
                                        this.setState({circuitType4: circuitTypeProperties.darkFiber});
                                        break;
                                    case "Equipment-Equipment":
                                        this.setState({circuitType4: circuitTypeProperties.equipmentToEquipment});
                                        break;
                                    case "Cross-Connect":
                                        this.setState({circuitType4: circuitTypeProperties.crossConnect});
                                        break;
                                    case "None":
                                        this.setState({circuitType4: null});
                                    default:
                                        break;
                                }
                                this.setState({member4TypeChoice: l});
                          }} />
                <p>Select the circuit type for Member 4</p>
            </div>
        );
    },

    _onSelectionChange(e,l) {
        const message = `You clicked connection ${e} with name ${l}`;
        window.alert(message);
    },

    _disabledChange(l) {
        switch (l) {
            case "Yes":
                this.setState({disabled: true});
                break;

            case "No":
                this.setState({disabled: false});
                break;

            default:
                break;
        }
        this.setState({disabledChoice: l});
    },

    _hideTitleChange(l) {
        switch (l) {
            case "Yes":
                this.setState({hideTitle: true});
                break;

            case "No":
                this.setState({hideTitle: false});
                break;

            default:
                break;
        }
        this.setState({hideTitleChoice: l});
    },

    _renderChoices() {
        return (
            <div>
                <Selector selected={this.state.circuitLabelPositionChoice}
                          selectionList={labelPositionChoiceList}
                          handleChange={l => {
                              this.setState({circuitLabelPositionChoice: l});
                          }} />
                <p>Select the position of the circuit label</p>
                <Selector selected={this.state.endpointLabelPositionChoice}
                          selectionList={endpointPositionChoiceList}
                          handleChange={l => {
                              this.setState({endpointLabelPositionChoice: l});
                          }} />
                <p>Select the position of the endpoint labels</p>
                <Selector selected={this.state.disabledChoice}
                          selectionList={disabledChoiceList}
                          handleChange={this._disabledChange} />
                <p>Select whether to render the circuit as disabled</p>
                <Selector selected={this.state.hideTitleChoice}
                          selectionList={disabledChoiceList}
                          handleChange={this._hideTitleChange} />
                <p>Select whether to hide the circuit title </p>
            </div>
        );
    },

    _renderMemberChoices() {
        return (
            <div>
                {this._renderMember1Choice()}
                {this._renderMember2Choice()}
                {this._renderMember3Choice()}
                {this._renderMember4Choice()}
            </div>
        );
    },

    render() {
        let memberList = [
            {
                styleProperties: this.state.circuitType1,
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: "Endpoint 1",
                endpointLabelZ: "Endpoint 2",
                circuitLabel: "Member 1",
                navTo: "Member 1",
            },
            {
                styleProperties: this.state.circuitType2,
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: "Endpoint 3",
                endpointLabelZ: "Endpoint 4",
                circuitLabel: "Member 2",
                navTo: "Member 2",
            },
            {
                styleProperties: this.state.circuitType3,
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: "Endpoint 5",
                endpointLabelZ: "Endpoint 6",
                circuitLabel: "Member 3",
                navTo: "Member 3",
            },
            {
                styleProperties: this.state.circuitType4,
                endpointStyle: stylesMap.endpoint,
                endpointLabelA: "Endpoint 7",
                endpointLabelZ: "Endpoint 8",
                circuitLabel: "Member 4",
                navTo: "Member 4",
            },
        ];

        const memberListCopy = [];
        _.each(memberList, member => {
            if (member.styleProperties) {
                memberListCopy.push(member);
            }
        });

        memberList = memberListCopy;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Parallel Circuit Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <ParallelCircuit hideTitle={this.state.hideTitle}
                                         memberList={memberList}
                                         endpointLabelPosition={this.state.endpointLabelPositionChoice}
                                         connectionLabelPosition={this.state.circuitLabelPositionChoice}
                                         disabled={this.state.disabled}
                                         title={"Example Parallel Circuit"}
                                         onSelectionChange={this._onSelectionChange}
                                         endpointLabelA={"Endpoint 1"}
                                         endpointLabelZ={"Endpoint 2"}
                                         endpointStyle={stylesMap.endpoint}
                                         endpointLabelOffset={18} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this._renderChoices()}
                    </div>
                    <div className="col-md-6">
                        {this._renderMemberChoices()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <Markdown text={text} />
                    </div>
                </div>
            </div>
        );
    }
});
