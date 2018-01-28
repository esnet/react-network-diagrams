```js
const legend = React.createClass({

    render() {
        const trafficLegendData = [
            {color: "#990000", label: "50+ Gbps", range: [50, 100]},
            {color: "#bd0026", label: "20 - 50", range: [20, 50]},
            {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
            {color: "#016c59", label: "5 - 10", range: [5, 10]},
            {color: "#238b45", label: "2 - 5", range: [2, 5]},
            {color: "#3690c0", label: "1 - 2", range: [1, 2]},
            {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
        ];
        const capacityMap = {
            "100 Gbps": 7,
            "40 Gbps": 4,
            "10 Gbps": 1,
            "1 Gbps": 0.5
        };
        const nodeLegendData = [
            {color: "#B0B0B0", label: "Site", classed: "esnet_site", radius: 8},
            {color: "#CBCBCB", label: "Hub", classed: "hub", radius: 7}
        ];

        const edgeTypes = _.map(capacityMap, (width, name) => {
            let label = name;
            return {
                text: label,
                strokeWidth: width
            };
        });

        const colorSwatches = _.map(trafficLegendData, (color) => {
            return {
                text: color.label,
                stroke: color.color,
                fill: color.color
            };
        });

        const nodeTypes = _.map(nodeLegendData, (nodeInfo) => {
            return {
                text: nodeInfo.label,
                stroke: nodeInfo.color,
                fill: nodeInfo.color,
                radius: nodeInfo.radius,
                classed: nodeInfo.classed
            };
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <svg width="360" height="100">
                            <MapLegend
                               x={10}
                               y={10}
                               itemsPerColumn={4}
                               edgeTypes={edgeTypes}
                               nodeTypes={nodeTypes}
                               colorSwatches={colorSwatches}
                               edgeColor={"#6D6E71"}
                               columnWidth={95}
                               exampleWidth={15}
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
});
```