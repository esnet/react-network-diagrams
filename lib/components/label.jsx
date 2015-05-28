import React from "react";

import "../styles/map.css";

var Label = React.createClass({
    render: function() {
        var textAnchor;

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

module.exports = Label;
