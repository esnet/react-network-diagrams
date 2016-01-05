
An `<Endpoint>` is typically not used directly. Rather, it is used with a Circuit. Nonetheless here is a simple example of using an `<Endpoint>` directly:

```jsx

import { Endpoint } from "react-network-diagrams";

...

    render() {
        return (
            <Endpoint
                label="ALBQ"
                x={x} y={y}
                shape="circle"
                style={styles.endpoint}
                labelPosition="top"
                radius={10} />
        );
    }

```

