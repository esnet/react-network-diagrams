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
            "$oid": "5d88919f712eff0920aad6f9"
        },
        "name": "HMRC",
        "description": "HMRC MIPP core links",
        "nodes": [
            {
                "id": "6042043d-3387-41c5-b5c0-f911b624ea50",
                "label_dx": null,
                "label_dy": null,
                "label_position": "right",
                "name": "edge0.321967.ld5.uk",
                "type": "esnet_site",
                "x": 109,
                "y": 21
            },
            {
                "id": "227a48e1-96f4-4168-a086-8f59646b93ff",
                "label_dx": null,
                "label_dy": null,
                "label_position": "left",
                "name": "edge0.321967.thw.uk",
                "type": "esnet_site",
                "x": 59,
                "y": 72
            },
            {
                "id": "11cf6b7c-c7fd-440c-a8b7-b376257d5d59",
                "label_dx": null,
                "label_dy": null,
                "label_position": "right",
                "name": "edge0.321967.hex.uk",
                "type": "esnet_site",
                "x": 164,
                "y": 72
            },
            {
                "id": "aebeb065-6b2b-4110-8655-788e81bacb7e",
                "label_dx": null,
                "label_dy": null,
                "label_position": "bottom",
                "name": "hSo THW",
                "type": "hub",
                "x": 59,
                "y": 88
            },
            {
                "id": "c6d9cfdd-51d3-490c-bd2c-818957518b72",
                "label_dx": null,
                "label_dy": null,
                "label_position": "bottom",
                "name": "hSo LD8",
                "type": "hub",
                "x": 164,
                "y": 88
            },
            {
                "id": "a0dc61a0-2e20-4d55-91c7-b49c58fc24c2",
                "label_dx": null,
                "label_dy": null,
                "label_position": "top",
                "name": "hSo LD5",
                "type": "esnet_site",
                "x": 109,
                "y": 4
            }
        ],
        "edges": [
            {
                "source": "227a48e1-96f4-4168-a086-8f59646b93ff",
                "target": "6042043d-3387-41c5-b5c0-f911b624ea50",
                "capacity": "10G",
                "source_int": "xe-2/0/3"
            },
            {
                "source": "11cf6b7c-c7fd-440c-a8b7-b376257d5d59",
                "target": "6042043d-3387-41c5-b5c0-f911b624ea50",
                "capacity": "10G",
                "source_int": "xe-2/0/3"
            },
            {
                "source": "11cf6b7c-c7fd-440c-a8b7-b376257d5d59",
                "target": "227a48e1-96f4-4168-a086-8f59646b93ff",
                "capacity": "10G",
                "source_int": "xe-2/0/0"
            },
            {
                "source": "227a48e1-96f4-4168-a086-8f59646b93ff",
                "target": "aebeb065-6b2b-4110-8655-788e81bacb7e",
                "capacity": "10G",
                "source_int": "xe-2/0/2",
                "data_source": "influx"
            },
            {
                "source": "11cf6b7c-c7fd-440c-a8b7-b376257d5d59",
                "target": "c6d9cfdd-51d3-490c-bd2c-818957518b72",
                "capacity": "10G",
                "source_int": "xe-2/0/2",
                "data_source": "influx"
            },
            {
                "source": "6042043d-3387-41c5-b5c0-f911b624ea50",
                "target": "a0dc61a0-2e20-4d55-91c7-b49c58fc24c2",
                "capacity": "10G",
                "source_int": "xe-0/3/0",
                "data_source": "influx"
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
             "227a48e1-96f4-4168-a086-8f59646b93ff--6042043d-3387-41c5-b5c0-f911b624ea50": 889769039.7866666,
             "6042043d-3387-41c5-b5c0-f911b624ea50--227a48e1-96f4-4168-a086-8f59646b93ff": 3584448711.4666667,
             "11cf6b7c-c7fd-440c-a8b7-b376257d5d59--6042043d-3387-41c5-b5c0-f911b624ea50": 3557271510.2933335,
             "6042043d-3387-41c5-b5c0-f911b624ea50--11cf6b7c-c7fd-440c-a8b7-b376257d5d59": 2508929033.386667,
             "11cf6b7c-c7fd-440c-a8b7-b376257d5d59--227a48e1-96f4-4168-a086-8f59646b93ff": 3882.6133333333332,
             "227a48e1-96f4-4168-a086-8f59646b93ff--11cf6b7c-c7fd-440c-a8b7-b376257d5d59": 4537.786666666667,
             "227a48e1-96f4-4168-a086-8f59646b93ff--aebeb065-6b2b-4110-8655-788e81bacb7e": 115344361.22666667,
             "aebeb065-6b2b-4110-8655-788e81bacb7e--227a48e1-96f4-4168-a086-8f59646b93ff": 253075604.16,
             "11cf6b7c-c7fd-440c-a8b7-b376257d5d59--c6d9cfdd-51d3-490c-bd2c-818957518b72": 85704238.32,
             "c6d9cfdd-51d3-490c-bd2c-818957518b72--11cf6b7c-c7fd-440c-a8b7-b376257d5d59": 586073350.3466667,
             "6042043d-3387-41c5-b5c0-f911b624ea50--a0dc61a0-2e20-4d55-91c7-b49c58fc24c2": 390599463.44,
             "a0dc61a0-2e20-4d55-91c7-b49c58fc24c2--6042043d-3387-41c5-b5c0-f911b624ea50": 307070513.28
         }
     };

    const traffic = new TimeEvent(edgeTraffic.timestamp, Immutable.Map(edgeTraffic.traffic));

    const labels = {
        "6042043d-3387-41c5-b5c0-f911b624ea50--a0dc61a0-2e20-4d55-91c7-b49c58fc24c2": 44,
        "a0dc61a0-2e20-4d55-91c7-b49c58fc24c2--6042043d-3387-41c5-b5c0-f911b624ea50": 28
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

