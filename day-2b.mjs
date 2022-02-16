import { input } from "./inputs/day-2-input.mjs";

let position = {
    horizontal: 0,
    aim: 0,
    depth: 0,
};

for (let i = 0; i < input.length; i++) {
    let direction = input[i][0];
    let value = input[i][1];

    if (direction === "forward") {
        position.horizontal += value;
        position.depth += value * position.aim;
    }

    if (direction === "down") position.aim += value;

    if (direction === "up") position.aim -= value;
}

console.log(position.horizontal * position.depth);
