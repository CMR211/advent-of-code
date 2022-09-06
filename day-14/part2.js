// @ts-check

let { sample, data } = require("./input")

const sequences = parse(data).seqs
const input = {
    pairs: parse(data).pairs,
    elements: parse(data).elements,
}

// ------------------------------

// Part 1 Solution
/*
const {elements} = insertElements(input, 10)
const max = Math.max(...Object.values(elements))
const min = Math.min(...Object.values(elements))
console.log(max-min) */
// -> 3048

// Part 2 Solution
const { elements } = insertElements(input, 40)
console.log(elements)
const max = Math.max(...Object.values(elements))
const min = Math.min(...Object.values(elements))
console.log(max - min)
// -> 3447389044530

/**
 *
 * @param {{pairs:{}, elements:{}}} input
 * @param {number} times
 * @returns {{pairs:{}, elements:{}}}
 */
function insertElements(input, times) {
    const { pairs, elements } = input
    if (times === 0) return { pairs, elements }
    const newPairs = {}
    Object.keys(pairs).forEach((pair) => {
        for (let i = 0; i < 2; i++) {
            const product = sequences[pair][i]
            if (product in newPairs) newPairs[product] = newPairs[product] + pairs[pair]
            else newPairs[product] = pairs[pair]
        }
        if (sequences[pair][2] in elements) {
            elements[sequences[pair][2]] = elements[sequences[pair][2]] + pairs[pair]
        } else {
            elements[sequences[pair][2]] = pairs[pair]
        }
    })
    return insertElements({ pairs: newPairs, elements: elements }, times - 1)
}

/**
 *
 * @param {string} data
 * @returns {{elements:{},pairs:{},seqs:{}}}
 */
function parse(data) {
    const raw = data.split("\n")
    const template = raw[0]
    const seqs = {}
    const s = raw.slice(2).map((r) => r.split(" -> "))
    s.forEach((r) => (seqs[r[0]] = [r[0][0] + r[1], r[1] + r[0][1], r[1]]))
    const pairs = {}
    const elements = {}
    for (let i = 0; i < template.length - 1; i++) {
        const key = template[i] + template[i + 1]
        if (key in pairs) pairs[key] = pairs[key] + 1
        else pairs[key] = 1
    }
    for (let i = 0; i < template.length; i++) {
        if (template[i] in elements) elements[template[i]] = elements[template[i]] + 1
        else elements[template[i]] = 1
    }
    return {
        elements,
        pairs,
        seqs,
    }
}
