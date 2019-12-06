
import * as fs from 'fs';
let source = fs
    .readFileSync("./input.txt", 'utf8')
    .split(',')
    .map(Number)

let input = [5]
let output: number[] = []

function compute () {
    let pointer = 0
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
                code[a] = input.pop()
                break;
            case 4: // OUT
                args = code.slice(pointer, ++pointer)
                argVals = args.map((arg, i) => (modes[i] || 0) ? arg : code[arg])
                output.push(argVals[0])
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
}

compute()
console.log(output)