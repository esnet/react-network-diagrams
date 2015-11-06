/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

"use strict";

import React from "react";
import _ from "underscore";
import Connection from "./circuit-diagram-connection.jsx";
import Endpoint from "./circuit-diagram-endpoint.jsx";
import Label from "./edge-label.jsx";

export default React.createClass({

    getInitialState() {
        return { hover: false };
    },

    getDefaultProps() {
        return {
            width: 851,
            yOffset: 30,
            margin: 150,

        };
    },

    _onSelectionChange(e,l) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e,l);
        }
    },

    _renderPanelLabel(yStart, label, key) {
        const y = yStart - (this.props.panelSpacing / 2);
        const x = (this.props.width / 2);
        const labelStyle = {
            fontSize: 14,
            fontFamily: "verdana, sans-serif",
            fill: "#737373",
            textAnchor: "middle"
        };
        return (
            <g
                key={`panel-name-${key}`}>
                <Label
                    x={x}
                    y={y}
                    label={label}
                    labelPosition="center"
                    labelClassed="panel-name"
                    style={labelStyle} />
            </g>
        );
    },

    _renderFrontBackLabel(yStart, key) {
        const x = this.props.width / 2;
        const xLeft = x - (this.props.width / 9);
        const xRight = x + (this.props.width / 9);
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
            <g
                key={`panel-frontback-${key}`}>
                <text
                    className="frontback-label"
                    key={`panel-front-${key}`}
                    style={labelStyle}
                    x={xLeft}
                    y={yDown}>
                    {front}
                </text>
                <text
                    className="frontback-label"
                    key={`panel-back-${key}`}
                    style={labelStyle}
                    x={xRight}
                    y={yDown}>
                    {back}
                </text>
            </g>
        );
    },

    _renderPanels(panelMap) {
        const elements = [];
        const panelWidthOffset = this.props.panelWidth;
        const panelStyle = this.props.panelStyle;

        // determine the middle of the svg element
        const midpt = this.props.width / 2;

        // determing the x location and width for the outer panel shape from the panelWidthOffest

        const panelX = midpt - (this.props.couplerStyle.squareWidth / 2) - panelWidthOffset;
        const width = (this.props.couplerStyle.squareWidth + (panelWidthOffset * 2));

        // set the start of the panel at the yOffset from the top
        let panelY = this.props.yOffset;
        _.each(this.props.panels, (panel, panelIndex) => {
            // draw a panel
            elements.push(
                <g
                    key={`panel-${panelIndex}`}>
                    <rect
                        className="panel"
                        width={width}
                        height={panelMap[panel.panelName]}
                        style={panelStyle}
                        x={panelX}
                        y={panelY}
                        rx={3}
                        ry={3} />
                </g>
            );

            // set the start of the module group at the spacing below the panel start +
            // 1/2 the coupler height.  This will place the y at the middle of the coupler group

            let moduleY = panelY + this.props.moduleSpacing + (this.props.couplerStyle.size / 2);

            _.each(panel.modules, module => {
                // draw all the circuit groups in a module

                elements.push(
                    this._renderModule(module, moduleY)
                );
                // after each module is finished, space the next module start at the middle
                // of the first coupler group, offset by the module spacing
                moduleY += this.props.moduleSpacing + (module.length * this.props.couplerStyle.size) +
                           ((module.length - 1) * this.props.couplerSpacing);
            });
            elements.push(
                this._renderFrontBackLabel(panelY, panelIndex)
            );
            elements.push(
                this._renderPanelLabel(panelY, panel.panelName, panelIndex)
            );

            // once all panel modules are done, start the next module at the next panel
            // using the spacing derived from the svg box height
            panelY += this.props.panelSpacing + panelMap[panel.panelName];
        });
        return (
            elements
        );
    },

    _renderModule(module, moduleY) {
        // moduleY is y1, y2 of the first circuitGroup in the module

        const elements = [];
        let y = moduleY;

        // draw each circuit group in the module
        _.each(module, (circuitGroup, groupIndex) => {
            // draw the endpoints
            elements.push(
                this._renderEndpoints(circuitGroup, y, groupIndex)
            );
            // draw the lines
            elements.push(
                this._renderConnections(circuitGroup, y, groupIndex)
            );
            y += this.props.couplerStyle.size + this.props.couplerSpacing;
        });
        return (
            elements
        );
    },

    _renderEndpoints(circuitGroup, y, key) {
        // draws 0, 2, or 4 endpoints - determined by presence of Front, Back and Coupler

        const elements = [];
        const midpt = this.props.width / 2;
        let circuit;
        let x1;
        let x2;
        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 = midpt - (circuitGroup.coupler.styleProperties.squareWidth / 2) - 10;
            elements.push(
                <g
                    key={`endpoint-${circuit.endpointLabelA}-${key}`}>
                    <Endpoint
                        x={x1}
                        y={y}
                        style={circuit.endpointStyle}
                        labelStyle={circuit.endpointStyle.label}
                        labelPosition="bottomleftangled"
                        label={circuitGroup.frontLabel} />
                </g>
            );
            elements.push(
                <g
                    key={`endpoint-${circuit.endpointLabelZ}-${key}`}>
                    <Endpoint
                        x={x2}
                        y={y}
                        style={circuit.endpointStyle} />
                </g>
            );
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 = midpt + (circuitGroup.coupler.styleProperties.squareWidth / 2) + 10;
            x2 = this.props.width - this.props.margin;
            elements.push(
                <g
                    key={`endpoint-${circuit.endpointLabelA}-${key}`}>
                    <Endpoint
                        x={x1}
                        y={y}
                        style={circuit.endpointStyle} />
                </g>
            );
            elements.push(
                <g
                    key={`endpoint-${circuit.endpointLabelZ}-${key}`}>
                    <Endpoint
                        x={x2}
                        y={y}
                        style={circuit.endpointStyle}
                        labelStyle={circuit.endpointStyle.label}
                        labelPosition="bottomrightangled"
                        label={circuitGroup.backLabel} />
                </g>
            );
        }
        return (
            elements
        );
    },

    _renderConnections(circuitGroup, y, key) {
        // draws center coupler and either front, back or both circuits

        const elements = [];
        const midpt = this.props.width / 2;
        let circuit;
        let x1;
        let x2;
        if (circuitGroup.coupler) {
            circuit = circuitGroup.coupler;
            x1 = midpt - (circuit.styleProperties.squareWidth / 2);
            x2 = midpt + (circuit.styleProperties.squareWidth / 2);
            elements.push(
                <g
                    key={`coupler-${circuit.circuitLabel}-${key}`}>
                   <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        roundedX={5}
                        roundedY={5}
                        endPointRoundedX={2}
                        endPointRoundedY={2}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition="center"
                        labelOffsetX={0}
                        labelOffsetY={0}
                        radius={10}
                        endpointShape="square"
                        size={circuit.styleProperties.size}
                        onSelectionChange={this._onSelectionChange}
                        navTo={circuit.navTo}/>
                </g>
            );
        }
        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 = midpt - (circuitGroup.coupler.styleProperties.squareWidth / 2) - 10;
            elements.push(
                <g
                    key={`frontCircuit-${circuit.circuitLabel}-${key}`}>
                   <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition="top"
                        onSelectionChange={this._onSelectionChange}
                        navTo={circuit.navTo}/>
                </g>
            );
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 = midpt + (circuitGroup.coupler.styleProperties.squareWidth / 2) + 10;
            x2 = this.props.width - this.props.margin;
            elements.push(
                <g
                    key={`backCircuit-${circuit.circuitLabel}-${key}`}>
                   <Connection
                        x1={x1}
                        x2={x2}
                        y1={y}
                        y2={y}
                        style={circuit.styleProperties.style}
                        lineShape={circuit.styleProperties.lineShape}
                        label={circuit.circuitLabel}
                        labelPosition="top"
                        onSelectionChange={this._onSelectionChange}
                        navTo={circuit.navTo}/>
                </g>
            );
        }
        return (
            elements
        );
    },


    render() {
        // Styling
        const classed = "panel-container";
        const circuitContainer = {
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#EFEFEF",
            width: "100%",
            height: this.props.height,
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
            const panelHeight = (couplerCount * this.props.couplerStyle.size) +
                                ((couplerCount - moduleCount) * this.props.couplerSpacing) +
                                ((moduleCount + 1) * moduleSpacing);
            viewBoxHeight += panelHeight;
            panelMap[panel.panelName] = panelHeight;
        });

        // dynamic viewBoxHeight
        viewBoxHeight += (yOffset * 3) + ((numPanels - 1) * panelSpacing);
        const viewBox = `0 0 ${this.props.width} ${viewBoxHeight}`;

        // Draw in order - Panel Rectangles, Circuit Endpoints, Circuit Connections
        return (
            <svg
                viewBox={viewBox}
                key="panel-container"
                className={classed}
                style={circuitContainer}
                onClick={this._deselect}>
                <svg
                    key="panel-box"
                    preserveAspectRatio="xMinYMin">
                    {this._renderPanels(panelMap)}
                </svg>
            </svg>
        );
    }
});
