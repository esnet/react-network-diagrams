import React from "react";
import Node from "./node";
import Label from "./edge-label";

export default React.createClass({
    getInitialState() {
        return { highlighted: false };
    },

    getDefaultProps() {
        return {
            radius: 15
        };
    },

    /**
     * User hovers over the power node
     */
    handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },

    /**
     * Use stops hovering over power node
     */
    handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    },

    handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("power Node", this.props.name);
        }
        e.stopPropagation();
    },

    drawLabel(x, y, label, position, offset) {
        let cy = y;
        if (offset) {
            cy = y + 20;
        }
        const labelClassed = "power-node-label";
        const labelElement = (
            <Label
                key="power-node-label"
                x={x}
                y={cy}
                classed={labelClassed}
                style={this.props.labelStyle.normal}
                label={label}
                labelPosition={position}
            />
        );
        return labelElement;
    },

    render() {
        const { powerNode, key } = this.props;
        let muted = false;
        if (powerNode.equipment.length === 0 && !this.props.selected) {
            muted = true;
        }
        return (
            <g
                key={`powerNode-${key}`}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onClick={this.handleClick}
            >
                <Node
                    x={powerNode.x}
                    y={powerNode.y}
                    key={`${powerNode.label}-${powerNode.id}`}
                    style={powerNode.style.node}
                    radius={this.props.radius}
                    shape={"circle"}
                    label={powerNode.label}
                    labelPosition={"right"}
                    labelStyle={this.props.labelStyle}
                    highlighted={this.state.highlighted}
                    selected={this.props.selected}
                    muted={muted}
                />
                {this.drawLabel(powerNode.x, powerNode.y, `${powerNode.type}`, "center")}
            </g>
        );
    }
});
