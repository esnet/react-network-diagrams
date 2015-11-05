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
import { Nav, NavItem } from "react-bootstrap";
import Select from "react-select";
import Resizable from "./resizable";
import MapEditor from "../../src/map-editor";

// Test data
import topoJSON from "../data/simple_topo.json";

/**
 * An example of putting together a topology editor
 */
export default React.createClass({

    getInitialState() {
        const nodeMap = {};
        _.each(topoJSON.nodes, node => {
            node.id = this.makeId();
            nodeMap[node.id] = node;
        });
        return {
            mode: null,
            topo: topoJSON,
            nodeMap: nodeMap,
            selectionType: null,
            selection: null,
            display: "editor",
            gridSize: 0.25
        };
    },

    makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    constrain(x, y) {
        return {
            x: parseInt(parseInt(x / this.state.gridSize, 10) * this.state.gridSize, 10),
            y: parseInt(parseInt(y / this.state.gridSize, 10) * this.state.gridSize, 10)
        };
    },

    handleSelectionChanged(selectionType, selection) {
        this.setState({
            selectionType: selectionType,
            selection: this.state.nodeMap[selection]
        });
    },

    handleChange(attr, value) {
        const selected = this.state.selection;
        selected[attr] = value;

        this.setState({
            selection: selected,
            nodeMap: this.state.nodeMap
        });
    },

    handleNodeDrag(id, posx, posy) {
        const nodeMap = this.state.nodeMap;
        const { x, y } = this.constrain(posx, posy);
        nodeMap[id].x = x;
        nodeMap[id].y = y;
        this.setState({
            nodeMap: nodeMap
        });
    },

    handleAddNode() {
        this.setState({mode: "add-node"});
    },

    handleAddNodePosition(posx, posy) {
        const nodeMap = this.state.nodeMap;
        const topo = this.state.topo;
        const { x, y } = this.constrain(posx, posy);
        const n = {
            id: this.makeId(),
            label_dx: null,
            label_dy: null,
            label_position: "top",
            name: "untitled",
            type: "node",
            x: x,
            y: y
        };
        nodeMap[n.id] = n;
        topo.nodes.push(n);
        this.setState({
            mode: null,
            nodeMap: nodeMap,
            selectionType: "node",
            selection: n
        });
    },

    handleDisplayChange(v) {
        this.setState({display: v});
    },

    handleTopoChanged(e) {
        const text = e.target.value;
        const nodeMap = {};
        const topo = JSON.parse(text);
        _.each(topo.nodes, node => {
            node.id = this.makeId();
            nodeMap[node.id] = node;
        });
        this.setState({
            topo: topo,
            nodeMap: nodeMap
        });
    },

    renderNodeProperties() {
        const selected = this.state.selection;

        const nodeSpec = [
            {attr: "name", label: "Name", type: "text"},
            {attr: "x", label: "Position x", type: "integer"},
            {attr: "y", label: "Position y", type: "integer"},
            {attr: "label_dx", label: "Label offset x", type: "integer"},
            {attr: "label_dy", label: "Label offset y", type: "integer"},
            {
                attr: "label_position",
                label: "Label position",
                type: "choice",
                options: [
                    {value: "top", label: "Top"},
                    {value: "bottom", label: "Bottom"},
                    {value: "left", label: "Left"},
                    {value: "right", label: "Right"},
                    {value: "topleft", label: "Top left"},
                    {value: "topright", label: "Top right"},
                    {value: "bottomleft", label: "Bottom left"},
                    {value: "bottomright", label: "Bottom right"}
                ]
            }
        ];

        let propertyElements;
        if (this.state.selectionType === "node") {
            propertyElements = _.map(nodeSpec, (property) => {
                const v = selected[property.attr];
                let editorElement;
                switch (property.type) {
                    case "text":
                        editorElement = (
                            <input
                                value={v}
                                width="100%"
                                type="text"
                                className="form-control input-sm"
                                onChange={(e) =>
                                    this.handleChange(property.attr, e.target.value)} />
                        );
                        break;
                    case "integer":
                        editorElement = (
                            <input
                                value={v}
                                width="100%"
                                type="text"
                                className="form-control input-sm"
                                onChange={(e) =>
                                    this.handleChange(property.attr, parseInt(e.target.value, 10))} />
                        );
                        break;
                    case "choice":
                        editorElement = (
                            <Select
                                value={v}
                                searchable={false}
                                clearable={false}
                                options={property.options}
                                onChange={(val) =>
                                    this.handleChange(property.attr, val)} />
                        );
                        break;
                }
                return (
                    <tr height="35px" key={property.attr}>
                        <td width="100px"><label width={100}>{property.label}</label></td>
                        <td>{editorElement}</td>
                    </tr>
                );
            });
        }

        return (
            <table width="100%">
                {propertyElements}
            </table>
        );
    },

    renderProperties() {
        const headerStyle = {
            padding: 15,
            background: "#F6F6F6",
            borderLeftStyle: "solid",
            borderLeftColor: "#37B6D3"
        };

        if (this.state.selection) {
            return (
                <div>
                    <div style={headerStyle}>
                        {this.state.selection.name}
                    </div>
                    <p />
                    <div>
                        {this.renderNodeProperties()}
                    </div>
                </div>
            );
        } else {
            return (
                <span>
                    Nothing selected
                </span>
            );
        }
    },

    renderToolbar() {
        const toolbarStyle = {
            padding: 5,
            borderBottomStyle: "solid",
            borderWidth: "thin",
            borderColor: "#CBCBCB"
        };

        return (
            <div style={toolbarStyle}>
                <button
                    type="button"
                    style={{color: this.state.mode === "add-node" ? "blue" : "grey"}}
                    className="btn btn-default btn-xs"
                    onClick={this.handleAddNode}>
                    <span
                        className="glyphicon glyphicon-plus"
                        aria-hidden="true">
                    </span> Node
                </button>
            </div>
        );
    },

    renderEditor() {
        const bounds = {
            x1: 0, y1: 0,
            x2: 225, y2: 100
        };

        const mapSelection = {
            nodes: this.state.selectionType === "node" ?
                [this.state.selection.id] : [],
            edges: this.state.selectionType === "edge" ?
                [this.state.selection.id] : []
        };

        const aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);

        let positionSelected;
        if (this.state.mode === "add-node") {
            positionSelected = this.handleAddNodePosition;
        }
        return (
            <Resizable aspect={aspect} style={{
                background: "#F6F6F6",
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: "#E6E6E6"}}>
                <MapEditor
                    height={500} margin={50}
                    topology={this.state.topo}
                    bounds={bounds}
                    selection={mapSelection}
                    onSelectionChange={this.handleSelectionChanged}
                    onPositionSelected={positionSelected}
                    onNodeDrag={this.handleNodeDrag} />
            </Resizable>
        );
    },

    renderTopo() {
        return (
            <div className="form-group">
                <textarea
                    defaultValue={JSON.stringify(this.state.topo, null, 2)}
                    onChange={this.handleTopoChanged}
                    className="form-control"
                    style={{width: "100%", fontFamily: "courier"}}
                    rows="40" cols="80" />
            </div>
        );
    },

    renderContent() {
        if (this.state.display === "editor") {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12" style={{marginBottom: 5}}>
                            {this.renderToolbar()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-9">
                            {this.renderEditor()}
                        </div>
                        <div className="col-md-3">
                            {this.renderProperties()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return this.renderTopo();
        }
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <h3>Editor</h3>
                    </div>
                    <div className="col-md-3">
                        <Nav
                            bsStyle="pills"
                            activeKey={this.state.display}
                            onSelect={this.handleDisplayChange}>
                            <NavItem eventKey={"editor"} href="/home">Editor</NavItem>
                            <NavItem eventKey={"topo"} title="Item">Topo</NavItem>
                        </Nav>
                    </div>
                </div>

                {this.renderContent()}

            </div>
        );
    }
});
