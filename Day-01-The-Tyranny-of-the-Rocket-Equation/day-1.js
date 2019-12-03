const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('../input-1.txt'),
    output: process.stdout,
    console: false
});

const fuelRequirement = (mass) => Math.floor(Number(mass) / 3) - 2

let sum = 0

readInterface.on('line', function(line) {
    sum += fuelRequirement(line)
})

readInterface.on('close', function() {
    console.log(sum)
})

