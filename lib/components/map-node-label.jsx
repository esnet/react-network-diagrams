import React from "react";

export default React.createClass({
    render: function() {
        let textAnchor;
        switch (this.props.labelPosition) {
            case "left":
                textAnchor = "end";
                break;
            case "top":
            case "bottom":
                textAnchor = "middle";
                break;
            default:
                textAnchor = "start";
        }

        return (
            <text x={this.props.x}
                  y={this.props.y}
                  label={this.props.label}
                  textAnchor={textAnchor}
                  className={"map-label"}>
                {this.props.label}
            </text>
        );
    }
});

