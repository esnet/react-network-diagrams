"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrafficMap = undefined;

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _BaseMap = require("./BaseMap");

var _Resizable = require("./Resizable");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/**
 * A high level component for showing network topology, including visualizing
 * network traffic as a heat map.
 */
var TrafficMap = (exports.TrafficMap = (function(_React$Component) {
  _inherits(TrafficMap, _React$Component);

  function TrafficMap() {
    _classCallCheck(this, TrafficMap);

    return _possibleConstructorReturn(
      this,
      (TrafficMap.__proto__ || Object.getPrototypeOf(TrafficMap)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(TrafficMap, [
    {
      key: "bounds",
      value: function bounds() {
        if (this.props.bounds) {
          return this.props.bounds;
        }
        var minX = _underscore2.default.min(this.props.topology.nodes, function(
          node
        ) {
          return node.x;
        }).x;
        var minY = _underscore2.default.min(this.props.topology.nodes, function(
          node
        ) {
          return node.y;
        }).y;
        var maxX = _underscore2.default.max(this.props.topology.nodes, function(
          node
        ) {
          return node.x;
        }).x;
        var maxY = _underscore2.default.max(this.props.topology.nodes, function(
          node
        ) {
          return node.y;
        }).y;
        return { x1: minX, x2: maxX, y1: minY, y2: maxY };
      }
    },
    {
      key: "nodeSize",
      value: function nodeSize(name) {
        return this.props.nodeSizeMap[name] || 7;
      }
    },
    {
      key: "nodeShape",
      value: function nodeShape(name) {
        return this.props.nodeShapeMap[name] || "circle";
      }
    },
    {
      key: "edgeThickness",
      value: function edgeThickness(capacity) {
        return this.props.edgeThinknessMap[capacity] || 5;
      }
    },
    {
      key: "edgeShape",
      value: function edgeShape(name) {
        if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
          return this.props.edgeShapeMap[name].shape;
        } else {
          return "linear";
        }
      }
    },
    {
      key: "edgeCurveDirection",
      value: function edgeCurveDirection(name) {
        var direction = void 0;
        if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
          if (this.props.edgeShapeMap[name].shape === "curved") {
            return this.props.edgeShapeMap[name].direction;
          }
        }
        return direction;
      }
    },
    {
      key: "edgeCurveOffset",
      value: function edgeCurveOffset(name) {
        var offset = void 0;
        if (_underscore2.default.has(this.props.edgeShapeMap, name)) {
          if (this.props.edgeShapeMap[name].shape === "curved") {
            return this.props.edgeShapeMap[name].offset;
          }
        }
        return offset;
      }
    },
    {
      key: "selectEdgeColor",
      value: function selectEdgeColor(bps) {
        var gbps = bps / 1.0e9;
        for (var i = 0; i < this.props.edgeColorMap.length; i++) {
          var row = this.props.edgeColorMap[i];
          if (gbps >= row.range[0]) {
            return row.color;
          }
        }
        return "#C9CACC";
      }
    },
    {
      key: "filteredPaths",
      value: function filteredPaths() {
        var _this2 = this;

        return _underscore2.default.filter(this.props.topology.paths, function(
          path
        ) {
          if (_underscore2.default.isArray(_this2.props.showPaths)) {
            return _underscore2.default.contains(
              _this2.props.showPaths,
              path.name
            );
          }
          return true;
        });
      }
    },
    {
      key: "buildTopology",
      value: function buildTopology() {
        var _this3 = this;

        var topology = {};

        if (_underscore2.default.isNull(this.props.topology)) {
          return null;
        }

        var genericStyle = {
          node: {
            normal: { fill: "#B0B0B0", stroke: "#9E9E9E", cursor: "pointer" },
            selected: {
              fill: "#37B6D3",
              stroke: "rgba(55, 182, 211, 0.22)",
              strokeWidth: 10,
              cursor: "pointer"
            },
            muted: {
              fill: "#B0B0B0",
              stroke: "#9E9E9E",
              opacity: 0.6,
              cursor: "pointer"
            }
          },
          label: {
            normal: { fill: "#696969", stroke: "none", fontSize: 9 },
            selected: { fill: "#333", stroke: "none", fontSize: 11 },
            muted: {
              fill: "#696969",
              stroke: "none",
              fontSize: 8,
              opacity: 0.6
            }
          }
        };

        // Create a node list
        topology.nodes = _underscore2.default.map(
          this.props.topology.nodes,
          function(node) {
            var n = _underscore2.default.clone(node);

            // Radius is based on the type of node, given in the nodeSizeMap
            n.radius = _this3.nodeSize(node.type);
            n.labelPosition = node.label_position;
            n.labelOffsetX = node.label_dx;
            n.labelOffsetY = node.label_dy;

            var styleMap = _underscore2.default.has(
              _this3.props.stylesMap,
              node.type
            )
              ? _this3.props.stylesMap[node.type]
              : genericStyle;
            n.style = styleMap.node;
            n.labelStyle = styleMap.label;

            n.shape = _this3.nodeShape(node.name);
            return n;
          }
        );

        // Create the edge list
        topology.edges = _underscore2.default.map(
          this.props.topology.edges,
          function(edge) {
            var edgeName = edge.source + "--" + edge.target;
            return {
              width: _this3.edgeThickness(edge.capacity),
              classed: edge.capacity,
              source: edge.source,
              target: edge.target,
              totalCapacity: edge.total_capacity,
              ifaces: edge.ifaces,
              name: edgeName,
              shape: _this3.edgeShape(edgeName),
              curveDirection: _this3.edgeCurveDirection(edgeName),
              offset: _this3.edgeCurveOffset(edgeName)
            };
          }
        );

        // Create the path list, filtering based on what is in showPaths
        if (this.props.showPaths) {
          topology.paths = _underscore2.default.map(
            this.filteredPaths(),
            function(path) {
              var color = _underscore2.default.has(
                _this3.props.pathColorMap,
                path.name
              )
                ? _this3.props.pathColorMap[path.name]
                : "lightsteelblue";
              var width = _underscore2.default.has(
                _this3.props.pathWidthMap,
                path.name
              )
                ? _this3.props.pathWidthMap[path.name]
                : 4;
              return {
                name: path.name,
                steps: path.steps,
                color: color,
                width: width
              };
            }
          );
        }

        // Colorize the topology
        if (this.props.traffic) {
          if (
            !this.props.showPaths &&
            this.props.edgeDrawingMethod === "bidirectionalArrow"
          ) {
            _underscore2.default.each(topology.edges, function(edge) {
              var sourceTargetName = edge.source + "--" + edge.target;
              var targetSourceName = edge.target + "--" + edge.source;
              var sourceTargetTraffic = _this3.props.traffic.get(
                sourceTargetName
              );
              var targetSourceTraffic = _this3.props.traffic.get(
                targetSourceName
              );
              edge.sourceTargetColor = _this3.selectEdgeColor(
                sourceTargetTraffic
              );
              edge.targetSourceColor = _this3.selectEdgeColor(
                targetSourceTraffic
              );
            });
          } else {
            var edgeMap = {};
            _underscore2.default.each(this.filteredPaths(), function(path) {
              var pathAtoZTraffic = _this3.props.traffic.get(
                path.name + "--AtoZ"
              );
              var pathZtoATraffic = _this3.props.traffic.get(
                path.name + "--ZtoA"
              );

              var prev = null;
              _underscore2.default.each(path.steps, function(step) {
                if (prev) {
                  var sourceTargetName = prev + "--" + step;
                  if (!_underscore2.default.has(edgeMap, sourceTargetName)) {
                    edgeMap[sourceTargetName] = 0;
                  }
                  edgeMap[sourceTargetName] += pathAtoZTraffic;

                  var targetSourceName = step + "--" + prev;
                  if (!_underscore2.default.has(edgeMap, targetSourceName)) {
                    edgeMap[targetSourceName] = 0;
                  }
                  edgeMap[targetSourceName] += pathZtoATraffic;
                }
                prev = step;
              });
            });
            console.log(edgeMap);
            _underscore2.default.each(topology.edges, function(edge) {
              edge.stroke = _this3.props.edgeColor
                ? _this3.props.edgeColor
                : "#DDD";

              var sourceTargetName = edge.source + "--" + edge.target;
              var targetSourceName = edge.target + "--" + edge.source;

              if (_underscore2.default.has(edgeMap, sourceTargetName)) {
                var sourceTargetTraffic = edgeMap[sourceTargetName];
                edge.sourceTargetColor = _this3.selectEdgeColor(
                  sourceTargetTraffic
                );
              }
              if (_underscore2.default.has(edgeMap, targetSourceName)) {
                var targetSourceTraffic = edgeMap[targetSourceName];
                edge.targetSourceColor = _this3.selectEdgeColor(
                  targetSourceTraffic
                );
              }
            });
          }
        }

        topology.name = this.props.topology.name;
        topology.description = this.props.topology.description;

        return topology;
      }
    },
    {
      key: "handleSelectionChanged",
      value: function handleSelectionChanged(selectionType, selection) {
        if (this.props.onSelectionChange) {
          this.props.onSelectionChange(selectionType, selection);
        }
      }
    },
    {
      key: "render",
      value: function render() {
        var _this4 = this;

        var topo = this.buildTopology();
        var bounds = this.bounds();
        var aspect = (bounds.x2 - bounds.x1) / (bounds.y2 - bounds.y1);
        var autoSize = this.props.autoSize;

        var defaultStyle = {
          background: "#F6F6F6",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "#E6E6E6"
        };
        var style = this.props.style ? this.props.style : defaultStyle;

        if (autoSize) {
          return _react2.default.createElement(
            _Resizable.Resizable,
            { aspect: aspect, style: style },
            _react2.default.createElement(_BaseMap.BaseMap, {
              topology: topo,
              paths: topo.paths,
              bounds: bounds,
              width: this.props.width,
              height: this.props.height,
              margin: this.props.margin,
              selection: this.props.selection,
              edgeDrawingMethod: this.props.edgeDrawingMethod,
              onSelectionChange: function onSelectionChange(
                selectionType,
                selection
              ) {
                return _this4.handleSelectionChanged(selectionType, selection);
              }
            })
          );
        } else {
          return _react2.default.createElement(
            "div",
            { style: style },
            _react2.default.createElement("div", null, "Maps"),
            _react2.default.createElement(_BaseMap.BaseMap, {
              topology: topo,
              paths: topo.paths,
              bounds: bounds,
              width: this.props.width,
              height: this.props.height,
              margin: this.props.margin,
              selection: this.props.selection,
              edgeDrawingMethod: this.props.edgeDrawingMethod,
              onSelectionChange: function onSelectionChange(
                selectionType,
                selection
              ) {
                return _this4.handleSelectionChanged(selectionType, selection);
              }
            })
          );
        }
      }
    }
  ]);

  return TrafficMap;
})(_react2.default.Component));

TrafficMap.defaultProps = {
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

TrafficMap.propTypes = {
  /** The width of the circuit diagram */
  width: _propTypes2.default.number,

  /**
   * The topology structure, as detailed above. This contains the
   * descriptions of nodes, edges and paths used to render the topology
   */
  topology: _propTypes2.default.object,

  /**
   * Specified as an object containing x1, y1 and x2, y2. This is the region
   * to display on the map. If this isn't specified the bounds will be
   * calculated from the nodes in the Map.
   */
  bounds: _propTypes2.default.shape({
    x1: _propTypes2.default.number,
    y1: _propTypes2.default.number,
    x2: _propTypes2.default.number,
    y2: _propTypes2.default.number
  }),

  /**
   * The style of the container that surrounds the map
   */
  style: _propTypes2.default.object,

  /**
   * The is the overall rendering style for the edge connections. Maybe
   * one of the following strings:
   *
   *  * "simple" - simple line connections between nodes
   *  * "bidirectionalArrow" - network traffic represented by bi-directional arrows
   *  * "pathBidirectionalArrow" - similar to "bidirectionalArrow", but only for
   *  edges that are used in the currently displayed path(s).
   */
  edgeDrawingMethod: _propTypes2.default.oneOf([
    "simple",
    "bidirectionalArrow",
    "pathBidirectionalArrow"
  ]),

  /**
   * Either a boolean or a list of path names. If a bool, and true, then all
   * paths will be shown. If a list then only the paths in that list will be
   * shown. The default is to show no paths.
   */
  showPaths: _propTypes2.default.oneOfType([
    _propTypes2.default.bool,
    _propTypes2.default.arrayOf(_propTypes2.default.string)
  ]),

  /**
   * A mapping of the capacity field within the tologogy edge object
   * to a line thickness for rendering the edges.
   *
   * Example:
   *
   * ```
   * const edgeThinknessMap = {
   *     "100G": 5,
   *     "10G": 3,
   *     "1G": 1.5,
   *     "subG": 1
   * };
   * ```
   */
  edgeThinknessMap: _propTypes2.default.object,

  edgeColorMap: _propTypes2.default.array,

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
  nodeSizeMap: _propTypes2.default.object,

  /**
   * Mapping of node name to shape (default is "circle", other options are
   * "cloud" or "square", currently).
   *
   * Example:
   * ```
   * const nodeShapeMap = {
   *     DENV: "square"
   * };
   * ```
   */
  nodeShapeMap: _propTypes2.default.object,

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
  edgeShapeMap: _propTypes2.default.object,

  /** Display the endpoint selected */
  selected: _propTypes2.default.bool,

  /** The shape of the endpoint */
  shape: _propTypes2.default.oneOf(["circle", "square", "cloud"]),

  stylesMap: _propTypes2.default.object,

  autoSize: _propTypes2.default.bool
};
