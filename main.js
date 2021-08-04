
const gameBoard = (function () {
    let _gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    const _winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];

    function _isWinningCombination(playerSign) {
        // Grab all cells currently filled by the player to check if board contains winning combo
        let playerFilledCells = Array.from(document.querySelectorAll(".cell"));
        playerFilledCells = playerFilledCells.filter(cell => cell.textContent == playerSign);
        playerFilledCells = playerFilledCells.map(cell => parseInt(cell.id));

        const playerWon = _winningCombinations.some(combination => {
            return combination.every(winningCell => {
                return playerFilledCells.includes(winningCell);
            })
        })

        return playerWon;
    }

    function _isDraw() {
        const boardIsFull = _gameBoardArray.every(cell => cell != "");
        const xDidNotWin = !_isWinningCombination("X");
        const oDidNotWin = !_isWinningCombination("O");
        return (boardIsFull && xDidNotWin && oDidNotWin);
    }

    function fillCell(playerSign, cellIndex) {
        _gameBoardArray[cellIndex] = playerSign;
        if (_isWinningCombination(playerSign)) {
            displayController.showFinishPage(`${playerSign} won!`);
        } else if (_isDraw()) {
            displayController.showFinishPage("It's a draw!");
        }
    }

    function resetBoard() {
        _gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    }

    function cellIsAvailable(cellIndex) {
        return _gameBoardArray[cellIndex] == "";
    }

    return {
        fillCell,
        cellIsAvailable,
        resetBoard,
    };
})();


const displayController = (function () {
    function fillCell(playerSign, cellIndex) {
        targetCell = document.getElementById(`${cellIndex}`);
        targetCell.textContent = playerSign;
    }

    function showFinishPage(finishMessage) {
        const finishMessageHeader = document.getElementById("finish-message");
        finishMessageHeader.textContent = finishMessage;

        const finishModal = document.getElementById("finish-page");
        finishModal.style.display = "flex";
    }

    function resetBoard() {
        const gameCells = document.querySelectorAll(".cell");
        gameCells.forEach(cell => cell.textContent = "");

        const finishModal = document.getElementById("finish-page");
        finishModal.style.display = "none";
    }

    return {
        fillCell,
        showFinishPage,
        resetBoard,
    };
})();


const gameController = (function () {
    let _playerTurn = "X";

    function resetGame() {
        displayController.resetBoard();
        gameBoard.resetBoard();
    }

    function fillCell(e) {
        const cellIndex = parseInt(e.target.id);

        if (gameBoard.cellIsAvailable(cellIndex)) {
            displayController.fillCell(_playerTurn, cellIndex);
            gameBoard.fillCell(_playerTurn, cellIndex);
            _playerTurn = (_playerTurn == "X") ? "O" : "X";
        } else {
            console.log("Cell is already filled");
        }
    }

    return {
        resetGame,
        fillCell,
    };
})();


function init() {
    const resetButton = document.getElementById("reset");
    const replayButton = document.getElementById("replay");
    const gameCells = document.querySelectorAll(".cell");

    resetButton.addEventListener("click", gameController.resetGame);
    replayButton.addEventListener("click", gameController.resetGame);
    gameCells.forEach(cell => {
        cell.addEventListener("click", gameController.fillCell);
    });
}


init();
