const { draws, boards } = require("./input")
import { sumOfUnmarkedTiles, updateSingleBoard, isWinner } from "./day-4a.mjs"

const [losingBoard, losingMove] = updateAllBoardsUntilLose(boards)
const losingScore = sumOfUnmarkedTiles(losingBoard) * losingMove
console.log("Last to win board's score: ", losingScore)

function updateAllBoardsUntilLose(arrs, draw = 0) {
    arrs.forEach((arr) => updateSingleBoard(draws[draw], arr))
    if (arrs.length < 2 && isWinner(arrs[0])) {
        return [arrs[0], draws[draw]]
    }
    const losingBoards = arrs.filter((arr) => !isWinner(arr))
    return updateAllBoardsUntilLose(losingBoards, draw + 1)
}
