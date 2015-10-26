### Connection Properties

Connections make use of both the endpoints and map-edge components to draw the connection line and line-caps.  They have a number of properties that allow for customization, dependent on the `lineShape` property, and `endpointShape` property.  Endpoints can be replaced with an arrow by setting the `arrow` property to "true".  

The following properties are used for all shapes:

####Position Related:
	
	lineShape
	x1
	x2
	y1
	y2

The `x1`, `x2`, `y1`, and `y2` properties determine the position of the endpoints on the `svg` grid.  A path is then drawn betwween the endpoints.  If the `lineShape` property is set to "square", the width of the square will be the distance between `x1` and `x2`, with the height of the square determined by the `size` prop.  


####Style Related:

	style
	muted
	selected

These allow you to customize the colors of the endpoints and are discussed in detail below.

####Label related:

	label
	labelPosition
	xOffset
	yOffset

The `labelPosition`, determines where the label will be positioned around the line. The `xOffset` and `yOffset` properties allow you to customize the distance the label is from the x and y properties.  The `xOffset` has no impact if the `labelPosition` is set to "top" or "bottom".  The `label` property is the name that will be displayed on the line.  In the example, we have used the `labelPosition` prop to double as the `label`.

####Enable navigation:

	noNavigate

This allows navigation to be disabled if set to "false".

####Linear Properties:

	position

When specified, `position` will offset a linear, curved, or angled line from the `x1,y1,x2,y2` corrdinates using a combination of vectors.

####Curved Properties:

	position
	curveDirection
	curveOffset

The `curveDirection` property determines whether the curve moves to the left or the right of the non-horizontal vector between `x1,y1` and `x2,y2`.  The `curveOffset` property specifies the distance of the curve from the vector between `x1,y1` and `x2,y2`.

####Square Properties:

	size
	roundedX
	roundedY

The `size` property is used to specify the height of the square, and is also used when calculating the label position around a square.  The `roundedX,roundedY` properties allow you to choose the corner rounding of a square.

####Angled Properties:

Forthcoming


####Endpoint Only properties:
	
	endpointShape
	radius

These properties function identical to the properties in the endpoint exmaple.

####Arrows:

	arrow
	arrowWidth
	arrowHeight

When `arrow` is set to "true", the vector between `x1,y1` and `x2,y2` will have the line-caps replaced with a directional arrow.  Arrowheads can be sized using the `arrowWidth` and `arrowHeight` property.

### Style Properties

Connections, Endpoints and Labels have a style that is passed in as an object with the following format:

	const exampleStyle1 = {
	    node: {
	        normal: {
	        	stroke: "#737373", 
	        	strokeWidth: 4, 
	        	fill: "#737373"
	        },
	        selected: {
	        	fill: "#b1b1b1", 
	        	stroke: "#b1b1b1", 
	        	strokeWidth: 6
	        },
	        muted: {
	        	fill: "#DBDBDB", 
	        	stroke: "#DBDBDB", 
	        	strokeWidth: 2,
	            opacity: 0.6, 
	            cursor: "pointer"
	        },
	        highlighted: {
	        	stroke: "#b1b1b1", 
	        	strokeWidth: 4, 
	        	fill: "#b1b1b1"
	        }
	    },
	    line: {
	        normal: {
	            stroke: "#737373",
	            strokeWidth: 1,
	            fill: "#D5D5D5"
	        },
	        selected: {
	            stroke: "#333",
	            strokeWidth: 2,
	            fill: "#D5D5D5"
	        },
	        muted: {
	            stroke: "#696969",
	            strokeWidth: 1,
	            opacity: 0.6,
	            fill: "#D5D5D5"
	        },
	        highlighted: {
	            stroke: "#4EC1E0",
	            strokeWidth: 1,
	            fill: "#D5D5D5",
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

The style has three components, one for the two line-caps (`node`), one for the label (`label`) and one for the line (`line`).  Each group has up to four different possible options depending on the way the line and endpoint should be rendered; 

* `normal` provides the standard view of the component

* `selected` for when the component is clicked

* `muted` for when the component is in the background  

* `highlighted` is used when the component is moused over  

The `muted` and `selected` props are boolean values that tell the lower level primitive that you want to use these styles.  They will default to FALSE unless specified.  The `fill` property on each category is used for line-caps and square connections, allowing different colors to be specified for the interior of the shapes.

###  Different Styles

If you want to use different styles for different kinds of connections, you can specify CSS properties in a mapping:

	const stylesMap = {
    	line1: exampleStyle1,
    	line2: exampleStyle2,
    	line3: exampleStyle3,
	};

### Rendering the line

Once we have the style defined and basic properties set, we render the connection and two endpoints

	<Connection x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        style={this.state.style}
        position={this.state.position}
        lineShape={this.state.lineShape}
        label={this.state.labelPosition}
        labelPosition={this.state.labelPosition}
        xOffset={this.state.labelXOffset}
        yOffset={this.state.labelYOffset}
        muted={this.state.mutedStyle}
        selected={this.state.selectedStyle}
        arrow={this.state.arrowStyle}
        arrowWidth={this.state.arrowWidth}
        arrowHeight={this.state.arrowHeight}
        radius={this.state.radiusSize}
        endpointShape={this.state.endpointShape}
        noNavigate={this.state.noNavigate} />


