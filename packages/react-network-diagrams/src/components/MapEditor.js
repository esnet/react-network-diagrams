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
import PropTypes from "prop-types";
import _ from "underscore";
import Select from "react-select";

import { BaseMap } from "./BaseMap";
import { Node } from "./Node";
import { Resizable } from "./Resizable";

let counter = 1;

export class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingAction: null,
            selectionType: null,
            selection: null
        };
        this.handleAddEdge = this.handleAddEdge.bind(this);
        this.handleAddNode = this.handleAddNode.bind(this);
        this.handleDeleteEdge = this.handleDeleteEdge.bind(this);
        this.handleDeleteNode = this.handleDeleteNode.bind(this);
    }

    constrain(x, y) {
        const gridSize = this.props.gridSize;
        return {
            x: parseInt(parseInt(x / gridSize, 10) * gridSize, 10),
            y: parseInt(parseInt(y / gridSize, 10) * gridSize, 10)
        };
    }

    /**
     * When we create new elements we give it a id
     */
    makeId() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    findNode(id) {
        let result;
        _.each(this.props.topology.nodes, node => {
            if (node.id === id) {
                result = node;
            }
        });
        return result;
    }

    findEdge(id) {
        let result;
        _.each(this.props.topology.edges, edge => {
            if (`${edge.source}--${edge.target}` === id) {
                result = edge;
            }
        });
        return result;
    }

    nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
    }

    nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
    }

    edgeThickness(capacity) {
        return this.props.edgeThicknessMap[capacity] || 5;
    }

    edgeShape(name) {
        if (_.has(this.props.edgeShapeMap, name)) {
            return this.props.edgeShapeMap[name].shape;
        } else {
            return "linear";
        }
    }

    edgeCurveDirection(name) {
        let direction;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].direction;
            }
        }
        return direction;
    }

    edgeCurveOffset(name) {
        let offset;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].offset;
            }
        }
        return offset;
    }

    bounds() {
        if (this.props.bounds) {
            return this.props.bounds;
        }
        const minX = _.min(this.props.topology.nodes, node => node.x).x;
        const minY = _.min(this.props.topology.nodes, node => node.y).y;
        const maxX = _.max(this.props.topology.nodes, node => node.x).x;
        const maxY = _.max(this.props.topology.nodes, node => node.y).y;
        return { x1: minX, x2: maxX, y1: minY, y2: maxY };
    }

    cloneTopo() {
        const topo = {
            name: this.props.topology.name,
            description: this.props.topology.description,
            nodes: _.map(this.props.topology.nodes, n => _.clone(n)),
            edges: _.map(this.props.topology.edges, e => _.clone(e))
        };
        return topo;
    }

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
                normal: { fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer" },
                selected: {
                    fill: "#37B6D3",
                    stroke: "rgba(55, 182, 211, 0.22)",
                    strokeWidth: 10,
                    cursor: "pointer"
                },
                muted: {
                    fill: "#CBCBCB",
                    stroke: "#BEBEBE",
                    opacity: 0.6,
                    cursor: "pointer"
                }
            };

            n.labelStyle = {
                normal: { fill: "#696969", stroke: "none", fontSize: 9 },
                selected: { fill: "#333", stroke: "none", fontSize: 11 },
                muted: { fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6 }
            };

            n.shape = this.nodeShape(node.name);

            return n;
        });

        // Create the tologogy list
        topology.edges = _.map(this.props.topology.edges, edge => {
            const edgeName = `${edge.source}--${edge.target}`;
            return {
                width: this.edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                name: edgeName,
                shape: this.edgeShape(edgeName),
                curveDirection: this.edgeCurveDirection(edgeName),
                offset: this.edgeCurveOffset(edgeName)
            };
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    }

    handleSelectionChanged(selectionType, selectionId) {
        let selection;
        if (selectionType === "node") {
            selection = this.findNode(selectionId);
        } else if (selectionType === "edge") {
            selection = this.findEdge(selectionId);
        }
        this.setState({ selectionType, selection });
    }

    handleChange(attr, value) {
        const selected = this.state.selection;
        selected[attr] = value;

        this.setState({
            selection: selected
        });
    }

    handleNodeDrag(id, posx, posy) {
        const topo = this.cloneTopo();
        const { x, y } = this.constrain(posx, posy);

        _.each(topo.nodes, node => {
            if (node.id === id) {
                node.x = x;
                node.y = y;
            }
        });

        if (this.props.onTopologyChange) {
            this.props.onTopologyChange(topo);
        }
    }

    handleAddNode() {
        this.setState({
            pendingAction: {
                action: "add-node",
                instructions: "Pick a point (x,y)"
            }
        });
    }

    /**
     * TODO: actual handling of the add node should be done at
     * the application level (action) rather than down here in the editor.
     */
    handleAddNodePosition(posx, posy) {
        const topo = this.cloneTopo();
        const { x, y } = this.constrain(posx, posy);
        const n = {
            id: this.makeId(),
            label_dx: null,
            label_dy: null,
            label_position: "top",
            name: `untitled${counter++}`,
            type: "node",
            x,
            y
        };

        topo.nodes.push(n);

        if (this.props.onTopologyChange) {
            this.props.onTopologyChange(topo);
        }

        this.setState({
            pendingAction: null,
            selectionType: "node",
            selection: n
        });
    }

    handleAddEdge() {
        this.setState({
            pendingAction: {
                action: "add-edge",
                instructions: "Pick source node",
                nodes: []
            }
        });
    }

    handleDeleteNode() {
        this.setState({
            pendingAction: {
                action: "delete-node",
                instructions: "Pick a node to delete (will delete related edges)",
                nodes: []
            }
        });
    }

    handleDeleteEdge() {
        this.setState({
            pendingAction: {
                action: "delete-edge",
                instructions: "Pick an edge to delete",
                edge: null
            }
        });
    }

    handleAddSelection(node) {
        const action = this.state.pendingAction;
        if (action.action === "add-edge") {
            action.nodes.push(node);
        }
        if (action.nodes.length === 1) {
            this.setState({
                pendingAction: {
                    action: "add-edge",
                    instructions: "Pick target node",
                    nodes: action.nodes
                }
            });
        }
        if (action.nodes.length === 2) {
            // Action complete
            const topo = this.cloneTopo();
            const e = {
                source: this.findNode(action.nodes[0]).name,
                target: this.findNode(action.nodes[1]).name,
                capacity: ""
            };
            topo.edges.push(e);

            if (this.props.onTopologyChange) {
                this.props.onTopologyChange(topo);
            }

            this.setState({ pendingAction: null });
        }
    }

    handleDeleteNodeSelection(nodeId) {
        const action = this.state.pendingAction;
        if (action.action === "delete-node") {
            action.nodes.push(nodeId);
        }
        if (action.nodes.length === 1) {
            const node = this.findNode(nodeId);

            const topo = this.cloneTopo();
            topo.nodes = _.filter(topo.nodes, n => {
                return n.id !== nodeId;
            });

            topo.edges = _.filter(topo.edges, e => {
                return e.source !== node.name && e.target !== node.name;
            });

            if (this.props.onTopologyChange) {
                this.props.onTopologyChange(topo);
            }

            this.setState({ pendingAction: null });
        }
    }

    handleDeleteEdgeSelection(edgeId) {
        const action = this.state.pendingAction;
        if (action.action === "delete-edge") {
            action.edgeId = edgeId;
        }

        if (action.edgeId) {
            const edge = this.findEdge(edgeId);
            const topo = this.cloneTopo();

            topo.edges = _.filter(topo.edges, e => {
                return !(e.source === edge.source && e.target === edge.target);
            });

            if (this.props.onTopologyChange) {
                this.props.onTopologyChange(topo);
            }

            this.setState({ pendingAction: null });
        }
    }

    renderTextProperty(attr, value) {
        return (
            <input
                defaultValue={value}
                width="100%"
                type="text"
                className="form-control input-sm"
                onBlur={e => this.handleChange(attr, e.target.value)}
            />
        );
    }

    renderIntegerProperty(attr, value) {
        const v = value || 0;
        return (
            <input
                defaultValue={v}
                width="100%"
                type="text"
                className="form-control input-sm"
                onBlur={e => this.handleChange(attr, parseInt(e.target.value, 10))}
            />
        );
    }

    renderChoiceProperty(attr, options, value) {
        return (
            <Select
                value={value}
                searchable={false}
                clearable={false}
                options={options}
                onChange={val => this.handleChange(attr, val)}
            />
        );
    }

    renderNodeProperties() {
        const selected = this.state.selection;

        const nodeSpec = Node.spec();
        nodeSpec.unshift({
            attr: "type",
            label: "Type",
            type: "choice",
            options: _.map(this.props.stylesMap, (s, type) => {
                return { value: type, label: type };
            })
        });

        let propertyElements;
        if (this.state.selectionType === "node") {
            propertyElements = _.map(nodeSpec, property => {
                const v = selected[property.attr];
                let editorElement;
                switch (property.type) {
                    case "text":
                        editorElement = this.renderTextProperty(property.attr, v);
                        break;
                    case "integer":
                        editorElement = this.renderIntegerProperty(property.attr, v);
                        break;
                    case "choice":
                        editorElement = this.renderChoiceProperty(
                            property.attr,
                            property.options,
                            v
                        );
                        break;
                    default:
                        break;
                }
                return (
                    <tr height="35px" key={property.attr}>
                        <td width="100px">
                            <label width={100}>{property.label}</label>
                        </td>
                        <td>{editorElement}</td>
                    </tr>
                );
            });
        }

        return (
            <table width="100%">
                <tbody>{propertyElements}</tbody>
            </table>
        );
    }

    renderEdgeProperties() {
        const selected = this.state.selection;
        const edgeSpec = [
            {
                attr: "capacity",
                label: "Capacity",
                type: "choice",
                options: _.map(this.props.edgeThicknessMap, (e, k) => {
                    return { value: k, label: k };
                })
            }
        ];

        let propertyElements;
        if (this.state.selectionType === "edge") {
            propertyElements = _.map(edgeSpec, property => {
                const v = selected[property.attr];
                let editorElement;
                switch (property.type) {
                    case "text":
                        editorElement = this.renderTextProperty(property.attr, v);
                        break;
                    case "integer":
                        editorElement = this.renderIntegerProperty(property.attr, v);
                        break;
                    case "choice":
                        editorElement = this.renderChoiceProperty(
                            property.attr,
                            property.options,
                            v
                        );
                        break;
                    default:
                        break;
                }
                return (
                    <tr height="35px" key={property.attr}>
                        <td width="100px">
                            <label width={100}>{property.label}</label>
                        </td>
                        <td>{editorElement}</td>
                    </tr>
                );
            });
        }

        return (
            <table width="100%">
                <tbody>{propertyElements}</tbody>
            </table>
        );
    }

    renderProperties() {
        const headerStyle = {
            padding: 15,
            background: "#F6F6F6",
            borderLeftStyle: "solid",
            borderLeftColor: "#37B6D3"
        };

        if (this.state.selection) {
            if (this.state.selectionType === "node") {
                return (
                    <div>
                        <div style={headerStyle}>{this.state.selection.name}</div>
                        <p />
                        <div>{this.renderNodeProperties()}</div>
                    </div>
                );
            } else {
                const edge = this.state.selection;
                const title = `${edge.source} to ${edge.target}`;
                return (
                    <div>
                        <div style={headerStyle}>{title}</div>
                        <p />
                        <div>{this.renderEdgeProperties()}</div>
                    </div>
                );
            }
        } else {
            return <span>Nothing selected</span>;
        }
    }

    renderToolbar() {
        const toolbarStyle = {
            padding: 5,
            borderBottomStyle: "solid",
            borderWidth: "thin",
            borderColor: "#CBCBCB"
        };

        // Highlight buttons when action is in progress
        let addNodeStyle = { color: "grey" };
        let addEdgeStyle = { color: "grey", marginLeft: 10 };
        let deleteNodeStyle = { color: "grey", marginLeft: 10 };
        let deleteEdgeStyle = { color: "grey", marginLeft: 10 };
        if (this.state.pendingAction) {
            if (this.state.pendingAction.action === "add-node") {
                addNodeStyle = { color: "steelblue" };
            }
            if (this.state.pendingAction.action === "add-edge") {
                addEdgeStyle = { color: "steelblue", marginLeft: 10 };
            }
            if (this.state.pendingAction.action === "delete-node") {
                deleteNodeStyle = { color: "steelblue", marginLeft: 10 };
            }
            if (this.state.pendingAction.action === "delete-edge") {
                deleteEdgeStyle = { color: "steelblue", marginLeft: 10 };
            }
        }

        return (
            <div style={toolbarStyle}>
                <button
                    type="button"
                    style={addNodeStyle}
                    className="btn btn-default btn-xs"
                    onClick={this.handleAddNode}
                >
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" /> Node
                </button>
                <button
                    type="button"
                    style={addEdgeStyle}
                    className="btn btn-default btn-xs"
                    onClick={this.handleAddEdge}
                >
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" /> Edge
                </button>
                <button
                    type="button"
                    style={deleteNodeStyle}
                    className="btn btn-default btn-xs"
                    onClick={this.handleDeleteNode}
                >
                    <span className="glyphicon glyphicon-minus" aria-hidden="true" /> Node
                </button>
                <button
                    type="button"
                    style={deleteEdgeStyle}
                    className="btn btn-default btn-xs"
                    onClick={this.handleDeleteEdge}
                >
                    <span className="glyphicon glyphicon-minus" aria-hidden="true" /> Edge
                </button>
                <span style={{ color: "steelblue", marginLeft: 10 }}>
                    {this.state.pendingAction ? this.state.pendingAction.instructions : null}
                </span>
            </div>
        );
    }

    renderMap() {
        const topo = this.buildTopology();
        const bounds = this.bounds();
        const aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);

        let positionSelected;
        let nodeSelected;
        let edgeSelected;

        if (this.state.pendingAction) {
            if (this.state.pendingAction.action === "add-node") {
                positionSelected = (posx, posy) => this.handleAddNodePosition(posx, posy);
            }
            if (this.state.pendingAction.action === "add-edge") {
                nodeSelected = node => this.handleAddSelection(node);
            }
            if (this.state.pendingAction.action === "delete-node") {
                nodeSelected = nodeId => this.handleDeleteNodeSelection(nodeId);
            }
            if (this.state.pendingAction.action === "delete-edge") {
                edgeSelected = edgeId => this.handleDeleteEdgeSelection(edgeId);
            }
        }

        const mapSelection = {
            nodes: this.state.selectionType === "node" ? [this.state.selection.id] : [],
            edges:
                this.state.selectionType === "edge"
                    ? [`${this.state.selection.source}--${this.state.selection.target}`]
                    : []
        };

        if (this.props.autoSize) {
            return (
                <Resizable
                    aspect={aspect}
                    style={{
                        background: "#F6F6F6",
                        borderStyle: "solid",
                        borderWidth: "thin",
                        borderColor: "#E6E6E6"
                    }}
                >
                    <BaseMap
                        topology={topo}
                        width={this.props.width}
                        height={this.props.height}
                        autoSize={this.props.autoSize}
                        margin={this.props.margin}
                        bounds={bounds}
                        selection={mapSelection}
                        edgeDrawingMethod="simple"
                        onSelectionChange={(selectionType, selectionId) =>
                            this.handleSelectionChanged(selectionType, selectionId)
                        }
                        onPositionSelected={positionSelected}
                        onNodeSelected={nodeSelected}
                        onEdgeSelected={edgeSelected}
                        onNodeDrag={(id, posx, posy) => this.handleNodeDrag(id, posx, posy)}
                    />
                </Resizable>
            );
        } else {
            return (
                <div
                    style={{
                        background: "#F6F6F6",
                        borderStyle: "solid",
                        borderWidth: "thin",
                        borderColor: "#E6E6E6"
                    }}
                >
                    <BaseMap
                        topology={topo}
                        width={this.props.width}
                        height={this.props.height}
                        autoSize={this.props.autoSize}
                        margin={this.props.margin}
                        bounds={bounds}
                        selection={mapSelection}
                        edgeDrawingMethod="simple"
                        onSelectionChange={(selectionType, selectionId) =>
                            this.handleSelectionChanged(selectionType, selectionId)
                        }
                        onPositionSelected={positionSelected}
                        onNodeSelected={nodeSelected}
                        onEdgeSelected={edgeSelected}
                        onNodeDrag={(id, posx, posy) => this.handleNodeDrag(id, posx, posy)}
                    />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12" style={{ marginBottom: 5, marginTop: 5 }}>
                        {this.renderToolbar()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{ marginBottom: 5, marginTop: 5 }}>
                        <div className="row">
                            <div className="col-md-9">{this.renderMap()}</div>
                            <div className="col-md-3">{this.renderProperties()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MapEditor.propTypes = {
    /**
     * A mapping of the capacity field within the tologogy edge object
     * to a line thickness for rendering the edges.
     *
     * Example:
     *
     * ```
     * const edgeThicknessMap = {
     *     "100G": 5,
     *     "10G": 3,
     *     "1G": 1.5,
     *     "subG": 1
     * };
     * ```
     */
    edgeThicknessMap: PropTypes.object,

    /** Display the endpoint selected */
    selected: PropTypes.bool,

    edgeColorMap: PropTypes.array,

    /**
     * A mapping from the type field in the node object to a size to draw the shape
     *
     * Example:
     * ```
     * const nodeSizeMap = {
     *     hub: 5.5,
     *     esnet_site: 7
     * };
     * ```
     */
    nodeSizeMap: PropTypes.object,

    nodeShapeMap: PropTypes.object,

    /**
     * A mapping of the edge name (which is source + "--" + target) to a
     * dict of edge shape options:
     *  * `shape` (either "linear" or "curved")
     *  * `direction` (if shape is curved, either "left" or "right")
     *  * `offset` (if shape is curved, the amount of curve, which is
     *  pixel offset from a straight line between the source and target at the midpoint)
     *
     * Example:
     * ```
     * const edgeShapeMap = {
     *     "ALBQ--DENV": {
     *     "shape": "curved",
     *     "direction": "right",
     *     "offset": 15
     * }
     * ```
     */
    edgeShapeMap: PropTypes.object,

    stylesMap: PropTypes.object,

    gridSize: PropTypes.number
};

MapEditor.defaultProps = {
    edgeThicknessMap: {
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
