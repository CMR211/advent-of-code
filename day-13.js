// @ts-check
const { data11, data12, data21, data22 } = require("./inputs/day-13-input.js")

const sample = {
    coordinates: parseFirstPart(data11),
    folds: parseSecondPart(data12),
    table: createTable(parseFirstPart(data11)),
}

// ----------

console.table(foldTable(sample.table, sample.coordinates, sample.folds[0]).table)

/**
 * @param {string[]} table
 * @param {[number,number][]} coordinates
 * @param {string} fold
 * @returns
 */
function foldTable(table, coordinates, fold) {
    const newCoords = []
    coordinates.forEach((coord) => newCoords.push(invertPos(table, coord, fold)))
    return {
        table: createTable(newCoords),
        coordinates: newCoords,
    }
}

/**
 * @param {string[]} tab
 * @param {[number,number]} initialPosition
 * @param {string} foldInstruction
 */
function invertPos(tab, initialPosition, foldInstruction) {
    let newX, newY
    const tabYdim = tab.length
    const tabXdim = tab[0].length
    const foldDirection = foldInstruction.slice(11, 12)
    const foldPosition = parseInt(foldInstruction.slice(13))
    if (foldDirection === "x") {
        if (initialPosition[0] < foldPosition) return initialPosition
        newX = tabXdim - initialPosition[0] - 1
        newY = initialPosition[1]
    }
    if (foldDirection === "y") {
        if (initialPosition[1] < foldPosition) return initialPosition
        newX = initialPosition[0]
        newY = tabYdim - initialPosition[1] - 1
    }
    return [newX, newY]
}

/**
 * @param {string[]} tab - table array
 * @param {number} posX
 * @param {number} posY
 * @param {string} replacement
 */
function replaceTab(tab, posX, posY, replacement) {
    tab[posY] = replaceStr(tab[posY], posX, replacement)
    return tab
}

/**
 * @param {string} str - string that includes character to replace
 * @param {number} pos - position of a character to replace
 * @param {string} replacement - character to become a replacement
 * @returns {string} a string with replaced character
 */
function replaceStr(str, pos, replacement) {
    return str.slice(0, pos) + replacement + str.slice(pos, -1)
}

/**
 * @param {[number,number][]} input
 * @returns {string[]}
 */
function createTable(input) {
    let maxX = 0
    let maxY = 0
    /** @type {string[]} */
    input.forEach((coordinate) => {
        maxX = Math.max(maxX, coordinate[0])
        maxY = Math.max(maxY, coordinate[1])
    })
    /** @type {string[]} */
    const table = new Array(maxY + 1).fill(".".repeat(maxX + 1))
    input.forEach((coordinate) => {
        replaceTab(table, coordinate[0], coordinate[1], "X")
    })
    return table
}

/**
 * @param {string} str
 * @returns {[number,number][]} an array with [x,y] paired values
 */
function parseFirstPart(str) {
    return str.split("\n").map((c1) => {
        const c2 = c1.split(",")
        return [parseInt(c2[0]), parseInt(c2[1])]
    })
}

/**
 * @param {string} str - input string
 * @returns {string[]} array of folding instructions
 */
function parseSecondPart(str) {
    return str.split("\n")
}
