"use strict";
/* There are five amplifiers connected in series; each one receives an input signal and produces an output signal. They are connected such that the first amplifier's output leads to the second amplifier's input, the second amplifier's output leads to the third amplifier's input, and so on. The first amplifier's input value is 0, and the last amplifier's output leads to your ship's thrusters. */
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    var pointer, output, code, _loop_1;
    if (input === void 0) { input = []; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pointer = 0;
                output = [];
                code = __spreadArrays(source);
                _loop_1 = function () {
                    var op, modes, _a, args, argVals, result, a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                op = code.slice(pointer, ++pointer)[0];
                                modes = [];
                                if (op > 99) {
                                    modes = String(op).split('').reverse().slice(2).map(Number);
                                    op = Number(String(op).slice(-2));
                                }
                                _a = op;
                                switch (_a) {
                                    case 1: return [3 /*break*/, 1];
                                    case 2: return [3 /*break*/, 1];
                                    case 3: return [3 /*break*/, 2];
                                    case 4: return [3 /*break*/, 3];
                                    case 5: return [3 /*break*/, 5];
                                    case 6: return [3 /*break*/, 6];
                                    case 7: return [3 /*break*/, 7];
                                    case 8: return [3 /*break*/, 8];
                                }
                                return [3 /*break*/, 9];
                            case 1:
                                args = code.slice(pointer, pointer + 3);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                result = op == 1 ? argVals[0] + argVals[1] : argVals[0] * argVals[1];
                                code[args[2]] = result;
                                pointer += 3;
                                return [3 /*break*/, 10];
                            case 2:
                                a = code.slice(pointer, ++pointer)[0];
                                code[a] = input.shift();
                                return [3 /*break*/, 10];
                            case 3:
                                args = code.slice(pointer, ++pointer);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                _c = (_b = input).push;
                                return [4 /*yield*/, (argVals[0])];
                            case 4:
                                _c.apply(_b, [_d.sent()]);
                                return [3 /*break*/, 10];
                            case 5:
                                args = code.slice(pointer, pointer + 2);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                if (argVals[0] != 0) {
                                    pointer = argVals[1];
                                }
                                else {
                                    pointer += 2;
                                }
                                return [3 /*break*/, 10];
                            case 6:
                                args = code.slice(pointer, pointer + 2);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                if (argVals[0] == 0) {
                                    pointer = argVals[1];
                                }
                                else {
                                    pointer += 2;
                                }
                                return [3 /*break*/, 10];
                            case 7:
                                args = code.slice(pointer, pointer + 3);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                code[args[2]] = argVals[0] < argVals[1] ? 1 : 0;
                                pointer += 3;
                                return [3 /*break*/, 10];
                            case 8:
                                args = code.slice(pointer, pointer + 3);
                                argVals = args.map(function (arg, i) { return (modes[i] || 0) ? arg : code[arg]; });
                                code[args[2]] = argVals[0] == argVals[1] ? 1 : 0;
                                pointer += 3;
                                return [3 /*break*/, 10];
                            case 9:
                                console.error("Abort! Invalid Opcode: " + op);
                                _d.label = 10;
                            case 10: return [2 /*return*/];
                        }
                    });
                };
                _a.label = 1;
            case 1:
                if (!(code[pointer] != 99)) return [3 /*break*/, 3];
                return [5 /*yield**/, _loop_1()];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, null];
        }
    });
}
var attempts = permutator([5, 6, 7, 8, 9]);
var results = attempts.map(function (attempt) {
    var a = compute(program, [attempt[0], 0]);
    var aOutput = a.next().value;
    var b = compute(program, [attempt[1], aOutput]);
    var bOutput = b.next().value;
    var c = compute(program, [attempt[2], bOutput]);
    var cOutput = c.next().value;
    var d = compute(program, [attempt[3], cOutput]);
    var dOutput = d.next().value;
    var e = compute(program, [attempt[4], dOutput]);
    var eOutput = e.next();
    var amplifiers = [a, b, c, d, e];
    var currentAmplifier = 0;
    var currentResult = eOutput;
    var newResult;
    while (!currentResult.done) {
        newResult = currentResult;
        currentResult = amplifiers[currentAmplifier].next(currentResult.value);
        currentAmplifier = (currentAmplifier + 1) % 5;
    }
    return [attempt, newResult.value];
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
