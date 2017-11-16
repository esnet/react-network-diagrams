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

        //let label1 = powerNode.label;
        //let label2 = powerNode.connector;
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
                    invisible={true}
                />
                {this.drawLabel(powerNode.x, powerNode.y, `${powerNode.type}`, "center")}
            </g>
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
