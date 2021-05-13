import React from 'react';
import {Resizable} from "../components/Resizable";
import {TrafficMap} from "../components/TrafficMap";
import { TimeEvent, TimeSeries } from "pondjs";
import * as Immutable from "immutable";

export default {
  title: 'Weathermap',
};


export const weathermap = () => {

    const bounds = {
        x1: 0, y1: 0,
        x2: 225, y2: 100
    };

    const topo = {
        "_id": {
        "$oid": "5d88d25c712eff0920aad702"
    },
        "name": "West London Network",
        "description": "Sites to the West of London",
        "nodes": [
        {
            "id": "185.75.28.21",
            "label_dx": null,
            "label_dy": null,
            "label_position": "left",
            "name": "to.THW",
            "type": "esnet_site",
            "x": 36,
            "y": 78
        },
        {
            "id": "185.75.28.18",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "pe-r-00.wok.uk",
            "type": "mx104",
            "x": 36,
            "y": 54
        },
        {
            "id": "185.75.28.13",
            "label_dx": null,
            "label_dy": null,
            "label_position": "topleft",
            "name": "pe-r-01.cod.uk",
            "type": "mx204",
            "x": 68,
            "y": 54
        },
        {
            "id": "185.75.28.12",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "pe-r-00.cod.uk",
            "type": "mx204",
            "x": 99,
            "y": 54
        },
        {
            "id": "185.75.28.1",
            "label_dx": null,
            "label_dy": null,
            "label_position": "bottomleft",
            "name": "pe-r-00.ld5.uk",
            "type": "mx480",
            "x": 128,
            "y": 54
        },
        {
            "id": "185.75.28.3",
            "label_dx": null,
            "label_dy": null,
            "label_position": "right",
            "name": "to.LD8",
            "type": "esnet_site",
            "x": 215,
            "y": 89
        },
        {
            "id": "185.75.28.15",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "pe-r-01.spr.uk",
            "type": "mx204",
            "x": 68,
            "y": 14
        },
        {
            "id": "185.75.28.14",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "pe-r-00.spr.uk",
            "type": "mx204",
            "x": 99,
            "y": 14
        },
        {
            "id": "185.75.28.9",
            "label_dx": null,
            "label_dy": null,
            "label_position": "right",
            "name": "to.TH2.FR",
            "type": "esnet_site",
            "x": 215,
            "y": 54
        },
        {
            "id": "185.75.28.26",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "pe-r-00.bsm.uk",
            "type": "mx104",
            "x": 169,
            "y": 19
        },
        {
            "id": "185.75.28.27",
            "label_dx": null,
            "label_dy": null,
            "label_position": "top",
            "name": "to.MA3",
            "type": "esnet_site",
            "x": 128,
            "y": 4
        },
        {
            "id": "185.75.28.17",
            "label_dx": null,
            "label_dy": null,
            "label_position": "right",
            "name": "to.THE",
            "type": "esnet_site",
            "x": 215,
            "y": 19
        }
    ],
        "edges": [
        {
            "source": "185.75.28.18",
            "target": "185.75.28.21",
            "capacity": "10G",
            "source_int": "xe-2/0/3",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.18",
            "target": "185.75.28.13",
            "capacity": "10G",
            "source_int": "xe-2/0/0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.12",
            "target": "185.75.28.13",
            "capacity": "20G",
            "source_int": "ae0,xe-0/1/1,xe-0/0/0:0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.12",
            "target": "185.75.28.1",
            "capacity": "20G",
            "source_int": "ae1,xe-0/1/0,xe-0/1/3",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.15",
            "target": "185.75.28.13",
            "capacity": "10G",
            "source_int": "xe-0/0/0:0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.15",
            "target": "185.75.28.14",
            "capacity": "10G",
            "source_int": "xe-0/1/0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.1",
            "target": "185.75.28.14",
            "capacity": "10G",
            "source_int": "xe-0/0/8",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.1",
            "target": "185.75.28.27",
            "capacity": "10G",
            "source_int": "xe-0/0/0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.1",
            "target": "185.75.28.9",
            "capacity": "10G",
            "source_int": "xe-0/2/0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.1",
            "target": "185.75.28.26",
            "capacity": "1G",
            "source_int": "ge-1/2/9",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.26",
            "target": "185.75.28.17",
            "capacity": "10G",
            "source_int": "xe-2/0/0",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.1",
            "target": "185.75.28.3",
            "capacity": "20G",
            "source_int": "ae2,xe-0/0/4,xe-0/2/4",
            "data_source": "jti"
        },
        {
            "source": "185.75.28.13",
            "target": "185.75.28.21",
            "capacity": "10G",
            "data_source": "jti",
            "source_int": "xe-0/1/5"
        }
    ]
    };

    const edgeColorMap = [
        {color: "#e20200", label: ">=80%", range: [80, 100]},
        {color: "#ff7d30", label: "50 - 80%", range: [50, 80]},
        {color: "#e89c3f", label: "40 - 50%", range: [40, 50]},
        {color: "#016c59", label: "20 - 40%", range: [20, 40]},
        {color: "#238b45", label: "10 - 20%", range: [10, 20]},
        {color: "#3690c0", label: "1 - 10%", range: [1, 10]},
        {color: "#74a9cf", label: "0 - 1%", range: [0, 1]}
    ];

    const labelStyle = {
        normal: {fill: "#696969", stroke: "none", fontSize: 9},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 8,
            opacity: 0.6}
    };

    const mutedStyle = {fill: "#B0B0B0", stroke: "#9E9E9E", opacity: 0.6, cursor: "pointer"};

    const selectedStyle = {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)", strokeWidth: 10, cursor: "pointer"};

// Mapping of node type to style
     const stylesMap = {
        mx10k3: { name: "MX10k3", node: { normal: {fill: "#E84B21", stroke: "#E84B21", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        mx480: { name: "MX480", node: { normal: {fill: "#6F81B5", stroke: "#6F81B5", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        mx204: { name: "MX204", node: { normal: {fill: "#318883", stroke: "#318883", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        mx104: { name: "MX104", node: { normal: {fill: "#195F83", stroke: "#195F83", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        acx: { name: "ACX5048", node: { normal: {fill: "#E8DB8B", stroke: "#E8DB8B", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        ex: { name: "EX Switch", node: { normal: {fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        hub: { name: "Hub", node: { normal: {fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
        esnet_site: { name: "ESNet Site", node: { normal: {fill: "#B0B0B0", stroke: "#9E9E9E", cursor: "pointer"}, selected: selectedStyle, muted: mutedStyle}, label: labelStyle },
    };

     const nodeSizeMap = {
        hub: 5.5,
        esnet_site: 7,
        mx480: 7,
        mx104: 6,
        mx204: 7,
        acx: 6,
        mx10k3: 8,
        ex: 5.5
    };

     const nodeLegendData = Object.keys(stylesMap).map(function(key, index) {
        return {color: stylesMap[key].node.normal.fill, label: stylesMap[key].name, classed: key, radius: nodeSizeMap[key]};
    });

     const edgeThicknessMap = {
        "100G": 6,
        "40G": 5,
        "30G": 4,
        "20G": 3.5,
        "10G": 3,
        "8G": 2.8,
        "4G": 2,
        "2G": 1.8,
        "1G": 1.5
    };


     const edgeTraffic = {
         "timestamp": "2020-03-25T14:55:00+00:00",
         "traffic": {
             "185.75.28.3--185.75.28.1": 889769039.7866666,
             "185.75.28.1--185.75.28.3": 3584448711.4666667
         }
     };

    const traffic = new TimeEvent(edgeTraffic.timestamp, Immutable.Map(edgeTraffic.traffic));

    const labels = {
        "185.75.28.3--185.75.28.1": "ld8 to ld5",
        "185.75.28.1--185.75.28.3": "ld5 to ld8",
        "185.75.28.12--185.75.28.1": "cod to ld5",
        "185.75.28.1--185.75.28.12": "ld5 to cod",
        "185.75.28.13--185.75.28.12": "cod1 to cod0",
        "185.75.28.12--185.75.28.13": "cod0 to cod1",
        "185.75.28.13--185.75.28.21": "cod to thw",
        "185.75.28.21--185.75.28.13": "thw to cod",
    };

    return(
        <Resizable>
            <TrafficMap
                bounds={bounds}
                topology={topo}
                traffic={null}
                edgeColorMap={edgeColorMap}
                edgeColorMode="percent"
                edgeDrawingMethod="bidirectionalArrow"
                edgeThicknessMap={edgeThicknessMap}
                stylesMap={stylesMap}
                traffic={traffic}
                labels={labels}
            />
        </Resizable>
    );
};

