"use strict";

var React = require("react");
var _ = require("underscore");
var util = require("util");

var Base = require("esnet-react-base");


var PANEL_WIDTH  = 851;
var PANEL_HEIGHT = 851;
var COUPLER_HEIGHT = 50;
var COUPLER_WIDTH = 80;

var Circuit = React.createClass({

    displayName: "Circuit",

    getInitialState: function() {
        return { "hover": false };
    },

    getDefaultProps: function() {
        return {
            width: PANEL_WIDTH,
            offset: 0,
            scale: 25,
            begin: 0,
            end: 651,
            endPointRadius: 2
        };
    },

    /**
     * User hovers over the circuit
     */
    _mouseOver: function() {
        if (!this.props.noNavigate) {
            this.setState({"hover": true});
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut: function() {
        if (!this.props.noNavigate) {
            this.setState({"hover": false});
        }
    },

    /**
     * User selects the circuit
     */
    _click: function(e) {
        if (this.props.noNavigate) {
            return;
        }
        if (this.props.navigate) {
            Backbone.history.navigate("circuit/view/" + this.props.navigate, {trigger: true});
        } else if (this.props.circuit.id) {
            Backbone.history.navigate("circuit/view/" + this.props.circuit.id, {trigger: true});
        }
       e.stopPropagation();
    },

    renderLabel: function(label, x, y) {
        var yOffset = y-10;
        return (
            <text className="esdb-circuit-label" key="endpoint-label" x={x} y={yOffset}>
                {label}
            </text>
        );
    },

    renderEndpoints: function(x, y) {
        var ClassSet = React.addons.classSet;
        var c = ClassSet({
            "esdb-circuit-dot": true,
            "hover": this.state.hover,
            "placeholder": this.props.placeholder
        });
        
        return (
            <g>
                <circle className={c} key="line-begin"
                    cx={x} cy={y} r={this.props.endPointRadius}/>
            </g>
        );
    },

    renderLine: function(type, b, e, dx, dy, y) {
        var typeClass;

        //Mapping circuit_type ids to classes
        if (type == "1") {
            typeClass = "esnet-optical";
        } else if (type == "2") {
            typeClass = "leased-circuit";
        } else if (type == "3") {
            typeClass = "dark-fiber";
        } else if (type == "4") {
            typeClass = "equipment-equipment";
        } else if (type == "5") {
            typeClass = "cross-connect";
        }

        //Classes
        var ClassSet = React.addons.classSet;

        var cc = {"esdb-circuit-edge": true,
                  "hover": this.props.placeholder ? false : this.state.hover,
                  "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }
        
        var edge = ClassSet(cc);
        var hit = ClassSet({
            "esdb-circuit-hitstroke": true,
            "inactive": this.props.noNavigate
        });

        var pts = [];
            pts.push(util.format("%d,%d", b, y));
            pts.push(util.format("%d,%d", e, y));
            var points = pts.join(" ");
            return (
                <g>
                    <polyline className={edge} key="line-polypath" points={points} />
                    <polyline className={hit} key="line-polypath-hit" points={points}
                              onMouseOver={this._mouseOver}
                              onMouseOut={this._mouseOut}
                              onClick={this._click} />
                </g>
            );
    },

    render: function() {
        var type;
        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];   
        }
        var width;
        width = this.props.width;
        var dy = this.props.offset*this.props.scale;
        var dx = this.props.scale*2;
        var begin = this.props.begin;
        var end = this.props.end;
        var y = this.props.yOffset;        
        var middle = begin + (end - begin)/2;

        var label = this.props.circuit ? this.props.circuit["circuit_id"] : "";
        var circuit = this.props.circuit
        
        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];   
            return (
                <g>
                    {this.renderLine(type, begin, end, dx, dy, y)}
                    {this.renderEndpoints(this.props.endpointX, y)}
                    {this.renderEndpoints(this.props.endpointX2, y)}
                    {this.renderLabel(label, middle, y)}
                </g>
            )
        } else {
            return (
                <g>
                </g>
            )
        }
     }
});


var Endpoint = React.createClass({

    displayName: "Endpoint",

    getDefaultProps: function() {
        return {
            margin: 50,
            radius: 7,
            width: PANEL_WIDTH,
            labelOffsetY: 20
        };
    },

    render: function() {
        var x = this.props.begin // * this.props.width;
        var y = this.props.yOffset
        var transform = "translate(" + x + " " + y + ")";
        var ClassSet = React.addons.classSet;
        var c = ClassSet({
            "esdb-circuit-endpoint": true,
        });
        
        var label = this.props.label || "";
        if (this.props.circuit) {
            return (
                <g key="endpoint-group" transform={transform}>
                    <circle className={c} key="endpoint-circle"
                            cx={0} cy={0} r={this.props.radius} />
                    <text className="esdb-circuit-label" key="endpoint-label" x={0} y={this.props.labelOffsetY}>
                        {label}
                    </text>
                </g>
            );
        } else {
            return (
                <g>
                </g>
            )
        }
    }
});

// Exports
module.exports.Endpoint = Endpoint;
module.exports.Circuit = Circuit;

