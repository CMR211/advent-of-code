import { input } from "./inputs/day-5-input.mjs";

const coordinates = parseInput(input);
const lines = filterLinesFromInput(coordinates);

function parseInput(input) {
    const text = input
        .replace(/(\d+,\d+)/gm, "[$1]") // from " 348,742 -> 620,742 " to " [348,742] -> [620,742] "
        .replace(/\s/gm, "") // removing spaces
        .replace(/(\[\d+,\d+\])->(\[\d+,\d+\])/gm, "[$1, $2],") // from " [348,742] -> [620,742] " to " [[348,742],[620,742]], "
        .slice(0, -1); // removing trailing comma
    const json = JSON.parse("[" + text + "]"); // parsing to an array
    const coordinates = json.map(item => {
        // mapping array to x1, y1, x2, y2 coordinates system
        return {
            x1: item[0][0],
            y1: item[0][1],
            x2: item[1][0],
            y2: item[1][1],
        };
    });
    return coordinates;
}

function filterLinesFromInput(input) {
    return input.filter(coordinate => {
        if (coordinate.x1 === coordinate.x2 || coordinate.y1 === coordinate.y2)
            return true;
    });
}

function createDiagram(width, height) {
    const diagram = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            diagram.push({
                x: i,
                y: j,
                z: 0,
            });
        }
    }
    return diagram;
}

// function drawLine

const diagram = createDiagram(1000, 1000);
console.log(diagram);
