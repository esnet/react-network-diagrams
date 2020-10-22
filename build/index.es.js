import React, { useRef, useState, useLayoutEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
var VerticalAlign;
(function (VerticalAlign) {
    VerticalAlign["Top"] = "Top";
    VerticalAlign["Bottom"] = "Bottom";
    VerticalAlign["Center"] = "Center";
})(VerticalAlign || (VerticalAlign = {}));
var TextAnchor;
(function (TextAnchor) {
    TextAnchor["Start"] = "Start";
    TextAnchor["Middle"] = "Middle";
    TextAnchor["End"] = "End";
})(TextAnchor || (TextAnchor = {}));
var LabelPosition;
(function (LabelPosition) {
    LabelPosition["Top"] = "Top";
    LabelPosition["Bottom"] = "Bottom";
    LabelPosition["Left"] = "Left";
    LabelPosition["Right"] = "Right";
    LabelPosition["TopLeft"] = "TopLeft";
    LabelPosition["TopRight"] = "TopRight";
    LabelPosition["BottomLeft"] = "BottomLeft";
    LabelPosition["BottomRight"] = "BottomRight";
    LabelPosition["TopLeftAngled"] = "TopLeftAngled";
    LabelPosition["TopRightAngled"] = "TopRightAngled";
    LabelPosition["BottomLeftAngled"] = "BottomLeftAngled";
    LabelPosition["BottomRightAngled"] = "BottomRightAngled";
})(LabelPosition || (LabelPosition = {}));
var LABEL_DEFAULT_STYLE = {
    muted: {
        fill: "#696969",
        fontSize: 9,
        opacity: 0.6,
        stroke: "none",
    },
    normal: {
        fill: "#9D9D9D",
        fontFamily: "verdana, sans-serif",
        fontSize: 10,
    },
    selected: {
        fill: "#333",
        fontSize: 11,
        stroke: "none",
    },
};
/**
 * Gets an `x`, `y`, `labelPosition`, `labelTextAnchor` and an `angle` and renders a label based on the position.
 * The label should be a string. Alternatively a `labelPosition` and `labelRadialDistance` can be used (e.g.)
 * "topleft" 12px from the x,y center would display the label in the top left corner of a shape.
 */
var Label = function (props) {
    var _a = props.id, id = _a === void 0 ? "label" : _a, label = props.label, _b = props.x, x = _b === void 0 ? 0 : _b, _c = props.y, y = _c === void 0 ? 0 : _c, _d = props.angle, angle = _d === void 0 ? 0 : _d, _e = props.labelRadialDistance, labelRadialDistance = _e === void 0 ? 5 : _e, labelPosition = props.labelPosition, _f = props.labelTextAnchor, labelTextAnchor = _f === void 0 ? TextAnchor.Middle : _f, _g = props.textVerticalAlign, textVerticalAlign = _g === void 0 ? VerticalAlign.Center : _g, _h = props.xOffset, xOffset = _h === void 0 ? 0 : _h, _j = props.yOffset, yOffset = _j === void 0 ? 0 : _j, _k = props.bboxOffset, bboxOffset = _k === void 0 ? 0 : _k, _l = props.style, style = _l === void 0 ? {} : _l, labelClassed = props.labelClassed, _m = props.debug, debug = _m === void 0 ? false : _m;
    var labelX = x;
    var labelY = y;
    var labelR = angle;
    // Default rotation
    var rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
    // Determine the bounding box of the label so we can style that
    var ref = useRef(null);
    var useDims = function (labelRef) {
        var _a = __read(useState({
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        }), 2), dim = _a[0], setDim = _a[1];
        useLayoutEffect(function () {
            if (labelRef && labelRef.current) {
                var _a = labelRef.current.getBBox(), bbh = _a.height, bbw = _a.width, bbx = _a.x, bby = _a.y;
                var boundingBox = { x: bbx, y: bby, width: bbw, height: bbh };
                if (JSON.stringify(dim) !== JSON.stringify(boundingBox)) {
                    setDim(boundingBox);
                }
            }
        });
        return dim;
    };
    // Get the bounding bbox with each time it renders
    var bbox = useDims(ref);
    // Quick and dirty guage as to the size of the font
    var halfLabelHeight = bbox.height / 2;
    var textAnchor = "start";
    switch (labelTextAnchor) {
        case TextAnchor.Start:
            textAnchor = "start";
            break;
        case TextAnchor.End:
            textAnchor = "end";
            break;
        case TextAnchor.Middle:
            textAnchor = "middle";
            break;
    }
    // If a labelPostion is specified then we set the postion relative to the x,y
    // supplied by the user. We also automatically determine the anchor and rotation.
    if (labelPosition) {
        var d = Math.sqrt((labelRadialDistance * labelRadialDistance) / 2);
        switch (labelPosition) {
            case LabelPosition.Left:
                labelX -= labelRadialDistance;
                labelY += 5;
                textAnchor = "end";
                break;
            case LabelPosition.Right:
                labelX += labelRadialDistance;
                labelY += 5;
                textAnchor = "start";
                break;
            case LabelPosition.Top:
                labelY -= labelRadialDistance + 4;
                break;
            case LabelPosition.TopRight:
                labelY -= d;
                labelX += d;
                textAnchor = "start";
                break;
            case LabelPosition.TopLeft:
                labelY -= d;
                labelX -= d;
                textAnchor = "end";
                break;
            case LabelPosition.Bottom:
                labelY += labelRadialDistance + halfLabelHeight + 6;
                break;
            case LabelPosition.BottomRight:
                labelY += d + halfLabelHeight;
                labelX += d;
                textAnchor = "start";
                break;
            case LabelPosition.BottomLeft:
                labelY += d + halfLabelHeight;
                labelX -= d;
                textAnchor = "end";
                break;
            case LabelPosition.BottomLeftAngled:
                labelX += 2;
                labelY += d + halfLabelHeight;
                labelR = -45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "end";
                break;
            case LabelPosition.BottomRightAngled:
                labelX -= 2;
                labelY += d + halfLabelHeight;
                labelR = 45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "start";
                break;
            case LabelPosition.TopLeftAngled:
                labelY -= d;
                labelR = 45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "end";
                break;
            case LabelPosition.TopRightAngled:
                labelY -= d;
                labelR = -45;
                rotate = "rotate(" + labelR + " " + labelX + ", " + labelY + ")";
                textAnchor = "start";
                break;
        }
        labelX += xOffset;
        labelY += yOffset;
    }
    else {
        // Y position, based on the specified vertical alignment
        switch (textVerticalAlign) {
            case VerticalAlign.Top:
                labelY = y - yOffset;
                break;
            case VerticalAlign.Bottom:
                labelY = y + yOffset + halfLabelHeight + 2;
                break;
            case VerticalAlign.Center:
                labelY = y + halfLabelHeight / 2 + yOffset;
                break;
        }
        // X position is just the `x` prop, offset by the `xOffset` if there is one
        labelX += xOffset;
    }
    var box = bbox && debug ? (React.createElement("rect", { transform: rotate, x: bbox.x - bboxOffset, y: bbox.y - bboxOffset, width: bbox.width + bboxOffset * 2, height: bbox.height + bboxOffset * 2, style: { stroke: "bisque", fill: "none" } })) : null;
    var text = (React.createElement("text", { ref: ref, textAnchor: textAnchor, style: style, key: id, transform: rotate, className: labelClassed },
        React.createElement("tspan", { x: labelX, y: labelY, key: "label-line" }, label)));
    return (React.createElement("g", null,
        box,
        text));
};

/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
var SHAPE_DEFAULT_STYLE = {
    normal: { fill: "none", stroke: "#DBDBDB", strokeWidth: 4 },
    selected: { fill: "none", stroke: "#B1B1B1", strokeWidth: 6 },
    muted: { fill: "none", stroke: "#DBDBDB", strokeWidth: 2, opacity: 0.6, cursor: "pointer" },
};
var DEFAULT_STYLE = {
    shape: SHAPE_DEFAULT_STYLE,
    label: LABEL_DEFAULT_STYLE,
};
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["Circle"] = 1] = "Circle";
    ShapeType[ShapeType["Square"] = 2] = "Square";
    ShapeType[ShapeType["Cloud"] = 3] = "Cloud";
})(ShapeType || (ShapeType = {}));
/**
 * Low level primitive to render a shape, such as a circle, rectangle (with or without
 * rounded corners) or a cloud. The shape will be optionally rendered with a label
 * whose placement can be controlled with a variety of controls.
 *
 * The intention is for a `Shape` to be a visual representation of a `Node`.
 */
var Shape = function (props) {
    var id = props.id, label = props.label, x = props.x, y = props.y, _a = props.radius, radius = _a === void 0 ? 5 : _a, _b = props.rx, rx = _b === void 0 ? 0 : _b, _c = props.ry, ry = _c === void 0 ? 0 : _c, _d = props.shape, shape = _d === void 0 ? ShapeType.Circle : _d, _e = props.labelPosition, labelPosition = _e === void 0 ? LabelPosition.Top : _e, _f = props.labelOffsetX, labelOffsetX = _f === void 0 ? 0 : _f, _g = props.labelOffsetY, labelOffsetY = _g === void 0 ? 0 : _g, _h = props.style, style = _h === void 0 ? DEFAULT_STYLE : _h, _j = props.selected, selected = _j === void 0 ? false : _j, _k = props.highlighted, highlighted = _k === void 0 ? false : _k, _l = props.muted, muted = _l === void 0 ? false : _l, onSelectionChange = props.onSelectionChange, onMouseDown = props.onMouseDown;
    var handMouseClick = function (e) {
        e.stopPropagation();
        if (onSelectionChange) {
            onSelectionChange("node", id);
        }
    };
    var handleMouseOver = function () { };
    var handleMouseDown = function (e) {
        e.stopPropagation();
        if (onMouseDown) {
            onMouseDown(id, e);
        }
    };
    var shapeClasses = "shape";
    var labelClasses = "shape-label";
    var styleModifier = "normal";
    if (selected) {
        styleModifier = "selected";
        shapeClasses += " selected";
        labelClasses += " selected";
    }
    if (muted) {
        styleModifier = "muted";
        shapeClasses += " muted";
        labelClasses += " muted";
    }
    if (highlighted) {
        styleModifier = "highlighted";
        shapeClasses += " highlighted";
        labelClasses += " highlighted";
    }
    // Label position is adjusted below to accound for different shapes
    // Those adjustments are held in the deltaLabel variables
    var deltaLabelX = labelOffsetX;
    var deltaLabelY = labelOffsetY;
    var shapeElement;
    if (shape === ShapeType.Cloud) {
        shapeClasses += " shape-cloud";
        labelClasses += " shape-label-cloud";
        var cloudPath = "M" + x + "," + (y + 5);
        cloudPath += "l-25,0 c-10,0 -10,-10 -5,-15";
        cloudPath += "c5,-5 15,-5 15,0 c0,-15 25,-15 25,-5 c10,-10 25,15 10,20 Z";
        shapeElement = (React.createElement("path", { d: cloudPath, style: style.shape[styleModifier], className: shapeClasses }));
        switch (labelPosition) {
            case LabelPosition.Top:
            case LabelPosition.TopRight:
            case LabelPosition.TopLeft:
                deltaLabelY += 7;
                break;
            case LabelPosition.Bottom:
            case LabelPosition.BottomLeft:
            case LabelPosition.BottomRight:
                deltaLabelY -= 15;
                break;
        }
        deltaLabelX -= 3;
    }
    else if (shape === ShapeType.Square) {
        shapeClasses += " shape-square";
        labelClasses += " shape-shape-square";
        var posx = x - radius;
        var posy = y - radius;
        var width = 2 * radius;
        shapeElement = (React.createElement("rect", { x: posx, y: posy, rx: rx, ry: ry, width: width, height: width, style: style.shape[styleModifier], className: shapeClasses }));
        switch (labelPosition) {
            case LabelPosition.Left:
                deltaLabelX -= 2;
                break;
            case LabelPosition.Right:
                deltaLabelX += 2;
                break;
        }
    }
    else {
        shapeClasses += " shape-circle";
        labelClasses += " label-circle";
        shapeElement = (React.createElement("circle", { cx: x, cy: y, r: radius, style: style.shape[styleModifier], className: shapeClasses }));
    }
    var labelElement;
    if (label) {
        labelElement = (React.createElement(Label, { label: label, x: x + deltaLabelX, y: y + deltaLabelX, xOffset: deltaLabelX, yOffset: deltaLabelY, labelPosition: labelPosition, labelRadialDistance: radius + 3, labelClassed: labelClasses, style: style.label[styleModifier] }));
    }
    return (React.createElement("g", { onClick: handMouseClick, onMouseOver: handleMouseOver, onMouseDown: handleMouseDown },
        shapeElement,
        labelElement));
};

export { Label, Shape };
//# sourceMappingURL=index.es.js.map
