const { input } = require("./input.js")

let res = 0

for (let i = 0; i < input.length; i++) {
    if (i === 0) continue
    if (input[i] > input[i - 1]) res++
}

console.log("Result: ", res)
