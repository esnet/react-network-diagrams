"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _powerNode = require("./power-node");

var _powerNode2 = _interopRequireDefault(_powerNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: "power-node-list",
    getDefaultProps: function getDefaultProps() {
        return {
            xOffset: 10,
            yOffset: 30,
            positionLabelStyle: {
                fill: "#9D9D9D",
                fontSize: 10,
                fontFamily: "verdana, sans-serif"
            }
        };
    },
    assignPowerNodes: function assignPowerNodes(power) {
        /* Power nodes are positioned around a rack in one of 9 potential locations
        in the format Vertical - Horizontal:
        
        Above - Left
        Above - Middle
        Above - Right
        Center - Left
        Center - Middle
        Center - Right
        Below - Left
        Below - Middle
        Below - Right
        
        There may be multiple nodes at each location, and will need to be rendered next to each other
        */

        var nodes = {
            "Above-Left": [],
            "Above-Center": [],
            "Above-Right": [],
            "Center-Left": [],
            "Center-Center": [],
            "Center-Right": [],
            "Below-Left": [],
            "Below-Center": [],
            "Below-Right": []
        };

        // Assign nodes to their position.  Each position will have 0 or more nodes
        _underscore2.default.each(power, function (powerNode) {
            var position = powerNode.vPos + "-" + powerNode.hPos;
            // get the current length of the nodes position
            nodes[position].push(powerNode);
        });

        var newNodes = {};
        _underscore2.default.each(nodes, function (node, name) {
            if (node.length > 0) {
                newNodes[name] = node;
            }
        });
        return [_underscore2.default.flatten(_underscore2.default.values(nodes)), newNodes];
    },
    renderPositionLabel: function renderPositionLabel(label, x, y) {
        return _react2.default.createElement(
            "text",
            {
                key: "position-" + label,
                x: x,
                y: y,
                textAnchor: "start",
                style: this.props.positionLabelStyle
            },
            label
        );
    },
    drawPowerNode: function drawPowerNode(powerNode, key) {
        return _react2.default.createElement(_powerNode2.default, {
            powerNode: powerNode,
            name: powerNode.navTo,
            selected: powerNode.id === this.props.selected,
            key: key,
            labelStyle: powerNode.style.label,
            onSelectionChange: this.props.onSelectionChange
        });
    },
    positionPowerNodes: function positionPowerNodes(newNodes) {
        var _this = this;

        var elements = [];
        var xStart = this.props.xOffset;
        var yStart = this.props.yOffset;
        _underscore2.default.each(newNodes, function (group, groupName) {
            var label = _this.renderPositionLabel(groupName, xStart, yStart);
            yStart += 30;
            elements.push(label);
            _underscore2.default.each(group, function (powerNode, val) {
                var key = groupName + "-" + val;
                powerNode["x"] = xStart + 20;
                powerNode["y"] = yStart;
                elements.push(_this.drawPowerNode(powerNode, key));
                yStart += 55;
            });
        });
        return elements;
    },
    render: function render() {
        var powerElements = this.assignPowerNodes(this.props.powerNodes);
        var groups = _underscore2.default.map(powerElements[1], function (group, groupName) {
            return groupName;
        });
        var groupCount = groups.length;
        var nodeCount = powerElements[0].length;

        var totalHeight = groupCount * 12 + nodeCount * 60 + this.props.yOffset * 2;
        var powerContainer = {
            normal: {
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderWidth: 1,
                borderTopColor: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
                width: "100%",
                height: totalHeight
            }
        };

        var className = "rack-container";
        var svgStyle = powerContainer.normal;

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "svg",
                { className: className, style: svgStyle },
                this.positionPowerNodes(powerElements[1])
            )
        );
    }
});