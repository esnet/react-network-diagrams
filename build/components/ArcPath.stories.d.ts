import { ReactElement } from "react";
import { ArcPathProps } from "./ArcPath";
import { VerticalAlign } from "./Label";
import { CurveDirection } from "./types";
declare const _default: {
    title: string;
    component: {
        new (): Node;
        prototype: Node;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
    };
    argTypes: {
        color: {
            control: {
                type: string;
            };
        };
        curveDirection: {
            control: {
                options: string[];
                type: string;
            };
        };
        labelVerticalAlign: {
            control: {
                options: string[];
                type: string;
            };
        };
        offset: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        position: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        width: {
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
    (args: ArcPathProps): ReactElement;
    args: {
        arrow: boolean;
        color: string;
        id: string;
        label: string;
        curveDirection: CurveDirection;
        labelVerticalAlign: VerticalAlign;
        offset: number;
        position: number;
        width: number;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
};
