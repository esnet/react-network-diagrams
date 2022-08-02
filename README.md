# React Network Diagrams 

[![Build Status](https://travis-ci.org/esnet/react-network-diagrams.svg)](https://travis-ci.org/esnet/react-network-diagrams) [![npm version](https://badge.fury.io/js/react-network-diagrams.svg)](https://badge.fury.io/js/react-network-diagrams)

This repository contains an initial set of React circuit drawing and network mapping components which are used within the ESnet Portal, but are not tied to ESnet, or even to network visualization.

The mapping portion of this library is used in the public facing [ESnet Portal](http://my.es.net). The circuit diagrams code us used internally to track ESnet circuits in the ESDB.

Current features of the library include:

 * Circuit diagrams:
     - Basic
     - Concatenated
     - Parallel
 * Circuit couplers
 * Patch panel diagrams
 * Topology mapping
     - Higher level network traffic visualization
     - Linear, arc, bidirectional traffic and square edge types
 * Route rendering

Please browse the examples for a feel for the library, or read on to get started.

Getting started
---------------

The charts library is intended to be used with npm and the built into your project with something like webpack.

    npm install react-network-diagrams --save

Once installed, you can import the necessary components from the library:

    import { TrafficMap } from "react-network-diagrams";

You can then `render()` the traffic map in your component:

    <TrafficMap width={980} height={500} margin={50}
                topology={topo}
                traffic={traffic}
                edgeColorMap={edgeColorMap}
                edgeDrawingMethod="bidirectionalArrow"
                edgeThicknessMap={edgeThicknessMap}
                edgeShapeMap={edgeShapeMap}
                nodeSizeMap={nodeSizeMap}
                nodeShapeMap={nodeShapeMap}
                stylesMap={stylesMap}
                selection={mapSelection}
                onSelectionChange={this.handleSelectionChanged} />


See the examples for more information.

Examples
--------

To run the examples yourself, from the main directory, you first need to run these commands in the specific order:

    npm install lerna
    lerna exec npm install
    lerna bootstrap

This will bootstrap the packages in the current Lerna repo and install the development dependencies into your node_modules directory.

You can then start up the test server, as well as automatic source building, by doing:

    npm run start

And now, for the magic, point your browser to:

    http://localhost:3000/

From now on, if you change the source code for the `examples` section, the examples bundle will be rebuilt and the browser will refresh itself. Errors will also be reported in the browser window.

If you want to change the `react-network-diagrams` code, you will need to run `npm run build` after working on your changes and then, the browser running the examples should reflect the changes.

For changes within the main library, run the following commands before committing the code:

    npm run build
    npm run docs (if there's changes to the API documentation)

If there are changes to the website, run `npm run build` from the `packages/website` directory before merging to master.

Once this is done, you can make a pull request to merge this code into the master branch

Release Process
--------

### Deploying a new version

Merge all the changes you want to deploy into the master branch.

Make sure to add release notes in [CHANGELOG.md](https://github.com/esnet/react-network-diagrams/blob/master/CHANGELOG.md)

Then, from the top level directory, run

    lerna publish

As part of this command, it will ask you the version number you want to pick. 

Once that is selected, it will update the relevant package.json files and push code to github as well as deploy a new release to npm.

### Deploying the website

Currently, the website that hosts the examples and documentation can be found here - http://software.es.net/react-network-diagrams

This is being served via github pages, from the branch `gh-pages-latest`. Make sure to merge the latest code from master into this branch and it should automatically deploy the latest website.