/**
 *  Copyright (c) 2016-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, {Component} from "react";
import Highlighter from "../components/Highlighter";
import Markdown from "react-markdown";
import Examples from "../examples_entry.js";
import Catalog from "../examples/catalog.json";

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markdown: null
        };
    }

    fetchMarkdownForProps(props) {
        window.scrollTo(0, 0);
        const exampleName = this.props.match.params.example;
        const docs = Examples[`${exampleName}_docs`];
        fetch(docs)
            .then(response => {
                return response.text();
            })
            .then(markdown => {
                this.setState({ markdown });
            });
    }

    componentDidMount() {
        this.fetchMarkdownForProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchMarkdownForProps(nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.example !== this.props.match.params.example) {
            this.fetchMarkdownForProps(this.props);
        }
    }
    
    renderMarkdown() {
        if (this.state.markdown) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <Markdown 
                            source={this.state.markdown}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-12" />
                </div>
            );
        }
    }

    render() {
        const tagStyle = {
            background: "#EEE",
            padding: 5,
            borderRadius: 2,
            margin: 2,
            fontSize: "smaller"
        };

        const exampleName = this.props.match.params.example;
        const ExampleCatalogData = Catalog[exampleName];
        const Component = Examples[exampleName];
        const docs = Examples[`${exampleName}_docs`];

        if (!exampleName) {
            return (
                <pre>No example name supplied</pre>
            );
        }

        if (!ExampleCatalogData) {
            return (
                <pre>{`No ExampleCatalogData supplied, examples catalog didn't contain '${exampleName}'`}</pre>
            );
        }

        if (!Component) {
            return (
                <pre>{`No example Component found, examples_entry did not export a component for '${exampleName}'`}</pre>
            );
        }

        if (docs === undefined) {
            return (
                <pre>{`No docs file supplied, examples_entry did not export '${exampleName}_docs.md'`}</pre>
            );
        }

        const titleStyle = {
            color: "#317eac",
            fontSize: 32,
            fontWeight: 100
        };

        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 style={titleStyle}>{ExampleCatalogData.title}</h3>
                                <p>
                                    {ExampleCatalogData.description}
                                </p>
                                <div>
                                    {ExampleCatalogData.tags.map(tag => (
                                        <span style={tagStyle} key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <Component />
                        <hr />
                        {this.renderMarkdown()}
                    </div>
                </div>
            </div>
        );
    }
};
