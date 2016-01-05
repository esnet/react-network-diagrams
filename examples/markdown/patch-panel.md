### Rendering a Patch Panel

The Patch Panel is a three-dimensional array of panel objects, with each array member containing an array of modules. Each module contains an array of one or more objects which always have a grouping of three distinct circuits: a front circuit, a back circuit and a coupler.

The Patch Panel assumes a horizontal positioning of each group.  Vertical sizing is dynamic, with the `height` being determined by summing the total number of panels, modules, couplers and various offset lengths.  The panel then builds an \<svg\> element using the calculated height and the `width` prop.

Positions of the front and back circuit are determined by the `margin` prop, with the couplers rendered in the center of the \<svg\> element.

To render a Patch Panel, we pass in the list of patch panels as the `panels` prop. The structure also contains style information for the panel, explained in **Style** section below:

```js

import { PatchPanel } from "react-network-diagrams";

...

    render() {
        return (
            <PatchPanel
                panels={panels}
                panelStyle={stylesMap.panel}
                couplerStyle={circuitTypeProperties.panelCoupler}
                yOffset={this.state.yOffset}
                moduleSpacing={this.state.moduleSpacing}
                panelSpacing={this.state.panelSpacing}
                couplerSpacing={this.state.couplerSpacing}
                panelWidth={this.state.panelWidth}
                onSelectionChange={this._onSelectionChange}
                endpointLabelOffset={18} />
        );
    }

```

---

### Style

The connection component and the two endpoint components of each member of the coupler group have a style that needs to be provided just like in the connection and endpoint example.  To accomodate different standard types of circuits we provide an object describing the different types, with properties such as style, shape, and shape specific values, required to properly render the circuit. At a minimum, each circuit needs a `style` and a `lineShape` so the underlying connection primitive knows what to draw.  Note that for the Patch Panel, all lineShapes are set to "linear", with the exception of the `panelCoupler` which is the center coupler.
	
```js
const circuitTypeProperties = {
    optical: {
        style: stylesMap.optical,
        lineShape: "linear",
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
    panelCoupler: {
        style: stylesMap.panelCoupler,
        lineShape: "square",
        size: 60,
        squareWidth: 90,
    },
};
```

The style for each circuit type is taken from the style map which maps the individual styles for each type, as well as any endpoint style we want to define:

```js
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

```js
onst panelCouplerStyle = {
    node: {
        normal: {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#F8F8F8"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
            fill: "#F8F8F8"
        }
    },
    line: {
        normal: {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#E8E8E8",
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
            fill: "#E8E8E8"
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

Panels have a unique style which is defined separately as well:

```js
const panelStyle = {
    stroke: "#E4E4E4",
    strokeWidth: 1,
    fill: "#FFFFFF",
};
```