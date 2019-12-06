"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
var source = fs
    .readFileSync("./input.txt", 'utf8')
    .split(',')
    .map(Number);
var input = [5];
var output = [];
function compute() {
    var pointer = 0;
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
                code[a] = input.pop();
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
}
compute();
console.log(output);
