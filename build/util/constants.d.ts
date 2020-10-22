/**
 *  Copyright (c) 2017 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
/**
 * At Form can either:
 *   * ALL - Always show edit state for all of its fields
 *   * SELECTION -  Show edit icons next to items, selecting one show edit state for that item
 *   * NEVER - Never show edit state for the items (view only)
 */
export declare const FormEditStates: {
    ALWAYS: "ALWAYS";
    NEVER: "NEVER";
    SELECTED: "SELECTED";
    TABLE: "TABLE";
};
export declare const FormGroupLayout: {
    COLUMN: "COLUMN";
    INLINE: "INLINE";
    ROW: "ROW";
};
