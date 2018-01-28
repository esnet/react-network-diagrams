/**
 *  Copyright (c) 2015-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

 import React, {Component} from "react";
import _ from "underscore";
import Markdown from "react-markdown";

import docsFile from "../api/docs.json";

/**
 * Displays API data from the docs.json file
 */
export default class extends Component {

    renderArrayOf(value) {
        if (value.name === "shape") {
            return "shape {" + _.map(value.value, (value, key) => {
                return key;
            }).join(", ") + "}";
        } else {
            return `array of ${value.name}s`;
        }
    }

    renderPropType(type) {
        if (!type) {
            return "unknown type";
        }
        if (type.name === "enum") {
            return "enum (" + _.map(type.value, value => {
                return value.value;
            }).join(", ") + ")";
        } if (type.name === "union") {
            return "one of (" + _.map(type.value, value => {
                return this.renderPropType(value);
            }).join(", ") + ")";
        } if (type.name === "instanceOf") {
            return `instance of a ${type.value}`;
        } if (type.name === "arrayOf") {
            return `array of ${this.renderArrayOf(type.value)}`;
        } if (type.name === "shapes") {
            return `shape of {` + _.map(type.value, (value, key) => {
                return key;
            }).join(", ") + "}";
        } else {
            return `${type.name}`;
        }
    }

    renderProps(props) {
        const propNameStyle = {
            padding: 3,
            marginRight: 5,
            borderRadius: 2,
            fontFamily: "'Fira Mono',Menlo,monospace",
            color: "#c7254e",
            background: "#f9f2f4",
            letterSpacing: -.015
        };

        const infoStyle = {
            color: "#626466",
            fontFamily: "Fira Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
            fontSize: 16,
            lineHeight: 1.625
        };

        const typeStyle = {
            color: "#626466",
            background: "#F5F4F4",
            fontFamily: "Fira Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
            fontSize: 16,
            lineHeight: 1.625
        };

        return _.map(props, (prop, propName) => (
            <div key={propName}>
                <span style={propNameStyle}>{propName}</span>
                <span>{prop.defaultValue ? ` = ${prop.defaultValue.value}` : ""}</span>
                <span className="label label-default">{prop.required ? "Required" : ""}</span>
                <div style={infoStyle} >
                    <Markdown source={prop.description ? prop.description : ""} />
                </div>
                <span style={typeStyle} >
                    Type: {this.renderPropType(prop.type)}
                </span>
                <hr />
            </div>
        ));
    }

    render() {
        const file = this.props.file;
        const docs = docsFile[file];
        const sectionStyle = {
            color: "#317eac",
            fontWeight: 200
        };
        return (
            <div>
                <Markdown source={docs.description} />
                <hr />
                <h3 style={sectionStyle}>Props</h3>
                <hr />
                {docs.props ? this.renderProps(docs.props) : "none"}
            </div>
        );
    }
};
