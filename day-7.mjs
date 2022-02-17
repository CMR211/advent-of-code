// import { input } from "./inputs/day-7-input.mjs";

const test = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

Array.prototype.quickSort = () => quickSort(this)

function quickSort(array) {
    if (array.length < 2) return array;
    const pivot = array.pop();
    const left = array.filter(item => item < pivot);
    const right = array.filter(item => item >= pivot);
    // console.log("Left:", left, "| Pivot:", pivot, "| Right:", right);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(test.quickSort())
