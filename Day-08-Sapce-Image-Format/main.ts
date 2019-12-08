// 25 pixels wide and 6
let width = 25
let height = 6

import * as fs from 'fs';
let image = fs
    .readFileSync("./input.txt", 'utf8')
    .split('')
    .map(Number)
let imageLayers = []
while (image.length) {
    imageLayers.push(image.splice(0, width * height))
}

let layerWithFewestZeros = imageLayers
    .map(layer => layer.join('').replace(/0/g, ''))
    .reduce((acc, el, i) => {
        if (acc[1] > el.length) return acc
        else return [i, el.length]
    }, [0, 0])
let numberOf1s = imageLayers[layerWithFewestZeros[0]]
    .join('')
    .match(/1/g).length

let numberOf2s = imageLayers[layerWithFewestZeros[0]]
    .join('')
    .match(/2/g).length
    
console.log(numberOf1s * numberOf2s)

let imageResult = imageLayers.shift()
while (imageLayers.length) {
    let thisLayer = imageLayers.shift()
    imageResult = imageResult.map((c, i) => {
        if (c == 2) return thisLayer[i]
        else return c
    })
}

while(imageResult.length) {
    let thisRow = imageResult.splice(0, width)
    thisRow = thisRow.join('')
    thisRow = thisRow.replace(/0/g, ' ')
    thisRow = thisRow.replace(/1/g, '█')
    console.log(thisRow)
}