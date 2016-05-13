## Topology

At a high level our topology data looks like this:

```
const topology = {
    "name": "My traffic map",
    "description": "This is an optional description",
    "nodes": [ ... ],
    "edges": [ ... ],
    "paths": [ ... ]
}
```

### Nodes

The nodes list in the topology contains a list of node objects. This object contains, at a minimum:
 * `type`
 * `name`
 * `x` and `y` - coordinates for the position of the node

Optionally the node can contain:
 * `label_position` - information about where to position the node label. Label position may be "top", "bottom", "left" or "right", or combinations such as "topleft"
 * `label_dx`, `label_dy` - offsets for fine adjustment of label positions
  
At ESnet our nodes also contain extra information about that node that are specific to our use case.

Example for the ALBQ hub:

```
{
    "name": "ALBQ",
    "type": "hub",
    "label_dx": null,
    "label_dy": null,
    "label_position": "left",
    "x": 75.0,
    "y": 85.0
},
```

### Edges

The edges list in the topology contains a list of edge objects. An edge object connects two nodes, specified by the `source` and `target`. The capacity field is a string label can be used to style the link based on its capacity (see `edgeThicknessMap` below).

Like nodes we often pass extra information into the edge objects for our own use within the page, such as which interfaces are use in that connection.

Example edge, representing a connection from our ALBQ to DENV hubs:

```
{
  "capacity": "100G",
  "source": "ALBQ",
  "target": "DENV",
  ...
},
```

### Paths

The paths list contains a list of path objects. A path object connects multiple nodes together to form a path across the topology. Each path contains:

 * `name` - name the path should be referred to by
 * `steps` - a list of Node names

Example path connecting NERSC, to Starlight, to ANL.

```
{
  "name": "NorthPath",
  "steps": [
    "NERSC",
    "STARLIGHT",
    "ANL"
  ],
},
```

#### Notes about displaying paths

To display paths on the map you need to:
 1. Define one or more paths in the topology, as explained above
 2. Tell the maps code which paths to show using the `showPaths` prop on the `<TrafficMap>`
 3. Use an `edgeDrawingMethod` which is suited to rendering paths

Paths will be displayed on the map if the `showPaths` prop of the `<TrafficMap>` is provided. This prop can either be:
 * a boolean (and if true the map will show all paths), or
 * an array of path names to show.

Paths can be displayed when one of two styles are specified in the `edgeDrawingMethod`:
 * "simple" will display the schematic rendering of the path, i.e. a simple line drawn through the nodes, or
 * "pathBidirectionalArrow", which will show traffic arrows for just the paths being rendered (and not other links in the map).

## Traffic

The map is able to render itself as a heat map based on current traffic levels.

### Edge traffic

To specify those levels we provide a [Pond Event](http://software.es.net/pond/#/events) containing the current traffic rates (using the edge name ($sourceNode--$destNode) in each direction) at a given timestamp. This event may be part of a [Pond Event](http://software.es.net/pond/#/timeseries) or it could be a stand alone Event with the current traffic levels.

The simplest way to construct this traffic event would look like this:

```
import { Event } from "pondjs";
const timestamp = 1431649302000;
const traffic = new Event(timestamp, {
    ALBQ--DENV: 126513360.8
    DENV--ALBQ: 323736723.4
    ...
});
```

The rendering of the edges uses the `edgeColorMap` to map from value ranges (bps) to a color. See below.

### Path traffic

Rendering path traffic is similar to that for the edge traffic. We use a convention for the names to designate the direction of the traffic along the path: $pathname--AtoZ or $pathname--ZtoA. Here is an example:

```
import { Event } from "pondjs";
const timestamp = 1431649302000;
const pathTraffic = new Event(timestamp, {
    "northPath--AtoZ": 20000000000,
    "northPath--ZtoA": 3000000000,
    "southPath--AtoZ": 40000000000,
    "southPath--ZtoA": 5000000000
});
```

Like the edge traffic, the path traffic levels are mapped to colors with the `edgeColorMap`. See below.

## Styling

The TrafficMap code is configured with a set of maps which give styling information to the map rendering code

### nodeSizeMap

A mapping from the `type` field in the node object to a size to draw the shape

Example:

```
const nodeSizeMap = {
    hub: 5.5,
    esnet_site: 7
};
```

### edgeThinknessMap

A mapping of the `capacity` field within the tologogy edge object to a line thickness for rendering the edges.

Example:

```
const edgeThinknessMap = {
    "100G": 5,
    "10G": 3,
    "1G": 1.5,
    subG: 1
};
```

### edgeShapeMap

A mapping of the edge name (which is source + "--" + target) to a dict of edge shape options:

 - `shape` (either "linear" or "curved")
 - `direction` (if shape is curved, either "left" or "right")
 - `offset` (if shape is curved, the amount of curve, which is pixel offset from a straight line between the source and target at the midpoint)

Example:

```
const edgeShapeMap = {
    "ALBQ--DENV": {
    "shape": "curved",
    "direction": "right",
    "offset": 15
}
```

### nodeShapeMap

Mapping of node `name` to shape (default is `circle`, other options are `cloud` or `square` currently).

Example:

```
const nodeShapeMap = {
    DENV: "square"
};
```

### Node styles

In addition to the above styling you can specify CSS properties for different node types:

```
const stylesMap = {
    "hub": hubStyle,
    "esnet_site": siteStyle
};
```

Each style (e.g. hubStyle above) specifies properties for its label and the node itself, for each of three states: `normal`, `selected` and `muted`. For example:

```
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
```

Note that muted will be applied to nodes which are not selected.

### Path styles

You can use styling maps to specify the color and width of paths:

```
const pathColorMap = {
    northPath: "#ff7f0e",
    southPath: "#aec7e8",
};

const pathWidthMap = {
    northPath: 4,
    southPath: 2,
};
```

### edgeColorMap

The edge color map maps an edge rate (bits per second, specified in the traffic event) to a color using the "range" and "color" values. In this example, traffic across a link between 50 and 100 Gbps (`range: [50, 100]`)would be mapped to red (`color: #990000`).

The "label" isn't needed for this mapping, but the traffic `<MapLegend>` component will accept this same structure and use the label for its display.

```
const edgeColorMap = [
    {color: "#990000", label: ">=50 Gbps", range: [50, 100]},
    {color: "#bd0026", label: "20 - 50", range: [20, 50]},
    {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
    {color: "#016c59", label: "5 - 10", range: [5, 10]},
    {color: "#238b45", label: "2 - 5", range: [2, 5]},
    {color: "#3690c0", label: "1 - 2", range: [1, 2]},
    {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
];
```

## Putting it all together

Finally we can render the traffic map itself:

```
import { TrafficMap } from "react-network-diagrams";

...

    render() {
        return (
            ...
            <TrafficMap
                bounds={{x1: -5, y1: 5, x2: 240, y2: 120}}
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
```

