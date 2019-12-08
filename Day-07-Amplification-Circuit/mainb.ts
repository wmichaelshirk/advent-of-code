/* There are five amplifiers connected in series; each one receives an input signal and produces an output signal. They are connected such that the first amplifier's output leads to the second amplifier's input, the second amplifier's output leads to the third amplifier's input, and so on. The first amplifier's input value is 0, and the last amplifier's output leads to your ship's thrusters. */


import * as fs from 'fs';
let program = fs
    .readFileSync("./input.txt", 'utf8')
    .split(',')
    .map(Number)

// From Stack Overflow.
const permutator = (inputArr) => {
    let result = [];
    
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)

    return result;
}
    
function* compute (source: number[], input: number[] = []) {
    let pointer = 0
    let output: number[] = []
    let code = [...source]
    while (code[pointer] != 99) {
        let [op] = code.slice(pointer, ++pointer)
        let modes = []
        if (op > 99) {
            modes = String(op).split('').reverse().slice(2).map(Number)
            op = Number(String(op).slice(-2))
        }
        switch (op) {
            case 1: // ADD
            case 2: // MUL
                let args = code.slice(pointer, pointer + 3)
                let argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                let result = op == 1 ? argVals[0] + argVals[1] : argVals[0] * argVals[1]
                code[args[2]] = result
                pointer += 3
                break;
            case 3: // IN
                let [a] = code.slice(pointer, ++pointer)
                code[a] = input.shift()
                break;
            case 4: // OUT
                args = code.slice(pointer, ++pointer)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                input.push(yield(argVals[0]))
                break;
            case 5: // JNE
                args = code.slice(pointer, pointer + 2)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                if (argVals[0] != 0) {
                    pointer = argVals[1]
                } else {
                    pointer += 2
                }
                break;
            case 6: // JEQ
                args = code.slice(pointer, pointer + 2)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                if (argVals[0] == 0) {
                    pointer = argVals[1]
                } else {
                    pointer += 2
                }
                break;
            case 7: // LT
                args = code.slice(pointer, pointer + 3)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                code[args[2]] = argVals[0] < argVals[1] ? 1 : 0
                pointer += 3
                break;
            case 8: // EQ
                args = code.slice(pointer, pointer + 3)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                code[args[2]] = argVals[0] == argVals[1] ? 1 : 0
                pointer += 3
                break;
            default:
                console.error("Abort! Invalid Opcode: " + op)
        }        
    }
    return null
}


let attempts = permutator([5,6,7,8,9])

let results = attempts.map(attempt => {
    let a = compute(program, [attempt[0], 0])
    let aOutput = a.next().value
    let b = compute(program, [attempt[1], aOutput])
    let bOutput = b.next().value
    let c = compute(program, [attempt[2], bOutput])
    let cOutput = c.next().value
    let d = compute(program, [attempt[3], cOutput])
    let dOutput = d.next().value
    let e = compute(program, [attempt[4], dOutput])
    let eOutput = e.next()
    
    let amplifiers = [a, b, c, d, e]
    let currentAmplifier = 0
    let currentResult = eOutput
    let newResult
    while(!currentResult.done) {
        newResult = currentResult
        currentResult = amplifiers[currentAmplifier].next(currentResult.value)
        currentAmplifier = (currentAmplifier + 1) % 5
    }
    return [attempt, newResult.value]
})
.reduce((acc, el) => {
    if (el[1] > acc[1]) {
        return el
    } else {
        return acc
    }
}, [0, 0])

console.log(results)
