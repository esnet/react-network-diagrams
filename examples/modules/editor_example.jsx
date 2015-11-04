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
import {Event} from "@esnet/pond";

import Resizable from "./resizable";
import MapEditor from "../../src/map-editor";

// Test data
import topo from "../data/simple_topo.json";

/**
 * On the outside of the editor we hold:
 *     - The selection
 *     - The source of truth for the topology, initially loaded
 *       here from a json file
 * We control, from here:
 *     - The dimensions into which to render the editor
 * From the editor, we respond to:
 *     - Change in selection
 *     - Change in topology
 */

export default React.createClass({

    getInitialState() {
        const nodeMap = {};
        _.each(topo.nodes, node => {
            node.id = this.makeId();
            nodeMap[node.id] = node;
        });
        return {
            mode: null,
            nodeMap: nodeMap,
            selectionType: null,
            selection: null
        };
    },

    makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    handleSelectionChanged(selectionType, selection) {
        this.setState({
            selectionType: selectionType,
            selection: this.state.nodeMap[selection]
        });
    },

    handleChange(attr, e) {
        let selected = this.state.selection;
        selected[attr] = e.target.value;

        this.setState({
            selection: selected,
            nodeMap: this.state.nodeMap
        });
    },

    handleNodeDrag(id, x, y) {
        const nodeMap = this.state.nodeMap;
        nodeMap[id].x = parseInt(parseInt(x/5)*5, 10);
        nodeMap[id].y = parseInt(parseInt(y/5)*5, 10);
        this.setState({
            nodeMap: nodeMap
        });
    },

    handleAddNode() {
        console.log("Add node init");
        this.setState({mode: "add-node"});
    },

    handleAddNodePosition(x, y) {
        console.log("Add node complete", x, y);
        const nodeMap = this.state.nodeMap;
        const n = {
            id: this.makeId(),
            label_dx: null,
            label_dy: null,
            label_position: "top",
            name: "untitled",
            type: "node",
            x:  parseInt(x),
            y:  parseInt(y)
        };
        nodeMap[n.id] = n;
        topo.nodes.push(n);
        console.log("Adding node", n, nodeMap);
        this.setState({
            mode: null,
            nodeMap: nodeMap,
            selectionType: "node",
            selection: n
        });
    },

    renderNodeProperties() {
        const selected = this.state.selection
        const name = selected.name;
        const x = selected.x;
        const y = selected.y;
        return (
            <table width="100%">
                <tr height="35px">
                    <td width="100px">
                        <label htmlFor="name" width={100}>Name</label>
                    </td>
                    <td>
                        <input
                            value={name}
                            width="100%"
                            type="text"
                            className="form-control input-sm"
                            id="name"
                            onChange={(e) => this.handleChange("name", e)}
                            placeholder="Name" />
                    </td>
                </tr>
                <tr height="35px">
                    <td width="100px">
                        <label htmlFor="x" width={100}>Position:x</label>
                    </td>
                    <td>
                        <input
                            value={x}
                            width="100%"
                            type="text"
                            className="form-control input-sm"
                            id="x"
                            placeholder="X Position" />
                    </td>
                </tr>
                <tr height="35px">
                    <td width="100px">
                        <label for="y" width={100}>Position:y</label>
                    </td>
                    <td>
                        <input
                            value={y}
                            width="100%"
                            type="text"
                            className="form-control input-sm"
                            id="y"
                            placeholder="Y Position" />
                    </td>
                </tr>
            </table>
        );
    },

    renderProperties() {
        const headerStyle = {
            padding: 15,
            background: "#F6F6F6",
            borderLeftStyle: "solid",
            borderLeftColor: "#37B6D3"
        }
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
            )
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

    render() {

        const bounds = {
            x1: 0, y1: 0,
            x2: 200, y2: 200
        };

        let mapSelection = {
            nodes: this.state.selectionType === "node" ?
                [this.state.selection.id] : [],
            edges: this.state.selectionType === "edge" ?
                [this.state.selection.id] : []
        };


        let positionSelected;
        if (this.state.mode === "add-node") {
            positionSelected = this.handleAddNodePosition;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Editor</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" style={{marginBottom: 5}}>
                        {this.renderToolbar()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <Resizable aspect={1.0} style={{
                            background: "#F6F6F6",
                            borderStyle: "solid",
                            borderWidth: "thin",
                            borderColor: "#E6E6E6"}}>
                            <MapEditor
                                height={500} margin={50}
                                topology={topo}
                                bounds={bounds}
                                selection={mapSelection}
                                onSelectionChange={this.handleSelectionChanged}
                                onPositionSelected={positionSelected}
                                onNodeDrag={this.handleNodeDrag} />
                        </Resizable>
                    </div>
                    <div className="col-md-4">
                        {this.renderProperties()}
                    </div>
                </div>

            </div>
        );
    }
});
