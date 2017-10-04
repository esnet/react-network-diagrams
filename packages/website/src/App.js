import React, { Component } from 'react';
import { Link } from "react-router";

import './App.css';

import esnetLogo from './img/logo.png';
import githubLogo from './img/github.png';

class App extends Component {
  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                React Network Diagrams
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="http://www.es.net">
                    <img src={esnetLogo} alt="ESnet" width="32px" height="32px" /></a>
                </li>
                <li>
                  <a href="https://github.com/esnet/react-network-diagrams/">
                    <img src={githubLogo}  alt="Github" width="32px" height="32px" /></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

            <div className="row">

                <div className="col-sm-3 col-md-2 sidebar">
                    <p />

                    <div className="sidebar-heading">GUIDES</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/">Introduction</Link></li>
                        <li><Link to="/guide/start">Getting started</Link></li>
                    </ul>

                    <div className="sidebar-heading">Circuit Examples</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/example/endpoint">Endpoints</Link></li>
                        <li><Link to="/example/connection">Connections</Link></li>
                        <li><Link to="/example/basic">Basic circuit</Link></li>
                        <li><Link to="/example/parallel">Parallel circuit</Link></li>
                        <li><Link to="/example/concatenated">Concatenated circuit</Link></li>
                        <li><Link to="/example/patchpanel">Patch panels</Link></li>
                    </ul>

                    <div className="sidebar-heading">Network Map Examples</div>
                    <ul className="nav nav-sidebar">
                        <li><Link to="/example/map">Traffic map</Link></li>
                        <li><Link to="/example/paths">Network paths</Link></li>
                        <li><Link to="/example/editor">Topology editor</Link></li>
                        <li><Link to="/example/legend">Legend</Link></li>
                    </ul>

                    <div className="sidebar-heading">Low level API</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/api/Connection">Connection</Link></li>
                        <li><Link to="/api/Endpoint">Endpoint</Link></li>
                    </ul>

                    <div className="sidebar-heading">Circuit API</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/api/BasicCircuit">BasicCircuit</Link></li>
                        <li><Link to="/api/ConcatenatedCircuit">ConcatenatedCircuit</Link></li>
                        <li><Link to="/api/ParallelCircuit">ParallelCircuit</Link></li>
                        <li><Link to="/api/PatchPanel">PatchPanel</Link></li>
                    </ul>

                    <div className="sidebar-heading">Network Map API</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/api/BaseMap">BaseMap</Link></li>
                        <li><Link to="/api/TrafficMap">TrafficMap</Link></li>
                        <li><Link to="/api/MapEditor">MapEditor</Link></li>
                        <li><Link to="/api/MapLegend">Legend</Link></li>
                    </ul>

                    <div className="sidebar-heading">Other API</div>

                    <ul className="nav nav-sidebar">
                        <li><Link to="/api/Resizable">Resizable</Link></li>
                    </ul>

                    <div className="sidebar-heading">Links</div>

                    <ul className="nav nav-sidebar">
                        <li><a href="https://github.com/esnet/react-network-diagrams">GitHub</a></li>
                        <li><a href="https://www.es.net/">ESnet</a></li>
                        <li><a href="http://software.es.net/">Open Source</a></li>
                    </ul>

                    <div className="sidebar-heading">Related Projects</div>

                    <ul className="nav nav-sidebar">
                        <li><a href="http://software.es.net/pond/">pond.js</a></li>
                        <li><a href="http://software.es.net/react-timeseries-charts/">Network Diagrams</a></li>
                    </ul>
                </div>

                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    {this.props.children}
                </div>

            </div>
      
      </div>
    );
  }
}

export default App;


