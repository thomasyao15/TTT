
const gameBoard = (function() {
    const _gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    const _winningCombinations = "";

    function fillCell(playerSign, cellIndex) {
        const cellIsAvailable = _gameBoardArray[cellIndex] == "";

        if (cellIsAvailable) {
            _gameBoardArray[cellIndex] = playerSign;
            displayController.fillCell(playerSign, cellIndex);
            console.log(_gameBoardArray);
        } else {
            console.log("Cell is already filled");
        }

    }

    return {
        fillCell,
    };
})();

const displayController = (function() {
    function fillCell(playerSign, cellIndex) {
        targetCell = document.getElementById(`${cellIndex}`);
        targetCell.textContent = playerSign;
    }

    return {
        fillCell,
    };
})();

const gameController = (function() {
    let _playerTurn = "X";

    function resetGame() {
        console.log("Resetting game");
    }

    function fillCell(e) {
        const cellIndex = parseInt(e.target.id);
        gameBoard.fillCell(_playerTurn, cellIndex);

        _playerTurn = (_playerTurn == "X") ? "O" : "X";
    }

    return {
        resetGame,
        fillCell,
    };
})();


function init() {
    const resetButton = document.getElementById("reset");
    const gameCells = document.querySelectorAll(".cell");

    resetButton.addEventListener("click", gameController.resetGame);
    gameCells.forEach(cell => {
        cell.addEventListener("click", gameController.fillCell, {once: true});
    });
}


init();
