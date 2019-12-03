"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
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
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var e_1, _a;
exports.__esModule = true;
var fs = require("fs");
var directions = {
    U: [0, -1],
    D: [0, 1],
    L: [1, 0],
    R: [-1, 0]
};
var input = fs
    .readFileSync("./input.txt", 'utf8')
    .split('\n')
    .map(function (row) {
    var x = 0, y = 0;
    var rowPoints = [];
    row.split(',').forEach(function (point) {
        var dir = point[0];
        var distance = Number(point.slice(1));
        for (var i = 0; i < distance; i++) {
            x += directions[dir][0];
            y += directions[dir][1];
            rowPoints.push(x + ',' + y);
        }
    });
    return rowPoints;
});
// intersection
var crossedPoints = new Set();
var set0 = new Set(input[0]);
var set1 = new Set(input[1]);
try {
    for (var set0_1 = __values(set0), set0_1_1 = set0_1.next(); !set0_1_1.done; set0_1_1 = set0_1.next()) {
        var element = set0_1_1.value;
        if (set1.has(element)) {
            crossedPoints.add(element);
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (set0_1_1 && !set0_1_1.done && (_a = set0_1["return"])) _a.call(set0_1);
    }
    finally { if (e_1) throw e_1.error; }
}
// nearest point
var sum = function (a, b) { return a + b; };
var nearestPoint = __spread(crossedPoints).reduce(function (acc, el) {
    var distance = el.split(',').map(Number).map(Math.abs).reduce(sum);
    return Math.min(distance, acc);
}, Infinity);
// point of shortest path
var distance = Math.min.apply(Math, __spread(__spread(crossedPoints).map(function (point) {
    return input[0].findIndex(function (p) { return p == point; }) +
        input[1].findIndex(function (p) { return p == point; });
}))) + 2;
//    51347 : too low, so is 51349
// so is 112236
console.log(nearestPoint, distance);
