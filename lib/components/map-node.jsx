import React from "react";

export default React.createClass({

    getDefaultProps: function() {
        return {
            radius: 5,
            selected: false,
            shape: "circle",
            style: {}
        };
    },

    render: function() {
        let nodeClasses = "map-node";
        let labelClasses = "map-node-label";
        let styleModifier = "normal";
        if (this.props.selected) {
            styleModifier = "selected";
            nodeClasses += " selected";
            labelClasses += " selected";
        }
        if (this.props.muted) {
            styleModifier = "muted";
            nodeClasses += " muted";
            labelClasses += " muted";
        }

        const basicOffset = this.props.radius * 1.33;

        // 0.8 * font size? ish..
        const fontOffset = 8;

        let labelX = this.props.x;
        let labelY = this.props.y;
        let textAnchor = "middle";
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

        let nodeElement;
        if (this.props.shape === "cloud") {
            nodeClasses += " map-node-shape-cloud";
            labelClasses += " map-node-label-cloud";

            let cloudPath = `M${this.props.x},${this.props.y + 5}`;
            cloudPath += "l-25,0 c-10,0 -10,-10 -5,-15";
            cloudPath += "c5,-5 15,-5 15,0 c0,-15 25,-15 25,-5 c10,-10 25,15 10,20 Z";

            nodeElement = <path d={cloudPath}
                                style={this.props.style[styleModifier]}
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
                default:
                    break;
            }
            labelX -= 3;
        } else if (this.props.shape === "square") {
            nodeClasses += " map-node-shape-square";
            labelClasses += " map-node-shape-square";
            const x = this.props.x - this.props.radius;
            const y = this.props.y - this.props.radius;
            const width = 2 * this.props.radius;
            nodeElement = (
              <rect x={x}
                    y={y}
                    width={width}
                    height={width}
                    style={this.props.style[styleModifier]}
                    className={nodeClasses} />
            );

            switch (this.props.labelPosition) {
                case "left":
                    labelX -= 2;
                    break;
                case "right":
                    labelX += 2;
                    break;
                default:
                    break;
            }
        } else {
            nodeClasses += " map-node-shape-circle";
            labelClasses += " map-node-label-circle";
            nodeElement = (
                <circle cx={this.props.x}
                        cy={this.props.y}
                        r={this.props.radius}
                        style={this.props.style[styleModifier]}
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
                      style={this.props.labelStyle[styleModifier]}
                      className={labelClasses} >{this.props.label}</text>
            </g>
        );
    },

    _click: function(e) {
        e.stopPropagation();
        var self = this

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("node", this.props.name);
        }
        
        $('#nodeModalText').val(this.props.name)
        $('#nodeModalButton').click()
        
        var rgb = $(React.findDOMNode(self)).children().css('fill')
        rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',')

        $('#nodeRedSlider').val(rgb[0])
        updateSlider(rgb[0], "Red")
        

        $('#nodeGreenSlider').val(rgb[1])
        updateSlider(rgb[1], "Green")

        $('#nodeBlueSlider').val(rgb[2])
        updateSlider(rgb[2], "Blue")


        $('#saveNodeChanges').off().on('click', function() {
            var val = $('#nodeModalText').val()
            self.props.name = val
            $(React.findDOMNode(self)).children().html(val)
            var rgb = 'rgb(' + $('#nodeRedSlider').val() + ', '
                             + $('#nodeGreenSlider').val() + ', '
                             + $('#nodeBlueSlider').val() + ')'
            $(React.findDOMNode(self)).children().css({'fill': rgb})

        })
    },

    _mouseOver: function() {
    }

});

