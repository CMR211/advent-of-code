const { input } = require("./input")

let gamma = []
let epsilon = []
const sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

for (i = 0; i < input.length; i++) {
    let item = input[i]
    for (j = 0; j < item.length; j++) {
        sum[j] += parseInt(item[j])
    }
}
console.log("sum", sum)

sum.forEach((item, index) => {
    if (item < 500) {
        gamma.push(0)
        epsilon.push(1)
    } else {
        gamma.push(1)
        epsilon.push(0)
    }
})
console.log("gamma", gamma)
console.log("epsilon", epsilon)

gamma = parseInt(gamma.join(""), 2)
epsilon = parseInt(epsilon.join(""), 2)

console.log(epsilon * gamma)
