### Rendering a Parallel circuit

The Parallel Circuit is an array of circuits of length N, with each circuit being rendered as a linear connection, sharing two master endpoints.  The Parallel Circuit currenly only accepts the "linear" shape.  The Parallel Circuit assumes a horizontal positioning of a circuit where the y1 and y2 values are equal.  A parallel circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning and end of the circuit based on the `margin` prop.  

Members are rendered as individual connections without endpoints, offset from each other. The offset will increase by a multiplicative amount based on the number of members in the parallel circuit, and members are rendered sequentially.

To render a parallel circuit, we pass in the list of member circuits, with props defined in the style map, explained in **Style** below:

	<ParallelCircuit 
		hideTitle={this.state.hideTitle}
		memberList={memberList}
		endpointLabelPosition={this.state.endpointLabelPositionChoice}
		connectionLabelPosition={this.state.circuitLabelPositionChoice}
		disabled={this.state.disabled}
		title={"Example Parallel Circuit"}
		onSelectionChange={this._onSelectionChange}
		endpointLabelA={"Endpoint 1"}
		endpointLabelZ={"Endpoint 2"}
		endpointStyle={stylesMap.endpoint}
		endpointLabelOffset={18}
		parentId={"Test Navigation"} />

___

### Props

The following props are used by a parallel circuit:

 * `hideTitle` - **Boolean** value that determines whether or not the upper left corner title is displayed
 
 * `memberList` - takes an array of objects as specified below.  Requires a specific format.
 
 * `connectionLabelPosition` - described the position of the connection label; accepts **"top"**, **"center"**, or **"bottom"**
 
 * `endpointLabelPosition` - The position of the label around the endpoint.  See endpoint example for available options
 
 * `endpointLabelOffset` - This is the distance from the endpoint that the endpoint label will be rendered. 

 * `endpointStyle` - the style of the endpoint as represented as an object

 * `endpointLabelA` - A string for the left side endpoint label
		
 * `endpointLabelZ` - A string for the right side endpoint label

 * `title` - The string to display in the top left corner of the diagram

 * `disabled` - **Boolean** value that determines if the circuit view is muted.  Typically used in conjunction with `parentID`

 * `onSelectionChange` - Function prop used to handle clicks.

 * `parentId` - String value that if provided, will render a small nav arrow that when clicked, navigates to that element.  Used mainly when we want to show a parent / child relationship between two circuits.

---

### The `memberList` prop

To accurately display each of the member circuits, the Parallel circuit requires an array of circuit objects, where each object contains the props to be used by the lower level connection and endpoint primitives.  The list can be any length and needs to be constructed as such:

	const memberList = [
        {
            styleProperties: circuitTypeProperties.darkFiber,
            circuitLabel: "Member 1",
            navTo: "Member 1",
        },
        {
            styleProperties: circuitTypeProperties.darkFiber,
            circuitLabel: "Member 2",
            navTo: "Member 2",
        },
        {
            styleProperties: circuitTypeProperties.darkFiber,
            circuitLabel: "Member 3",
            navTo: "Member 3",
        },
        {
            styleProperties: circuitTypeProperties.darkFiber,
            circuitLabel: "Member 4",
            navTo: "Member 4",
        },
    ];

---

### Style

The connection component and the two endpoint components of each member of the `memberList` have a style that needs to be provided just like in the connection and endpoint example.  To accomodate different standard types of circuits we provide an object describing the different types, with properties such as style, shape, and shape specific values, required to properly render the circuit. At a minimum, each circuit needs a `style` and a `lineShape` so the underlying connection primitive knows what to draw.  Note that for the Parallel Circuit, all lineShapes are set to "linear".
	
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
