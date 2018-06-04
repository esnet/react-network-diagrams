
An `<Equipment>` is a svg rectangle that needs to know its width, height, and style. It receives its 'x' and 'y' starting position from the parent rack element, or a default derived from a specified offset value.

It takes a label as well in the form of a string or list of strings if multilines are desired

Here is a simple example of using an `<Endpoint>` directly:

```jsx

import { Equipment } from "react-network-diagrams";

...

    render() {
        return (
            <Equipment
                x={150}
                y={75}
                equipmentHeight={this.state.equipmentHeight}
                equipmentWidth={this.state.equipmentWidth}
                pxToInch={this.state.pxToInch}
                selected={this.state.selectedStyle}
                muted={this.state.mutedStyle}
                style={this.state.style}
                backStyle={backStyle}
                textAnchor={this.state.textAnchor}
                labelPosition={this.state.labelPosition}
                label={`${this.state.labelPosition}-${this.state.textAnchor}`}
                labelOffsetX={this.state.labelOffsetX}
                labelOffsetY={this.state.labelOffsetY}
                navTo={this.state.labelPosition}
                showHeight={this.state.showHeight}
                noNavigate={this.state.noNavigate}
                onSelectionChange={this.handleSelectionChange}
            />
        );
    }

```

