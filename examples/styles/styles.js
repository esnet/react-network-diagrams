/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

const endpointStyle1 = {
    node: {
        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
        selected: {fill: "none", stroke: "#b1b1b1", strokeWidth: 6},
        muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2,
                opacity: 0.6, cursor: "pointer"}
    },
    label: {
        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 9,
                opacity: 0.6}
    }
};

const endpointStyle2 = {
    node: {
        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
        selected: {fill: "none", stroke: "#b1b1b1", strokeWidth: 4},
        muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4,
                opacity: 0.6, cursor: "pointer"}
    },
    label: {
        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 9,
                opacity: 0.6}
    }
};

const exampleStyle1 = {
    node: {
        normal: {stroke: "#737373", strokeWidth: 4, fill: "#737373"},
        selected: {fill: "#b1b1b1", stroke: "#b1b1b1", strokeWidth: 6},
        muted: {fill: "#DBDBDB", stroke: "#DBDBDB", strokeWidth: 2,
                opacity: 0.6, cursor: "pointer"},
        highlighted: {stroke: "#b1b1b1", strokeWidth: 4, fill: "#b1b1b1"}
    },
    line: {
        normal: {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#D5D5D5"
        },
        selected: {
            stroke: "#333",
            strokeWidth: 2,
            fill: "#D5D5D5"
        },
        muted: {
            stroke: "#696969",
            strokeWidth: 1,
            opacity: 0.6,
            fill: "#D5D5D5"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 1,
            fill: "#D5D5D5"
        }
    },
    label: {
        normal: {fill: "#9D9D9D", fontFamily: "verdana, sans-serif", fontSize: 10},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 9,
                opacity: 0.6}
    }
};

const exampleStyle2 = {
    node: {
        normal: {stroke: "#737373", strokeWidth: 4, fill: "#737373"},
        selected: {fill: "#b1b1b1", stroke: "#b1b1b1", strokeWidth: 6},
        muted: {fill: "DBDBDB", stroke: "#DBDBDB", strokeWidth: 2,
                opacity: 0.6, cursor: "pointer"},
        highlighted: {stroke: "#b1b1b1", strokeWidth: 4, fill: "b1b1b1"}
    },
    line: {
        normal: {
            stroke: "#1f77b4",
            strokeWidth: 2,
            fill: "#87CEFA"
        },
        selected: {
            stroke: "#333",
            strokeWidth: 2,
            fill: "#87CEFA"
        },
        muted: {
            stroke: "#696969",
            strokeWidth: 1,
            fill: "#87CEFA",
            opacity: 0.6
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
            fill: "#87CEFA"
        }
    },
    label: {
        normal: {fill: "#9D9D9D", fontFamily: "verdana, sans-serif", fontSize: 10},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 9,
                opacity: 0.6}
    }
};

const exampleStyle3 = {
    node: {
        normal: {stroke: "#737373", strokeWidth: 4, fill: "none"},
        selected: {fill: "none", stroke: "#b1b1b1", strokeWidth: 6},
        muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2,
                opacity: 0.6, cursor: "pointer"},
        highlighted: {stroke: "#b1b1b1", strokeWidth: 4, fill: "none"}
    },
    line: {
        normal: {
            stroke: "#2ca02c",
            strokeWidth: 3,
            fill: "none"
        },
        selected: {
            stroke: "#333",
            strokeWidth: 2,
            fill: "none"
        },
        muted: {
            stroke: "#696969",
            strokeWidth: 1,
            opacity: 0.6,
            fill: "none"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 3,
            fill: "none"
        }
    },
    label: {
        normal: {fill: "#9D9D9D", fontFamily: "verdana, sans-serif", fontSize: 10},
        selected: {fill: "#333",stroke: "none", fontSize: 11},
        muted: {fill: "#696969", stroke: "none", fontSize: 9,
                opacity: 0.6}
    }
};

const equipmentToEquipmentStyle = {
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
            stroke: "#ff7f0e",
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
};

const opticalStyle = {
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
            stroke: "#1f77b4",
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
};

const leasedStyle = {
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
            stroke: "#2ca02c",
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
};

const darkFiberStyle = {
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
            strokeWidth: 2,
            fill: "none"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 3,
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
};

const crossConnectStyle = {
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
            stroke: "#535353",
            strokeWidth: 1,
            fill: "none"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
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
};

const couplerStyle = {
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
};

const endpointStyle = {
    node: {
        normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4}
    },
    label: {
        normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"}
    }
};

const panelCouplerStyle = {
    node: {
        normal: {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#F8F8F8"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
            fill: "#F8F8F8"
        }
    },
    line: {
        normal: {
            stroke: "#737373",
            strokeWidth: 1,
            fill: "#E8E8E8"
        },
        highlighted: {
            stroke: "#4EC1E0",
            strokeWidth: 2,
            fill: "#E8E8E8"
        }
    },
    label: {
        normal: {
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 10
        }
    }
};

const panelStyle = {
    stroke: "#E4E4E4",
    strokeWidth: 1,
    fill: "#FFFFFF"
};

const stylesMap = {
    endpoint1: endpointStyle1,
    endpoint2: endpointStyle2,
    line1: exampleStyle1,
    line2: exampleStyle2,
    line3: exampleStyle3,
    equipmentToEquipment: equipmentToEquipmentStyle,
    optical: opticalStyle,
    leased: leasedStyle,
    darkFiber: darkFiberStyle,
    crossConnect: crossConnectStyle,
    coupler: couplerStyle,
    endpoint: endpointStyle,
    panelCoupler: panelCouplerStyle,
    panel: panelStyle
};

const lineShapeMap = {
    equipmentToEquipment: "linear",
    optical: "linear",
    leased: "linear",
    darkFiber: "linear",
    crossConnect: "linear",
    coupler: "square"
};

export {stylesMap, lineShapeMap};
