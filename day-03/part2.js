const { input } = require("./input")

function findCommonBits(input, param) {
    const bitsTotal = new Array(12).fill(0)
    input.forEach((bit) => {
        for (let position = 0; position < bit.length; position++) {
            bitsTotal[position] += parseInt(bit[position])
        }
    })
    mostCommonBits = bitsTotal.map((bit) => {
        if (bit >= input.length / 2) return param
        return 1 - param
    })
    return mostCommonBits
}

function findMostCommonBits(input) {
    return findCommonBits(input, 1)
}

function findLeastCommonBits(input) {
    return findCommonBits(input, 0)
}

function filterInput(input, index = 0, fn) {
    const pattern = fn(input)
    // console.log(`Most common bit in position ${index} is ${pattern[index]}`);
    const filteredInput = input.filter((item) => parseInt(item[index]) === pattern[index])
    if (filteredInput.length === 1) return filteredInput[0]
    return filterInput(filteredInput, index + 1, fn)
}

function parseBinary(bin) {
    return parseInt(bin, 2)
}

const oxygenRating = parseBinary(filterInput(input, 0, findMostCommonBits))
const co2rating = parseBinary(filterInput(input, 0, findLeastCommonBits))
console.log(oxygenRating, co2rating, oxygenRating * co2rating)
