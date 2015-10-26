### Endpoint Properties

Endpoints have a number of properties that allow for customization.  These can be divided into the following categories:

Position Related:
	
	x
	y

Label Related:
	
	label
	labelPosition
	offset

Style Related:
	
	style
	muted
	selected
	shape
	radius

The `x` and `y` properties determine the position of the endpoint on the `svg` grid, while 'labelPosition' determines where the label for the endpoint will be positioned around the endpoint.  The `offset` property allow you to customize the distance the label has from the endpoint's `x` and `y` as the initial position of the label is determined based on these properties.  The `offset` property has no effect on the angled labels, as these require pre-determined offset distances based on the rotation.  The `label` property is the name that will be displayed on the endpoint.  In the example, we have used the `labelPosition` prop to double as the `label`.

### Style Properties

Endpoints and Labels have a style that is passed in as an object with the following format:

	const endpointStyle1 = {
	    node: {
	        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
	        selected: {fill: "none", stroke: "#b1b1b1", strokeWidth: 6},
	        muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2,
	                opacity: 0.6, cursor: "pointer"}
	    },
	    label: {
	        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
	        selected: {fill: "#333",stroke: "none", fontSize: 11},
	        muted: {fill: "#696969", stroke: "none", fontSize: 9,
	                opacity: 0.6}
	    }
	}

The style has two components, one for the endpoint itself (`node`) and one for the label (`label`).  Each group has three different possible options depending on the way the endpoint should be rendered; `normal` provides the standard view of the endpoint, `selected` for when the endpoint is moused over, and `muted` for when the endpoint is not selected.  The `muted` and `selected` props are boolean values that tell the lower level primitive that you want to use these styles.  They will default to FALSE unless specified.

The other style related properties `shape` and `radius` allow further customization of the the node.  The default `shape` is circle unless otherwise specified.  The `radius` prop allows you to specify the size of the endpoint radius.  The `cloud` shape does not take a `radius` prop.

### Different Styles

If you want to use different styles for different kinds of nodes, you can specify CSS properties in a mapping:

	const stylesMap = {
	    endpoint1: endpointStyle1,
	    endpoint2: endpointStyle2,
	};

### Rendering the endpoint

Once we have the style defined and the basic properties set, we render the endpoint

	<Endpoint x={x}
          	  y={y}
          	  style={stylesMap.endpoint1}
              labelPosition={this.state.labelPosition}
              label={this.state.labelPosition}
              offset={this.state.offset}
              shape={this.state.shape}
              radius={this.state.radiusSize}
              muted={this.state.mutedStyle}
              selected={this.state.selectedStyle} />


