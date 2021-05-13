import React from 'react';
import {ConcatenatedCircuit} from "../components/ConcatenatedCircuit";
import {Resizable} from "../components/Resizable";
import { action } from '@storybook/addon-actions';

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
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6}
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
            },
            muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6}
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6}
        }
    },
    lineShape: "linear"
};

let styleProps2 = {
    lineShape: "square",
    size: 36,
    squareWidth: 36,
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
            },
            muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
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
            },
            muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            },
            muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        }
    }
};

let nniStyleProps = {
    lineShape: "square",
    size: 14,
    squareWidth: 60,
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
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        },
        line: {
            normal: {
                stroke: "#152949",
                strokeWidth: 1,
                fill: "#03054e"
            },
            highlighted: {
                stroke: "#4EC1E0",
                strokeWidth: 2,
                fill: "#D5D5D5"
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            }
        }
    }
};

let vllStyleProps = {
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
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        },
        line: {
            normal: {
                stroke: "#00b419",
                strokeWidth: 3,
                fill: "none"
            },
            highlighted: {
                stroke: "#4EC1E0",
                strokeWidth: 4,
                fill: "none"
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                stroke: "#737373",
                strokeWidth: 4,
                fill: "none"
            }
        },
        label: {
            normal: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            },muted: {fill: "#696969", stroke: "none", fontSize: 8,
                opacity: 0.6},
            selected: {
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 10
            }
        }
    },
    lineShape: "linear"
};

const setSelection = (type, data) => {
    alert('poo');
};

export const standard = () => {
    let memberList = [
        {
            styleProperties: styleProps2,
            endpointStyle: endpointStyle,
            endpointLabelZ: `Endpoint 2`,
            endpointRadius: 0,
            circuitLabel: `Segment test 1`,
            navTo: `Segment 1`,
            selected: true
        },
        {
            styleProperties: nniStyleProps,
            endpointStyle: endpointStyle,
            endpointLabelZ: 'NNI SHizzle',
            navTo: `Segment 2`
        },
        {
            styleProperties: vllStyleProps,
            endpointStyle: endpointStyle,
            circuitLabel: `Segment test 2`,
            navTo: `Segment 2`
        },
        {
            styleProperties: styleProps,
            endpointStyle: endpointStyle,
            circuitLabel: `Segment test X`,
            navTo: `Segment X`
        },
        {
            styleProperties: styleProps2,
            endpointStyle: endpointStyle,
            endpointLabelA: `Endpoint 2`,
            endpointRadius: 0,
            circuitLabel: `Segment test 1`,
            navTo: `Segment 1`,
        },
    ];
    return(
        <Resizable>
            <ConcatenatedCircuit
                memberList={memberList}
                height={350}
                hideTitle={true}
                endpointLabelPosition="bottomleftangled"
                endpointLabelOffset={20}
                yOffset={8}
                onSelectionChange={setSelection}
                deselect={setSelection}
            />
        </Resizable>
    );
};

