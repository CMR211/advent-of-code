import { input as data } from "./inputs/day-8-input.mjs"
const parsedData = parseInput(data)

// solve8a(parsedData)
// -> Numbers 1, 4, 7, 8 appear this many times: 512

function solve8a(input) {
    console.log(
        "Numbers 1, 4, 7, 8 appear this many times:",
        countOccurenceOf1478(input)
    )
}

function countOccurenceOf1478(input) {
    let count = 0
    Array.from([2, 3, 4, 7]).forEach(
        len => (count = count + countOccurence(input, len))
    )
    return count
}

function countOccurence(input, len) {
    let count = 0
    input.forEach(el => {
        count =
            count + el.output.filter(outputEl => outputEl.length === len).length
    })
    return count
}

function parseInput(input) {
    return JSON.parse(
        "[" +
            input
                .replace(/(\w+)/gm, `"$1",`)
                .replace(/, \|/gm, `] |`)
                .replace(/^"/gm, `{"input": ["`)
                .replace(/] \| /gm, `], "output": [`)
                .replace(/,$/gm, `]},`)
                .slice(0, -1) +
            "]"
    )
}

console.log(parseInput(data))
