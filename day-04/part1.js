const { draws, boards } = require("./input")
module.exports = { sumOfUnmarkedTiles, updateSingleBoard, isWinner }

findWinndingBoard()

function findWinndingBoard() {
    const [winningBoard, winningMove] = updateAllBoardsUntilWin()
    const winningScore = sumOfUnmarkedTiles(winningBoard) * winningMove
    console.log("Winning board's score: ", winningScore)
}

function sumOfUnmarkedTiles(board) {
    return sumArr(board.filter((tile) => tile !== -1))
}

function updateAllBoardsUntilWin(draw = 0) {
    boards.forEach((board) => updateSingleBoard(draws[draw], board))
    if (boards.some((board) => isWinner(board))) {
        return [boards.find((board) => isWinner(board)), draws[draw]]
    }
    return updateAllBoardsUntilWin(draw + 1)
}

function updateSingleBoard(draw, board) {
    board.forEach((tile, index) => {
        if (tile === draw) board[index] = -1
    })
}

function isWinner(board) {
    let win = false
    for (let i = 0; i < 5; i++) {
        if (rowSum(board, i) === -5 || colSum(board, i) === -5) win = true
    }
    return win
}

function rowSum(board, row) {
    // row from 0 to 4
    const indexes = [row * 5, row * 5 + 1, row * 5 + 2, row * 5 + 3, row * 5 + 4]
    return sumArr(board.filter((item, index) => indexes.includes(index)))
}

function colSum(board, col) {
    // col from 0 to 4
    const indexes = [col, col + 5, col + 10, col + 15, col + 20]
    return sumArr(board.filter((item, index) => indexes.includes(index)))
}

function sumArr(arr) {
    return arr.reduce((tot, cur) => {
        return tot + cur
    })
}

// 31, -1, 46, 11, 30,
// 2, -1, 40, 69, 33,
// 82, -1, 37, 99, 86,
// 57, -1, 34, 94, 85,
// 60, -1, 28, 14, 65,
