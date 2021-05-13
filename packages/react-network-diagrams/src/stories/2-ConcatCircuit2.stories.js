import React from 'react';
import {ConcatenatedCircuit2} from "../components/ConcatenatedCircuit2";
import {Resizable} from "../components/Resizable";

export default {
  title: 'Concat Circuit v2',
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
                stroke: "#7d2680",
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
    size: 25,
    squareWidth: 30,
    noNavigate: false,
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

let styleCloud = {
    lineShape: "cloud",
    size: 25,
    squareWidth: 30,
    noNavigate: false,
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

export const complex = () => {
    let memberList = {
        styleProperties: styleProps,
        endpointStyle: endpointStyle,
        endpointLabelA: '',
        endpointLabelZ: ``,
        circuitLabel: `Root`,
        navTo: `Segment 1`,
        children: [
            {
                styleProperties: styleProps2,
                endpointStyle: endpointStyle,
                endpointLabelA: 'THN A',
                endpointLabelZ: `THN B`,
                circuitLabel: `pe-r-00.thn.uk`,
                navTo: `Segment 1`,
                children: [
                    {
                        styleProperties: vllStyleProps,
                        endpointStyle: endpointStyle,
                        endpointLabelA: `VLL A`,
                        endpointLabelZ: `VLL B`,
                        circuitLabel: `VLL to AWS`,
                        navTo: `Segment 2`,
                        children: [
                            {
                                size: 36,
                                styleProperties: styleProps2,
                                endpointStyle: endpointStyle,
                                endpointLabelA: `pe-r-00.sov A`,
                                endpointLabelZ: `pe-r-00.sov B`,
                                circuitLabel: `pe-r-00.sov.uk`,
                                navTo: `Segment 3`,
                                children: [
                                    {
                                        styleProperties: styleProps,
                                        endpointStyle: endpointStyle,
                                        endpointLabelA: `X Con A`,
                                        endpointLabelZ: `X Con B`,
                                        circuitLabel: `X-Connect::1-24343894372`,
                                        navTo: `Segment 1`,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        styleProperties: styleProps,
                        endpointStyle: endpointStyle,
                        endpointLabelA: `L3VPN A`,
                        endpointLabelZ: `L3VPN B`,
                        circuitLabel: `MGMT L3VPN`,
                        navTo: `Segment X`,
                        children: [
                            {
                                styleProperties: styleProps,
                                endpointStyle: endpointStyle,
                                endpointLabelA: `Test A`,
                                endpointLabelZ: `Test B`,
                                circuitLabel: `Test L3VPN`,
                                navTo: `Segment Xxtra`
                            }
                        ]
                    }
                ]
            }
            ]
    };
    return(
        <Resizable>
            <ConcatenatedCircuit2
                memberList={memberList}
                height={350}
                hideTitle={true}
                endpointLabelPosition="bottomleftangled"
            />
        </Resizable>
    );
};

export const standardVLL = () => {
    let memberList = {
        styleProperties: styleProps,
        endpointStyle: endpointStyle,
        endpointLabelA: '',
        endpointLabelZ: `Customer Shit`,
        circuitLabel: `Root`,
        navTo: `Segment 1`,
        children: [
            {
                styleProperties: styleProps,
                endpointStyle: endpointStyle,
                endpointLabelA: 'THN A',
                endpointLabelZ: `ge-1/2/3`,
                circuitLabel: `X-Connect: TIC-12345`,
                navTo: `Segment 1`,
                children: [
                    {
                        styleProperties: styleProps2,
                        endpointStyle: endpointStyle,
                        endpointLabelA: ``,
                        endpointLabelZ: ``,
                        circuitLabel: `pe-r-00.thn.uk`,
                        navTo: `Segment 2`,
                        children: [
                            {
                                styleProperties: vllStyleProps,
                                endpointStyle: endpointStyle,
                                endpointLabelA: ``,
                                endpointLabelZ: ``,
                                circuitLabel: `L2 Circuit ID: 123`,
                                navTo: `Segment 3`,
                                children: [
                                    {
                                        styleProperties: styleProps2,
                                        endpointStyle: endpointStyle,
                                        endpointLabelA: ``,
                                        endpointLabelZ: `ge-4/3/2`,
                                        circuitLabel: `pe-r-00.sov.uk`,
                                        navTo: `Segment 1`,
                                        children: [
                                            {
                                                styleProperties: styleProps,
                                                endpointStyle: endpointStyle,
                                                endpointLabelA: `X Con A`,
                                                endpointLabelZ: `Other Customer Shit`,
                                                circuitLabel: `X-Connect: 1-24343894372`,
                                                navTo: `Segment 1`,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return(
        <Resizable>
            <ConcatenatedCircuit2
                memberList={memberList}
                height={350}
                hideTitle={true}
                endpointLabelPosition="bottomleftangled"
            />
        </Resizable>
    );
};



export const transitService = () => {
    let memberList = {
        styleProperties: styleProps,
        endpointStyle: endpointStyle,
        endpointLabelA: '',
        endpointLabelZ: ``,
        circuitLabel: `Root`,
        navTo: `Segment 1`,
        children: [
            {
                styleProperties: styleProps2,
                endpointStyle: endpointStyle,
                endpointLabelA: '',
                endpointLabelZ: `ge-1/2/3`,
                circuitLabel: `pe-r-00.cod.uk`,
                navTo: `Segment 1`,
                children: [
                    {
                        styleProperties: styleProps,
                        endpointStyle: endpointStyle,
                        endpointLabelA: ``,
                        endpointLabelZ: ``,
                        circuitLabel: `Port Config Innit`,
                        navTo: `Segment 2`,
                        children: [
                            {
                                styleProperties: styleProps,
                                endpointStyle: endpointStyle,
                                endpointLabelA: ``,
                                endpointLabelZ: ``,
                                circuitLabel: `TIC-123456`,
                                navTo: `Segment 2`,

                            }
                        ]
                    }
                ]
            },
        ]
    };
    return(
        <Resizable>
            <ConcatenatedCircuit2
                memberList={memberList}
                height={350}
                hideTitle={true}
                endpointLabelPosition="bottomleftangled"
            />
        </Resizable>
    );
};

export const L3VPN = () => {
    let memberList = {
        styleProperties: styleProps,
        endpointStyle: endpointStyle,
        endpointLabelA: '',
        endpointLabelZ: ``,
        circuitLabel: `Root`,
        navTo: `Segment 1`,
        children: [
            {
                styleProperties: styleProps2,
                endpointStyle: endpointStyle,
                endpointLabelA: '',
                endpointLabelZ: `ge-1/2/3`,
                circuitLabel: `pe-r-00.cod.uk`,
                navTo: `Segment 1`,
                children: [
                    {
                        styleProperties: styleProps,
                        endpointStyle: endpointStyle,
                        endpointLabelA: ``,
                        endpointLabelZ: ``,
                        circuitLabel: `Port Config Innit`,
                        navTo: `Segment 2`,
                        children: [
                            {
                                styleProperties: styleProps,
                                endpointStyle: endpointStyle,
                                endpointLabelA: ``,
                                endpointLabelZ: ``,
                                circuitLabel: `TIC-123456`,
                                navTo: `Segment 2`,

                            }
                        ]
                    }
                ]
            },
        ]
    };
    return(
        <Resizable>
            <ConcatenatedCircuit2
                memberList={memberList}
                height={350}
                hideTitle={true}
                endpointLabelPosition="bottomleftangled"
            />
        </Resizable>
    );
};

