"use strict";

var React = require("react/addons");

var Intro = React.createClass({

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Introduction</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                    The Maps library is used by the ESnet Portal to display subway style weather maps of the
                    current state of the ESnet network.

                    <p />

                    Main features:

                    <ul>
                        <li>Low level pieces, such as edges and node</li>
                        <li>Higher level map topology builder</li>
                    </ul>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Intro;