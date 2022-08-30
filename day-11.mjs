import { input } from "./inputs/day-11-sample.mjs"

// parsing the input
const p0 = parseInput(input, 10)

let flashes = 0
const p100 = recurse(p0, 0, 100) // flashes -> 1659
const p1000 = recurse(p0, 0, 1000) // step -> 227

function recurse(array, i, max) {
    if (array.every((line) => line.every((item) => item === 0))) {
        console.log(i) // part 2 solution
        return array
    }
    if (i === max) return array
    let next = step(array)
    return recurse(next, i + 1, max)
}

function step(array0) {
    const array1 = array0.map((line) => line.map((item) => (item += 1)))
    while (array1.some((line) => line.some((item) => item > 9 && item !== "X"))) {
        flashArray(array1)
    }
    const array2 = array1.map((line) =>
        line.map((item) => {
            if (item === "X") return 0
            return item
        })
    )
    return array2
}

function flashArray(array) {
    array.forEach((line, y, array) => line.forEach((item, x) => flashItem(x, y, array)))
}

function flashItem(x, y, array) {
    if (array[y][x] < 10 || array[y][x] === "X") return array[y][x]
    for (let i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i > array.length - 1) continue
        for (let j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j > array.length - 1) continue
            if (array[j][i] === "X") continue
            array[j][i] += 1
        }
    }
    array[y][x] = "X"
    // flashes++
}

function parseInput(variable, size) {
    const newArr = variable
        .split("\n", size)
        .map((line) => line.split(""))
        .map((line) => line.map((str) => parseInt(str)))
    return newArr
}
