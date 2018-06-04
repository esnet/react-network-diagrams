Here is a simple example of using an `<Rack>` directly:

```jsx

import { Rack } from "react-network-diagrams";

...

    render() {
        return (
            <Rack
                rackHeight={rackData.height}
                rackWidth={rackData.width}
                pxToInch={10}
                label={rackData.name}
                rackStyle={rackStyle}
                facing={"Back"}
                pattern={pattern}
                displayRmu={this.state.displayRmu}
                descending={this.state.descending}
            >
        );
    }

```

