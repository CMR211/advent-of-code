import { data } from "./inputs/day-10-input.mjs"

const weights = {
    "(": 3,
    ")": -3,
    "[": 57,
    "]": -57,
    "{": 1197,
    "}": -1197,
    "<": 25137,
    ">": -25137,
}

const completionBrackets = [3, 57, 1197, 25137]

function checkBrackets(input) {
    const array = Array.from(input).map(bracket => weights[bracket])
    const stack = []
    let error = 0
    for (const bracket of array) {
        if (error > 0) break
        if (bracket > 0) {
            stack.push(bracket)
            continue
        }
        if (bracket + stack[stack.length - 1] !== 0) {
            error = -bracket
            continue
        }
        stack.pop()
    }
    return error
}

function solve10a(input) {
    const errors = input
        .map(line => checkBrackets(line))
        .reduce((a, b) => a + b)
    console.log("Total error points:", errors)
}

// solve10a(data)
// -> Total error points: 413733

function isLineIncomplete(input) {
    if (checkBrackets(input) === 0) return true
    return false
}

function closeBrackets(input) {
    const array = Array.from(input).map(bracket => weights[bracket])
    const stack = []
    for (const bracket of array) {
        if (bracket > 0) {
            stack.push(bracket)
            continue
        }
        stack.pop()
    }
    return stack
}

function completionPoints(input) {
    return closeBrackets(input)
        .reverse()
        .map(i => completionBrackets.indexOf(i) + 1)
        .reduce((p, c) => p * 5 + c)
}

function solve10b(input) {
    const res = input
        .filter(i => isLineIncomplete(i))
        .map(i => completionPoints(i))
        .sort((a, b) => b - a)
    const middle = res[Math.floor(res.length / 2)]
    console.log("Middle score:", middle)
}

solve10b(data)
// -> Middle score: 3354640192
