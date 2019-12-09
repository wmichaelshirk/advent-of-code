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
var program = fs
    .readFileSync("./input.txt", 'utf8')
    .split(',')
    .map(Number);
function compute(source, input) {
    if (input === void 0) { input = []; }
    var pointer = 0;
    var relativeBase = 0;
    var output = [];
    var code = __spreadArrays(source);
    var _loop_1 = function () {
        var op = code.slice(pointer, ++pointer)[0];
        var modes = [];
        if (op > 99) {
            modes = String(op).split('').reverse().slice(2).map(Number);
            op = Number(String(op).slice(-2));
        }
        var getArgs = function (arg, i) {
            var mode = modes[i] || 0;
            switch (mode) {
                case 0: return code[arg] || 0;
                case 1: return arg;
                case 2: return code[arg + relativeBase] || 0;
                default: throw "Invalid mode";
            }
        };
        switch (op) {
            case 1: // ADD
            case 2: // MUL
                var args = code.slice(pointer, pointer + 3);
                var argVals = args.map(getArgs);
                var result = op == 1 ? argVals[0] + argVals[1] : argVals[0] * argVals[1];
                if (modes[2] == 2) {
                    code[args[2] + relativeBase] = result;
                }
                else {
                    code[args[2]] = result;
                }
                pointer += 3;
                break;
            case 3: // IN
                var a = code.slice(pointer, ++pointer)[0];
                var inValue = input.shift();
                if (modes[0] == 2) {
                    code[a + relativeBase] = inValue;
                }
                else {
                    code[a] = inValue;
                }
                break;
            case 4: // OUT
                args = code.slice(pointer, ++pointer);
                argVals = args.map(getArgs);
                console.log(argVals[0]);
                break;
            case 5: // JNE
                args = code.slice(pointer, pointer + 2);
                argVals = args.map(getArgs);
                if (argVals[0] != 0) {
                    pointer = argVals[1];
                }
                else {
                    pointer += 2;
                }
                break;
            case 6: // JEQ - Jump If Equal to Zero
                args = code.slice(pointer, pointer + 2);
                argVals = args.map(getArgs);
                if (argVals[0] == 0) {
                    pointer = argVals[1];
                }
                else {
                    pointer += 2;
                }
                break;
            case 7: // LT - Less Than
                args = code.slice(pointer, pointer + 3);
                argVals = args.map(getArgs);
                result = argVals[0] < argVals[1] ? 1 : 0;
                if (modes[2] == 2) {
                    code[args[2] + relativeBase] = result;
                }
                else {
                    code[args[2]] = result;
                }
                pointer += 3;
                break;
            case 8: // EQ - Equal To
                args = code.slice(pointer, pointer + 3);
                argVals = args.map(getArgs);
                result = argVals[0] == argVals[1] ? 1 : 0;
                if (modes[2] == 2) {
                    code[args[2] + relativeBase] = result;
                }
                else {
                    code[args[2]] = result;
                }
                pointer += 3;
                break;
            case 9: // ARB - Adjust Relative Base
                var arg = code.slice(pointer, ++pointer).map(getArgs)[0];
                relativeBase += arg;
                break;
            default:
                throw "Abort! Invalid Opcode: " + op;
        }
    };
    while (code[pointer] != 99) {
        _loop_1();
    }
    return null;
}
compute(program, [1]);
compute(program, [2]);
