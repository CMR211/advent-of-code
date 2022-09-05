// @ts-check

let data = require("./inputs/day-14-input").data

const input = parse(data)
console.log(part1) 
// -> 3048

function part1(template) {
    const elements = countElements(insertPairsManyTimes(template, 19))
    const elementsArray = Object.entries(elements).sort((a, b) => a[1] - b[1])
    const min = elementsArray[0][1]
    const max = elementsArray[elementsArray.length - 1][1]
    return max - min
}

/**
 * @param {string} template
 */
function countElements(template) {
    const array = template.split("")
    const elements = {}
    array.forEach((element) => {
        if (!Object.keys(elements).includes(element)) elements[element] = 1
        else elements[element]++
    })
    return elements
}

/**
 * @param {string} template
 * @param {number} time
 * @returns {string} template with inserted pairs after multiple steps
 */
function insertPairsManyTimes(template, time) {
    if (time === 0) return template
    for (let i = 0; i < time; i++) {
        template = insertPairs(template)
    }
    return template
}

/**
 * @param {string} template
 * @returns {string} a new template with inserted elements between pairs
 */
function insertPairs(template) {
    const pairs = returnPairs(template)
    const triples = trimTriples(pairs.map((pair) => insertPair(pair)))
    return triples.join("")
}

/**
 * @param {string[]} triples
 * @returns {string[]}
 */
function trimTriples(triples) {
    return triples.map((triple, index) => {
        if (index === triples.length - 1) return triple
        return triple.slice(0, 2)
    })
}

/**
 * @param {string} template
 * @returns {string[]} array of all pairs from the template
 */
function returnPairs(template) {
    const pairs = []
    for (let i = 0, len = template.length - 1; i < len; i++) {
        pairs.push(template.slice(i, i + 2))
    }
    return pairs
}

/**
 * @param {string} string
 * @returns {string} string with a new element in between based on pair insertion rules
 */
function insertPair(string) {
    const { pairs } = input
    if (pairs.find((pair) => pair[0] === string) === undefined) return string
    return string.slice(0, 1) + pairs.find((pair) => pair[0] === string)[1] + string.slice(1)
}

/**
 * @param {string} data
 * @returns {{template: string, pairs: string[][]}}
 */
function parse(data) {
    const s1 = data.split("\n")[0]
    const s2 = data
        .split("\n")
        .slice(2)
        .map((i) => i.split(" -> "))
    return {
        template: s1,
        pairs: s2,
    }
}
