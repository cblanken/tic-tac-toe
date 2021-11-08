const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);

const Player = (name, teamSymbol) => {
    let score = 0;
    const getName = () => name;
    const getTeamSymbol = () => teamSymbol;
    const getScore = () => score;
    const incrementScore = () => { 
        score++;
    }
    const play = (x, y, gameBoard) => {
        if (gameBoard.getCell(x, y) === "") {
            gameBoard.setCell(x, y, teamSymbol)
            gameBoard.updateCellDisplay(x, y, teamSymbol);
            gameBoard.nextTurn();
            if (gameBoard.checkForWinner()) {
                console.log(`GAME OVER Player ${name} WINS!`);
            }
        } else {
            console.log(`This cell is already taken. Choose another.`);
        }
    };

    return {getName, getTeamSymbol, getScore, incrementScore, play}
}

const gameBoard = (() => {
    'use strict';
    const xMax = 3;
    const yMax = 3;
    let playerTurn = true; // first player's turn
    let board = new Array(yMax).fill().map(() => Array(xMax).fill(""));
    let winningPattern = [];
    const getCell = (x, y) => {
        if (x < xMax && y < yMax) {
            return board[x][y];
        }
    }
    const getTurn = () => { return playerTurn };
    const nextTurn = () => { playerTurn = !playerTurn };
    const setCell = (x, y, value) => {
        if (x < xMax && y < yMax && typeof(value) === "string") {
            board[x][y] = value;
        } else {
            console.log(`Invalid cell value: cannot set cell ${x},${y} to ${value}`);
        }
    };

    const updateCellDisplay = (x, y, value) => {
        let cell = $(`#board tr[data-row="${x}"] td[data-col="${y}"]`);
        cell.textContent = value;
    };
        
    const eraseCell = (x, y) => {
        if (x < xMax && y < yMax) {
                board[x][y] = "";
        }
    };

    const checkForWinner = () => {
        let isWinner = false;
        
        // Check rows
        board.forEach((row, index) => {
            // Skip row if winning state already found or
            // any row starting with an empty cell
            let firstCell = row[0];
            if (firstCell === "" || isWinner) return;

            // Winner if every cell in pattern matches
            isWinner = row.every(cell => cell === firstCell);
        });
        
        // Check columns
        for (let col = 0; col < board[0].length; col++) {
            // Skip column if it starts with an empty cell
            const firstCell = board[0][col];
            if (firstCell === "") continue;
            
            for (let row = 1; row < board.length; row++) {
                const cell = board[row][col];     
                if (cell !== firstCell) {
                    break; // move on to next column
                } else if (row === board.length - 1) {
                    isWinner = true;
                }
            }
        }
    
        // Check diagonals
        if (board.length === board[0].length) {
            const topLeft = board[0][0];
            const topRight = board[0][board.length - 1];
            // Top-left to bottom-right diagonal
            for (let row = 0; row < board.length; row++) {
                let col = row;
                // Skip column if it starts with an empty cell
                if (topLeft === "") break;

                if (board[row][col] !== topLeft) {
                    break; // move on to next diagonal
                } else if (row === board.length - 1) {
                    isWinner = true;
                }
            }
            
            // Top-right to bottom-left diagonal
            for (let row = 0; row < board.length; row++) {
                let col = board.length - row - 1;
                // Skip column if it starts with an empty cell
                if (topRight === "") break;

                if (board[row][col] !== topRight) {
                    break;
                } else if (row === board.length - 1) {
                    isWinner = true;
                }
            }
        } else {
            console.log("Board is not square. No diagonals to check.");
        }

        if (isWinner) {
            return true;
        } else {
            return false; // No winner yet
        }
    }

    return {board, getTurn, nextTurn, getCell, setCell, updateCellDisplay, eraseCell,
        checkForWinner};
})();

// Game State and Events
const player1 = Player("one", "X");
const player2 = Player("two", "O");
const players = [player1, player2];

const displayCells = $$("#board .ttt-cell");
displayCells.forEach(cell => {
  cell.addEventListener("click", (event) => {
    if (gameBoard.getTurn()) {
      player1.play(cell.parentElement.dataset.row, cell.dataset.col, gameBoard);
    } else {
      player2.play(cell.parentElement.dataset.row, cell.dataset.col, gameBoard);
    }
  });
});

