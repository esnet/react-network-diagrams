### Rendering a basic circuit

The Concatenated Circuit is an ordered array of circuits of length N, with each circuit being rendered as a combination of a connection with two endpoints. The concatination is directional, meaning that the second endpoint of the previous member should equal the first endpoint of the next member.  

The concatenated circuit assumes a horizontal positioning of a circuit where the y1 and y2 values are equal.  A concatenated circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning of the concatenation based on the `margin` prop, with each member rendered sequentially based on a calculation of the segment length.  In the example, we have left these as the default values of `width: 851, height: 250, margin: 100`, but these props can be specified to change the viewing area and circuit positioning.

##### Calculating member lengths
Since we may want to render different members different lengths, each member circuit inside the concatenation is positioned based on the presence of the `squareWidth` prop.  We assume that the presence of `squareWidth` means a non-standard width, so we use the following formula to calculate the standard segment length:

---
**Standard Segment Length = ( Total Length - ( Total Length of all `squareWidth` props ) ) / number of members without the `squareWidth` prop**

---

Once we have the standard segment length, we can position each endpoint sequentially based on the segments length, which is either the standard length or `squareWidth` length.  If no segments have a `squareWidth` property, they will all render with equal distance.

To render a concatenated circuit, we pass in the list of member circuits, with props defined in the style map, explained in **Style** below:

	<ConcatenatedCircuit 
		hideTitle={this.state.hideTitle}
		memberList={memberList}
		endpointLabelPosition={this.state.endpointLabelPositionChoice}
		connectionLabelPosition={this.state.circuitLabelPositionChoice}
		yOffset={7}
		disabled={this.state.disabled}
		title={"Example Concatenated Circuit"}
		onSelectionChange={this._onSelectionChange}
		endpointLabelOffset={18}
		parentId={"Test Navigation"} />

___

### Props

The following props are used by a concatenated circuit:

 * `hideTitle` - **Boolean** value that determines whether or not the upper left corner title is displayed
 
 * `memberList` - takes an array of objects as specified below.  Requires a specific format.
 
 * `connectionLabelPosition` - described the position of the connection label; accepts **"top"**, **"center"**, or **"bottom"**
 
 * `endpointLabelPosition` - The position of the label around the endpoint.  See endpoint example for available options
 
 * `yOffset` - This is the vertical distance from the center line to offset the connection label

 * `endpointLabelOffset` - This is the distance from the endpoint that the endpoint label will be rendered. 

 * `title` - The string to display in the top left corner of the diagram

 * `disabled` - **Boolean** value that determines if the circuit view is muted.  Typically used in conjunction with `parentID`

 * `onSelectionChange` - Function prop used to handle clicks.

 * `parentId` - String value that if provided, will render a small nav arrow that when clicked, navigates to that element.  Used mainly when we want to show a parent / child relationship between two circuits.

---

### The `memberList` prop

To accurately display each of the member circuits, the concatenated circuit requires an ordered array of circuit objects, where each object contains the props to be used by the lower level connection and endpoint primitives.  Since the list renders sequentially, it assumes that the member circuits are in order. The list can be any length and needs to be constructed as such:

	const memberList = [
		{
		    styleProperties: circuitTypeProperties.darkFiber,
		    endpointStyle: stylesMap.endpoint,
		    endpointLabelA: "Endpoint 1",
		    endpointLabelZ: "Endpoint 2",
		    circuitLabel: "Member 1",
		    navTo: "Member 1",
		},
		{
		    styleProperties: circuitTypeProperties.coupler,
		    endpointStyle: stylesMap.endpoint,
		    endpointLabelA: "Endpoint 2",
		    endpointLabelZ: "Endpoint 3",
		    circuitLabel: "Member 2",
		    navTo: "Member 2",
		},
		{
		    styleProperties: circuitTypeProperties.leased,
		    endpointStyle: stylesMap.endpoint,
		    endpointLabelA: "Endpoint 3",
		    endpointLabelZ: "Endpoint 4",
		    circuitLabel: "Member 3",
		    navTo: "Member 3",
		},
	];

---

### Style

The connection component and the two endpoint components of each member of the `memberList` have a style that needs to be provided just like in the connection and endpoint example.  To accomodate different standard types of circuits we provide an object describing the different types, with properties such as style, shape, and shape specific values, required to properly render the circuit. At a minimum, each circuit needs a `style` and a `lineShape` so the underlying connection primitive knows what to draw.  If the shape is not linear, or specific properties about each circuit type such as label position or disabling navigation need to be called out, these can be specified here:

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
