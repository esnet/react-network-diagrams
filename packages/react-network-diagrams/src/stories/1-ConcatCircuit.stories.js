import React from 'react';
import {ConcatenatedCircuit} from "../components/ConcatenatedCircuit";
import {Resizable} from "../components/Resizable";

export default {
  title: 'Concat Circuit',
};

let endpointStyle = {
    node: {
        normal: { fill: "none", stroke: "#DBDBDB", strokeWidth: 4 },
        selected: { fill: "none", stroke: "#b1b1b1", strokeWidth: 6 },
        muted: {
            fill: "none",
            stroke: "#DBDBDB",
            strokeWidth: 2,
            opacity: 0.6,
            cursor: "pointer"
        },
        highlighted: { stroke: "#b1b1b1", strokeWidth: 4, fill: "none" }
    },
    label: {
        normal: { fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif" },
        selected: { fill: "#333", stroke: "none", fontSize: 11 },
        muted: {
            fill: "#696969",
            stroke: "none",
            fontSize: 9,
            opacity: 0.6
        },
        highlighted: { fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif" }
    }
};

let styleProps = {
    style: {
        node: {
            normal: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            },
            highlighted: {
                stroke: "#b1b1b1",
                strokeWidth: 4,
                fill: "#b1b1b1"
            }
        },
        line: {
            normal: {
                stroke: "#b46011",
                strokeWidth: 3,
                fill: "none"
            },
            highlighted: {
                stroke: "#4EC1E0",
                strokeWidth: 4,
                fill: "none"
            }
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            }
        }
    },
    lineShape: "linear"
};

let styleProps2 = {
    lineShape: "square",
    size: 36,
    squareWidth: 25,
    noNavigate: true,
    style: {
        node: {
            normal: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
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
            highlighted: {
                stroke: "#4EC1E0",
                strokeWidth: 2,
                fill: "#D5D5D5"
            }
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            }
        }
    }
};

export const standard = () => {
    let memberList = [
        {
            styleProperties: styleProps,
            endpointStyle: endpointStyle,
            endpointLabelA: `Endpoint 1`,
            endpointLabelZ: `Endpoint 2`,
            circuitLabel: `Segment test 1`,
            navTo: `Segment 1`,
        },
        {
            styleProperties: styleProps,
            endpointStyle: endpointStyle,
            endpointLabelA: `Endpoint 3`,
            endpointLabelZ: `Endpoint 4`,
            circuitLabel: `Segment test 2`,
            navTo: `Segment 2`
        },
        {
            styleProperties: styleProps2,
            endpointStyle: endpointStyle,
            endpointLabelA: `Endpoint 5`,
            endpointLabelZ: `Endpoint 6`,
            circuitLabel: `Segment test 3`,
            navTo: `Segment 3`
        },
        {
            styleProperties: styleProps,
            endpointStyle: endpointStyle,
            endpointLabelA: `Endpoint A`,
            endpointLabelZ: `Endpoint B`,
            circuitLabel: `Segment test X`,
            navTo: `Segment X`
        }
    ];
    return(
        <Resizable>
            <ConcatenatedCircuit memberList={memberList} height={350} hideTitle={true} endpointLabelPosition="bottomleftangled"/>
        </Resizable>
    );
};

