/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import _ from "underscore";
import Markdown from "react-markdown";
import APIDocs from "./docs";
import Connection from "../../src/circuit-diagram-connection";
import { stylesMap } from "../styles/styles.js";

const text = require("raw!../markdown/connection.md");

const styleModifierList = ["normal", "selected", "muted"];
const lineShapeList = ["linear", "curved", "square", "angled"];
const endpointShapeList = ["circle", "square", "cloud", "arrow"];
const noNavigateList = ["Yes", "No"];
const styleList = ["Style 1", "Style 2", "Style 3"];
const labelPositionChoiceList = ["top", "bottom", "center"];
const textAnchorList = ["middle", "begin", "end"];
const numberList = [0, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30];
const sizeList = [5, 10, 20, 40, 60, 100];
const positionList = [-90, -45, -30, -20, -15, -10, -3, -1, 0, 1, 3, 10, 15, 20, 30, 45, 90];
const curveDirectionList = ["left", "right"];
const xyChoiceList = [75, 125, 175, 225, 275, 325, 375, 425];

const Selector = React.createClass({

    handleChange(e) {
        const val = e.target.value;
        this.props.handleChange(val);
    },

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>{option}</option>
            );
        });
        return (
            <select
                ref="menu"
                style={{marginRight: 5}}
                value={this.props.selected}
                onChange={this.handleChange}>
                {options}
            </select>
        );
    }
});

export default React.createClass({

    getDefaultProps() {
        return {
            height: 500,
            width: 500
        };
    },

    getInitialState() {
        return {
            x1: xyChoiceList[0],
            x2: xyChoiceList[7],
            y1: xyChoiceList[3],
            y2: xyChoiceList[3],
            roundedX: numberList[4],
            roundedY: numberList[4],
            style: stylesMap.line1,
            position: positionList[8],
            lineShape: lineShapeList[0],
            labelPosition: labelPositionChoiceList[0],
            labelOffsetX: positionList[10],
            labelOffsetY: positionList[10],
            selectedStyle: false,
            mutedStyle: false,
            arrowStyle: false,
            noNavigate: false,
            arrowWidth: numberList[3],
            arrowHeight: numberList[3],
            radiusSize: numberList[2],
            endpointShape: endpointShapeList[0],
            styleModifier: styleModifierList[0],
            styleType: styleList[0],
            noNavigateChoice: noNavigateList[1],
            curveDirection: curveDirectionList[0],
            curveOffset: numberList[8],
            size: sizeList[3],
            bidirectionalChoice: noNavigateList[1],
            bendOffset: positionList[8],
            centerLine: false,
            centerLineChoice: noNavigateList[1],
            textAnchor: textAnchorList[0]
        };
    },

    handleEndpointShapeChange(val) {
        if (val === "arrow") {
            this.setState({arrowStyle: true});
            this.setState({endpointShape: val});
        } else {
            this.setState({arrowStyle: false});
            this.setState({endpointShape: val});
        }
    },

    handleNoNavigateChange(val) {
        switch (val) {
            case "Yes":
                this.setState({noNavigate: true});
                break;

            case "No":
                this.setState({noNavigate: false});
                break;

            default:
                break;
        }
        this.setState({noNavigateChoice: val});
    },

    handleCenterLineChange(val) {
        switch (val) {
            case "Yes":
                this.setState({centerLine: true});
                break;

            case "No":
                this.setState({centerLine: false});
                break;

            default:
                break;
        }
        this.setState({centerLineChoice: val});
    },

    handleStyleTypeChange(val) {
        switch (val) {
            case "Style 1":
                this.setState({style: stylesMap.line1});
                break;

            case "Style 2":
                this.setState({style: stylesMap.line2});
                break;

            case "Style 3":
                this.setState({style: stylesMap.line3});
                break;

            default:
                break;
        }
        this.setState({styleType: val});
    },

    handleStyleModChange(val) {
        switch (val) {
            case "normal":
                this.setState({mutedStyle: false});
                this.setState({selectedStyle: false});
                break;

            case "muted":
                this.setState({mutedStyle: true});
                this.setState({selectedStyle: false});
                break;

            case "selected":
                this.setState({mutedStyle: false});
                this.setState({selectedStyle: true});
                break;

            default:
                break;
        }
        this.setState({styleModifier: val});
    },

    handlePositionOffsetChange(val) {
        const i = parseInt(val,10);
        this.setState({position: i});
    },

    handleSelectionChange(e,val) {
        const message = `You clicked connection ${e} with name ${val}`;
        window.alert(message);
    },
    // these choices apply to all

    renderDefaultPropChoices() {
        return (
            <div>
                <div>
                    <Selector
                        selected={this.state.lineShape}
                        selectionList={lineShapeList}
                        handleChange={lineShape => this.setState({lineShape})} />
                    <p>Select the "lineShape" on the connection</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.x1}
                        selectionList={xyChoiceList}
                        handleChange={val => {
                            const x1 = parseInt(val, 10);
                            this.setState({x1});
                        }} />
                    <Selector
                        selected={this.state.y1}
                        selectionList={xyChoiceList}
                        handleChange={val => {
                            const y1 = parseInt(val, 10);
                            this.setState({y1});
                        }} />
                    <Selector
                        selected={this.state.x2}
                        selectionList={xyChoiceList}
                        handleChange={val => {
                            const x2 = parseInt(val, 10);
                            this.setState({x2});
                        }} />
                    <Selector
                        selected={this.state.y2}
                        selectionList={xyChoiceList}
                        handleChange={val => {
                            const y2 = parseInt(val, 10);
                            this.setState({y2});
                        }} />
                    <p>Select the "x1", "y1", "x2", "y2" position props for the connection</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.styleType}
                        selectionList={styleList}
                        handleChange={this.handleStyleTypeChange} />
                    <Selector
                        selected={this.state.styleModifier}
                        selectionList={styleModifierList}
                        handleChange={this.handleStyleModChange} />
                    <p>Select the line style preset and modifier</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.labelPosition}
                        selectionList={labelPositionChoiceList}
                        handleChange={labelPosition => this.setState({labelPosition})} />
                    <p>Select the "labelPosition" prop</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.textAnchor}
                        selectionList={textAnchorList}
                        handleChange={textAnchor => this.setState({textAnchor})} />
                    <p>Select the label's "textAnchor" prop</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.labelOffsetX}
                        selectionList={positionList}
                        handleChange={val => {
                            const labelOffsetX = parseInt(val, 10);
                            this.setState({labelOffsetX});
                        }} />
                    <Selector
                        selected={this.state.labelOffsetY}
                        selectionList={positionList}
                        handleChange={val => {
                            const labelOffsetY = parseInt(val, 10);
                            this.setState({labelOffsetY});
                        }} />
                    <p>Select the "labelOffsetX" and "labelOffsetY" label offset</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.noNavigateChoice}
                        selectionList={noNavigateList}
                        handleChange={this.handleNoNavigateChange} />
                    <p>Select whether to disable navigation</p>
                </div>
            </div>
        );
    },

    renderBiDirectionalChoice() {
        return (
            <div>
                <Selector selected={this.state.bidirectionalChoice}
                          selectionList={noNavigateList}
                          handleChange={val => {
                              this.setState({bidirectionalChoice: val});
                          }} />
                <p>Select to display bidirectional lines</p>
            </div>
        );
    },

    renderEndpointPropsChoices() {
        if (this.state.arrowStyle === true) {
            return (
                <div>
                    <div>
                        <Selector selected={this.state.endpointShape}
                                  selectionList={endpointShapeList}
                                  handleChange={this.handleEndpointShapeChange}/>
                        <p>Select the endpoint shape</p>
                    </div>
                    {this._renderArrowChoices()}
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <Selector selected={this.state.endpointShape}
                                  selectionList={endpointShapeList}
                                  handleChange={this.handleEndpointShapeChange}/>
                        <p>Select the endpoint shape</p>
                    </div>
                    <div>
                        <Selector selected={this.state.radiusSize}
                                  selectionList={numberList}
                                  handleChange={val => {
                                      const i = parseInt(val,10);
                                      this.setState({radiusSize: i});
                                  }} />
                        <p>Select the endpoint radius size</p>
                    </div>
                </div>
            );
        }
    },

    renderLinearChoices() {
        return (
            <div>
                <Selector selected={this.state.position}
                          selectionList={positionList}
                          handleChange={this.handlePositionOffsetChange} />
                <p>Select line position offset</p>
            </div>
        );
    },

    renderCurvedChoices() {
        return (
            <div>
                <div>
                    <Selector selected={this.state.position}
                              selectionList={positionList}
                              handleChange={this.handlePositionOffsetChange} />
                    <p>Select line position offset</p>
                </div>
                <div>
                    <Selector selected={this.state.curveDirection}
                              selectionList={curveDirectionList}
                              handleChange={val => {
                                  this.setState({curveDirection: val});
                              }} />
                    <Selector selected={this.state.curveOffset}
                              selectionList={numberList}
                              handleChange={val => {
                                  const i = parseInt(val,10);
                                  this.setState({curveOffset: i});
                              }} />
                    <p>Select the curve direction and offset</p>
                </div>
            </div>
        );
    },

    _renderArrowChoices() {
        return (
            <div>
                <Selector selected={this.state.arrowWidth}
                          selectionList={numberList}
                          handleChange={val => {
                              const i = parseInt(val,10);
                              this.setState({arrowWidth: i});
                          }} />
                <Selector selected={this.state.arrowHeight}
                          selectionList={numberList}
                          handleChange={val => {
                              const i = parseInt(val,10);
                              this.setState({arrowHeight: i});
                          }} />
                <p>Select arrow height and arrow width</p>
            </div>
        );
    },

    renderSquareChoices() {
        return (
            <div>
                <div>
                    <Selector selected={this.state.roundedX}
                              selectionList={numberList}
                              handleChange={val => {
                                  const i = parseInt(val,10);
                                  this.setState({roundedX: i});
                              }} />
                    <Selector selected={this.state.roundedY}
                              selectionList={numberList}
                              handleChange={val => {
                                  const i = parseInt(val,10);
                                  this.setState({roundedY: i});
                              }} />
                    <p>Select the x and y square corner rounding</p>
                </div>
                <div>
                    <Selector selected={this.state.size}
                              selectionList={sizeList}
                              handleChange={val => {
                                  const i = parseInt(val,10);
                                  this.setState({size: i});
                              }} />
                    <p>Select the height of the square</p>
                </div>
                <div>
                    <Selector selected={this.state.centerLineChoice}
                              selectionList={noNavigateList}
                              handleChange={this.handleCenterLineChange} />
                    <p>Select to render a center line</p>
                </div>
            </div>
        );
    },

    renderAngledChoices() {
        return (
            <div>
                <div>
                    <Selector selected={this.state.position}
                              selectionList={positionList}
                              handleChange={this.handlePositionOffsetChange} />
                    <p>Select the position angle</p>
                </div>
                <div>
                    <Selector selected={this.state.curveDirection}
                              selectionList={curveDirectionList}
                              handleChange={val => {
                                  this.setState({curveDirection: val});
                              }} />
                    <Selector selected={this.state.bendOffset}
                              selectionList={positionList}
                              handleChange={val => {
                                  const i = parseInt(val,10);
                                  this.setState({bendOffset: i});
                              }} />
                    <p>Select the direction and offset length</p>
                </div>
            </div>
        );
    },

    renderSimpleConnection() {
        return (
            <svg width={this.props.width}
                 height={this.props.height}
                 style={{borderStyle: "solid", borderWidth: 1, borderColor: "#ddd"}}>
                <g>
                    <Connection x1={this.state.x1}
                                x2={this.state.x2}
                                y1={this.state.y1}
                                y2={this.state.y2}
                                roundedX={this.state.roundedX}
                                roundedY={this.state.roundedY}
                                style={this.state.style}
                                position={this.state.position}
                                lineShape={this.state.lineShape}
                                label={`${this.state.labelPosition}-${this.state.textAnchor}`}
                                labelPosition={this.state.labelPosition}
                                labelOffsetX={this.state.labelOffsetX}
                                labelOffsetY={this.state.labelOffsetY}
                                textAnchor={this.state.textAnchor}
                                curveOffset={this.state.curveOffset}
                                bendOffset={this.state.bendOffset}
                                curveDirection={this.state.curveDirection}
                                muted={this.state.mutedStyle}
                                selected={this.state.selectedStyle}
                                arrow={this.state.arrowStyle}
                                arrowWidth={this.state.arrowWidth}
                                arrowHeight={this.state.arrowHeight}
                                radius={this.state.radiusSize}
                                endpointShape={this.state.endpointShape}
                                noNavigate={this.state.noNavigate}
                                size={this.state.size}
                                centerLine={this.state.centerLine}
                                onSelectionChange={this.handleSelectionChange}
                                navTo={this.state.labelPosition}/>
                </g>
            </svg>
        );
    },

    renderBiDirectionalConnection() {
        return (
            <svg width={this.props.width}
                 height={this.props.height}
                 style={{borderStyle: "solid", borderWidth: 1, borderColor: "#ddd"}}>
                <g>
                    <Connection x1={this.state.x1}
                                x2={this.state.x2}
                                y1={this.state.y1}
                                y2={this.state.y2}
                                roundedX={this.state.roundedX}
                                roundedY={this.state.roundedY}
                                style={this.state.style}
                                position={this.state.position}
                                lineShape={this.state.lineShape}
                                label={`${this.state.labelPosition}-${this.state.textAnchor}`}
                                labelPosition={this.state.labelPosition}
                                labelOffsetX={this.state.labelOffsetX}
                                labelOffsetY={this.state.labelOffsetY}
                                textAnchor={this.state.textAnchor}
                                curveOffset={this.state.curveOffset}
                                bendOffset={this.state.bendOffset}
                                curveDirection={this.state.curveDirection}
                                muted={this.state.mutedStyle}
                                selected={this.state.selectedStyle}
                                arrow={this.state.arrowStyle}
                                arrowWidth={this.state.arrowWidth}
                                arrowHeight={this.state.arrowHeight}
                                radius={this.state.radiusSize}
                                endpointShape={this.state.endpointShape}
                                noNavigate={this.state.noNavigate}
                                size={this.state.size}
                                centerLine={this.state.centerLine}
                                onSelectionChange={this.handleSelectionChange}
                                navTo={this.state.labelPosition}/>
                </g>
                <g>
                    <Connection x1={this.state.x2}
                                x2={this.state.x1}
                                y1={this.state.y2}
                                y2={this.state.y1}
                                roundedX={this.state.roundedX}
                                roundedY={this.state.roundedY}
                                style={this.state.style}
                                position={this.state.position}
                                lineShape={this.state.lineShape}
                                label={`${this.state.labelPosition}-${this.state.textAnchor}`}
                                labelPosition={this.state.labelPosition}
                                labelOffsetX={this.state.labelOffsetX}
                                labelOffsetY={this.state.labelOffsetY}
                                textAnchor={this.state.textAnchor}
                                curveOffset={this.state.curveOffset}
                                bendOffset={this.state.bendOffset}
                                curveDirection={this.state.curveDirection}
                                muted={this.state.mutedStyle}
                                selected={this.state.selectedStyle}
                                arrow={this.state.arrowStyle}
                                arrowWidth={this.state.arrowWidth}
                                arrowHeight={this.state.arrowHeight}
                                radius={this.state.radiusSize}
                                endpointShape={this.state.endpointShape}
                                noNavigate={this.state.noNavigate}
                                size={this.state.size}
                                centerLine={this.state.centerLine}
                                onSelectionChange={this.handleSelectionChange}
                                navTo={this.state.labelPosition}/>
                </g>
            </svg>
        );
    },

    renderConnection() {
        if (this.state.bidirectionalChoice === "Yes") {
            return (
                <div>
                    {this.renderBiDirectionalConnection()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderSimpleConnection()}
                </div>
            );
        }
    },

    determineShapeRendering() {
        switch (this.state.lineShape) {
            case "linear":
                return this.renderLinearChoices();
            case "curved":
                return this.renderCurvedChoices();
            case "square":
                return this.renderSquareChoices();
            case "angled":
                return this.renderAngledChoices();
            default:
                break;
        }
    },

    render() {
        const toRender = this.determineShapeRendering();
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Connection Example</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <h4>Connection Options</h4>
                        {this.renderBiDirectionalChoice()}
                        <p><strong>Line Properties</strong></p>
                        {this.renderDefaultPropChoices()}
                        <strong>Line shape unique properties</strong>
                        {toRender}
                        <br />
                        <strong>Line cap properties</strong>
                        {this.renderEndpointPropsChoices()}
                    </div>

                    <div className="col-md-8">
                        <h4>Connection Rendering</h4>
                        {this.renderConnection()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <Markdown source={text} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <APIDocs file="src/circuit-diagram-connection.jsx"/>
                    </div>
                </div>
            </div>
        );
    }
});
