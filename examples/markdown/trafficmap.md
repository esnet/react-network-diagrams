## Topology

At a high level our topology data looks like this:

    const topology = {
        "name": "My traffic map",
        "description": "This is an optional description",
        "nodes": [ ... ],
        "edges": [ ... ],
        "paths": [ ... ]
    }

### Nodes

The nodes list in the topology contains a list of node objects. This object contains a `type` and a `name` field. The node should also contain an `x` and `y` coordinate for the position of the node, as well as optional information about where to position the node label. For ESnet network traffic we also add extra information that we use elsewhere in the page.

Example for the ALBQ hub:

    {
        "name": "ALBQ",
        "type": "hub",
        "capacity": "100G",
        "label_dx": null,
        "label_dy": null,
        "label_position": "left",
        "x": 75.0,
        "y": 85.0
    },

### Edges

The edges list in the topology contains a list of edge objects. An edge object connects two nodes, specified by the `source` and `target`. The capacity field can be used to style the link based on its capacity. Like nodes we often pass extra information into the edge objects for our own use within the page.

Example connection ALBQ to DENV:

    {
      "capacity": "100G",
      "source": "ALBQ",
      "target": "DENV",
      ...
    },

### Styling

The TrafficMap code is configured with a set of maps which give styling information to the map rendering code

#### nodeSizeMap

A mapping from the `type` field in the node object to a size to draw the shape

Example:

    const nodeSizeMap = {
        hub: 5.5,
        esnet_site: 7
    };

### edgeThinknessMap

A mapping of the `capacity` field within the tologogy edge object to a line thickness for rendering the edges.

Example:

    const edgeThinknessMap = {
        "100G": 5,
        "10G": 3,
        "1G": 1.5,
        subG: 1
    };

### edgeShapeMap

A mapping of the edge name (which is source + "--" + target) to a dict of edge shape options:

 - `shape` (either "linear" or "curved")
 - `direction` (if shape is curved, either "left" or "right")
 - `offset` (if shape is curved, the amount of curve, which is pixel offset from a straight line between the source and target at the midpoint)

Example:

    const edgeShapeMap = {
        "ALBQ--DENV": {
        "shape": "curved",
        "direction": "right",
        "offset": 15
    }

### nodeShapeMap

Mapping of node `name` to shape (default is `circle`, other options are `cloud` or `square` currently).

Example:

    const nodeShapeMap = {
        DENV: "square"
    };

### Node styles

In addition to the above styling you can specify CSS properties for different node types:

    const stylesMap = {
        "hub": hubStyle,
        "esnet_site": siteStyle
    };

Each style (e.g. hubStyle above) specifies properties for its label and the node itself, for each of three states: `normal`, `selected` and `muted`. For example:

    const hubStyle = {
        node: {
            normal: {fill: "#CBCBCB",stroke: "#BEBEBE", cursor: "pointer"},
            selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                       strokeWidth: 10, cursor: "pointer"},
            muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6,
                    cursor: "pointer"}
        },
        label: {
            normal: {fill: "#696969", stroke: "none", fontSize: 9},
            selected: {fill: "#333",stroke: "none", fontSize: 11},
            muted: {fill: "#696969", stroke: "none", fontSize: 8,
            opacity: 0.6}
        }
    };

Note that muted will be applied to nodes which are not selected.

## Traffic

The TrafficMap will render itself as a heat map based on current traffic levels. To specify those levels we provide a Pond Event containing the current traffic rates (using the edge name in each direction) at a given timestamp. This event may be part of a Timeseries or it could be a stand alone Event with the current traffic levels.

The simplest way to construct this traffic event would look like this:

    const timestamp = 1431649302000;
    const edgeTraffic = {
            ALBQ--DENV: 126513360.8
            DENV--ALBQ: 323736723.4
            ...
    }
    const traffic = new Event(timestamp, edgeTraffic);

### edgeColorMap

The edge color map maps an edge rate (specified in the traffic event) to a color. In this example, traffic across a link between 50 and 100 Gbps would be mapped to red (#990000). The label isn't needed for this mapping, but the traffic legend code will accept this same structure and will show a legend using the label.

    const edgeColorMap = [
        {color: "#990000", label: ">=50 Gbps", range: [50, 100]},
        {color: "#bd0026", label: "20 - 50", range: [20, 50]},
        {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
        {color: "#016c59", label: "5 - 10", range: [5, 10]},
        {color: "#238b45", label: "2 - 5", range: [2, 5]},
        {color: "#3690c0", label: "1 - 2", range: [1, 2]},
        {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
    ];

### Rendering the TrafficMap

Finally we can render the traffic map itself:

    render() {
        return (
            ...
            <TrafficMap
                width={980} height={500} margin={50}
                topology={topology}
                traffic={traffic}
                edgeColorMap={edgeColorMap}
                edgeDrawingMethod="bidirectionalArrow"
                edgeThinknessMap={edgeThinknessMap}
                edgeShapeMap={edgeShapeMap}
                nodeSizeMap={nodeSizeMap}
                nodeShapeMap={nodeShapeMap}
                stylesMap={stylesMap}
                selection={selection}
                onSelectionChange={this.handleSelectionChanged} />
            ...
        );
    }

Most of what is passed in as props here are the maps which specify the style of the drawing, as detailed above. We also need to provide the width and the height of the map and the edge drawing method, in this case bidirectionalArrow. In addition, we also handle selection in this map (see below).

### Selection

A callback for selection change can be provided to the `onSelectionChange()` prop. This will be called when the user selects an object in the map, be it a node or a link. The first arg will be the type of the object selected and the second will be the object itself.

Typically you would store the selection (perhaps as state of the parant component) and pass that selection down using the `selection` prop, since most likely you want to use that selection elsewhere on the page (say to show network traffic for the selection).

As discussed above, styling for the selection can be done using the styles maps.
