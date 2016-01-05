### Rendering a basic circuit

The Basic Circuit is a combination of a connection with two endpoints. The basic circuit assumes a horizontal positioning of a circuit where the y1 and y2 values are equal.  A basic circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning and end of the circuit based on the `margin` prop, and `height` prop.  In the example, we have left these as the default values of `width: 851, height: 250, margin: 100`, but these props can be specified to change the viewing area and circuit positioning.

To render a basic circuit, we pass in the props defined in the style map, explained in **Style** below. Here's an example:

```js

import { BasicCircuit } from "react-network-diagrams";

...

    render() {
        return (
            <BasicCircuit
                title={`ESnet optical circuit: ${circuit.name}`}
                circuitLabel={circuit.name}
                lineStyle={styles.optical.style}
                lineShape={styles.optical.lineShape}
                size={styles.optical.size}
                connectionLabelPosition={5}
                yOffset={7}
                endpointStyle={styles.endpoint}
                endpointLabelPosition={endpointLabelPositionChoice}
                endpointLabelA="ALBQ"
                endpointLabelZ="HOU"
                onSelectionChange={this.handleSelectionChange}
                navTo={circuit.child.id}
                parentId={circuit.parent.id} />
        );
    }

```

### Styles

The connection component and the two endpoint components have a style that needs to be provided just like in the connection and endpoint example. At a minimum, each circuit needs a `style` and a `lineShape`.  If the shape is not linear, or specific properties about each circuit type such as label position or disabling navigation need to be called out, these can be specified as well.

Each circuit's unique style is created as its own object.  Typically we assemble a collection of these in its own module that we reuse.

Each style object is used to render the connection and requires three properties to be defined: `node`, `line` and `label`.  Each of these has a `normal` style, and a `highlighted` style for when the circuit is hovered over.

Example:

```js
const style = {
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

We also need to define an endpoint style for the endpoints, which has a `node`and `label` component to style the endpoint nodes, as well as their labels:

```js
const endpointStyle = {
    node: {
        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
    },
    label: {
        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
    }
};
```
