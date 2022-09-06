const { input } = require("./input.js")

function getSumOfThree(index) {
    if (input.length - index < 2) return
    return input[index] + input[index + 1] + input[index + 2]
}

let res = 0
for (let i = 0; i < input.length; i++) {
    if (getSumOfThree(i + 1) > getSumOfThree(i)) res++
}

console.log("Result: ", res)
