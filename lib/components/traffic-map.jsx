import React from "react";
import _ from "underscore";
import BaseMap from "./map-base";
import Node from "./map-node"

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
 *      "capacity" within the tologogy edges is a string, such as "100G". You can pass in a
 *      a edgeThinknessMap that is used to look up the capacity as a line thickness for rendering
 *      the edges.
 *
 *  edgeShapeMap:
 *      A mapping of the edge name (which is source + "--" + target) to a dict of edge shape
 *      options.
 *          - shape (either "linear" or "curved")
 *          - direction (if curved, either "left" or "right")
 *          - offset (if curved, the amount of curve, which is pixel offset from a straight line
 *                    between the source and target at the midpoint)
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
 *      will be called when the use selects an object in the map, be it a node or a link
 *
 */

export default React.createClass({

    getDefaultProps: function() {
        return {
            edgeThinknessMap: {
                "100G": 5,
                "10G": 3,
                "1G": 1.5,
                "subG": 1
            },
            edgeColorMap: [],
            nodeSizeMap: {},
            nodeShapeMap: {},
            edgeShapeMap: {},
            selected: false,
            shape: "circle",
            stylesMap: {}
        };
    },

    getInitialState: function() {
        let nodes = this.props.topology.nodes
        let node_topo = []
        for (var i in nodes) {
            node_topo.push({'name': nodes[i].name, 'style': nodes[i].style})
        }
        return {
            nodes: node_topo
        }
    },

    changeName: function(name) {
        
        
        var index = 0
        for (var i in this.state.nodes) {
            if (this.state.nodes[i]['name'] == name)
                index = i
        }

        let n = this.state.nodes
        
        n[index]['name'] = "Abhinav"
        
        this.setState({nodes: n})
        

    },

    _nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
    },

    _nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
    },

    _edgeThickness(capacity) {
        return this.props.edgeThinknessMap[capacity] || 5;
    },

    _edgeShape(name) {
        if (_.has(this.props.edgeShapeMap, name)) {
            return this.props.edgeShapeMap[name].shape;
        } else {
            return "linear";
        }
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
        let offset;
        if (_.has(this.props.edgeShapeMap, name)) {
            if (this.props.edgeShapeMap[name].shape === "curved") {
                return this.props.edgeShapeMap[name].offset;
            }
        }
        return offset;
    },

    _selectEdgeColor: function(bps) {
        const gbps = bps / 1.0e9;
        for (let i = 0; i < this.props.edgeColorMap.length; i++) {
            const row = this.props.edgeColorMap[i];
            if (gbps >= row.range[0]) {
                return row.color;
            }
        }
        return "#C9CACC";
    },

    _normalizedTopology: function() {
        let topology = {};

        if (_.isNull(this.props.topology)) {
            return null;
        }

        // Extents of the raw topology for scaling into width and height of the map
        const minX = _.min(this.props.topology.nodes, node => node.x).x;
        const minY = _.min(this.props.topology.nodes, node => node.y).y;
        let maxX = _.max(this.props.topology.nodes, node => node.x).x;
        let maxY = _.max(this.props.topology.nodes, node => node.y).y;
        maxX -= minX;
        maxY -= minY;
        const xScale = d3.scale.linear().range([this.props.margin,
                                                this.props.width - this.props.margin]);
        const yScale = d3.scale.linear().range([this.props.margin,
                                                this.props.height - this.props.margin]);
        const hasSelectedNode = this.props.selection.nodes.length;
        const hasSelectedEdge = this.props.selection.edges.length;

        let edgeMap = {};
        _.each(this.props.topology.edges, function(edge) {
            edgeMap[`${edge.source}--${edge.target}`] = edge;
            edgeMap[`${edge.target}--${edge.source}`] = edge;
        });

        //
        // Build a list of nodes (each a Node) from our topology
        //

        let secondarySelectedNodes = [];
        _.each(this.props.selection.edges, function(edgeName) {
            let edge = edgeMap[edgeName];
            if (edge) {
                secondarySelectedNodes.push(edge.source);
                secondarySelectedNodes.push(edge.target);
            }
        });

        // Create a node list

        topology.nodes = _.map(this.props.topology.nodes, node => {

            // Scale the node positions onto a normalized 0 to 1 scale
            node.x = (node.x - minX) / maxX;
            node.y = (node.y - minY) / maxY;

            // Radius is based on the type of node, given in the nodeSizeMap
            node.radius = this._nodeSize(node.type);


            node.labelPosition = node.label_position;
            node.style = this.props.stylesMap[node.type].node;
            node.labelStyle = this.props.stylesMap[node.type].label;
            node.shape = this._nodeShape(node.name);

            return node;
        });

        let nodeCoordinates = {}
        let editor_nodes = _.map(this.props.topology.nodes, node => {
            const x = xScale(node.x);
            const y = yScale(node.y);
            nodeCoordinates[node.name] = {x: x, y: y};

            const label = _.isUndefined(node.label) ? node.name : node.label;
            const nodeSelected = _.contains(this.props.selection.nodes, node.name);
            const edgeSelected = _.contains(secondarySelectedNodes, node.name);
            const selected = nodeSelected || edgeSelected;
            const muted = (hasSelectedNode && !selected) || (hasSelectedEdge && !selected);

            var index = 0
            for (var i in this.state.nodes) {
                if (this.state.nodes[i]['name'] == node.name)
                    index = i
            }

            return (
                <Node x={x}
                      y={y}
                      name={this.state.nodes[index]['name']}
                      key={node.name}
                      style={node.style}
                      labelStyle={node.labelStyle}
                      type={node.type}
                      labelPosition={node.labelPosition}
                      label={label}
                      radius={node.radius}
                      classed={node.classed}
                      shape={node.shape}
                      selected={selected}
                      muted={muted}
                      onSelectionChange={this.props.onSelectionChange}
                      nodeChange={this.changeName}/>
            );
        });


        // Create the tologogy list
        topology.edges = _.map(this.props.topology.edges, edge => {
            const edgeName = `${edge.source}--${edge.target}`;
            return ({
                width: this._edgeThickness(edge.capacity),
                classed: edge.capacity,
                source: edge.source,
                target: edge.target,
                totalCapacity: edge.total_capacity,
                ifaces: edge.ifaces,
                name: edgeName,
                shape: this._edgeShape(edgeName),
                curveDirection: this._edgeCurveDirection(edgeName),
                offset: this._edgeCurveOffset(edgeName)
            });
        });

        // Colorize the topology
        if (this.props.traffic) {
            _.each(topology.edges, edge => {
                const sourceTargetName = `${edge.source}--${edge.target}`;
                const targetSourceName = `${edge.target}--${edge.source}`;
                const sourceTargetTraffic = this.props.traffic.get(sourceTargetName);
                const targetSourceTraffic = this.props.traffic.get(targetSourceName);
                edge.sourceTargetColor = this._selectEdgeColor(sourceTargetTraffic);
                edge.targetSourceColor = this._selectEdgeColor(targetSourceTraffic);
            });
        }

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return {t: topology, e: editor_nodes};
    },

    _handleSelectionChanged: function(selectionType, selection) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectionType, selection);
        }
    },

    

    render: function() {

        const topo = this._normalizedTopology();
        return (
            <BaseMap nodes={topo.e}
                     topology={topo.t}
                     width={this.props.width}
                     height={this.props.height}
                     margin={this.props.margin}
                     selection={this.props.selection}
                     edgeDrawingMethod={"bidirectionalArrow"}
                     onSelectionChange={this._handleSelectionChanged} 
                     onNodeClick={this.changeName}/>
        );
    }
});

