
## Getting started

---

The charts library is intended to be used with npm and the built into your project with something like webpack.

    npm install react-network-diagrams --save

Once installed, you can import the necessary components from the library, for example:

    import { TrafficMap } from "react-network-diagrams";

Then `render()` the traffic map in your component.

---

### Trying out the library with create-react-app

**Step 1** Create the an application, in this case "simple-network-diagram" using Create React App. See the [create-react-app](https://github.com/facebookincubator/create-react-app) website for information on how to install (hint: `npm install -g create-react-app`).

```js
> create-react-app simple-network-diagram
> cd simple-network-diagram
> npm react-network-diagrams --save
```

**Step 2** Import the TrafficMap component from react-network-diagrams:

```js
import { TrafficMap } from "react-network-diagrams";
```

**Step 3** Define a minimal topology. Here's one copy and pasted from the Editor example in the docs:

```js
const topology = {
  "description": "Simple topo",
  "name": "simple",
  "nodes": [
    {
      "label_dx": null,
      "label_dy": null,
      "label_position": "top",
      "name": "Node1",
      "type": "esnet_site",
      "x": 100,
      "y": 20,
    },
    {
      "label_dx": null,
      "label_dy": null,
      "label_position": "top",
      "name": "Node2",
      "site": 5,
      "type": "esnet_site",
      "x": 50,
      "y": 80,
    },
    {
      "label_dx": null,
      "label_dy": null,
      "label_position": "top",
      "name": "Node3",
      "site": 5,
      "type": "hub",
      "x": 150,
      "y": 80,
    }
  ],
  "edges": [
    {
      "capacity": "100G",
      "source": "Node1",
      "target": "Node2"
    },
    {
      "capacity": "40G",
      "source": "Node2",
      "target": "Node3"
    },
    {
      "capacity": "10G",
      "source": "Node3",
      "target": "Node1"
    }
  ]
};
```

It defines three nodes and three edges.

**Step 4** Render the network diagram:

```js
class App extends Component {
  render() {
    return (
      <div className="App">
        ...
        <TrafficMap
            bounds={{x1: 0, y1: 0, x2: 200, y2: 150}}
            topology={topology}
            edgeDrawingMethod="bidirectionalArrow" />
      </div>
    );
  }
}
```

You can find the full source of this example in [github.com/esnet/simple-network-diagram/src/App.js](https://github.com/esnet/simple-network-diagram/blob/master/src/App.js)

This example has no custom styling associated with it, or heat map, to keep it very simple.

## Extending this example

To add a heat map you need to define a single traffic Event, or a TimeSeries of traffic events.

To do that:

**Step 5** Install pondjs, our timeseries library

```js
npm install pondjs --save
```

**Step 6** Define an Event

```js
import { Event } from "pondjs";

const timestamp = (new Date()).getTime();
const traffic = new Event(timestamp, {
    "Node1--Node2": 22100000000,  // bits per sec
    "Node2--Node1": 2400000000,
    "Node1--Node3": 50600000000
    ...
});
```

**Step 7** Define a style map to map edge value to color

```js
const edgeColorMap = [
    {color: "#990000", label: ">=50 Gbps", range: [50, 100]},  // GBps
    {color: "#bd0026", label: "20 - 50", range: [20, 50]},
    {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
    {color: "#016c59", label: "5 - 10", range: [5, 10]},
    {color: "#238b45", label: "2 - 5", range: [2, 5]},
    {color: "#3690c0", label: "1 - 2", range: [1, 2]},
    {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
];
```

**Step 8**  Add that `traffic` event and `edgeColorMap` to the `<TrafficMap>` as props.

```js
    <TrafficMap
        width={980}
        height={500}
        margin={50}
        topology={topo}
        traffic={traffic}
        edgeColorMap={edgeColorMap}
        edgeDrawingMethod="bidirectionalArrow"
        selection={mapSelection}
        onSelectionChange={this.handleSelectionChanged} />
```
