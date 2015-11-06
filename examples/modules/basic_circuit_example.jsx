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
import BasicCircuit from "../../src/circuit-diagram-basic";
import {stylesMap} from "../styles/styles.js";

const text = require("raw!../markdown/basic-circuit.md");

const circuitTypeList = ["Optical", "Leased", "Dark Fiber", "Equipment-Equipment",
                         "Cross-Connect", "Panel Coupler", "Backplane Mate"];
const labelPositionChoiceList = ["top", "bottom"];
const endpointPositionChoiceList = ["top", "bottom", "bottomleftangled",
                                    "bottomrightangled"];
const disabledChoiceList = ["Yes", "No"];

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
        noNavigate: true,
    },
    backplaneMate: {
        style: stylesMap.coupler,
        lineShape: "square",
        size: 36,
        squareWidth: 40,
        centerLine: true,
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
            circuitType: circuitTypeProperties.crossConnect,
            circuitTypeChoice: circuitTypeList[4],
            circuitLabelPositionChoice: labelPositionChoiceList[0],
            endpointLabelPositionChoice: endpointPositionChoiceList[2],
            disabledChoice: disabledChoiceList[1],
            disabled: false,
            click: "",
        };
    },

    _onSelectionChange(e,l) {
        const message = `You clicked connection ${e} with name ${l}`;
        window.alert(message);
    },

    _typeChange(l) {
        switch (l) {
            case "Optical":
                this.setState({circuitType: circuitTypeProperties.optical});
                break;
            case "Leased":
                this.setState({circuitType: circuitTypeProperties.leased});
                break;
            case "Dark Fiber":
                this.setState({circuitType: circuitTypeProperties.darkFiber});
                break;
            case "Equipment-Equipment":
                this.setState({circuitType: circuitTypeProperties.equipmentToEquipment});
                break;
            case "Cross-Connect":
                this.setState({circuitType: circuitTypeProperties.crossConnect});
                break;
            case "Panel Coupler":
                this.setState({circuitType: circuitTypeProperties.coupler});
                break;
            case "Backplane Mate":
                this.setState({circuitType: circuitTypeProperties.backplaneMate});
                break;
            default:
                break;
        }
        this.setState({circuitTypeChoice: l});
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

    _renderChoices() {
        return (
            <div>
                <div>
                    <Selector selected={this.state.circuitTypeChoice}
                              selectionList={circuitTypeList}
                              handleChange={this._typeChange} />
                    <p>Select type of circuit</p>
                </div>
                <div>
                    <Selector selected={this.state.circuitLabelPositionChoice}
                              selectionList={labelPositionChoiceList}
                              handleChange={l => {
                                  this.setState({circuitLabelPositionChoice: l});
                              }} />
                    <p>Select the position of the circuit label</p>
                </div>
                <div>
                    <Selector selected={this.state.endpointLabelPositionChoice}
                              selectionList={endpointPositionChoiceList}
                              handleChange={l => {
                                  this.setState({endpointLabelPositionChoice: l});
                              }} />
                    <p>Select the position of the endpoint labels</p>
                </div>
                <div>
                    <Selector selected={this.state.disabledChoice}
                              selectionList={disabledChoiceList}
                              handleChange={this._disabledChange} />
                    <p>Select whether to render the circuit as disabled</p>
                </div>
            </div>
        );
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Basic Circuit Example</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <BasicCircuit lineStyle={this.state.circuitType.style}
                                      lineShape={this.state.circuitType.lineShape}
                                      connectionLabelPosition={this.state.circuitLabelPositionChoice}
                                      circuitLabel={this.state.circuitTypeChoice}
                                      yOffset={7}
                                      title={this.state.circuitTypeChoice}
                                      noNavigate={this.state.circuitType.noNavigate}
                                      size={this.state.circuitType.size}
                                      centerLine={this.state.circuitType.centerLine}
                                      squareWidth={this.state.circuitType.squareWidth}
                                      endpointStyle={stylesMap.endpoint}
                                      endpointLabelPosition={this.state.endpointLabelPositionChoice}
                                      endpointLabelA={"Endpoint Label A"}
                                      endpointLabelZ={"Endpoint Label Z"}
                                      disabled={this.state.disabled}
                                      onSelectionChange={this._onSelectionChange}
                                      navTo={this.state.circuitTypeChoice}
                                      parentId={"Test Navigation"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this._renderChoices()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <Markdown source={text} />
                    </div>
                </div>

            </div>
        );
    }
});
