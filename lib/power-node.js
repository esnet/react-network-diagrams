"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: "power-node",
    getInitialState: function getInitialState() {
        return { highlighted: false };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            radius: 15
        };
    },


    /**
     * User hovers over the power node
     */
    handleMouseOver: function handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },


    /**
     * Use stops hovering over power node
     */
    handleMouseOut: function handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    },
    handleClick: function handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("power Node", this.props.name);
        }
        e.stopPropagation();
    },
    drawLabel: function drawLabel(x, y, label, position, offset) {
        var cy = y;
        if (offset) {
            cy = y + 20;
        }
        var labelClassed = "power-node-label";
        var labelElement = _react2.default.createElement(_edgeLabel2.default, {
            key: "power-node-label",
            x: x,
            y: cy,
            classed: labelClassed,
            style: this.props.labelStyle.normal,
            label: label,
            labelPosition: position
        });
        return labelElement;
    },
    render: function render() {
        var _props = this.props,
            powerNode = _props.powerNode,
            key = _props.key;

        //let label1 = powerNode.label;
        //let label2 = powerNode.connector;

        return _react2.default.createElement(
            "g",
            {
                key: "powerNode-" + key,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleClick
            },
            _react2.default.createElement(_node2.default, {
                x: powerNode.x,
                y: powerNode.y,
                key: powerNode.label + "-" + powerNode.id,
                style: powerNode.style.node,
                radius: this.props.radius,
                shape: "circle",
                label: powerNode.label,
                labelPosition: "right",
                labelStyle: this.props.labelStyle,
                highlighted: this.state.highlighted,
                selected: this.props.selected,
                invisible: true
            }),
            this.drawLabel(powerNode.x, powerNode.y, "" + powerNode.type, "center")
        );
    }
});
/*<text
                    key={`source-${powerNode.source}`}
                    x={powerNode.x + this.props.radius * 1.33}
                    y={powerNode.y - this.props.radius * 0.33}
                    textAnchor={"start"}
                    style={this.props.labelStyle["normal"]}
                >
                    {powerNode.source}
                </text>
                <text
                    key={`label-${label1}`}
                    x={powerNode.x + this.props.radius * 1.33}
                    y={powerNode.y + this.props.radius * 0.66}
                    textAnchor={"start"}
                    style={this.props.labelStyle["normal"]}
                >
                    {label1}
                </text>
                <text
                    key={`label-${label2}`}
                    x={powerNode.x}
                    y={powerNode.y + this.props.radius * 2}
                    textAnchor={"middle"}
                    style={this.props.labelStyle["normal"]}
                >
                    {label2}
                </text>
switch (powerNode.hPos) {
            case "Left":
                return (
                    <g key={`powerNode-${key}`}>
                        <text
                            key={`source-${powerNode.source}`}
                            x={powerNode.x - this.props.radius * 1.33}
                            y={powerNode.y - this.props.radius * 0.33}
                            textAnchor={"end"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {powerNode.source}
                        </text>
                        <text
                            key={`label-${label1}`}
                            x={powerNode.x - this.props.radius * 1.33}
                            y={powerNode.y + this.props.radius * 0.66}
                            textAnchor={"end"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {label1}
                        </text>
                        <text
                            key={`label-${label2}`}
                            x={powerNode.x}
                            y={powerNode.y + this.props.radius * 2}
                            textAnchor={"middle"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {label2}
                        </text>
                        <Node
                            x={powerNode.x}
                            y={powerNode.y}
                            key={`${powerNode.label}-${powerNode.id}`}
                            style={powerNode.style.node}
                            radius={this.props.radius}
                            shape={"circle"}
                        />
                        {this.drawLabel(powerNode.x, powerNode.y, `${powerNode.type}`, "center")}
                    </g>
                );
            default:
                return (
                    <g key={`powerNode-${key}`}>
                        <text
                            key={`source-${powerNode.source}`}
                            x={powerNode.x + this.props.radius * 1.33}
                            y={powerNode.y - this.props.radius * 0.33}
                            textAnchor={"start"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {powerNode.source}
                        </text>
                        <text
                            key={`label-${label1}`}
                            x={powerNode.x + this.props.radius * 1.33}
                            y={powerNode.y + this.props.radius * 0.66}
                            textAnchor={"start"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {label1}
                        </text>
                        <text
                            key={`label-${label2}`}
                            x={powerNode.x}
                            y={powerNode.y + this.props.radius * 2}
                            textAnchor={"middle"}
                            style={this.props.labelStyle["normal"]}
                        >
                            {label2}
                        </text>
                        <Node
                            x={powerNode.x}
                            y={powerNode.y}
                            key={`${powerNode.label}-${powerNode.id}`}
                            style={powerNode.style.node}
                            radius={this.props.radius}
                            shape={"circle"}
                        />
                        {this.drawLabel(powerNode.x, powerNode.y, `${powerNode.type}`, "center")}
                    </g>
                );
        }
    }
});
*/