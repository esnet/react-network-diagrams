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
// import Markdown from "react-markdown";
// import APIDocs from "./docs";
import Rack from "../../src/rack";
import Equipment from "../../src/equipment";
import PowerNodeList from "../../src/power-node-list";
import Resizable from "../../src/resizable";
import { stylesMap } from "../styles/styles.js";

/*
const Selector = React.createClass({

    handleChange(e) {
        const l = e.target.value;
        this.props.onChange(l);
    },

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>{option}</option>
            );
        });
        return (
            <select ref="menu" value={this.props.selected} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
});
*/

const rackData = {
    height: 42,
    width: 19,
    name: "001.001"
};

const equipment = [
    {
        height: 24.5, // Inches
        width: 17.52, // Inches
        rmu: 1,
        style: stylesMap.router,
        label: "ALU-7750-SR12",
        showHeight: false,
        facing: "Front",
        navTo: "ALU-7750-SR12"
    },
    {
        height: 3.5,
        width: 17.52,
        rmu: 33,
        style: stylesMap.patchPanel,
        label: "Patch Panel",
        showHeight: false,
        facing: "Front",
        navTo: "Patch Panel"
    },
    {
        height: 3.5, // Inches
        width: 17.52, // Inches
        rmu: 41,
        style: stylesMap.pdu,
        label: "DC PDU 1",
        facing: "Back",
        showHeight: true,
        navTo: "DC PDU 1"
    },
    {
        height: 3.5, // Inches
        width: 17.52, // Inches
        rmu: 38,
        style: stylesMap.pdu,
        label: "DC PDU 2",
        facing: "Back",
        showHeight: true,
        navTo: "DC PDU 2"
    },
    {
        height: 1.75, // Inches
        width: 17.52, // Inches
        rmu: 30,
        style: stylesMap.switch,
        label: "Juniper EX4200",
        showHeight: true,
        facing: "Front",
        navTo: "Juniper EX4200"
    },
    {
        height: 1.75,
        width: 17.52,
        rmu: 29,
        style: stylesMap.blankStyle,
        label: "Cable Management",
        showHeight: false,
        facing: "Front",
        noNavigate: true
    },
    {
        height: 3.5, // Inches
        width: 17.52, // Inches
        rmu: 22,
        style: stylesMap.switch,
        label: "Corsa Switch",
        showHeight: true,
        facing: "Front",
        navTo: "Corsa Switch"
    },
    {
        height: 1.75, // Inches
        width: 17.52, // Inches
        rmu: 28,
        style: stylesMap.switch,
        label: "Cisco 2960",
        showHeight: true,
        facing: "Front",
        navTo: "Cisco 2960"
    },
    {
        height: 3.5, // Inches
        width: 17.52, // Inches
        rmu: 35,
        style: stylesMap.pdu,
        label: "AC PDU 1",
        showHeight: true,
        facing: "Back",
        navTo: "AC PDU 1"
    }
];

const rackpower = [
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Left",
        label: "60A -48v",
        type: "DC",
        source: "A",
        id: "P001",
        navTo: "P001",
        pdus: ["DC PDU 2"]
    },
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Right",
        label: "60A -48v",
        type: "DC",
        source: "B",
        id: "P002",
        navTo: "P002",
        pdus: ["DC PDU 2"]
    },
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Left",
        label: "60A -48v",
        type: "DC",
        source: "A",
        id: "P005",
        navTo: "P005",
        pdus: ["DC PDU 1"]
    },
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Right",
        label: "60A -48v",
        type: "DC",
        source: "B",
        id: "P006",
        navTo: "P006",
        pdus: ["DC PDU 1"]
    },
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Center",
        label: "20A 120v",
        connector: "NEMA 5-20R",
        type: "AC",
        source: "House",
        id: "P003",
        navTo: "P003",
        pdus: ["AC PDU 1"]
    },
    {
        style: stylesMap.endpoint2,
        vPos: "Above",
        hPos: "Center",
        label: "20A 120v",
        connector: "NEMA 5-20R",
        type: "AC",
        source: "Generator",
        id: "P004",
        navTo: "P004",
        pdus: ["AC PDU 1"]
    }
];

//const rackpower = [];

export default React.createClass({
    getInitialState() {
        return {
            info: null,
            showHeight: false,
            selected: null,
            descending: false,
            pduSelected: []
        };
    },

    handleSelectionChange(e, val) {
        let o;
        let pdus = [];
        if (e === "equipment") {
            o = equipment.filter(eq => {
                return eq.label === val;
            });
        } else if (e === "power Node") {
            o = rackpower.filter(p => {
                return p.id === val;
            });
        }
        if (o.length === 1) {
            const v = o[0];
            if (e === "equipment") {
                v.toJSON = () => {
                    return {
                        Height: v.height, // Inches
                        Width: v.width, // Inches
                        RMU: v.rmu,
                        Label: v.label,
                        Facing: v.facing
                    };
                };
            } else {
                v.toJSON = () => {
                    return {
                        "Vertical Position": v.vPos,
                        "Horizontal Position": v.hPos,
                        Label: v.label,
                        Connector: v.connector,
                        Type: v.type,
                        Source: v.source,
                        ID: v.id,
                        PDUs: v.pdus.map(pdu => {
                            return equipment.filter(eq => {
                                return eq.label === pdu;
                            });
                        })
                    };
                };
                pdus = v.pdus;
            }
            this.setState({ info: v, selected: val, pduSelected: pdus });
        }
    },

    handleHeightChange() {
        this.setState({
            showHeight: this.state.showHeight ? false : true
        });
    },

    handleDescendingChange() {
        this.setState({
            descending: this.state.descending ? false : true
        });
    },

    renderEquipment(equipment) {
        const backStyle = { fill: "#595959" };
        const elements = equipment.map(eq => {
            return (
                <Equipment
                    key={`${eq.label}-${eq.rmu}`}
                    equipmentHeight={eq.height}
                    equipmentWidth={eq.width}
                    rmu={eq.rmu}
                    style={eq.style}
                    backStyle={backStyle}
                    selected={
                        this.state.selected === eq.label ||
                        this.state.pduSelected.includes(eq.label)
                    }
                    label={eq.label}
                    navTo={eq.navTo}
                    showHeight={this.state.showHeight}
                    facing={eq.facing}
                    onSelectionChange={this.handleSelectionChange}
                />
            );
        });
        return elements;
    },

    renderInfo() {
        if (this.state.info) {
            return (
                <div>
                    <b>Selected Values:</b>
                    <pre style={{ borderLeftColor: "steelblue" }}>
                        {JSON.stringify(this.state.info, null, 3)}
                    </pre>
                </div>
            );
        } else {
            return <div />;
        }
    },
    render() {
        const rackStyle = stylesMap.rack1;
        const pattern = (
            <pattern id="Pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                <line stroke="#A6A6A6" strokeWidth="20px" y2="4" />
                <path
                    d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
                    style={{ stroke: "#4D4D4D", strokeWidth: 1 }}
                />
            </pattern>
        );
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Basic Rack Example</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <b>Rack Power</b>
                        <Resizable>
                            <PowerNodeList
                                powerNodes={rackpower}
                                selected={this.state.selected}
                                onSelectionChange={this.handleSelectionChange}
                            />
                        </Resizable>
                    </div>
                    <div className="col-md-3" style={{ textAlign: "center" }}>
                        <b>Rack Front View</b>
                        <Resizable>
                            <Rack
                                rackHeight={rackData.height}
                                rackWidth={rackData.width}
                                pxToInch={10}
                                label={rackData.name}
                                rackStyle={rackStyle}
                                facing={"Front"}
                                pattern={pattern}
                                descending={this.state.descending}
                            >
                                {this.renderEquipment(equipment)}
                            </Rack>
                        </Resizable>
                    </div>
                    <div className="col-md-3" style={{ textAlign: "center" }}>
                        <b>Rack Back View</b>
                        <Resizable>
                            <Rack
                                rackHeight={rackData.height}
                                rackWidth={rackData.width}
                                pxToInch={10}
                                label={rackData.name}
                                rackStyle={rackStyle}
                                facing={"Back"}
                                pattern={pattern}
                                descending={this.state.descending}
                            >
                                {this.renderEquipment(equipment)}
                            </Rack>
                        </Resizable>
                    </div>
                    <div className="col-md-4">{this.renderInfo()}</div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <input
                            type="checkbox"
                            name="height"
                            value={this.state.showHeight}
                            onChange={this.handleHeightChange}
                        />{" "}
                        Display Height Marker
                        <p>Select whether to render the RMU height markers</p>
                        <br />
                        <input
                            type="checkbox"
                            name="descending"
                            value={this.state.descending}
                            onChange={this.handleDescendingChange}
                        />{" "}
                        Toggle RMU descending
                        <p>Select whether to render the RMUs ascending or descending</p>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
});

/*
<Rack
                                rackHeight={rackData.height}
                                rackWidth={rackData.width}
                                pxToInch={10}
                                label={rackData.name}
                                rackStyle={rackStyle}>
                            </Rack>

*/
