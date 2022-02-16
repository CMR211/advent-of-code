import { input } from "./inputs/day-5-input.mjs";

const lines = filterLinesFromInput(parseInput(input));
const diagonals = filterDiagonalsFromInput(parseInput(input));

const diagramA = createDiagram(1000, 1000);
const diagramB = createDiagram(1000, 1000);

solve5a(diagramA);
// -> Number of cells with 2+ lines: 4826

solve5b(diagramB);
// -> Number of cells with 2+ lines: 16793

function solve5b(diagram) {
    lines.forEach(line => drawLine(line, diagram));
    diagonals.forEach(diagonal => drawDiagonal(diagonal, diagram));
    console.log("Number of cells with 2+ lines:", findCells(diagram));
}

function solve5a(diagram) {
    lines.forEach(line => drawLine(line, diagram));
    console.log("Number of cells with 2+ lines:", findCells(diagram));
}

function drawDiagonal(diagonal, diagram) {
    const { x1, y1, x2, y2 } = diagonal;
    const steps = Math.abs(x2 - x1);
    const sign_x = Math.sign(x2 - x1),
        sign_y = Math.sign(y2 - y1);
    const points = [];
    for (let i = 0; i <= steps; i++) {
        points.push([x1 + i * sign_x, y1 + i * sign_y]);
    }
    points.forEach(point => {
        diagram[point[0] + point[1] * 1000][2] += 1;
    });
}

function drawLine(line, diagram) {
    const [xmin, xmax, ymin, ymax] = getCoordinates(line);
    diagram = diagram.map(cell => {
        if (
            cell[0] >= xmin &&
            cell[0] <= xmax &&
            cell[1] >= ymin &&
            cell[1] <= ymax
        )
            cell[2] = cell[2] + 1;
    });
}

function getCoordinates(line) {
    const { x1, y1, x2, y2 } = line;
    const xmin = Math.min(x1, x2),
        xmax = Math.max(x1, x2),
        ymin = Math.min(y1, y2),
        ymax = Math.max(y1, y2);
    return [xmin, xmax, ymin, ymax];
}

function findCells(diagram) {
    const filteredDiagram = diagram.filter(cell => cell[2] > 1);
    return filteredDiagram.length;
}

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

function filterDiagonalsFromInput(input) {
    return input.filter(coordinate => {
        if (coordinate.x1 !== coordinate.x2 && coordinate.y1 !== coordinate.y2)
            return true;
    });
}

function createDiagram(width, height) {
    const diagram = new Array();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) diagram.push([x, y, 0]);
    }
    return diagram;
}
