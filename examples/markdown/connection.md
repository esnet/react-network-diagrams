

Connections make use of both the endpoints and map-edge components to draw the connection-line and line-caps.  They have a number of properties that allow for customization, dependent on the `lineShape` property, and `endpointShape` property.  Endpoints can be replaced with an arrow by setting the `arrow` property to "true".

Here is the structure of the connection element:
    
    <Connection 
        x1={this.state.x1}
        x2={this.state.x2}
        y1={this.state.y1}
        y2={this.state.y2}
        lineShape={this.state.lineShape}
        label={`${this.state.labelPosition}-${this.state.textAnchor}`}
        labelPosition={this.state.labelPosition}
        labelOffsetX={this.state.labelOffsetX}
        labelOffsetY={this.state.labelOffsetY}
        textAnchor={this.state.textAnchor}
        style={this.state.style}
        muted={this.state.mutedStyle}
        selected={this.state.selectedStyle}
        roundedX={this.state.roundedX}
        roundedY={this.state.roundedY}
        size={this.state.size}
        centerLine={this.state.centerLine}
        position={this.state.position}
        curveOffset={this.state.curveOffset}
        bendOffset={this.state.bendOffset}
        curveDirection={this.state.curveDirection}
        radius={this.state.radiusSize}
        endpointShape={this.state.endpointShape}
        endpointRoundedX={0}
        encpointRoundedY={0}
        arrow={this.state.arrowStyle}
        arrowWidth={this.state.arrowWidth}
        arrowHeight={this.state.arrowHeight}
        noNavigate={this.state.noNavigate}
        navTo={this.state.labelPosition}
        onSelectionChange={this._onSelectionChange} />


### Props
---
#### Identity Prop used to determine shape

 * `lineShape` - Controls shape of the line, can be **"linear", "square", "angled", "arc"**

---
#### Positional Props used by all shapes

 * `x1` - Controls the X coordinate of the line beginning

 * `x2` - Controls the X coordinate of the line ending

 * `y1` - Controls the Y coordinate of the line beginning

 * `y2` - Controls the Y coordinate of the line ending

The `x1`, `x2`, `y1`, and `y2` properties determine the position of the endpoints on the \<svg\> grid.  A \<path\> is then drawn betwween the endpoints.  If the `lineShape` property is set to "square", the width of the square will be the distance between `x1` and `x2`, with the height of the square determined by the `size` prop.

---
#### Label Props used by all shapes

 * `label` - Provides label to be displayed; Takes either a string, or an array of strings for multiline labels

 * `labelPosition` - Controls where label is situated around the line, currently **"top", "bottom"** or **"center"**

 * `labelOffsetX` - Controls the +/- x offset from labelPosition

 * `labelOffsetY` - Controls the +/- y offset from labelPosition

 * `textAnchor` - Controls the justification of the text, and takes **"begin", "end"** and **"middle"**

The `labelPosition`, determines where the `label` will be positioned around the line. The `xOffset` and `yOffset` properties allow you to customize the distance the label is from the x and y properties.  The `label` property is the name that will be displayed on the line.  If you want to display multiple lines, the label can take an array of strings, with each array element displayed on a separate line.  In the example, we have used the `labelPosition` prop to double as the `label`.

---
#### Style Props, used by all shapes
 
 * `style` - Object prop that controls the inline style for the react element

 * `muted` - **Boolean** value that determines if the 'muted' style from the style object prop is used

 * `selected` - **Boolean** value that determines if the 'muted' style from the style object prop is used

These allow you to customize the colors of the endpoints and are discussed in detail below.

---
#### Props for "square" shape 
 
 * `roundedX` - Controls the corner rounding of the x-axis of the square

 * `roundedY` - Controls the corner rounding of the y-axis of the square

 * `size` - Used to determine the height of the square

 * `centerLine` - **Boolean** value that controls if a horizontal line is drawn down the center of a square

The `size` property is used to specify the height of the square, and is also used when calculating the label position around a square.  The `roundedX,roundedY` properties allow you to choose the corner rounding of a square.

---
#### Line offset Props, used by "angle" and "curved" shapes

 * `position` - Controls the angle of the offset from the center of the line

 * `curveOffset` - Controls the distance from the center x axis the curve will arc through

 * `bendOffset` - Controls the length of the offset line 

 * `curveDirection` - Control the path the curve or angle takes as it relates to ther center line

The `curveDirection` property determines whether the curve moves to the left or the right of the non-horizontal vector between `x1,y1` and `x2,y2`.  The `curveOffset` property specifies the distance of the curve from the vector between `x1,y1` and `x2,y2`. When `position` is specified, this will offset a linear, or curved line from the `x1,y1,x2,y2` corrdinates using a combination of vectors.  This functions slightly differently for angled connections and will instead rotate a point offset from the x and y by an angle.  If the curveDirection is left, this will move clockwise, and will move counterClockwise if right.

---
#### Linecap props, used by all shapes

 * `radius` - Controls the size of the Line-cap

 * `endpointShape` - Controls the shape of the Line-cap as shown in the endpoint example

 * `endPointRoundedX` - If a square endpoint shape is used, controls the corner rounding of the x-axis of the square

 * `endPointRoundedY` - If a square endpoint shape is used, controls the corner rounding of the y-axis of the square

These properties function identical to the properties in the endpoint example.

---
#### Arrow props, not used by "square"

 * `arrow` - **Boolean** value that controls if a directional arrow is drawn instead of linecaps

 * `arrowWidth` - Controls the width of an arrow head

 * `arrowHeight` - Controls the height of an arrow head

When `arrow` is set to "true", the vector between `x1,y1` and `x2,y2` will have the Line-caps replaced with a directional arrow.  Arrowheads can be sized using the `arrowWidth` and `arrowHeight` property.

---
#### Navigation Props, used by all shapes

 * `noNavigate` - **Boolean** value that determines if the element uses the onSelectionChange change and can be clicked 

 * `navTo` - Value passed down to the click handler at the lowest level primitive.  Will return to the onSelectionChange it's value

 * `onSelectionChange` - Function prop used to handle clicks.  

---
### Style

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

The style has three components, one for the two Line-caps (`node`), one for the label (`label`) and one for the line (`line`).  Each group has up to four different possible options depending on the way the line and endpoint should be rendered.

* `normal` provides the standard view of the component
* `selected` for when the component is clicked
* `muted` for when the component is in the background
* `highlighted` is used when the component is moused over

The `muted` and `selected` props are boolean values that tell the lower level primitive that you want to use these styles.  They will default to **false** unless specified.  The `fill` property on each category is used for line-caps and square connections, allowing different colors to be specified for the interior of the shapes.

---
### Different Styles

If you want to use different styles for different kinds of connections, you can specify CSS properties in a mapping:

    const stylesMap = {
        line1: exampleStyle1,
        line2: exampleStyle2,
        line3: exampleStyle3,
    };
