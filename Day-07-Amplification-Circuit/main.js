"use strict";
/* There are five amplifiers connected in series; each one receives an input signal and produces an output signal. They are connected such that the first amplifier's output leads to the second amplifier's input, the second amplifier's output leads to the third amplifier's input, and so on. The first amplifier's input value is 0, and the last amplifier's output leads to your ship's thrusters. */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
var program = fs
    .readFileSync("./input.txt", 'utf8')
    .split(',')
    .map(Number);
// From Stack Overflow.
var permutator = function (inputArr) {
    var result = [];
    var permute = function (arr, m) {
        if (m === void 0) { m = []; }
        if (arr.length === 0) {
            result.push(m);
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                var curr = arr.slice();
                var next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };
    permute(inputArr);
    return result;
};
function compute(source, input) {
    if (input === void 0) { input = []; }
    var pointer = 0;
    var output = [];
    var code = __spreadArrays(source);
    var _loop_1 = function () {
        var op = code.slice(pointer, ++pointer)[0];
        var modes = [];
        if (op > 99) {
            modes = String(op).split('').reverse().slice(2).map(Number);
            op = Number(String(op).slice(-2));
        }
        switch (op) {
            case 1: // ADD
            case 2: // MUL
                var args = code.slice(pointer, pointer + 3);
                var argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                var result = op == 1 ? argVals[0] + argVals[1] : argVals[0] * argVals[1];
                code[args[2]] = result;
                pointer += 3;
                break;
            case 3: // IN
                var a = code.slice(pointer, ++pointer)[0];
                code[a] = input.shift();
                break;
            case 4: // OUT
                args = code.slice(pointer, ++pointer);
                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                output.push(argVals[0]);
                break;
            case 5: // JNE
                args = code.slice(pointer, pointer + 2);
                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                if (argVals[0] != 0) {
                    pointer = argVals[1];
                }
                else {
                    pointer += 2;
                }
                break;
            case 6: // JEQ
                args = code.slice(pointer, pointer + 2);
                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                if (argVals[0] == 0) {
                    pointer = argVals[1];
                }
                else {
                    pointer += 2;
                }
                break;
            case 7: // LT
                args = code.slice(pointer, pointer + 3);
                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                code[args[2]] = argVals[0] < argVals[1] ? 1 : 0;
                pointer += 3;
                break;
            case 8: // EQ
                args = code.slice(pointer, pointer + 3);
                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                code[args[2]] = argVals[0] == argVals[1] ? 1 : 0;
                pointer += 3;
                break;
            default:
                console.error("Abort! Invalid Opcode: " + op);
        }
    };
    while (code[pointer] != 99) {
        _loop_1();
    }
    return output;
}
var attempts = permutator([0, 1, 2, 3, 4]);
var results = attempts.map(function (attempt) {
    var value = 0;
    console.log("starting");
    attempt.forEach(function (phase, i) {
        var output = compute(program, [phase, value]);
        console.log('Amplifier ' + i + ", phase " + phase +
            ": " + value + " -> " + output);
        value = output[0];
    });
    return [attempt, value];
})
    .reduce(function (acc, el) {
    if (el[1] > acc[1]) {
        return el;
    }
    else {
        return acc;
    }
}, [0, 0]);
console.log(results);
