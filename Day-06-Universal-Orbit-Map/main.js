"use strict";
exports.__esModule = true;
var fs = require("fs");
var source = fs
    .readFileSync("./input.txt", 'utf8')
    .split('\n')
    .filter(function (a) { return a; });
// Build orbit graph
var orbitGraph = {};
source.forEach(function (line) {
    var _a = line.split(')'), a = _a[0], b = _a[1];
    orbitGraph[b] = a;
});
var distances = {};
function countOrbits(obj) {
    if (distances[obj])
        return distances[obj];
    var obj1 = obj;
    var counter = 0;
    while (obj1 != 'COM') {
        counter++;
        obj1 = orbitGraph[obj1];
    }
    distances[obj] = counter;
    return counter;
}
var objects = Object.keys(orbitGraph);
console.log(objects.reduce(function (acc, el) { return acc + countOrbits(el); }, 0));
// Paths from me and santa to the COM
var YOU = [];
var obj = 'YOU';
while (obj != 'COM') {
    YOU.push(orbitGraph[obj]);
    obj = orbitGraph[obj];
}
var SAN = [];
obj = 'SAN';
while (obj != 'COM') {
    SAN.push(orbitGraph[obj]);
    obj = orbitGraph[obj];
}
// find the nearest point of overlap
var sanSet = new Set(SAN);
var pivot = YOU.find(function (obj) { return sanSet.has(obj); });
console.log(YOU.findIndex(function (obj) { return obj == pivot; }) +
    SAN.findIndex(function (obj) { return obj == pivot; }));
