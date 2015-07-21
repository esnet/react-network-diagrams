This repository contains a set of React based mapping components which are used within the ESnet Portal, but are not tied to ESnet, or even to network visualization.

Usage
-----

This repository can either be used as a global include (distribution is in build/global), but the recommended way is to require in the top level file [entry.js](./entry.js) into any webpack (or browserify) project (after npm installing this repository) and build it into your bundle.

Examples
--------

To run the examples you first need to run:

    npm install

This will install the development dependencies into your node_modules directory.

You can then start up the test server, as well as automatic source building, by doing:

    npm start

And now, for the magic, point your browser to:

    http://localhost:8080/webpack-dev-server/

From now on, if you change the source code, webpack will rebuild the examples bundle and the browser will refresh itself. Errors will also be reported in the browser window.

Before commiting back, run:

    npm run build-npm

