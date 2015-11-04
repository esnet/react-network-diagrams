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

/**
 * 
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
            "hub": hubStyle,
            "esnet_site": siteStyle
        };
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
        };
    },

    _nodeSize(name) {
        return 7;
    },

    _nodeShape(name) {
        return "circle";
    },

    _edgeThickness(capacity) {
        return 5;
    },

    _edgeShape(name) {
        return "linear";
    },

    _edgeCurveDirection(name) {
        let direction;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].direction;
            }
        }
        return direction;
    },

    _edgeCurveOffset(name) {
        return 10;
    },

    _selectEdgeColor(bps) {
        return "#C9CACC";
    },

    _bounds() {
        if (this.props.bounds) {
            return this.props.bounds
        }
        const minX = _.min(this.props.topology.nodes, node => node.x).x;
        const minY = _.min(this.props.topology.nodes, node => node.y).y;
        const maxX = _.max(this.props.topology.nodes, node => node.x).x;
        const maxY = _.max(this.props.topology.nodes, node => node.y).y;
        console.log("maxY", maxY, "minY", minY);
        return {x1: minX, x2: maxX, y1: minY, y2: maxY};
    },

    _buildTopology() {
        let topology = {};

        if (_.isNull(this.props.topology)) {
            return null;
        }

        // Create a node list
        topology.nodes = _.map(this.props.topology.nodes, node => {

            // Radius is based on the type of node, given in the nodeSizeMap
            node.radius = this._nodeSize(node.type);

            node.labelPosition = node.label_position;
            node.style = {
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
            node.labelStyle = {
                normal: {fill: "#696969", stroke: "none", fontSize: 9},
                selected: {fill: "#333", stroke: "none", fontSize: 11},
                muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
            };

            node.shape = this._nodeShape(node.name);

            return node;
        });

        // Create the tologogy list
        topology.edges = _.map(this.props.topology.edges, edge => {
            const edgeName = `${edge.source}--${edge.target}`;
            return ({
                width: this._edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                name: edgeName,
                shape: this._edgeShape(edgeName),
                curveDirection: this._edgeCurveDirection(edgeName),
                offset: this._edgeCurveOffset(edgeName)
            });
        });

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
    },

    render() {
        const topo = this._buildTopology();
        const bounds = this._bounds();
        return (
            <BaseMap
                topology={topo}
                width={this.props.width}
                height={this.props.height}
                margin={this.props.margin}
                bounds={bounds}
                selection={this.props.selection}
                edgeDrawingMethod="bidirectionalArrow"
                onSelectionChange={this.props.onSelectionChange}
                onPositionSelected={this.props.onPositionSelected}
                onNodeDrag={this.props.onNodeDrag} />
        );
    }
});
