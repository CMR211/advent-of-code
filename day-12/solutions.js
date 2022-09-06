const data = require("./input").input
const input = parseInput(data)

// Part 1 solution -> 4749
console.log(findPaths1(input).length)

// Part 2 solution -> 123054
console.log(findPaths2(input).length)

function findPaths1(array) {
    const paths = []
    findPath("start", [])
    return paths
    function findPath(current, history) {
        if (isLowercase(current) && history.includes(current)) return
        history = mergeArrays(history, current)
        if (current === "end") {
            paths.push(history)
            return
        }
        const nexts = findNextNode(array, current)
        nexts.forEach((next) => {
            if (next === "start") return
            findPath(next, history)
        })
    }
}

function findPaths2(array) {
    const paths = []
    findPath("start", [], 0)
    return paths
    function findPath(current, history, duplicate) {
        if (isLowercase(current) && history.includes(current) && duplicate > 0) return
        if (isLowercase(current) && history.includes(current)) duplicate++
        history = mergeArrays(history, current)
        if (current === "end") {
            paths.push(history)
            return
        }
        const nexts = findNextNode(array, current)
        nexts.forEach((next) => {
            if (next === "start") return
            findPath(next, history, duplicate)
        })
    }
}

function isLowercase(letter) {
    return letter == letter.toLowerCase()
}

function mergeArrays(array, item) {
    return [...array, item]
}

function findNextNode(array, start) {
    const nextNodes = []
    array.forEach((connection) => {
        // <if> checking is faster than <.filter> method
        // (7-8 ms vs 11-12 ms on 1000 tries)
        if (connection[0] !== start) return
        nextNodes.push(connection[1])
    })
    return nextNodes
}

function parseInput(str) {
    const arr = str.split("\n").map((line) => line.split("-"))
    arr.forEach((connection) => {
        arr.push([connection[1], connection[0]])
    })
    return arr
}
