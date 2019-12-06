
import * as fs from 'fs';
let source = fs
    .readFileSync("./input.txt", 'utf8')
    .split('\n')
    .filter(a => a)

// Build orbit graph
const orbitGraph = {}
source.forEach(line => {
    let [a, b] = line.split(')')
    orbitGraph[b] = a

})

const distances = {}

function countOrbits(obj) {
    if (distances[obj]) return distances[obj]
    let obj1 = obj
    let counter = 0
    while (obj1 != 'COM') {
        counter++
        obj1 = orbitGraph[obj1]
    }
    distances[obj] = counter
    return counter
}


let objects = Object.keys(orbitGraph)
console.log(objects.reduce((acc, el) => acc + countOrbits(el), 0))

// Paths from me and santa to the COM
let YOU = []
let obj = 'YOU'
while (obj != 'COM') {
    YOU.push(orbitGraph[obj])
    obj = orbitGraph[obj]
}

let SAN = []
obj = 'SAN'
while (obj != 'COM') {
    SAN.push(orbitGraph[obj])
    obj = orbitGraph[obj]
}

// find the nearest point of overlap
let sanSet = new Set(SAN)
let pivot = YOU.find(obj => sanSet.has(obj))
console.log(YOU.findIndex(obj => obj == pivot) +
    SAN.findIndex(obj => obj == pivot))