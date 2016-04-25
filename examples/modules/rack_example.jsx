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
// import Markdown from "react-markdown";
// import APIDocs from "./docs";
import Rack from "../../src/rack";
import Equipment from "../../src/equipment";
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

const equipment = {
    alu: {
        height: 24.5, // Inches
        width: 17.52, // Inches
        rmu: 1,
        style: stylesMap.line1,
        label: "ALU-7750-SR12",
        showHeight: true,
        navTo: "Equipment link for ALU"
    },
    dc1: {
        height: 3.5, // Inches
        width: 17.52,  // Inches
        rmu: 41,
        style: stylesMap.line1,
        label:"DC PDU 1",
        showHeight: true,
        navTo: "Link to DC PDU 1"
    },
    dc2: {
        height: 3.5, // Inches
        width: 17.52,  // Inches
        rmu: 38,
        style: stylesMap.line1,
        label: "DC PDU 2",
        showHeight: true,
        navTo: "Link to DC PDU 2"
    },
    juniper: {
        height: 1.75, // Inches
        width: 17.52,  // Inches
        rmu: 30,
        style: stylesMap.line1,
        label: "Juniper EX4200",
        showHeight: true,
        navTo: "Link to Juniper Switch"
    },
    corsa: {
        height: 3.5, // Inches
        width: 17.52,  // Inches
        rmu: 22,
        style: stylesMap.line1,
        label: "Corsa Switch",
        showHeight: true,
        navTo: "Link to Corsa Switch"
    },
    cisco: {
        height: 1.75, // Inches
        width: 17.52,  // Inches
        rmu: 34,
        style: stylesMap.line1,
        label: "Cisco 2960",
        showHeight: true,
        navTo: "Link to Cisco Switch"
    },
    ac1: {
        height: 3.5, // Inches
        width: 17.52,  // Inches
        rmu: 35,
        style: stylesMap.line1,
        label: "AC PDU 1",
        showHeight: true,
        navTo: "Link to AC PDU 1"
    }
};

export default React.createClass({

    handleSelectionChange(e,val) {
        const message = `You clicked ${e} with name ${val}`;
        window.alert(message);
    },

    render() {
        const rackStyle = stylesMap.rack1;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Basic Rack Example</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <Resizable>
                            <Rack
                                rackHeight={rackData.height}
                                rackWidth={rackData.width}
                                pxToInch={10}
                                label={rackData.name}
                                rackStyle={rackStyle}>
                                <Equipment
                                    key={`${equipment.dc1.label}-${equipment.dc1.rmu}`}
                                    equipmentHeight={equipment.dc1.height}
                                    equipmentWidth={equipment.dc1.width}
                                    rmu={equipment.dc1.rmu}
                                    style={equipment.dc1.style}
                                    label={equipment.dc1.label}
                                    navTo={equipment.dc1.navTo}
                                    showHeight={equipment.dc1.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.dc2.label}-${equipment.dc2.rmu}`}
                                    equipmentHeight={equipment.dc2.height}
                                    equipmentWidth={equipment.dc2.width}
                                    rmu={equipment.dc2.rmu}
                                    style={equipment.dc2.style}
                                    label={equipment.dc2.label}
                                    navTo={equipment.dc2.navTo}
                                    showHeight={equipment.dc2.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.juniper.label}-${equipment.juniper.rmu}`}
                                    equipmentHeight={equipment.juniper.height}
                                    equipmentWidth={equipment.juniper.width}
                                    rmu={equipment.juniper.rmu}
                                    style={equipment.juniper.style}
                                    label={equipment.juniper.label}
                                    navTo={equipment.juniper.navTo}
                                    showHeight={equipment.juniper.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.ac1.label}-${equipment.ac1.rmu}`}
                                    equipmentHeight={equipment.ac1.height}
                                    equipmentWidth={equipment.ac1.width}
                                    rmu={equipment.ac1.rmu}
                                    style={equipment.ac1.style}
                                    label={equipment.ac1.label}
                                    navTo={equipment.ac1.navTo}
                                    showHeight={equipment.ac1.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.cisco.label}-${equipment.cisco.rmu}`}
                                    equipmentHeight={equipment.cisco.height}
                                    equipmentWidth={equipment.cisco.width}
                                    rmu={equipment.cisco.rmu}
                                    style={equipment.cisco.style}
                                    label={equipment.cisco.label}
                                    navTo={equipment.cisco.navTo}
                                    showHeight={equipment.cisco.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.corsa.label}-${equipment.corsa.rmu}`}
                                    equipmentHeight={equipment.corsa.height}
                                    equipmentWidth={equipment.corsa.width}
                                    rmu={equipment.corsa.rmu}
                                    style={equipment.corsa.style}
                                    label={equipment.corsa.label}
                                    navTo={equipment.corsa.navTo}
                                    showHeight={equipment.corsa.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                                <Equipment
                                    key={`${equipment.alu.label}-${equipment.alu.rmu}`}
                                    equipmentHeight={equipment.alu.height}
                                    equipmentWidth={equipment.alu.width}
                                    rmu={equipment.alu.rmu}
                                    style={equipment.alu.style}
                                    label={equipment.alu.label}
                                    navTo={equipment.alu.navTo}
                                    showHeight={equipment.alu.showHeight}
                                    onSelectionChange={this.handleSelectionChange} />
                            </Rack>
                        </Resizable>
                    </div>
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
