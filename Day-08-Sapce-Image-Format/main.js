"use strict";
exports.__esModule = true;
// 25 pixels wide and 6
var width = 25;
var height = 6;
var fs = require("fs");
var image = fs
    .readFileSync("./input.txt", 'utf8')
    .split('')
    .map(Number);
var imageLayers = [];
while (image.length) {
    imageLayers.push(image.splice(0, width * height));
}
var layerWithFewestZeros = imageLayers
    .map(function (layer) { return layer.join('').replace(/0/g, ''); })
    .reduce(function (acc, el, i) {
    if (acc[1] > el.length)
        return acc;
    else
        return [i, el.length];
}, [0, 0]);
var numberOf1s = imageLayers[layerWithFewestZeros[0]]
    .join('')
    .match(/1/g).length;
var numberOf2s = imageLayers[layerWithFewestZeros[0]]
    .join('')
    .match(/2/g).length;
console.log(numberOf1s * numberOf2s);
var imageResult = imageLayers.shift();
var _loop_1 = function () {
    var thisLayer = imageLayers.shift();
    imageResult = imageResult.map(function (c, i) {
        if (c == 2)
            return thisLayer[i];
        else
            return c;
    });
};
while (imageLayers.length) {
    _loop_1();
}
while (imageResult.length) {
    var thisRow = imageResult.splice(0, width);
    thisRow = thisRow.join('');
    thisRow = thisRow.replace(/0/g, ' ');
    thisRow = thisRow.replace(/1/g, '█');
    console.log(thisRow);
}
