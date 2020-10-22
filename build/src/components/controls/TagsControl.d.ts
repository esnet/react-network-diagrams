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
import { FieldValue } from "../Form";
interface Option {
    value?: string;
    label?: string;
    disabled?: boolean;
}
export declare type Options = Option[];
export interface TagsProps {
    /**
     * If the available tag options changes because the use added a tag, then
     * this callback will be called with the complete list of possible tags
     * (essentially this will be this.props.tagList + the new tag)
     */
    onTagListChange?: (name: string | undefined, tagList: string[]) => void;
    /**
     * Required on all Controls
     */
    field: string;
    /**
     * Customize the horizontal size of the Chooser
     */
    width: number;
    /**
     * Pass in the available list of options as a list of strings. For example:
     * ```
     * [
     *  "cat",
     *  "dog",
     *  ...
     * ]
     * ```
     */
    tagList: string[];
    /**
     * List of items in the Chooser list which should be presented disabled
     */
    disableList?: string[];
    /**
     * Show the Chooser itself as disabled
     */
    isDisabled?: boolean;
    /**
     * If `isSearchable` is true the Chooser becomes a simple pulldown menu
     * rather than allowing the user to type into it to filter this list.
     */
    isSearchable?: boolean;
    /**
     * Add a [x] icon to the chooser allowing the user to clear the selected value
     */
    isClearable?: boolean;
    /**
     * Can be "any" or "start", indicating how the search is matched within
     * the items (substring anywhere, or starting with)
     */
    searchContains?: "any" | "start";
    /**
     * Optional view component to render when the field
     * isn't being editted.
     */
    displayView?: string | ((value: FieldValue) => React.ReactElement<any>);
}
/**
 * A `TagsGroup` is a `TagsControl` wrapped by the `formGroup()` HOC. This is the
 * component which can be rendered by the Form when the user adds a `Tags` to their `Form`.
 */
export declare const TagsGroup: (props: FormGroupProps & TagsProps) => JSX.Element;
/**
 * Form control to select tags from a pull down list. You can also add a new tag with the Add tag button.
 */
export declare const Tags: FunctionComponent<TagsProps>;
export {};
