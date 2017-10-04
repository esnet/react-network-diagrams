### Rendering a Parallel circuit

The Parallel Circuit is an array of circuits, with each circuit being rendered as a linear connection, sharing two master endpoints. The diagram is always rendered horizontally.

The Parallel Circuit currently only accepts the "linear" `lineShape`.  A parallel circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning and end of the circuit based on the `margin` prop.

Members are rendered as individual connections without endpoints, offset from each other. The offset will increase by a multiplicative amount based on the number of members in the parallel circuit, and members are rendered sequentially.

To render a parallel circuit, we pass in the list of member circuits using the `memberList` prop, with rendering style defined within each member's `styleProperties` property. For more information refer to `memberList` prop description in the API section in combination with the **style** section below.

Here is a simple example of a ParallelCircuit:


```jsx

import { Endpoint } from "react-network-diagrams";

...

    render() {
        return (
			<ParallelCircuit
				title="Example Parallel Circuit"
				memberList={memberList}
				endpointLabelPosition="top"
				connectionLabelPosition="center"
				disabled={false}
				onSelectionChange={this.handleSelectionChange}
				endpointLabelA="Endpoint 1"
				endpointLabelZ="Endpoint 2"
				endpointStyle={stylesMap.endpoint}
				endpointLabelOffset={18}
				parentId="Test Navigation" />
        );
    }

```

### Style

The connection component and the two endpoint components of each member of the `memberList` have a style that needs to be provided just like in the connection and endpoint examples. At ESnet, to accommodate different standard types of circuits we assemble the styles into an object mapping different types to the properties of that type such as style, shape, and shape. At a minimum, each circuit needs a style and a `lineShape` so that the underlying connection primitive knows how to draw. If the shape is not "linear" (the default connection shape), or specific properties about each circuit type such as label position or disabling navigation need to be called out, these can be specified here.  Note that for the Parallel Circuit, all `lineShape`s are set to "linear".
	
```
const circuitTypeProperties = {
    optical: {
        style: stylesMap.optical,
        lineShape: "linear"
    },
    leased: {
        style: stylesMap.leased,
        lineShape: "linear"
    },
    darkFiber: {
        style: stylesMap.darkFiber,
        lineShape: "linear"
    },
    equipmentToEquipment: {
        style: stylesMap.equipmentToEquipment,
        lineShape: "linear"
    },
    crossConnect: {
        style: stylesMap.crossConnect,
        lineShape: "linear"
    },
};
```

The style for each circuit type is taken from the style map which maps the individual styles for each type, as well as any endpoint style we want to define:

```
const stylesMap = {
    equipmentToEquipment: equipmentToEquipmentStyle,
    optical: opticalStyle,
    leased: leasedStyle,
    darkFiber: darkFiberStyle,
    crossConnect: crossConnectStyle,
    coupler: couplerStyle,
    endpoint: endpointStyle,
    panelCoupler: panelCouplerStyle,
    panel: panelStyle
};
```

Each types unique style is created as its own object.  This is used to render the connection and requires three objects to be defined `node`, `line` and `label`.  Each of these uses a normal style, and a highlighted style for when the circuit is mouseed over.

```
const equipmentToEquipmentStyle = {
    node: {
        normal: {
            stroke: "#737373",
            strokeWidth: 4,
            fill: "none"
        },
        highlighted: {
            stroke: "#b1b1b1",
            strokeWidth: 4,
            fill: "#b1b1b1"
        }
    },
    line: {
        normal: {
            stroke: "#ff7f0e",
            strokeWidth: 3,
            fill: "none"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 4,
            fill: "none"
        }
    },
    label: {
        normal: {
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 10
        }
    }
};
```

We also need to define an endpoint style for the endpoints, which has a node and label component to style the endpoint node, as well as the label:

```
const endpointStyle = {
    node: {
        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
    },
    label: {
        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
    }
};
```
