"use strict";

var React  = require("react");
var Vector = require("victor");
var _      = require("underscore");

require("../styles/map.css");

var SimpleEdge = React.createClass({

    getDefaultProps: function() {
        return {
            color: "#ddd",
            width: 4,
            position: 0,
            selected: false,
            muted: false
        };
    },

    render: function() {
        var classed = "map-edge";

        if (this.props.selected) {
            classed += " selected";
        }

        if (this.props.muted) {
            classed += " muted";
        }

        if (!_.isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        if (this.props.shape === "curved") {
            return (
                <ArcEdge x1={this.props.x1}
                         x2={this.props.x2}
                         y1={this.props.y1}
                         y2={this.props.y2}
                         color={this.props.color}
                         width={this.props.width}
                         position={this.props.position}
                         curveDirection={this.props.curveDirection}
                         classed={this.props.classed}
                         key={this.props.name}
                         name={this.props.name}
                         selected={this.props.selected}
                         muted={this.props.muted} />
            );
        } else {
            return (
                <LinearEdge x1={this.props.x1}
                            x2={this.props.x2}
                            y1={this.props.y1}
                            y2={this.props.y2}
                            color={this.props.color}
                            width={this.props.width}
                            position={this.props.position}
                            classed={this.props.classed}
                            key={this.props.name}
                            name={this.props.name}
                            selected={this.props.selected}
                            muted={this.props.muted} />
            );
        }
    }
});

module.exports = SimpleEdge;

