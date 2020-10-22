/**
 *  Copyright (c) 2017 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import React from "react";
export interface FieldProps {
    name: string;
    label: string;
    required: boolean;
    placeholder?: string;
    validation?: any;
}
/**
 * A `Field` is a part of the JSX definition of a `Schema`. Each `Field` describes
 * the rules and meta data associated with a field on the `Form`.
 *
 * For example, here is an `Field` which will input the users email address, defining
 * a user friendly label "Email", a placeholder and a validation rule that expects
 * the field to be a valid email address. The field is also required to be filled in.
 *
 * ```
 * <Schema>
 *     ...
 *      <Field
 *         required
 *         name="email"
 *         label="Email"
 *         placeholder="Enter valid email address"
 *         validation={{"format": "email"}}/>
 *     ...
 * </Schema>
 * ```
 */
export default class Field extends React.Component<FieldProps> {
    constructor(props: FieldProps);
    render(): JSX.Element;
}
