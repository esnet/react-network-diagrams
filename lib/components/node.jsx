"use strict";

var React  = require("react");
var _      = require("underscore");

require("../styles/map.css");

var Node = React.createClass({

    getDefaultProps: function() {
        return {
            radius: 5,
            selected: false,
            shape: "circle",
            style: {}
        };
    },

    render: function() {
        var nodeClasses = "map-node";
        var labelClasses = "map-node-label";

        if (this.props.selected) {
            nodeClasses += " selected";
            labelClasses += " selected";
        }

        if (this.props.muted) {
            nodeClasses += " muted";
            labelClasses += " muted";
        }

        var basicOffset = this.props.radius * 1.33;
        var fontOffset = 8; // 0.8 * font size? ish..
        var labelX = this.props.x;
        var labelY = this.props.y;
        var textAnchor = "middle";

        switch (this.props.labelPosition) {
            case "left":
                labelX -= basicOffset;
                labelY += 5;
                textAnchor = "end";
                break;

            case "right":
                labelX += basicOffset;
                labelY += 5;
                textAnchor = "start";
                break;

            case "top":
                labelY -= basicOffset;
                break;

            case "topright":
                labelY -= basicOffset;
                labelX += basicOffset;
                textAnchor = "start";
                break;

            case "topleft":
                labelY -= basicOffset;
                labelX -= basicOffset;
                textAnchor = "end";
                break;

            case "bottom":
                labelY += basicOffset + fontOffset;
                break;

            case "bottomrigh":
                labelY += basicOffset + fontOffset;
                labelX += basicOffset;
                textAnchor = "start";
                break;

            case "bottomleft":
                labelY += basicOffset + fontOffset;
                labelX -= basicOffset;
                textAnchor = "end";
                break;

            default:
                break;
        }

        var nodeElement;
        if (this.props.shape === "cloud") {
            nodeClasses += " map-node-shape-cloud";
            labelClasses += " map-node-label-cloud";
            var cloudPath = "M" + this.props.x + "," + (this.props.y+5);
            cloudPath += "l-25,0 c-10,0 -10,-10 -5,-15";
            cloudPath += "c5,-5 15,-5 15,0 c0,-15 25,-15 25,-5 c10,-10 25,15 10,20 Z";
            nodeElement = <path d={cloudPath}
                                className={nodeClasses} />;

            switch (this.props.labelPosition) {
                case "top":
                case "topright":
                case "topleft":
                    labelY += 7;
                    break;
                case "bottom":
                case "bottomleft":
                case "bottomrigh":
                    labelY -= 15;
                    break;
            }

            labelX -= 3;

        } else if (this.props.shape === "square") {
            nodeClasses += " map-node-shape-square";
            labelClasses += " map-node-shape-square";
            var x = this.props.x - this.props.radius;
            var y = this.props.y - this.props.radius;
            var width = 2 * this.props.radius;
            nodeElement = (
              <rect x={x}
                    y={y}
                    width={width}
                    height={width}
                    className={nodeClasses} />
            );

            switch (this.props.labelPosition) {
                case "left":
                    labelX -= 2;
                    break;
                case "right":
                    labelX += 2;
                    break;
            }

        } else {
            nodeClasses += " map-node-shape-circle";
            labelClasses += " map-node-label-circle";

            console.log("style", this.props.style)

            nodeElement = (
              <circle cx={this.props.x}
                      cy={this.props.y}
                      r={this.props.radius}
                      style={this.props.style}
                      className={nodeClasses} />
            );
        }

        return (
            <g onClick={this._click}
               onMouseOver={this._mouseOver}>
                {nodeElement}
                <text x={labelX}
                      y={labelY}
                      textAnchor={textAnchor}
                      style={this.props.labelStyle}
                      className={labelClasses} >{this.props.label}</text>
            </g>
        );
    },

    _click: function(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("node", this.props.name);
        }

        e.stopPropagation();
    },

    _mouseOver: function() {
    }

});

module.exports = Node;