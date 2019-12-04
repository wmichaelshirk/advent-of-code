var range = [245182, 790572];
var count = 0;
for (var i = range[0]; i <= range[1]; i++) {
    var num = String(i);
    if (num.match(/(.)\1/) &&
        num.split('').sort().join('') == num)
        count++;
}
var count2 = 0;
for (var i = range[0]; i <= range[1]; i++) {
    var num = String(i);
    if (testMatchingDigits(num) &&
        num.split('').sort().join('') == num)
        count2++;
}
function testMatchingDigits(num) {
    for (var x = 0; x < num.length - 1; x++) {
        if (num[x] == num[x + 1] && num[x] != num[x + 2] &&
            num[x] != num[x - 1]) {
            return true;
        }
    }
    return false;
}
console.log(count, count2);
// 575 too low
