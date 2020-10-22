/**
 *  Copyright (c) 2015 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from "react";
import { FormGroupProps } from "../../hoc/group";
import "../../style/textedit.css";
import { FieldValue } from "../Form";
export interface SwitchProps {
    options?: [string, string];
    /**
     * Required on all Controls
     */
    field: string;
    /**
     * Customize the horizontal size of the Chooser
     */
    width?: number;
    /**
     * The TextEdit type, such as "password"
     */
    type?: string;
    /**
     * Rules to apply
     */
    rules?: any;
    /**
     * Optional view component to render when the field
     * isn't being editted.
     */
    view?: (value: FieldValue) => React.ReactElement<any>;
}
export declare type SwitchControlProps = SwitchProps & FormGroupProps;
/**
 * A `SwitchControlGroup` is a `SwitchControl` wrapped by the `formGroup()` HOC. This is the
 * component which can be rendered by the Form when the user adds a `Switch` to their `Form`.
 */
export declare const SwitchGroup: (props: FormGroupProps & SwitchProps) => JSX.Element;
/**
 * A control which allows the user to interact with a single toggle control
 */
export declare const Switch: FunctionComponent<SwitchProps>;
