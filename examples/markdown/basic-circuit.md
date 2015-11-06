### Rendering a basic circuit

The Basic Circuit is a combination of a connection with two endpoints. The basic circuit assumes a horizontal positioning of a circuit where the y1 and y2 values are equal.  A basic circuit builds an \<svg\> element out of the `width` and `height` props, and then positions the beginning and end of the circuit based on the `margin` prop, and `height` prop.  In the example, we have left these as the default values of `width: 851, height: 250, margin: 100`, but these props can be specified to change the viewing area and circuit positioning.

To render a basic circuit, we pass in the props defined in the style map, explained in **Style** below:

	<BasicCircuit 
		lineStyle={circuitTypeProperties.optical.style}
		lineShape={circuitTypeProperties.optical.lineShape}
		connectionLabelPosition={this.state.circuitLabelPositionChoice}
		circuitLabel={this.state.circuitTypeChoice}
		yOffset={7}
		title={this.state.circuitTypeChoice}
		noNavigate={circuitTypeProperties.optical.noNavigate}
		size={circuitTypeProperties.optical.size}
		centerLine={circuitType.optical.centerLine}
		squareWidth={circuitType.optical.squareWidth}
		endpointStyle={stylesMap.endpoint}
		endpointLabelPosition={this.state.endpointLabelPositionChoice}
		endpointLabelA={"Endpoint Label A"}
		endpointLabelZ={"Endpoint Label Z"}
		disabled={this.state.disabled}
		onSelectionChange={this._onSelectionChange}
		navTo={this.state.circuitTypeChoice}
		parentId={"Test Navigation"} />

___

### Props

The following props are used by a basic circuit:

 * `lineStyle` - the style of the circuit as represented as an object.
 
 * `lineShape` - text value describing the shape; takes **"linear"**, **"curved"**, **"square"**, or **"angled"**
 
 * `connectionLabelPosition` - described the position of the connection label; accepts **"top"**, **"center"**, or **"bottom"**

 * `circuitLabel` - the string to be displayed for the connection; accepts a string or array of strings if multilined

 * `yOffset` - This is the vertical distance from the center line to offset the connection label

 * `title` - The string to display in the top left corner of the diagram

 * `noNavigate` - **Boolean** value that determines if the element uses the onSelectionChange change and can be clicked 

 * `size` - Used to determine the height of the square

 * `centerLine` - **Boolean** value that controls if a horizontal line is drawn down the center of a square
		
 * `squareWidth` - This value is used to determine X coordinates for a square, if you want the square to be smaller than the default line width.  Overrides the `margin` prop if a square is displayed

 * `endpointStyle` - the style of the endpoint as represented as an object
		
 * `endpointLabelPosition` - The position of the label around the endpoint.  See endpoint example for available options
		
 * `endpointLabelA` - A string for the left side endpoint label
		
 * `endpointLabelZ` - A string for the right side endpoint label

 * `disabled` - **Boolean** value that determines if the circuit view is muted.  Typically used in conjunction with `parentID`

 * `onSelectionChange` - Function prop used to handle clicks.
		
 * `navTo` - Value passed down to the click handler at the lowest level primitive.  Will return to the onSelectionChange it's value

 * `parentId` - String value that if provided, will render a small nav arrow that when clicked, navigates to that element.  Used mainly when we want to show a parent / child relationship between two circuits.

---

### Style
The connection component and the two endpoint components have a style that needs to be provided just like in the connection and endpoint example.  To accomodate different standard types of circuits we provide an object describing the different types, with properties such as style, shape, and shape specific values, required to properly render the circuit. At a minimum, each circuit needs a `style` and a `lineShape` so the underlying connection primitive knows what to draw.  If the shape is not linear, or specific properties about each circuit type such as label position or disabling navigation need to be called out, these can be specified here:

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