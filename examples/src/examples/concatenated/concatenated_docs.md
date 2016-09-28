### Rendering a concatenated circuit

A concatenated circuit is an ordered array of circuits, with each circuit being rendered horizontally as a combination of a connection and two endpoints. The concatenation is directional, meaning that the second endpoint of the previous member should equal the first endpoint of the next member.

A concatenated circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning of the concatenation based on the `margin` prop, with each member rendered sequentially based on a calculation of the segment length.

##### Calculating member lengths

Since we may want to render different members different lengths, each member circuit inside the concatenation is positioned based on the presence of the `squareWidth` prop.  We assume that the presence of `squareWidth` means a fixed width for that segment rather than a fraction of the total available width. We use the following formula:

---
**Standard Segment Length = ( Total Length - ( Total Length of all `squareWidth` props ) ) / number of members without the `squareWidth` prop**

---

Once we have the standard segment length, we can position each endpoint sequentially based on the segment's length, which is either the standard length or the fixed `squareWidth` length.  If no segments have a `squareWidth` property, they will all render with equal length.

To render a concatenated circuit, we pass in the list of member circuits as the prop `memberList`, with props defined in the style map, explained in **Style** below:

```js

import { ConcatenatedCircuit } from "react-network-diagrams";

...

    render() {
        return (
            <ConcatenatedCircuit
                memberList={memberList}
                endpointLabelPosition="top"
                connectionLabelPosition="center"
                yOffset={7}
                disabled={isDisabled}
                title="Example Concatenated Circuit"
                onSelectionChange={this.handleSelectionChange}
                endpointLabelOffset={18}
                parentId={"Test Navigation"} />
        );
    }

```

___

### Style

The connection component and the two endpoint components of each member of the `memberList` have a style that needs to be provided just like in the connection and endpoint examples. At ESnet, to accommodate different standard types of circuits we assemble the styles into an object mapping different types to the properties of that type such as style, shape, and shape. At a minimum, each circuit needs a `style` and a `lineShape` so that the underlying connection primitive knows how to draw.  If the shape is not `linear` (the default connection shape), or specific properties about each circuit type such as label position or disabling navigation need to be called out, these can be specified here.

At ESnet we define the following circuit types in this object:

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
    coupler: {
        style: stylesMap.coupler,
        lineShape: "square",
        size: 36,
        squareWidth: 25,
        noNavigate: true,
    },
    backplaneMate: {
        style: stylesMap.coupler,
        lineShape: "square",
        size: 36,
        squareWidth: 40,
        centerLine: true,
    },
};
```

The style for each circuit type is taken from the style map which maps the individual styles for each type, as well as any endpoint style we want to define:

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

Each types unique style is created as its own object.  This is used to render the connection and requires three objects to be defined `node`, `line` and `label`.  Each of these uses a normal style, and a highlighted style for when the circuit is mouseed over.

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

We also need to define an endpoint style for the endpoints, which has a node and label component to style the endpoint node, as well as the label:

	const endpointStyle = {
	    node: {
	        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
	    },
	    label: {
	        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
	    }
	};
