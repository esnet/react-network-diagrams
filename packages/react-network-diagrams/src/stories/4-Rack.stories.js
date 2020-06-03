import React from 'react';
import {Resizable} from "../components/Resizable";
import {Rack} from "../components/Rack";
import {Equipment} from "../components/Equipment";

export default {
  title: 'Rack',
};



export const rackshizzle = () => {

    const backStyle = { fill: "#595959" };

    const data = {"id":1,"name":"TFM2 F11","description":"TFM2 F11 THN Core Rack","size":42,"hsoManaged":true,"created_at":"2020-05-14T08:58:19.000000Z","updated_at":"2020-05-14T18:02:03.000000Z","location":{"id":"00b24259-ed31-e511-941e-0050568a018c","accountnumber":"321949","name":"Telehouse North"},"devices":[{"id":11,"hostname":"pdu0.thn.uk","description":"24 port dumb PDU","type":"pdu","assetTag":44,"serialNumber":"abc123","rackStartPosition":0,"rackOrientation":"back","rackSide":"L","ports":0,"created_at":"2020-05-19T08:45:34.000000Z","updated_at":"2020-05-19T08:45:36.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":9,"name":"0U Dumb PDU","rackUnits":32,"rackWidth":"full","vendor":{"id":5,"name":"Unknown"}}},{"id":1,"hostname":"pe-r-00.thn.uk","description":"Fake row-tah","type":"core","assetTag":12345,"serialNumber":"MX123456","rackStartPosition":1,"rackOrientation":"front","rackSide":null,"ports":3,"created_at":"2020-05-14T09:41:34.000000Z","updated_at":"2020-05-14T09:41:36.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":1,"name":"MX10003","rackUnits":3,"rackWidth":"full","vendor":{"id":1,"name":"Juniper"}}},{"id":2,"hostname":"pe-r-01.thn.uk","description":"Fake row-tah 2","type":"core","assetTag":55343,"serialNumber":"MX432","rackStartPosition":4,"rackOrientation":"front","rackSide":null,"ports":1,"created_at":"2020-05-14T09:42:56.000000Z","updated_at":"2020-05-14T09:43:00.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":1,"name":"MX10003","rackUnits":3,"rackWidth":"full","vendor":{"id":1,"name":"Juniper"}}},{"id":4,"hostname":"mux-thn-the","description":null,"type":"mux","assetTag":22,"serialNumber":"none","rackStartPosition":10,"rackOrientation":"back","rackSide":null,"ports":0,"created_at":"2020-05-14T14:16:53.000000Z","updated_at":"2020-05-14T14:16:54.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":3,"name":"Smart Optics CWDM MUX","rackUnits":1,"rackWidth":"full","vendor":{"id":2,"name":"Smart Optics"}}},{"id":7,"hostname":"vhost0.thn.uk","description":"Fake Vhost0 server","type":"server","assetTag":55555,"serialNumber":"ABC123434232","rackStartPosition":20,"rackOrientation":"front","rackSide":null,"ports":0,"created_at":"2020-05-18T15:58:16.000000Z","updated_at":"2020-05-18T15:58:19.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":6,"name":"Generic 1U SuperMicro Server","rackUnits":1,"rackWidth":"full","vendor":{"id":4,"name":"SuperMicro"}}},{"id":9,"hostname":"fw0.thn.uk","description":"FireWAAAAAAALLLL","type":"cpe","assetTag":2312312,"serialNumber":"fdsfdsfsdfs","rackStartPosition":22,"rackOrientation":"front","rackSide":"L","ports":0,"created_at":"2020-05-18T16:07:27.000000Z","updated_at":"2020-05-18T16:07:30.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":7,"name":"SRX320","rackUnits":1,"rackWidth":"half","vendor":{"id":1,"name":"Juniper"}}},{"id":10,"hostname":"fw1.thn.uk","description":"FireWalllaer","type":"cpe","assetTag":44444,"serialNumber":"fdsfsdfds","rackStartPosition":22,"rackOrientation":"front","rackSide":"R","ports":0,"created_at":"2020-05-18T16:09:29.000000Z","updated_at":"2020-05-18T16:09:32.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":7,"name":"SRX320","rackUnits":1,"rackWidth":"half","vendor":{"id":1,"name":"Juniper"}}},{"id":8,"hostname":"vhost1.thn.uk","description":"Fake vhost1","type":"server","assetTag":3424234234,"serialNumber":"df2c2f2fwf","rackStartPosition":42,"rackOrientation":"front","rackSide":null,"ports":0,"created_at":"2020-05-18T16:05:16.000000Z","updated_at":"2020-05-18T16:05:18.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":6,"name":"Generic 1U SuperMicro Server","rackUnits":1,"rackWidth":"full","vendor":{"id":4,"name":"SuperMicro"}}},{"id":12,"hostname":"pdu1.thn.uk","description":"12 port dumb PDU","type":"pdu","assetTag":4342,"serialNumber":"fdsafge22qg42","rackStartPosition":41,"rackOrientation":"back","rackSide":null,"ports":0,"created_at":"2020-05-19T08:52:28.000000Z","updated_at":"2020-05-19T08:52:29.000000Z","assignedTo":{"id":"eb8f23bd-c48b-e211-860b-005056bd528c","accountnumber":"306437","name":"hSo Services"},"model":{"id":8,"name":"1U Dumb PDU","rackUnits":2,"rackWidth":"full","vendor":{"id":5,"name":"Unknown"}}}]};

    const rackStyle1 = {
        stroke: "#737373",
        strokeWidth: 1,
        fill: "#D5D5D5"
    };

    const equipColors = {
        server: "#2ca02c",
        core: "#1f77b4",
        cpe: "#2c4e95",
        mux: "#9900ff",
        switch: "#ff7f0e",
        pdu: "#4d4d4d",
        equipBlank: "#D5D5D5" // Blanks are the same color as racks
    };

    const equips = {
        core: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.core
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.core
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.core
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.core
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
        cpe: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.cpe
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.cpe
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.cpe
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.cpe
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
        mux: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.mux
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.mux
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.mux
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.mux
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
        server: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.server
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.server
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.server
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.server
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
        switch: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.switch
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.switch
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.switch
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.switch
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
        pdu: {
            line: {
                normal: {
                    stroke: "#737373",
                    strokeWidth: 1,
                    fill: equipColors.pdu
                },
                selected: {
                    stroke: "#333",
                    strokeWidth: 2,
                    fill: equipColors.pdu
                },
                muted: {
                    stroke: "#696969",
                    strokeWidth: 1,
                    opacity: 0.6,
                    fill: equipColors.pdu
                },
                highlighted: {
                    stroke: "#4EC1E0",
                    strokeWidth: 1,
                    fill: equipColors.pdu
                }
            },
            label: {
                normal: {fill: "#FFFFFF", fontFamily: "verdana, sans-serif", fontSize: 10},
                selected: {fill: "#FFFFFF", stroke: "none", fontSize: 12},
                muted: {
                    fill: "#696969",
                    stroke: "none",
                    fontSize: 9,
                    opacity: 0.6
                }
            }
        },
    };

    const pattern = (
        <pattern id="Pattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <line stroke="#A6A6A6" strokeWidth="20px" y2="4" />
            <path
                d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
                style={{ stroke: "#6f6f6f", strokeWidth: 1 }}
            />
        </pattern>
    );

    const elements = data.devices.map(eq => {
        let labelPosition = "top";
        let labelDirection = "horizontal";
        let width = eq.model.rackWidth === 'full' ? 17.52 : 17.52/2;
        if(eq.rackStartPosition === 0) {
            width = 1.75;
            labelDirection = "vertical";
            labelPosition = "center";
        }
        return (
            <Equipment
                key={`${eq.id}-${eq.rackStartPosition}`}
                equipmentHeight={1.75*eq.model.rackUnits}
                equipmentWidth={width}
                rmu={eq.rackStartPosition}
                side={eq.rackSide}
                facing={eq.rackOrientation.charAt(0).toUpperCase() + eq.rackOrientation.slice(1).toLowerCase()}
                style={equips[eq.type]}
                backStyle={backStyle}
                //overlapStyle={{ fill: "#ff6666" }}
                label={eq.hostname}
                labelDirection={labelDirection}
                labelPosition={labelPosition}
                navTo={eq.navTo}
                showHeight={true}
            />
        );
    });

    return(
        <div>
            <div style={{float: 'left', width: '50%'}}>
                <Resizable>
                    <Rack
                        rackHeight={48}
                        rackWidth={19}
                        pxToInch={10}
                        label={"Test Rack"}
                        rackStyle={rackStyle1}
                        facing={"Front"}
                        pattern={pattern}
                        displayRmu={true}
                        descending={false}
                    >
                        {elements}
                    </Rack>
                </Resizable>
            </div>
            <div style={{float: 'left', width: '50%'}}>
                <Resizable>
                    <Rack
                        rackHeight={48}
                        rackWidth={19}
                        pxToInch={10}
                        label={"Test Rack"}
                        rackStyle={rackStyle1}
                        facing={"Back"}
                        pattern={pattern}
                        displayRmu={true}
                        descending={false}
                    >
                        {elements}
                    </Rack>
                </Resizable>
            </div>
        </div>
    );
};

