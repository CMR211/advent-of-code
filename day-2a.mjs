import { input } from "./inputs/day-2-input.mjs";

let position = {
    horizontal: 0,
    depth: 0,
};

for (let i = 0; i < input.length; i++) {
    if (input[i][0] === "forward") position.horizontal += input[i][1];
    if (input[i][0] === "down") position.depth += input[i][1];
    if (input[i][0] === "up") position.depth -= input[i][1];
}

console.log(position.horizontal * position.depth);
