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
import BaseMap from "./map-base";
import Resizable from "./resizable";

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
 *         Paths:
 *             - name
 *             - steps
 *  showPaths:
 *      Maybe a boolean to show all paths, or none. Or it maybe an array
 *      of path names to show a selection of paths
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
            edgeColorMap: [],
            nodeSizeMap: {},
            nodeShapeMap: {},
            edgeShapeMap: {},
            selected: false,
            shape: "circle",
            stylesMap: {},
            showPaths: false,
            autoSize: true
        };
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

    selectEdgeColor(bps) {
        const gbps = bps / 1.0e9;
        for (let i = 0; i < this.props.edgeColorMap.length; i++) {
            const row = this.props.edgeColorMap[i];
            if (gbps >= row.range[0]) {
                return row.color;
            }
        }
        return "#C9CACC";
    },

    filteredPaths() {
        return _.filter(this.props.topology.paths, path => {
            if (_.isArray(this.props.showPaths)) {
                return _.contains(this.props.showPaths, path.name);
            }
            return true;
        });
    },

    buildTopology() {
        const topology = {};

        if (_.isNull(this.props.topology)) {
            return null;
        }

        const genericStyle = {
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

        // Create a node list
        topology.nodes = _.map(this.props.topology.nodes, node => {
            const n = _.clone(node);

            // Radius is based on the type of node, given in the nodeSizeMap
            n.radius = this.nodeSize(node.type);
            n.labelPosition = node.label_position;
            n.labelOffsetX = node.label_dx;
            n.labelOffsetY = node.label_dy;

            const styleMap = _.has(this.props.stylesMap, node.type) ?
                this.props.stylesMap[node.type] : genericStyle;
            n.style = styleMap.node;
            n.labelStyle = styleMap.label;

            n.shape = this.nodeShape(node.name);
            return n;
        });

        // Create the edge list
        topology.edges = _.map(this.props.topology.edges, edge => {
            const edgeName = `${edge.source}--${edge.target}`;
            return ({
                width: this.edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                totalCapacity: edge.total_capacity,
                ifaces: edge.ifaces,
                name: edgeName,
                shape: this.edgeShape(edgeName),
                curveDirection: this.edgeCurveDirection(edgeName),
                offset: this.edgeCurveOffset(edgeName)
            });
        });

        // Create the path list, filtering based on what is in showPaths
        if (this.props.showPaths) {
            topology.paths = _.map(this.filteredPaths(), path => {
                const color = _.has(this.props.pathColorMap, path.name) ?
                    this.props.pathColorMap[path.name] : "lightsteelblue";
                const width = _.has(this.props.pathWidthMap, path.name) ?
                    this.props.pathWidthMap[path.name] : 4;
                return {
                    name: path.name,
                    steps: path.steps,
                    color,
                    width
                };
            });
        }

        // Colorize the topology
        if (this.props.traffic) {
            if (!this.props.showPaths &&
                 this.props.edgeDrawingMethod === "bidirectionalArrow") {
                _.each(topology.edges, edge => {
                    const sourceTargetName = `${edge.source}--${edge.target}`;
                    const targetSourceName = `${edge.target}--${edge.source}`;
                    const sourceTargetTraffic =
                        this.props.traffic.get(sourceTargetName);
                    const targetSourceTraffic =
                        this.props.traffic.get(targetSourceName);
                    edge.sourceTargetColor =
                        this.selectEdgeColor(sourceTargetTraffic);
                    edge.targetSourceColor =
                        this.selectEdgeColor(targetSourceTraffic);
                });
            } else {
                const edgeMap = {};
                _.each(this.filteredPaths(), path => {

                    const pathAtoZTraffic =
                        this.props.traffic.get(`${path.name}--AtoZ`);
                    const pathZtoATraffic =
                        this.props.traffic.get(`${path.name}--ZtoA`);

                    let prev = null;
                    _.each(path.steps, step => {
                        if (prev) {
                            const sourceTargetName = `${prev}--${step}`;
                            if (!_.has(edgeMap, sourceTargetName)) {
                                edgeMap[sourceTargetName] = 0;
                            }
                            edgeMap[sourceTargetName] += pathAtoZTraffic;

                            const targetSourceName = `${step}--${prev}`;
                            if (!_.has(edgeMap, targetSourceName)) {
                                edgeMap[targetSourceName] = 0;
                            }
                            edgeMap[targetSourceName] += pathZtoATraffic;
                        }
                        prev = step;
                    });
                });
                _.each(topology.edges, edge => {
                    const sourceTargetName = `${edge.source}--${edge.target}`;
                    const targetSourceName = `${edge.target}--${edge.source}`;
                    if (_.has(edgeMap, sourceTargetName)) {
                        const sourceTargetTraffic = edgeMap[sourceTargetName];
                        edge.sourceTargetColor =
                            this.selectEdgeColor(sourceTargetTraffic);
                    }
                    if (_.has(edgeMap, targetSourceName)) {
                        const targetSourceTraffic = edgeMap[targetSourceName];
                        edge.targetSourceColor =
                            this.selectEdgeColor(targetSourceTraffic);
                    }
                });
            }
        }

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    handleSelectionChanged(selectionType, selection) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectionType, selection);
        }
    },

    render() {
        const topo = this.buildTopology();
        const bounds = this.bounds();
        const aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);
        const autoSize = this.props.autoSize;
        if (autoSize) {
            return (
                <Resizable aspect={aspect} style={{
                    background: "#F6F6F6",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "#E6E6E6"}}>
                    <BaseMap
                        topology={topo}
                        paths={topo.paths}
                        bounds={bounds}
                        width={this.props.width}
                        height={this.props.height}
                        margin={this.props.margin}
                        selection={this.props.selection}
                        edgeDrawingMethod={this.props.edgeDrawingMethod}
                        onSelectionChange={this.handleSelectionChanged} />
                </Resizable>
            );
        } else {
            return (
                <div style={{
                    background: "#F6F6F6",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "#E6E6E6"}}>
                    <BaseMap
                        topology={topo}
                        paths={topo.paths}
                        bounds={bounds}
                        width={this.props.width}
                        height={this.props.height}
                        margin={this.props.margin}
                        selection={this.props.selection}
                        edgeDrawingMethod={this.props.edgeDrawingMethod}
                        onSelectionChange={this.handleSelectionChanged} />
                </div>
            );
        }
    }
});
