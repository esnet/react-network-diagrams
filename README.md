# React Network Diagrams [![Build Status](https://travis-ci.org/esnet/react-network-diagrams.svg?branch=master)](https://travis-ci.org/esnet/react-network-diagrams)


This repository contains an initial set of React based mapping components which are used within the ESnet Portal, but are not tied to ESnet, or even to network visualization. In the future it will also contain our circuit diagram rendering code.

The library is used in the public facing [ESnet Portal](http://my.es.net).

Current features of the library include:

 * General nodes and edge topology rendering
 * Higher level network traffic maps
 * Multiple link types: linear, arcs, bidirectional traffic
 * Route rendering

Please browse the examples for a feel for the library, or read on to get started.

Getting started
---------------

The charts library is intended to be used with npm and the built into your project with something like webpack.

    npm install @esnet/react-network-diagrams --save

Once installed, you can import the necessary components from the library:

    import {TrafficMap} from "@esnet/react-network-diagrams";

You can then `render()` the traffic map in your component:

    <TrafficMap width={980} height={500} margin={50}
                topology={topo}
                traffic={traffic}
                edgeColorMap={edgeColorMap}
                edgeDrawingMethod="bidirectionalArrow"
                edgeThinknessMap={edgeThinknessMap}
                edgeShapeMap={edgeShapeMap}
                nodeSizeMap={nodeSizeMap}
                nodeShapeMap={nodeShapeMap}
                stylesMap={stylesMap}
                selection={mapSelection}
                onSelectionChange={this.handleSelectionChanged} />
                
See the examples for more information about these props.

Examples
--------

To run the examples yourself you first need to run:

    npm install

This will install the development dependencies into your node_modules directory.

You can then start up the test server, as well as automatic source building, by doing:

    npm run start-website

And now, for the magic, point your browser to:

    http://localhost:8080/webpack-dev-server/

From now on, if you change the source code, webpack will rebuild the examples bundle and the browser will refresh itself. Errors will also be reported in the browser window.

Before commiting back, run:

    npm run build
