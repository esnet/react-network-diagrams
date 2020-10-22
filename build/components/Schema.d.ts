/**
 *  Copyright (c) 2015 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import React from "react";
export interface SchemaProps {
    children: any;
}
/**
 * A schema can be specified using JSX to define the rules for
 * each form field. As an example, here is a Form that will take the
 * first name, last name and email of a contact. We can define also
 * that the email should be of format `email` and that the first and
 * last names are `required`:
 *
 * ```
 * const schema = (
 *     <Schema>
 *         <Field name="first_name" label="First name" placeholder="Enter first name"
 *                required={true} validation={{"type": "string"}} />
 *         <Field name="last_name" label="Last name" placeholder="Enter last name"
 *                required={true} validation={{"type": "string"}} />
 *         <Field name="email" label="Email" placeholder="Enter valid email address"
 *                validation={{"format": "email"}} />
 *     </Schema>
 * );
 * ```
 *
 * See also `Field`.
 */
export default class Schema extends React.Component<SchemaProps> {
    constructor(props: SchemaProps);
    render(): JSX.Element;
}
