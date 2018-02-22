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
        var powerNode = this.props.powerNode;

        var muted = false;
        if (powerNode.equipment.length === 0 && !this.props.selected) {
            muted = true;
        }
        return _react2.default.createElement(
            "g",
            {
                key: "powerNode-" + powerNode.label,
                onMouseOver: this.handleMouseOver,
                onMouseOut: this.handleMouseOut,
                onClick: this.handleClick
            },
            _react2.default.createElement(_node2.default, {
                x: powerNode.x,
                y: powerNode.y,
                style: powerNode.style.node,
                radius: this.props.radius,
                shape: "circle",
                label: powerNode.label,
                labelPosition: "right",
                labelStyle: this.props.labelStyle,
                highlighted: this.state.highlighted,
                selected: this.props.selected,
                muted: muted
            }),
            this.drawLabel(powerNode.x, powerNode.y, "" + powerNode.type, "center")
        );
    }
});