### Rendering a Patch Panel

The Patch Panel is a three-dimensional array of panel objects with length N, with each array member containing an array of modules with length N.  Each module contains an array of one or more objects which allways have a grouping of three distinct circuits; a front circuit, a back circuit and a coupler.  

The Patch Panel assumes a horizontal positioning of each group,  where the y1 and y2 values are equal.  However because it may render 1 or more panels, with 1 or more modules, with 1 or more groups each, sizing is dynamic and a `height` is determined by counting the total number of panels, modules, couplers and various offset lengths.  The panel then builds an \<svg\> element using the `width` props, and the dynamically generated `height`.  

Positions of the front and back circuit are determined by the `margin` prop, with the coupler rendered in the center of the \<svg\> element.  

The panel coupler exploits the ability to render a connections line-caps different sizes and shapes and as a result, the coupler in the center is just a connection, with the line-cap shapes also set to "square".  This allows for the coupler to be selectable in the same manner as any other connection, and follow the same styling methods.

To render a parallel circuit, we pass in the list of patch panels, with props defined in the style map, explained in **Style** below:

	<LocationPanelDiagram
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

___

### Props

The following props are used by a patch panel:

 * `panels` - takes an array of objects as specified below.  Requires a specific format.
 
 * `panelStyle` - the style of the panel - this is the "container" for the modules and couplers.
 
 * `couplerStyle` - the style for the couplers, rendered in groups according to their modules.

 * `yOffset` - This is the vertical distance from the center line to offset the connection label
 
 * `moduleSpacing` - This is the vertical spacing between each module group

 * `panelSpacing` - This is the vertical spacing between each panel

 * `couplerSpacing` - This is the vertical spacing between each coupler
		
 * `panelWidth` - This is the distance from the center of the \<svg\> grid that the panel is to be rendered

 * `onSelectionChange` - Function prop used to handle clicks.

 * `endpointLabelOffset` - This is the distance from the endpoint that the endpoint label will be rendered. 

The following props have default values and are optional for styling:

 * `roundedX` - Controls the corner rounding of the center coupler on the x-axis
 
 * `roundedY` - Controls the corner rounding of the center coupler on the y-axis
 
 * `couplerEndpointRadius` - controls the size of the couper line cap
 
 * `endpointRoundedX` - Controls the corner rounding of the square line-caps on the x-axis
 
 * `endpointRoundedY` - Controls the corner rounding of the square line-caps on the y-axis
 
 * `couplerLabelPosition` - Controls where label is situated in the center coupler, currently **"top", "bottom"** or **"center"**
 
 * `labelPostion` - Controls where label is situated around the line, currently **"top", "bottom"** or **"center"**
 
 * `panelRoundedX`: Controls the corner rounding of the panel on the x-axis,
 
 * `panelRoundedY`: Controls the corner rounding of the panel on the y-axis,
 
 * `labelOffsetX` - Controls the +/- x offset from labelPosition

 * `labelOffsetY` - Controls the +/- y offset from labelPosition


---

### The `panels` prop

To accurately display each panel, modules, and groups of circuits, the Patch Panel requires an array of panels, where each panel contains a panel object.  The panel object has two keys, `panelName` to display the title of the panel, and `modules` which is a two dimensional array of coupler objects.  The rendering is sequential, and will display each panel, with the panels modules and coupler groupings  in the order they are presented in the list.

Each module in the two-dimensional `modules` array is an array of coupler groupings objects.  The coupler groupings objects allways have:

 * `frontCircuit` - The circuit and its properties to be displayed to the left of the coupler.  May be left `null`

 * `backCircuit` - The circuit and its properties to be displayed to the right of the coupler.  May be left `null`

 * `coupler` - The circuit and its properties to be displayed in the center


Each of these objects have there own style, labels, and navigation controls.  The below structure, will render one panel, with one module, with 2 coupler groups.

	const panels = [
    {
        panelName: "Panel 1",
        modules: [
            [  
                { 
                    frontCircuit: {
                        styleProperties: circuitTypeProperties.crossConnect,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 1",
                        endpointLabelZ: "Endpoint 2",
                        circuitLabel: "Member 1",
                        navTo: "Member 1",
                    },
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "1/2-SC",
                        navTo: "Coupler 1/2",
                    },
                    backCircuit: {
                        styleProperties: circuitTypeProperties.leased,
                        endpointStyle: stylesMap.endpoint,
                        endpointLabelA: "Endpoint 3",
                        endpointLabelZ: "Endpoint 4",
                        circuitLabel: "Member 3",
                        navTo: "Member 3",
                    },
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z",
                },
                { 
                    frontCircuit: null,
                    coupler: {
                        styleProperties: circuitTypeProperties.panelCoupler,
                        endpointStyle: circuitTypeProperties.panelCoupler,
                        endpointLabelA: "Endpoint 2",
                        endpointlabelZ: "Endpoint 3",
                        circuitLabel: "3/4-SC",
                        navTo: "Coupler 3/4",
                    },
                    backCircuit: null,
                    frontLabel: "Endpoint A",
                    backLabel: "Endpoint Z",
                },
            ]
        ]
    },

---

### Style

The connection component and the two endpoint components of each member of the coupler group have a style that needs to be provided just like in the connection and endpoint example.  To accomodate different standard types of circuits we provide an object describing the different types, with properties such as style, shape, and shape specific values, required to properly render the circuit. At a minimum, each circuit needs a `style` and a `lineShape` so the underlying connection primitive knows what to draw.  Note that for the Patch Panel, all lineShapes are set to "linear", with the exception of the `panelCoupler` which is the center coupler.
	
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

	const panelCouplerStyle = {
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

We also need to define an endpoint style for the endpoints, which has a node and label component to style the endpoint node, as well as the label:

	const endpointStyle = {
	    node: {
	        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
	    },
	    label: {
	        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
	    }
	};

Panels have a unique style which is defined separately as well:

	const panelStyle = {
	    stroke: "#E4E4E4",
	    strokeWidth: 1,
	    fill: "#FFFFFF",
	};