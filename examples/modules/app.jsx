import React from "react";
import Router from "react-router";

import "../styles/app.css";

let {RouteHandler, Link} = Router;
let logo = document.createElement("img");
logo.src = require("../img/logo.png");

export default React.createClass({

    render: function() {
        const sidebarStyle = {
            "borderRightStyle": "solid",
            "borderRightColor": "#ddd",
            "borderRightWidth": 1
        };

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img style={{"float": "right"}} className="main-image" src={logo.src} width={80}/>
                    </div>
                    <div className="col-md-10">
                        <h2>ESnet React Maps Library</h2>
                    </div>
                </div>

                <hr />

                <div className="row">

                    <div className="col-md-2" style={sidebarStyle}>
                        <div className="docs-sidebar">
                            <ul className="docs-sidenav nav">
                                <li><Link to="intro">Introduction</Link></li>
                                <hr />
                                <li><Link to="legend">Map Legend</Link></li>
                                <li><Link to="trafficmap">Traffic Map</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <RouteHandler />
                    </div>

                </div>
            </div>
        );
    }
});
