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
import { stylesMap } from "../styles/styles.js";
import Endpoint from "../../src/circuit-diagram-endpoint";

const text = require("raw!../markdown/endpoint.md");

const labelPositionChoiceList = [
    "left",
    "right",
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
];

const shapeList = ["circle", "square", "cloud"];
const offsetList = [0, 15, 20, 25, 30];
const styleModifierList = ["normal", "selected", "muted"];
const radiusSizeList = [3, 5, 7, 10];

const Selector = React.createClass({

    handleChange(e) {
        const l = e.target.value;
        this.props.onChange(l);
    },

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>{option}</option>
            );
        });
        return (
            <select ref="menu" value={this.props.selected} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
});

export default React.createClass({

    getDefaultProps() {
        return {
            height: 270,
            width: 270
        };
    },

    getInitialState() {
        return {
            labelPosition: labelPositionChoiceList[0],
            shape: shapeList[0],
            offset: offsetList[0],
            styleModifier: styleModifierList[0],
            radiusSize: radiusSizeList[2],
            selectedStyle: false,
            mutedStyle: false
        };
    },

    handlePositionChange(labelPosition) {
        this.setState({labelPosition});
    },

    handleShapeChange(shape) {
        this.setState({shape});
    },

    handleOffsetChange(val) {
        const offset = parseInt(val, 10);
        this.setState({offset});
    },

    handleStyleModChange(l) {
        switch (l) {
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
        this.setState({styleModifier: l});
    },

    handleRadiusChange(l) {
        const i = parseInt(l,10);
        this.setState({radiusSize: i});
    },

    render() {
        const x = this.props.width / 2;
        const y = this.props.height / 2;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Endpoint</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h4>Endpoint example</h4>
                        <div>
                            <Selector
                                selected={this.state.labelPosition}
                                selectionList={labelPositionChoiceList}
                                onChange={this.handlePositionChange} />
                            <Selector
                                selected={this.state.offset}
                                selectionList={offsetList}
                                onChange={this.handleOffsetChange} />
                            <p>Select the "labelPosition" and "offset"</p>
                        </div>
                        <div>
                            <Selector
                                selected={this.state.shape}
                                selectionList={shapeList}
                                onChange={this.handleShapeChange} />
                            <p>Select the "shape"</p>
                        </div>
                        <div>
                            <Selector
                                selected={this.state.radiusSize}
                                selectionList={radiusSizeList}
                                onChange={this.handleRadiusChange} />
                            <p>Select the "radius" of the endpoint</p>
                        </div>
                        <div>

                            <Selector
                                selected={this.state.styleModifier}
                                selectionList={styleModifierList}
                                onChange={this.handleStyleModChange} />
                            <p>Select the "style"</p>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <h4>Endpoint Rendering</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <svg width={this.props.width}
                                     height={this.props.height}
                                     style={{borderStyle: "solid", borderWidth: 1, borderColor: "#ddd"}}>
                                    <g>
                                        <Endpoint
                                            x={x}
                                            y={y}
                                            style={stylesMap.endpoint1}
                                            labelPosition={this.state.labelPosition}
                                            label={this.state.labelPosition}
                                            offset={this.state.offset}
                                            shape={this.state.shape}
                                            radius={this.state.radiusSize}
                                            muted={this.state.mutedStyle}
                                            selected={this.state.selectedStyle} />
                                    </g>
                                </svg>
                            </div>
                        </div>
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
                        <APIDocs file="src/circuit-diagram-endpoint.jsx"/>
                    </div>
                </div>
            </div>
        );
    }
});
