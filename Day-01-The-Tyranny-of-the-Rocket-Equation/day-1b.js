const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('../input-1.txt'),
    output: process.stdout,
    console: false
});

const fuelRequirement = (mass) => Math.floor(Number(mass) / 3) - 2

const recursiveFuelRequirement = (mass) => {
    mass = Number(mass)
    let fuel = fuelRequirement(mass)
    if (Math.max(fuel, 0) == 0) return 0
    else return recursiveFuelRequirement(fuel) + fuel
}

let sum = 0

readInterface.on('line', function(line) {
    sum += recursiveFuelRequirement(line)
})

readInterface.on('close', function() {
    console.log(sum)
})

