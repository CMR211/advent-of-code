// @ts-check
const { data11, data12, data21, data22 } = require("./input")

// const sample = {
//     coordinates: parseFirstPart(data11),
//     folds: parseSecondPart(data12),
//     table: createTable(parseFirstPart(data11)),
// }

const task = {
    coordinates: parseFirstPart(data21),
    folds: parseSecondPart(data22),
    table: createTable(parseFirstPart(data21)),
}

// ----------

// Part 1 solution -> 745
// console.log(countDots(foldTable(task.table,task.coordinates,task.folds[0]).table))

// Part 2 solution -> ABKJFBGC
// .##..###..#..#...##.####.###...##...##.
// #..#.#..#.#.#.....#.#....#..#.#..#.#..#
// #..#.###..##......#.###..###..#....#...
// ####.#..#.#.#.....#.#....#..#.#.##.#...
// #..#.#..#.#.#..#..#.#....#..#.#..#.#..#
// #..#.###..#..#..##..#....###...###..##.
// console.table(multipleFolds(task))

/**
 *
 * @param {string[]} table
 */
function countDots(table) {
    // @ts-ignore
    return table.join("").replaceAll(".", "").length
}

/**
 * @param {{table: string[], coordinates: [number,number][], folds: string[]} } param0
 */
function multipleFolds({ table, coordinates, folds }) {
    while (folds.length > 0) {
        const result = foldTable(table, coordinates, folds[0])
        table = result.table
        coordinates = result.coordinates
        folds = folds.slice(1)
    }
    return table
}

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
    const [oldX, oldY] = initialPosition
    // const tabYdim = tab.length
    // const tabXdim = tab[0].length
    const foldDirection = foldInstruction.slice(11, 12)
    const foldPosition = parseInt(foldInstruction.slice(13))
    if (foldDirection === "x") {
        if (oldX < foldPosition) return initialPosition
        newX = foldPosition - (oldX - foldPosition)
        newY = initialPosition[1]
    }
    if (foldDirection === "y") {
        if (oldY < foldPosition) return initialPosition
        newX = initialPosition[0]
        newY = foldPosition - (oldY - foldPosition)
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
    return str.slice(0, pos) + replacement + str.slice(pos + 1)
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
        replaceTab(table, coordinate[0], coordinate[1], "#")
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
