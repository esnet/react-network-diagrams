/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import _ from "underscore";
import PropTypes from "prop-types";

import { Connection } from "./Connection";
import { Endpoint } from "./Endpoint";
import { Label } from "./Label";

export class PatchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange(e, value) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    }

    renderPanelLabel(yStart, label, key) {
        const y = yStart - this.props.panelSpacing / 2;
        const x = this.props.width / 2;
        const labelStyle = {
            fontSize: 14,
            fontFamily: "verdana, sans-serif",
            fill: "#737373",
            textAnchor: "middle"
        };
        return (
            <g key={`panel-name-${key}`}>
                <Label
                    x={x}
                    y={y}
                    label={label}
                    labelPosition="center"
                    labelClassed="panel-name"
                    style={labelStyle}
                />
            </g>
        );
    }

    renderFrontBackLabel(yStart, key) {
        const x = this.props.width / 2;
        const xLeft = x - this.props.width / 9;
        const xRight = x + this.props.width / 9;
        const yDown = yStart;
        const front = "FRONT";
        const back = "BACK";
        const labelStyle = {
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 10,
            textAnchor: "middle"
        };
        return (
            <g key={`panel-frontback-${key}`}>
                <text
                    className="frontback-label"
                    key={`panel-front-${key}`}
                    style={labelStyle}
                    x={xLeft}
                    y={yDown}
                >
                    {front}
                </text>
                <text
                    className="frontback-label"
                    key={`panel-back-${key}`}
                    style={labelStyle}
                    x={xRight}
                    y={yDown}
                >
                    {back}
                </text>
            </g>
        );
    }

    renderPanels(panelMap) {
        const elements = [];
        const panelWidthOffset = this.props.panelWidth;
        const panelStyle = this.props.panelStyle;

        // determine the middle of the svg element
        const midpt = this.props.width / 2;

        // determing the x location and width for the outer panel shape from the panelWidthOffest

        const panelX = midpt - this.props.couplerStyle.squareWidth / 2 - panelWidthOffset;
        const width = this.props.couplerStyle.squareWidth + panelWidthOffset * 2;

        // set the start of the panel at the yOffset from the top
        let panelY = this.props.yOffset;
        _.each(this.props.panels, (panel, panelIndex) => {
            // draw a panel
            elements.push(
                <g key={`panel-${panelIndex}`}>
                    <rect
                        className="panel"
                        width={width}
                        height={panelMap[panel.panelName]}
                        style={panelStyle}
                        x={panelX}
                        y={panelY}
                        rx={this.props.panelRoundedX}
                        ry={this.props.panelRoundedY}
                    />
                </g>
            );

            // set the start of the module group at the spacing below the panel start +
            // 1/2 the coupler height.  This will place the y at the middle of the coupler group

            let moduleY = panelY + this.props.moduleSpacing + this.props.couplerStyle.size / 2;

            _.each(panel.modules, module => {
                // draw all the circuit groups in a module

                elements.push(this.renderModule(module, moduleY));
                // after each module is finished, space the next module start at the middle
                // of the first coupler group, offset by the module spacing
                moduleY +=
                    this.props.moduleSpacing +
                    module.length * this.props.couplerStyle.size +
                    (module.length - 1) * this.props.couplerSpacing;
            });
            elements.push(this.renderFrontBackLabel(panelY, panelIndex));
            elements.push(this.renderPanelLabel(panelY, panel.panelName, panelIndex));

            // once all panel modules are done, start the next module at the next panel
            // using the spacing derived from the svg box height
            panelY += this.props.panelSpacing + panelMap[panel.panelName];
        });
        return elements;
    }

    renderModule(module, moduleY) {
        // moduleY is y1, y2 of the first circuitGroup in the module

        const elements = [];
        let y = moduleY;

        // draw each circuit group in the module
        _.each(module, (circuitGroup, groupIndex) => {
            // draw the endpoints
            elements.push(this.renderEndpoints(circuitGroup, y, groupIndex));
            // draw the lines
            elements.push(this.renderConnections(circuitGroup, y, groupIndex));
            y += this.props.couplerStyle.size + this.props.couplerSpacing;
        });
        return elements;
    }

    /**
     * draws 0, 2, or 4 endpoints - determined by presence of Front, Back and Coupler
     */
    renderEndpoints(circuitGroup, y, key) {
        const elements = [];
        const midpt = this.props.width / 2;
        let circuit;
        let x1;
        let x2;

        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 =
                midpt -
                circuitGroup.coupler.styleProperties.squareWidth / 2 -
                this.props.couplerEndpointRadius;
            elements.push(
                <g key={`endpoint-${circuit.endpointLabelA}-${key}`}>
                    <Endpoint
                        x={x1}
                        y={y}
                        style={circuit.endpointStyle}
                        labelStyle={circuit.endpointStyle.label}
                        labelPosition="bottomleftangled"
                        label={circuitGroup.frontLabel}
                    />
                </g>
            );
            elements.push(
                <g key={`endpoint-${circuit.endpointLabelZ}-${key}`}>
                    <Endpoint x={x2} y={y} style={circuit.endpointStyle} />
                </g>
            );
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 =
                midpt +
                circuitGroup.coupler.styleProperties.squareWidth / 2 +
                this.props.couplerEndpointRadius;
            x2 = this.props.width - this.props.margin;
            elements.push(
                <g key={`endpoint-${circuit.endpointLabelA}-${key}`}>
                    <Endpoint x={x1} y={y} style={circuit.endpointStyle} />
                </g>
            );
            elements.push(
                <g key={`endpoint-${circuit.endpointLabelZ}-${key}`}>
                    <Endpoint
                        x={x2}
                        y={y}
                        style={circuit.endpointStyle}
                        labelStyle={circuit.endpointStyle.label}
                        labelPosition="bottomrightangled"
                        label={circuitGroup.backLabel}
                    />
                </g>
            );
        }
        return elements;
    }

    renderConnections(circuitGroup, y, key) {
        // draws center coupler and either front, back or both circuits

        const elements = [];
        const midpt = this.props.width / 2;
        let circuit;
        let x1;
        let x2;
        if (circuitGroup.coupler) {
            circuit = circuitGroup.coupler;
            x1 = midpt - circuit.styleProperties.squareWidth / 2;
            x2 = midpt + circuit.styleProperties.squareWidth / 2;
            elements.push(
                <g key={`coupler-${circuit.circuitLabel}-${key}`}>
                    <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        roundedX={this.props.roundedX}
                        roundedY={this.props.roundedY}
                        endPointRoundedX={this.props.endpointRoundedX}
                        endPointRoundedY={this.props.endPointRoundedY}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition={this.props.couplerLabelPosition}
                        labelOffsetX={this.props.labelOffsetX}
                        labelOffsetY={this.props.labelOffsetY}
                        radius={this.props.couplerEndpointRadius}
                        endpointShape="square"
                        size={circuit.styleProperties.size}
                        onSelectionChange={this.handleSelectionChange}
                        noNavigate={circuit.styleProperties.noNavigate}
                        navTo={circuit.navTo}
                    />
                </g>
            );
        }
        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 =
                midpt -
                circuitGroup.coupler.styleProperties.squareWidth / 2 -
                this.props.couplerEndpointRadius;
            elements.push(
                <g key={`frontCircuit-${circuit.circuitLabel}-${key}`}>
                    <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition={this.props.labelPosition}
                        onSelectionChange={this.handleSelectionChange}
                        noNavigate={circuit.styleProperties.noNavigate}
                        navTo={circuit.navTo}
                    />
                </g>
            );
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 =
                midpt +
                circuitGroup.coupler.styleProperties.squareWidth / 2 +
                this.props.couplerEndpointRadius;
            x2 = this.props.width - this.props.margin;
            elements.push(
                <g key={`backCircuit-${circuit.circuitLabel}-${key}`}>
                    <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition={this.props.labelPosition}
                        onSelectionChange={this.handleSelectionChange}
                        noNavigate={circuit.styleProperties.noNavigate}
                        navTo={circuit.navTo}
                    />
                </g>
            );
        }
        return elements;
    }

    render() {
        // Styling
        const classed = "panel-container";
        const circuitContainer = {
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#EFEFEF"
        };

        let numPanels = 0;
        let viewBoxHeight = 0;
        const yOffset = this.props.yOffset;
        const moduleSpacing = this.props.moduleSpacing;
        const panelSpacing = this.props.panelSpacing;
        const panelMap = {};

        // Calculate the height for each panel and store this in a mapping by panel name
        _.each(this.props.panels, panel => {
            numPanels += 1; // 1
            const moduleCount = panel.modules.length; // 2
            let couplerCount = 0;
            _.each(panel.modules, module => {
                couplerCount += module.length; // 6
            });
            const panelHeight =
                couplerCount * this.props.couplerStyle.size +
                (couplerCount - moduleCount) * this.props.couplerSpacing +
                (moduleCount + 1) * moduleSpacing;
            viewBoxHeight += panelHeight;
            panelMap[panel.panelName] = panelHeight;
        });

        // dynamic viewBoxHeight
        viewBoxHeight += yOffset * 3 + (numPanels - 1) * panelSpacing;

        // Draw in order - Panel Rectangles, Circuit Endpoints, Circuit Connections
        return (
            <svg
                key="panel-container"
                width={this.props.width}
                height={viewBoxHeight}
                className={classed}
                style={circuitContainer}
                onClick={this._deselect}
            >
                <svg key="panel-box" preserveAspectRatio="xMinYMin">
                    {this.renderPanels(panelMap)}
                </svg>
            </svg>
        );
    }
}

PatchPanel.propTypes = {
    /** The blank margin around the diagram drawing */
    margin: PropTypes.number,

    labelPosition: PropTypes.oneOf([
        "left",
        "right",
        "center",
        "top",
        "topright",
        "topleft",
        "bottom",
        "bottomright",
        "bottomleft",
        "bottomleftangled",
        "bottomrightangled",
        "topleftangled",
        "toprightangled"
    ]),

    /** The width of the circuit diagram */
    width: PropTypes.number,

    /**
     * To accurately display each panel, modules, and groups of circuits,
     * the Patch Panel requires an array of panels, where each panel contains
     * a panel object.  The panel object has two keys, `panelName` to display
     * the title of the panel, and `modules` which is a two dimensional array
     * of coupler objects.  The rendering is sequential, and will display each
     * panel, with the panels modules and coupler groupings  in the order they
     * are presented in the list.
     *
     * Each module in the two-dimensional `modules` array is an array of
     * coupler groupings objects.  The coupler groupings objects allways have:
     *
     *  * `frontCircuit` - The circuit and its properties to be displayed to
     *  the left of the coupler.  May be left `null`
     *  * `backCircuit` - The circuit and its properties to be displayed to
     *  the right of the coupler.  May be left `null`
     *  * `coupler` - The circuit and its properties to be displayed in the
     *  center
     *
     * Each of these objects have there own style, labels, and navigation
     * controls.  The below structure, will render one panel, with one module,
     * with 2 coupler groups.
     *
     * ```js
     * const panels = [
     *     {
     *         panelName: "Panel 1",
     *         modules: [
     *             [
     *                  {
     *                      frontCircuit: {
     *                          styleProperties: circuitTypeProperties.crossConnect,
     *                          endpointStyle: stylesMap.endpoint,
     *                          endpointLabelA: "Endpoint 1",
     *                          endpointLabelZ: "Endpoint 2",
     *                          circuitLabel: "Member 1",
     *                          navTo: "Member 1",
     *                      },
     *                      coupler: {
     *                          styleProperties: circuitTypeProperties.panelCoupler,
     *                          endpointStyle: circuitTypeProperties.panelCoupler,
     *                          endpointLabelA: "Endpoint 2",
     *                          endpointlabelZ: "Endpoint 3",
     *                          circuitLabel: "1/2-SC",
     *                          navTo: "Coupler 1/2",
     *                      },
     *                      backCircuit: {
     *                          styleProperties: circuitTypeProperties.leased,
     *                          endpointStyle: stylesMap.endpoint,
     *                          endpointLabelA: "Endpoint 3",
     *                          endpointLabelZ: "Endpoint 4",
     *                          circuitLabel: "Member 3",
     *                          navTo: "Member 3",
     *                      },
     *                      frontLabel: "Endpoint A",
     *                      backLabel: "Endpoint Z",
     *                  },
     *                  {
     *                      frontCircuit: null,
     *                      coupler: {
     *                          styleProperties: circuitTypeProperties.panelCoupler,
     *                          endpointStyle: circuitTypeProperties.panelCoupler,
     *                          endpointLabelA: "Endpoint 2",
     *                          endpointlabelZ: "Endpoint 3",
     *                          circuitLabel: "3/4-SC",
     *                          navTo: "Coupler 3/4",
     *                      },
     *                      backCircuit: null,
     *                      frontLabel: "Endpoint A",
     *                      backLabel: "Endpoint Z",
     *                  },
     *              ]
     *          ]
     *      }
     * ];
     * ```
     */
    panels: PropTypes.array.isRequired,

    /**
     * The style of the panel - this is the "container" for the modules and couplers.
     */
    panelStyle: PropTypes.object,

    /**
     * The style for the couplers, rendered in groups according to their modules.
     */
    couplerStyle: PropTypes.object,

    /**
     * This is the vertical distance from the center line to offset the connection label
     */
    yOffset: PropTypes.number,

    /**
     * This is the vertical spacing between each module group
     */
    moduleSpacing: PropTypes.number,

    /**
     * This is the vertical spacing between each panel
     */
    panelSpacing: PropTypes.number,

    /**
     * This is the vertical spacing between each coupler
     */
    couplerSpacing: PropTypes.number,

    /**
     * This is the distance from the center of the \<svg\> grid that the panel
     * is to be rendered
     */
    panelWidth: PropTypes.number,

    /**
     * Callback evoked when the selection changes
     */
    onSelectionChange: PropTypes.func,

    /**
     * This is the distance from the endpoint that the endpoint label will be rendered.
     */
    endpointLabelOffset: PropTypes.number,

    //
    // The following props have default values and are optional for styling:
    //

    /**
     * Controls the corner rounding of the center coupler on the x-axis
     */
    roundedX: PropTypes.number,

    /**
     * Controls the corner rounding of the center coupler on the y-axis
     */
    roundedY: PropTypes.number,

    /**
     * Controls the size of the couper line cap
     */
    couplerEndpointRadius: PropTypes.number,

    /**
     * Controls the corner rounding of the square line-caps on the x-axis
     */
    endpointRoundedX: PropTypes.number,

    /**
     * Controls the corner rounding of the square line-caps on the y-axis
     */
    endpointRoundedY: PropTypes.number,

    /**
     * Controls where label is situated in the center coupler
     */
    couplerLabelPosition: PropTypes.oneOf(["top", "bottom", "center"]),

    /**
     * Controls the corner rounding of the panel on the x-axis
     */
    panelRoundedX: PropTypes.number,

    /**
     * Controls the corner rounding of the panel on the y-axis
     */
    panelRoundedY: PropTypes.number,

    /**
     * Controls the +/- x offset from labelPosition
     */
    labelOffsetX: PropTypes.number,

    /**
     * Controls the +/- y offset from labelPosition
     */
    labelOffsetY: PropTypes.number
};

PatchPanel.defaultProps = {
    width: 851,
    yOffset: 30,
    margin: 150,
    roundedX: 5,
    roundedY: 5,
    couplerEndpointRadius: 10,
    endpointRoundedX: 2,
    endpointRoundedY: 2,
    couplerLabelPosition: "center",
    labelPosition: "top",
    panelRoundedX: 3,
    panelRoundedY: 3,
    labelOffsetX: 0,
    labelOffsetY: 0
};
