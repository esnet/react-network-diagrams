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
import { Nav, NavItem } from "react-bootstrap";
import _ from "underscore";
import MapEditor from "../../src/map-editor";

// Test data
import topoJSON from "../data/simple_topo.json";

/**
 * An example of putting together a topology editor
 */
export default React.createClass({

    getInitialState() {
        const topo = topoJSON;

        // Add ids to the topology if needed
        _.each(topo.nodes, node => {
            node.id = _.has(node, "id") ? node.id : this.makeId();
        });

        return {
            topo,
            mode: null,
            display: "editor",
            gridSize: 0.5
        };
    },

    /**
     * For the example we insert ids on the topology elements, since
     * the editor expects it. In a real application we'd probably have
     * ids from the database
     */
    makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * In this example the user can toggle between two displays: showing
     * the editor or showing the topo data being edited.
     */
    handleNavToggle(v) {
        this.setState({display: v});
    },

    /**
     * In this example the user can edit the topo text directly. In
     * that case we land here and update the topology.
     */
    handleTopoChanged(e) {
        const text = e.target.value;
        const topo = JSON.parse(text);
        // Add ids to the topology if needed
        _.each(topo.nodes, node => {
            node.id = _.has(node, "id") ? node.id : this.makeId();
        });
        this.setState({
            topo: topo
        });
    },

    handleTopologyChanged(topo) {
        this.setState({
            topo: topo
        });
    },

    renderEditor() {
        const bounds = {
            x1: 0, y1: 0,
            x2: 225, y2: 120
        };

        // Maps link capacity to line thickness
        const edgeThicknessMap = {
            "100G": 5,
            "10G": 3,
            "1G": 1.5,
            subG: 1
        };

        // Maps edge name to edge shape. Current options are linear (default)
        // or curved. If curved you can specify the direction and offset
        // to control the curve.
        const edgeShapeMap = {
            "AMST--BOST": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "LOND--NEWY": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "AOFA--LOND": {
                shape: "curved",
                direction: "right",
                offset: 15
            },
            "CERN--WASH": {
                shape: "curved",
                direction: "right",
                offset: 15
            }
        };

        // The color map maps an edge value (within the range) to a color
        const edgeColorMap = [
            {color: "#990000", label: ">=50 Gbps", range: [50, 100]},
            {color: "#bd0026", label: "20 - 50", range: [20, 50]},
            {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
            {color: "#016c59", label: "5 - 10", range: [5, 10]},
            {color: "#238b45", label: "2 - 5", range: [2, 5]},
            {color: "#3690c0", label: "1 - 2", range: [1, 2]},
            {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
        ];

        // Mapping of node type to size of shape
        const nodeSizeMap = {
            hub: 5.5,
            esnet_site: 7
        };

        // Mapping of node name to shape (default is circle, other
        // options are cloud or square currently)
        const nodeShapeMap = {
            CERN: "square"
        };

        const siteStyle = {
            node: {
                normal: {fill: "#B0B0B0", stroke: "#9E9E9E", cursor: "pointer"},
                selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                           strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#B0B0B0", stroke: "#9E9E9E", opacity: 0.6,
                        cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333", stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8,
                        opacity: 0.6}
            }
        };

        const hubStyle = {
            node: {
                normal: {fill: "#CBCBCB",stroke: "#BEBEBE",
                         cursor: "pointer"},
                selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                           strokeWidth: 10, cursor: "pointer"},
                muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6,
                        cursor: "pointer"}
            },
            label: {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333",stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6}
            }
        };

        // Mapping of node type to style
        const stylesMap = {
            hub: hubStyle,
            esnet_site: siteStyle
        };

        return (
            <MapEditor
                topology={this.state.topo}
                bounds={bounds}
                edgeColorMap={edgeColorMap}
                edgeDrawingMethod="bidirectionalArrow"
                edgeThicknessMap={edgeThicknessMap}
                edgeShapeMap={edgeShapeMap}
                nodeSizeMap={nodeSizeMap}
                nodeShapeMap={nodeShapeMap}
                stylesMap={stylesMap}
                gridSize={this.state.gridSize}
                onTopologyChange={this.handleTopologyChanged} />
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
            return this.renderEditor();
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
                            onSelect={this.handleNavToggle}>
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
