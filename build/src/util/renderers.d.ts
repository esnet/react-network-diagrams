/**
 *  Copyright (c) 2018 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
export declare function textView(value: string): JSX.Element;
export declare function linkView(value: string): JSX.Element;
export declare function dateView(fmt?: string): (d: any) => JSX.Element;
export declare function colorView(hex: string): JSX.Element;
