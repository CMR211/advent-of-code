import { data } from "./inputs/day-7-input.mjs"

// solve7b(data)
// -> Optimal Position: 497 | Fuel Consumption: 100727924

// solve7a(data)
// -> Optimal Position: 346 | Fuel Consumption: 359648

function solve7b(input) {
    const max = Math.max(...input)
    const consumptions = []
    for (let target = 0; target <= max; target++) {
        const fuel = input
            .map(n => specialFuelConsumption(n, target))
            .reduce((a, b) => a + b)
        consumptions.push(fuel)
    }
    const minConsumptions = Math.min(...consumptions)
    const optPos = consumptions.indexOf(minConsumptions)
    console.log(
        "Optimal Position:",
        optPos,
        "| Fuel Consumption:",
        minConsumptions
    )
}

function specialFuelConsumption(pos, target) {
    const dist = Math.abs(pos - target)
    return (dist ** 2 + dist) / 2
}

function solve7a(input) {
    const optimalPosition = customMedian(input)
    const fuelConsumption = flatFuelConsumption(input, optimalPosition)
    console.log(
        "Optimal Position:",
        optimalPosition,
        "| Fuel Consumption:",
        fuelConsumption
    )
    return fuelConsumption
}

function flatFuelConsumption(input, target) {
    const array = [...input]
    return array.map(i => Math.abs(i - target)).reduce((a, b) => a + b)
}

function customMedian(input) {
    const array = [...input]
    const sorted = quickSort(array)
    if (sorted.length % 2 === 0) {
        return sorted[sorted.length / 2 - 1]
    } else {
        return sorted[Math.floor(sorted.length / 2)]
    }
}

function quickSort(input) {
    const array = [...input]
    if (array.length < 2) return array
    const pivot = array.pop()
    const left = array.filter(item => item < pivot)
    const right = array.filter(item => item >= pivot)
    // console.log("Left:", left, "| Pivot:", pivot, "| Right:", right);
    return [...quickSort(left), pivot, ...quickSort(right)]
}
