"use strict";

var React = require("react/addons");
var Router = require("react-router");
var {RouteHandler,
     Link} = Router;

require("../styles/app.css");
var logo = document.createElement('img');
logo.src = require('../img/logo.png');

var App = React.createClass({

  render: function() {
    
    var sidebarStyle = {
        borderRightStyle: "solid",
        borderRightColor: "#ddd",
        borderRightWidth: 1,
        height: 600
    }

    return (
      <div>
          <div className="row">
              <div className="col-md-2">
                  <img style={{float: "right"}} className="main-image" src={logo.src} width={80}/>
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
