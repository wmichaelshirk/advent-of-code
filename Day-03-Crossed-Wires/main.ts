import * as fs from 'fs';

const directions: { [name: string]: number[] } = {
    U: [ 0, -1],
    D: [ 0,  1],
    L: [ 1,  0],
    R: [-1,  0]
}

const input = fs
    .readFileSync("./input.txt", 'utf8')
    .split('\n')
    .map(row => {
        let x = 0, y = 0
        let rowPoints: string[] = []
        row.split(',').forEach(point => {
            let dir = point[0]
            let distance = Number(point.slice(1))
            for (let i = 0; i < distance; i++) {
                x += directions[dir][0]
                y += directions[dir][1]
                rowPoints.push(x + ',' + y)
            }
        })
        return rowPoints
    })

// intersection
let crossedPoints = new Set()
let set0 = new Set(input[0])
let set1 = new Set(input[1])
for (let element of set0) {
    if (set1.has(element)) {
        crossedPoints.add(element)
    }
}

// nearest point
const sum = (a, b) => a + b
const nearestPoint = [...crossedPoints].reduce((acc: number, el: string) => {
    let distance = el.split(',').map(Number).map(Math.abs).reduce(sum)
    return Math.min(distance, acc)
}, Infinity)

// point of shortest path

const distance = Math.min(...[...crossedPoints].map(point => 
    input[0].findIndex(p => p == point) + 
        input[1].findIndex(p => p == point)
)) + 2

console.log(nearestPoint, distance)