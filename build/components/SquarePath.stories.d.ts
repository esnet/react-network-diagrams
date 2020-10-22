import React, { ReactElement } from "react";
import { VerticalAlign } from "./Label";
import { SquarePathProps } from "./SquarePath";
declare const _default: {
    title: string;
    component: {
        (props: SquarePathProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        defaultProps: {
            thickness: number;
            roundedX: number;
            roundedY: number;
            color: string;
            arrow: boolean;
            selected: boolean;
            muted: boolean;
            height: number;
        };
    };
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        color: {
            control: {
                type: string;
            };
        };
        fillColor: {
            control: {
                type: string;
            };
        };
        labelVerticalAlign: {
            control: {
                options: string[];
                type: string;
            };
        };
        size: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        thickness: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        x1: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        x2: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        y1: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        y2: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
    };
};
export default _default;
export declare const basic: {
    (args: SquarePathProps): ReactElement;
    args: {
        arrow: boolean;
        color: string;
        fillColor: string;
        opacity: number;
        id: string;
        label: string;
        labelVerticalAlign: VerticalAlign;
        position: number;
        size: number;
        thickness: number;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
};
