"use strict";

var React = require("react");
var _ = require("underscore");
var Bootstrap = require("react-bootstrap");
var util = require("util");
var AttachedCircuits = require("./location-diagram-connection.jsx")

var Base = require("esnet-react-base");

var PANEL_WIDTH  = 851;
var PANEL_HEIGHT = 851;
var COUPLER_HEIGHT = 60;
var COUPLER_WIDTH = 90;

function isLetter(str) {
  return str.length === 1 && str.match(/[a-zA-Z]/i);
}

var PatchPanelDiagram = React.createClass({

    displayName: "PatchPanelDiagram",

    getInitialState: function() {
        return { "hover": false };
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            titleOffsetX: 10,
            titleOffsetY: 20,
            yOffset: 30,
            scale: 25,
            margin: 150,
            moduleSpacing: 5
        };
    },


    renderPanelLabel: function(yStart, label) {
        var y = yStart-(this.props.yOffset/2);
        var x = (PANEL_WIDTH/2);
        return (
            <g>
                <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fontSize:"14", fill:"#737373"}}>
                    {label}
                </text>
            </g>
        );
    },

    renderFrontBackLabel: function(yStart) {
        var x = (PANEL_WIDTH/2);
        var xLeft = x - COUPLER_WIDTH + (COUPLER_WIDTH/4)
        var xRight = x + COUPLER_WIDTH - (COUPLER_WIDTH/4)
        var yDown = yStart 
        var front = "FRONT"
        var back = "BACK"
        return (
            <g>
                <text className="esdb-circuit-label" key="panel-front" x={xLeft} y={yDown}>
                    {front}
                </text>
                <text className="esdb-circuit-label" key="panel-back" x={xRight} y={yDown}>
                    {back}
                </text>
            </g>
        );
    },

    renderCouplerLabel: function(label, x, y) {
        if (label.split("-").length > 2) {
            var nLabel = label.split("-")
            if (isLetter(nLabel[0])) {
                return (
                    <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill:"#737373"}}>
                        {label}
                    </text>
                );
            } else {
                var pLabel = nLabel[0]
                nLabel.shift()
                var cLabel = nLabel.join("-")
                var moduleY = y-7
                var portY = y+7
                return (
                    <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill:"#737373"}}>
                        <tspan x={x} y={moduleY}>{pLabel}</tspan>
                        <tspan x={x} y={portY}>{cLabel}</tspan>
                    </text>
                ); 
            }
        } else {
            return (
                <text className="esdb-circuit-label" key="panel-label" x={x} y={y} style={{fill:"#737373"}}>
                    {label}
                </text>
            );
        }       
    },

    renderPatchPanels: function(panels) {
        var self = this
        var yStart = this.props.yOffset;
        var panelDiagrams = [];
        _.each(panels, function(modules, panelLabel) {
            if (modules.length > 1) {
                //draw the first module
                var couplerCount = modules[0].length
                panelDiagrams.push(self.renderFrontBackLabel(yStart))
                panelDiagrams.push(self.renderPatchPanel(yStart, modules[0], panelLabel))
                yStart = yStart + (COUPLER_HEIGHT*couplerCount) + (self.props.moduleSpacing);
                //draw the rest of the modules
                
                _.each(modules, function(module, index) {
                    if (index > 0) {
                        var couplerCount = module.length
                        var blankLabel = "";
                        panelDiagrams.push(self.renderPatchPanel(yStart, module, blankLabel))  
                        if (index == (modules.length - 1)) {
                            yStart = yStart + (COUPLER_HEIGHT*couplerCount) + (self.props.yOffset*2);
                        } else {
                            yStart = yStart + (COUPLER_HEIGHT*couplerCount) + (self.props.moduleSpacing);
                        };    
                    }
                })
            } else {
                _.each(modules, function(module) {
                    var couplerCount = module.length
                    panelDiagrams.push(self.renderFrontBackLabel(yStart))
                    panelDiagrams.push(self.renderPatchPanel(yStart, module, panelLabel))
                    yStart = yStart + (COUPLER_HEIGHT*couplerCount) + (self.props.yOffset*2);
                })
            }
        })
        return (
            {panelDiagrams}
        )
    },

    renderPatchPanel: function(yStart, panel, label) {
        var typeClass = "panel";
        var ClassSet = React.addons.classSet;

        var cc = {"esdb-circuit-edge": true,
                  "hover": this.props.placeholder ? false : this.state.hover,
                  "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        };
        
        var coupler = ClassSet(cc);
        
        var height = panel.length * COUPLER_HEIGHT;
        var b = (PANEL_WIDTH/2) - (COUPLER_WIDTH/2);
        var e = (PANEL_WIDTH/2) + (COUPLER_WIDTH/2);
        var y = yStart;
        var rectLength = COUPLER_WIDTH;
        return (
            <g> 
                <rect width={rectLength} x={b} y={y} height={height} rx={2} ry={2} style={{fill:"#E8E8E8"}}/>
                {this.renderCouplerLine(y, panel, b, e)}
                <rect className={coupler} width={rectLength} x={b} y={y} height={height} rx={2} ry={2}/>
                {this.renderPanelLabel(y, label)}
                {this.renderCoupler(y, panel, b, e)}
            </g>
        )
    },

    renderCouplerLine: function(yStart, panel, b, e) {
        var self = this;
        var typeClass = "panel-delimiter";
        var ClassSet = React.addons.classSet;

        var cc = {"esdb-circuit-edge": true,
                  "hover": this.props.placeholder ? false : this.state.hover,
                  "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        };
        
        var coupler = ClassSet(cc);

        var Pos = yStart + COUPLER_HEIGHT;
        var elements = []
        _.each(panel, function(c) {
            var lpts = [];
            lpts.push(util.format("%d,%d", b, Pos));
            lpts.push(util.format("%d,%d", e, Pos));
            var lpoints = lpts.join(" ");
            elements.push(
                <g> 
                    <polyline className={coupler} points={lpoints}/>
                </g>
            )
            Pos = Pos + COUPLER_HEIGHT;
        })
        return elements;
    },

    renderCoupler: function(yStart, panel, b, e){
        var self = this;
        var typeClass = "coupler";
        var ClassSet = React.addons.classSet;

        var cc = {"esdb-circuit-edge": true,
                  "hover": this.props.placeholder ? false : this.state.hover,
                  "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        };
        
        var coupler = ClassSet(cc);

        var Pos = yStart + COUPLER_HEIGHT;
        var elements = []
        _.each(panel, function(c) {            
            var fb = b - (COUPLER_WIDTH/10);
            var bb = e - (COUPLER_WIDTH/10);
            var y = Pos - (COUPLER_HEIGHT/2) - (COUPLER_HEIGHT/4)
            var rectLength = COUPLER_WIDTH/5;       
            var height = COUPLER_HEIGHT/2;
            var ly = Pos - (COUPLER_HEIGHT/2);
            var lx = PANEL_WIDTH/2;
            var lb = e + (COUPLER_WIDTH/10);

            var xbegin = self.props.margin;
            var xend = PANEL_WIDTH - self.props.margin;

            elements.push(
                <g> 
                    {self.renderEndpoint(c.couplerFrontCircuit, xbegin, ly, c.frontLabel)}
                    {self.renderEndpoint(c.couplerFrontCircuit, fb, ly, null)}
                    {self.renderEndpoint(c.couplerBackCircuit, lb, ly, null)}
                    {self.renderEndpoint(c.couplerBackCircuit, xend, ly, c.backLabel)}
                    <rect className={coupler} width={rectLength} 
                                              x={fb} y={y} height={height} rx={2} ry={2}
                                              style={{fill:"#F8F8F8"}}/>
                    <rect className={coupler} width={rectLength} 
                                              x={bb} y={y} height={height} rx={2} ry={2}
                                              style={{fill:"#F8F8F8"}}/>                    
                    {self.renderCircuit(c.couplerFrontCircuit, xbegin, fb, ly, xbegin, fb)}                  
                    {self.renderCircuit(c.couplerBackCircuit, lb, xend, ly, xend, lb)}
                    {self.renderCouplerLabel(c.couplerName, lx, ly)}
                </g>
            );
            Pos = Pos + COUPLER_HEIGHT;
        })
        return elements;
    },

    renderCircuit: function(coupler, b, e, y, ex, ex2) {
        return (
            <AttachedCircuits.Circuit circuit={coupler}
                                      begin={b}
                                      end={e}
                                      yOffset={y}
                                      endpointX={ex}
                                      endpointX2={ex2}/>
        )
    },

    renderEndpoint: function(coupler, b, y, label) {
        return (
            <AttachedCircuits.Endpoint circuit={coupler}
                                       begin={b}
                                       yOffset={y}
                                       label={label}/>
        )
    },


    render: function() {
        var self = this;
        
        /* We need to group all the couplers into panels, and determine how many panels
        exist to properly size the SVG window
        */

        var panels = _.groupBy(this.props.couplers, function(c) {return c.panel});
        var numPanels = _.size(panels)
        
        /* Panels may have submodules, which are built into the coupler name, and are allways in the 0th
        index of the name string preceding a '-'.  Modules should never start with an integer, so a parseInt of the 0th value
        of the couplerName string should return NaN if there is a module.  If no module is found, return the
        panel name to create one giant group which will be treated as a single module
        */
        
        var moduleOffset = 0
        var sortedPanels = {}
        _.each(panels, function(panel, name){
            //We assume submodule names are a string with no hyphenation, and not a single number
            var subModules = _.groupBy(panel, function(c) {
                if (isNaN(c["couplerName"].split("-")[0]) && c["couplerName"].split("-").length > 2) {
                    return c["couplerName"].split("-")[0]
                } else {
                    return c["panel"];
                }
            }); 
            
            /* The couplers in each module may be unordered depending on when they were created.  These 
            need to be sorted incrementally by their port number which is safely after the first "/" in the
            panel name
            */
            
            var sortedSubModules = _.map(subModules, function(subModule) {
                return _.sortBy(subModule, function(c) {
                    return parseInt(c["couplerName"].split("/")[1]);
                });              
            });
            
            /* We are spacing the modules apart so we need to take into account any panels that have multiple 
            modules so we can add this value to the dynamic sizing
            */
            if (sortedSubModules.length > 1) {
                moduleOffset = moduleOffset + (sortedSubModules.length - 1) * self.props.moduleSpacing
            }

            sortedPanels[name] = sortedSubModules  
        });
        //determine the viewbox height
        var heightFromCouplers = this.props.couplers.length * COUPLER_HEIGHT
        var offsetTotal = (numPanels -1) * (this.props.yOffset*2)
        var topAndBottomOffset = (this.props.yOffset*2)

        var viewBoxHeight = heightFromCouplers + offsetTotal + moduleOffset + topAndBottomOffset;
        var viewBox = "0 0 " + PANEL_WIDTH + " " + viewBoxHeight;
        return (
                <svg className="esdb-circuit-container" width="100%" viewBox={viewBox} preserveAspectRatio="xMinYMin">
                    {this.renderPatchPanels(sortedPanels)}
                </svg>
           
        );
    }
});

module.exports = PatchPanelDiagram;

