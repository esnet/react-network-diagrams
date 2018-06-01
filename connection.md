

Connections make use of both the low level node and edge components to draw the connection and line-caps we use in map and circuit diagrams. Typically you would use a higher level component such as a `<TrafficMap>` or a `<Circuit>` rather than this low level component.

Connections have a a large number of properties that allow for customization, but most have useful defaults. See the API details below for the full list.

Here a simple example of using the `<Connection>` element:

```js

import { Connection } from "react-network-diagrams";

...

    render() {
        return (
            <Connection
                x1={100}
                y1={50}
                x2={300}
                y2={50}
                lineShape="linear"
                label="ALBQ-DENV"
                style={style}
                muted={false}
                selected={false}
                radius={10}
                endpointShape="circle"
                navTo={2}
                onSelectionChange={this.handleSelectionChange} />
        );
    }

```
