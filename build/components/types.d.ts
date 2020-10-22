/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
export interface SelectableStyle {
    normal: React.CSSProperties;
    selected: React.CSSProperties;
    muted: React.CSSProperties;
}
export declare enum CurveDirection {
    Left = "Left",
    Right = "Right"
}
export interface Coord {
    x: number;
    y: number;
}
export interface Box {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
