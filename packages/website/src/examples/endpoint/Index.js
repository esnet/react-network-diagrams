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
import { stylesMap } from "../../styles/styles.js";
import { Endpoint } from "react-network-diagrams";

var mocha = require("react-network-diagrams");
console.log("react-network-diagrams is ", mocha);

console.log("Endpoint is ", Endpoint);
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

class Selector extends React.Component {

    handleChange(e) {
        const l = e.target.value;
        this.props.onChange(l);
    }

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>{option}</option>
            );
        });
        return (
            <select ref="menu" value={this.props.selected} onChange={this.handleChange.bind(this)}>
                {options}
            </select>
        );
    }
};

class endpoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labelPosition: labelPositionChoiceList[0],
            shape: shapeList[0],
            offset: offsetList[0],
            styleModifier: styleModifierList[0],
            radiusSize: radiusSizeList[2],
            selectedStyle: false,
            mutedStyle: false
        };

        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleShapeChange = this.handleShapeChange.bind(this);
        this.handleOffsetChange = this.handleOffsetChange.bind(this);
        this.handleStyleModChange = this.handleStyleModChange.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
    }

    handlePositionChange(labelPosition) {
        this.setState({labelPosition});
    }

    handleShapeChange(shape) {
        this.setState({shape});
    }

    handleOffsetChange(val) {
        const offset = parseInt(val, 10);
        this.setState({offset});
    }

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
    }

    handleRadiusChange(l) {
        const i = parseInt(l,10);
        this.setState({radiusSize: i});
    }

    render() {
        const x = this.props.width / 2;
        const y = this.props.height / 2;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
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
                        <div className="row">
                            <div className="col-md-12">
                                <svg
                                    width={this.props.width}
                                    height={this.props.height}
                                    style={{borderStyle: "solid", borderWidth: 1, borderColor: "#ddd"}}
                                >
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
                                            selected={this.state.selectedStyle}
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

endpoint.defaultProps = {
    height: 270,
    width: 270
};

// Export example
import endpoint_docs from "raw!./endpoint_docs.md";
import endpoint_thumbnail from "./endpoint_thumbnail.png";
export default {endpoint, endpoint_docs, endpoint_thumbnail};
