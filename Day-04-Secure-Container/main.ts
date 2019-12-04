const range = [245182,790572]

let count = 0

for (let i = range[0]; i <= range[1]; i++) {
    let num = String(i)
    if (num.match(/(.)\1/) &&
        num.split('').sort().join('') == num)
            count ++
}

let count2 = 0

for (let i = range[0]; i <= range[1]; i++) {
    let num = String(i)
    if (testMatchingDigits(num) &&
        num.split('').sort().join('') == num)
            count2 ++
}
function testMatchingDigits(num) {
    for (let x = 0; x < num.length - 1; x++) {
        if (num[x] == num[x + 1] && num[x] != num[x + 2] && 
            num[x] != num[x - 1]) {
            return true
        }
    }
    return false
}
console.log(count, count2)
// 575 too low
