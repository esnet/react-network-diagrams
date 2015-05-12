"use strict";

var React = require("react/addons");
var Router = require("react-router");
var {RouteHandler,
     Link} = Router;

require("../styles/app.css");

var App = React.createClass({
  render: function() {
    return (
      <div>
          <div className="row">
              <div className="col-md-12">
                  <h2>ESnet React Maps Library</h2>
              </div>
          </div>

          <hr />

          <div className="row">

            <div className="col-md-2">
              <div className="docs-sidebar">
                  <ul className="docs-sidenav nav">
                    <li><Link to="intro">Introduction</Link></li>
                    <hr />
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

module.exports = App;
