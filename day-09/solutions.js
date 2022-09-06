const { data } = require("./input")

function getCoordinates(x, y) {
    // console.log("x:", x, "| y:", y, "| coords:", y * 100 + x)
    return y * 100 + x
}

function setCoordinates(index) {
    const x = parseInt(index.toString().slice(-2))
    const y = parseInt(index.toString().slice(-4, -2)) || 0
    return [x, y]
}

function isLowest(x, y) {
    const array = data
    const neighbours = [
        y !== 0 ? array[getCoordinates(x, y - 1)] : null,
        x !== 99 ? array[getCoordinates(x + 1, y)] : null,
        y !== 99 ? array[getCoordinates(x, y + 1)] : null,
        x !== 0 ? array[getCoordinates(x - 1, y)] : null,
    ]
    const min = Math.min(...neighbours.filter((i) => Number.isInteger(i)))
    if (array[getCoordinates(x, y)] < min) return true
    return false
}

function riskLevel(i) {
    return i + 1
}

function solve9a() {
    const array = data
    const sum = array
        .filter((item, index) => {
            const [x, y] = setCoordinates(index)
            return isLowest(x, y)
        })
        .map((i) => riskLevel(i))
        .reduce((p, c) => p + c)
    console.log("Sum of lowest points risk is equal to:", sum)
}

solve9a()
// -> Sum of lowest points risk is equal to: 600

function findBasin(x, y) {
    const points = []
    function basin(x, y) {
        if (data[getCoordinates(x, y)] === 9) return
        if (points.includes(getCoordinates(x, y))) return
        points.push(getCoordinates(x, y))
        if (x !== 0) basin(x - 1, y)
        if (x !== 99) basin(x + 1, y)
        if (y !== 0) basin(x, y - 1)
        if (y !== 99) basin(x, y + 1)
    }
    basin(x, y)
    return [points, points.length]
}

function solve9b() {
    const lens = []
    let points = []
    data.forEach((item, index) => {
        if (points.includes(index)) return
        const [x, y] = setCoordinates(index)
        const [fna, fnl] = findBasin(x, y)
        points = [...points, ...fna]
        lens.push(fnl)
        console.log("Progress:", index / 100, "%")
    })
    const product = lens
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a * b)
    console.log("Product of 3 biggest basins:", product)
}

solve9b()
// -> Product of 3 biggest basins: 987840
