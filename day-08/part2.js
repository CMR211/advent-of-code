const data = require("./input").input

const parsedData = parseInput(data)

function parseInput(input) {
    const json = JSON.parse(
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
    const sort = json.map((line) => {
        return {
            input: line.input.map((i) => Array.from(i).sort().join("")),
            output: line.output.map((i) => Array.from(i).sort().join("")),
        }
    })
    return sort
}
/* 
    {
        input: [
            'bceg',   'abcdfg',
            'bcdfg',  'cdefg',
            'eg',     'abdefg',
            'acdef',  'abcdefg',
            'bcdefg', 'efg'
        ],
        output: [ 'cdefg', 'eg', 'acdef', 'eg' ]
    }, 
  */

const LETTERS = Array.from("abcdefg")
const VALUES = [42, 17, 34, 39, 30, 37, 41, 25, 49, 45]

function countLettersInLine(arg) {
    const { input } = arg
    const letterCount = []
    LETTERS.forEach((LETTER) => {
        let count = 0
        input.forEach((string) => {
            if (Array.from(string).includes(LETTER)) count++
        })
        letterCount.push([LETTER, count])
    })
    const obj = letterCount.reduce((o, key) => ({ ...o, [key[0]]: key[1] }), {})
    return obj
    //    { a: 7, b: 7, c: 9, d: 8, e: 8, f: 4, g: 6 }
}

function mapLines(input) {
    const letterCount = countLettersInLine(input)
    const vals = input["output"].map((string) =>
        Array.from(string)
            .map((letter) => letterCount[letter])
            .reduce((p, c) => p + c)
    )
    const res = parseInt(vals.map((val) => VALUES.findIndex((i) => i === val)).join(""))
    return res
}

function solve8b() {
    const sum = parsedData.map((line) => mapLines(line)).reduce((prev, curr) => prev + curr)
    console.log("Sum of output:", sum)
}

solve8b()
// -> Sum of output: 1091165
