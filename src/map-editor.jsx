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
import Select from "react-select";
import Resizable from "./resizable";
import BaseMap from "./map-base";
import Node from "./node";

/**
 * Props:
 *
 * topology:
 *     Pass in the topology structure.
 *         Nodes:
 *             - type
 *         Edges:
 *             - source (refers to node name)
 *             - target (refers to node name)
 *             - capacity (string)
 *             - total_capacity (string)
 *
 *  nodeSizeMap:
 *      A mapping from the node type field to a size to draw the shape
 *
 *  edgeThinknessMap:
 *      "capacity" within the tologogy edges is a string, such as "100G".
 *      You can pass in an edgeThinknessMap that is used to look up the
 *      capacity as a line thickness for rendering the edges.
 *
 *  edgeShapeMap:
 *      A mapping of the edge name (which is source + "--" + target) to a
 *      dict of edge shape
 *      options.
 *          - shape (either "linear" or "curved")
 *          - direction (if curved, either "left" or "right")
 *          - offset (if curved, the amount of curve, which is pixel offset
 *            from a straight line between the source and target at the
 *            midpoint)
 *      e.g.
 *          {
 *            "AMST--BOST": {
 *              "shape": "curved",
 *              "direction": "right",
 *              "offset": 15
 *          }
 *
 *  callbacks:
 *
 *  handleSelectionChange(selectionType, selection):
 *      will be called when the use selects an object in the map, be it a node
 *      or a link
 *
 */

export default React.createClass({

    getDefaultProps() {
        return {
            edgeThinknessMap: {
                "100G": 5,
                "10G": 3,
                "1G": 1.5,
                subG: 1
            },
            selected: false,
            edgeColorMap: [],
            nodeSizeMap: {},
            nodeShapeMap: {},
            edgeShapeMap: {},
            stylesMap: {},
            gridSize: 0.25
        };
    },

    getInitialState() {
        return {
            mode: null,
            selectionType: null,
            selection: null,
        };
    },

    constrain(x, y) {
        const gridSize = this.props.gridSize;
        return {
            x: parseInt(parseInt(x / gridSize, 10) * gridSize, 10),
            y: parseInt(parseInt(y / gridSize, 10) * gridSize, 10)
        };
    },

    /**
     * When we create new elements we give it a id
     */
    makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
    },

    nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
    },

    edgeThickness(capacity) {
        return this.props.edgeThinknessMap[capacity] || 5;
    },

    edgeShape(name) {
        if (_.has(this.props.edgeShapeMap, name)) {
            return this.props.edgeShapeMap[name].shape;
        } else {
            return "linear";
        }
    },

    edgeCurveDirection(name) {
        let direction;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].direction;
            }
        }
        return direction;
    },

    edgeCurveOffset(name) {
        let offset;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].offset;
            }
        }
        return offset;
    },

    bounds() {
        if (this.props.bounds) {
            return this.props.bounds;
        }
        const minX = _.min(this.props.topology.nodes, node => node.x).x;
        const minY = _.min(this.props.topology.nodes, node => node.y).y;
        const maxX = _.max(this.props.topology.nodes, node => node.x).x;
        const maxY = _.max(this.props.topology.nodes, node => node.y).y;
        return {x1: minX, x2: maxX, y1: minY, y2: maxY};
    },

    /**
     * Build a topology suitable for passing into the BaseMap for rendering
     * as nodes and edges
     */
    buildTopology() {
        const topology = {};

        if (_.isNull(this.props.topology)) {
            return null;
        }

        // Create a node list
        topology.nodes = _.map(this.props.topology.nodes, node => {
            const n = _.clone(node);

            // Radius is based on the type of node, given in the nodeSizeMap
            n.radius = this.nodeSize(node.type);
            n.labelPosition = node.label_position;
            n.labelOffsetX = node.label_dx;
            n.labelOffsetY = node.label_dy;

            n.style = {
                normal: {fill: "#CBCBCB",stroke: "#BEBEBE", cursor: "pointer"},
                selected: {
                    fill: "#37B6D3",
                    stroke: "rgba(55, 182, 211, 0.22)",
                    strokeWidth: 10, cursor: "pointer"
                },
                muted: {
                    fill: "#CBCBCB",
                    stroke: "#BEBEBE",
                    opacity: 0.6,
                    cursor: "pointer"
                }
            };

            n.labelStyle = {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333", stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            };

            n.shape = this.nodeShape(node.name);

            return n;
        });

        // Create the tologogy list
        topology.edges = _.map(this.props.topology.edges, edge => {
            const edgeName = `${edge.source}--${edge.target}`;
            return ({
                width: this.edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                name: edgeName,
                shape: this.edgeShape(edgeName),
                curveDirection: this.edgeCurveDirection(edgeName),
                offset: this.edgeCurveOffset(edgeName)
            });
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    handleSelectionChanged(selectionType, selectionId) {
        let selection;
        _.each(this.props.topology.nodes, (node) => {
            if (node.id === selectionId) {
                selection = node;
            }
        });
        this.setState({
            selectionType: selectionType,
            selection: selection
        });
    },

    handleChange(attr, value) {
        const selected = this.state.selection;
        selected[attr] = value;

        this.setState({
            selection: selected,
        });
    },

    handleNodeDrag(id, posx, posy) {
        console.log("handleNodeDrag", id, posx, posy);
        const topo = {
            name: this.props.topology.nodes,
            description: this.props.topology.description,
            nodes: _.map(this.props.topology.nodes, (n) => _.clone(n)),
            edges: _.map(this.props.topology.edges, (e) => _.clone(e)),
        };
        const { x, y } = this.constrain(posx, posy);

        _.each(topo.nodes, (node) => {
            if (node.id === id) {
                node.x = x;
                node.y = y;
            }
        });

        if (this.props.onTopologyChange) {
            console.log("TOPO CHANGED", topo);
            this.props.onTopologyChange(topo);
        }
    },

    handleAddNode() {
        this.setState({mode: "add-node"});
    },

    /**
     * TODO: actual handling of the add node should be done at
     * the application level (action) rather than down here in the editor.
     */
    handleAddNodePosition(posx, posy) {
        const topo = {
            name: this.props.topology.nodes,
            description: this.props.topology.description,
            nodes: _.map(this.props.topology.nodes, (n) => _.clone(n)),
            edges: _.map(this.props.topology.edges, (e) => _.clone(e)),
        };

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
        topo.nodes.push(n);
        this.setState({
            mode: null,
            selectionType: "node",
            selection: n
        });

        if (this.props.onTopologyChange) {
            console.log("TOPO CHANGED", topo);
            this.props.onTopologyChange(topo);
        }
    },

    renderNodeProperties() {
        const selected = this.state.selection;
        const nodeSpec = Node.spec();

        let propertyElements;
        if (this.state.selectionType === "node") {
            propertyElements = _.map(nodeSpec, (property) => {
                let v = selected[property.attr];
                let editorElement;
                switch (property.type) {
                    case "text":
                        editorElement = (
                            <input
                                defaultValue={v}
                                width="100%"
                                type="text"
                                className="form-control input-sm"
                                onBlur={(e) =>
                                    this.handleChange(property.attr, e.target.value)} />
                        );
                        break;
                    case "integer":
                        v = v || 0;
                        editorElement = (
                            <input
                                defaultValue={v}
                                width="100%"
                                type="text"
                                className="form-control input-sm"
                                onBlur={(e) =>
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

    renderMap() {
        const topo = this.buildTopology();
        const bounds = this.bounds();
        const aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);

        let positionSelected;
        if (this.state.mode === "add-node") {
            positionSelected = this.handleAddNodePosition;
        }

        const mapSelection = {
            nodes: this.state.selectionType === "node" ?
                [this.state.selection.id] : [],
            edges: this.state.selectionType === "edge" ?
                [this.state.selection.id] : []
        };

        return (
            <Resizable aspect={aspect} style={{
                background: "#F6F6F6",
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: "#E6E6E6"}}>
                <BaseMap
                    topology={topo}
                    width={this.props.width}
                    height={this.props.height}
                    margin={this.props.margin}
                    bounds={bounds}
                    selection={mapSelection}
                    edgeDrawingMethod="simple"
                    onSelectionChange={this.handleSelectionChanged}
                    onPositionSelected={positionSelected}
                    onNodeDrag={this.handleNodeDrag} />
            </Resizable>
        );
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12" style={{marginBottom: 5, marginTop: 5}}>
                        {this.renderToolbar()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{marginBottom: 5, marginTop: 5}}>
                        <div className="row">
                            <div className="col-md-9">
                                {this.renderMap()}
                            </div>
                            <div className="col-md-3">
                                {this.renderProperties()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
