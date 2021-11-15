import * as minimax from "./minimax_ai.js";

const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);

function checkForWinner(board, playerSymbol) {
    let isWinner = false;
    // Check rows
    board.forEach((row, index) => {
        // Skip row if winning state already found or
        // any row starting with an empty cell
        let firstCell = row[0];

        if (firstCell !== playerSymbol && playerSymbol !== undefined) return;

        // Winner if every cell in pattern matches
        isWinner = row.every(cell => cell === firstCell);
    });
    
    // Check columns
    for (let col = 0; col < board[0].length; col++) {
        // Skip column if it starts with an empty cell
        const firstCell = board[0][col];
        if (firstCell !== playerSymbol && playerSymbol !== undefined) continue;
        
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
            if (topLeft !== playerSymbol && playerSymbol !== undefined) break;

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
            if (topRight !== playerSymbol && playerSymbol !== undefined) break;

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
};

function checkForTie(board) {
    let emptyCells = [];
    board.forEach((row) => {
        emptyCells = emptyCells.concat(row.filter(cell => cell === ""));
    });

    return (emptyCells.length === 0 && checkForWinner(board) === false);
}

const Player = (name, teamSymbol, isHuman = true) => {
    let score = 0;
    const getName = () => name;
    const setName = (x) => name = x;
    const getTeamSymbol = () => teamSymbol;
    const setTeamSymbol = (x) => teamSymbol = x;
    const getScore = () => score;
    const incrementScore = () => { 
        score++;
    }

    const play = (x, y, gameBoard) => {
        if (gameBoard.getLockStatus() === true) {
            console.log(`The gameboard is locked please start or restart the game.`);
            return;
        } 
        if (gameBoard.getCell(x, y) === "") {
            gameBoard.setCell(x, y, teamSymbol)
            gameBoard.updateCellDisplay(x, y, teamSymbol);
            if (checkForWinner(gameBoard.board, teamSymbol)) {
                incrementScore();
                banner.textContent = `The winner is ${name}!`;
                banner.hidden = false;
                gameBoard.lock();
            } else if (checkForTie(gameBoard.board, teamSymbol)) {
                const banner = $("#banner");
                banner.textContent = "It was a tie!";
                banner.hidden = false;
                gameBoard.lock();
            } else {
                gameBoard.nextTurn();
            }
        } else {
            console.log(`This cell is already taken. Choose another.`);
        }
    };

    return {getName, setName, getTeamSymbol, setTeamSymbol, getScore, isHuman, incrementScore, play}
};

// Game State and Events
const player1 = Player("Player 1", "X", true);
const player2 = Player("Player 2", "O", false);

const player1ScoreElement = $("#player1-score");
const player2ScoreElement = $("#player2-score");

// Setup player 1 controls
const player1Symbol = $("#player1-symbol");
player1Symbol.textContent = player1.getTeamSymbol();
const player1SymbolInput = $("#sidebar input[name='player1-symbol']");
const player1StatsSymbol = $("#player1-symbol");
const player1SymbolBtn = $("#player1-container input[name='player1-symbol'] + button");
player1SymbolBtn.addEventListener("click", (event) => {
    if (player1SymbolInput.value == "") return;
    player1.setTeamSymbol(player1SymbolInput.value);
    player1Symbol.textContent = player1SymbolInput.value;
    player1SymbolInput.value = "";
});
const player1NameInput = $("#sidebar input[name='player1-name']");
const player1StatsName = $("#player1-name");
const player1NameBtn = $("#player1-container input[name='player1-name'] + button");
player1NameBtn.addEventListener("click", (event) => {
    player1StatsName.textContent = player1NameInput.value;
    player1.setName(player1NameInput.value);
});

const player1InputType = $("#player1-container select[name='player-type']");
const player1InputTypeBtn = $("#player1-container select[name='player-type'] + button");
player1InputTypeBtn.addEventListener("click", (event) => {
    if (player1InputType.value === "Human") {
        player1.isHuman = true;
    } else {
        player1.isHuman = false;
    }
});

// Setup player 2 controls
const player2Symbol = $("#player2-symbol");
player2Symbol.textContent = player2.getTeamSymbol();
const player2SymbolInput = $("#sidebar input[name='player2-symbol']");
const player2StatsSymbol = $("#player2-symbol");
const player2SymbolBtn = $("#player2-container input[name='player2-symbol'] + button");
player2SymbolBtn.addEventListener("click", (event) => {
    if (player2SymbolInput.value == "") return;
    player2.setTeamSymbol(player2SymbolInput.value);
    player2Symbol.textContent = player2SymbolInput.value;
    player2SymbolInput.value = "";
});
const player2NameInput = $("#sidebar input[name='player2-name']");
const player2StatsName = $("#player2-name");
const player2NameBtn = $("#player2-container input[name='player2-name'] + button");
player2NameBtn.addEventListener("click", (event) => {
    player2StatsName.textContent = player2NameInput.value;
    player2.setName(player2NameInput.value);
});

const player2InputType = $("#player2-container select");
const player2InputTypeBtn = $("#player2-container select[name='player-type'] + button");
player2InputTypeBtn.addEventListener("click", (event) => {
    if (player2InputType.value === "Human") {
        player2.isHuman = true;
    } else {
        player2.isHuman = false;
    }
});

// Other controls
const newGameBtn = $("#new-game-button");
newGameBtn.addEventListener("click", (event) => {
    gameBoard.newGame(player1, player2);
});
const resetBtn = $("#reset-button");
resetBtn.addEventListener("click", (event) => {
    gameBoard.resetBoard();
});

// Gameboard setup
const gameBoard = (() => {
    'use strict';
    const EMPTY = "";
    const maxRow = 3;
    const maxCol = 3;
    let playerTurn = true; // first player's turn
    const getTurn = () => { return playerTurn };
    let board = new Array(maxCol).fill().map(() => Array(maxRow).fill(""));
    let isLocked = true;
    let statusBarElement = $("#board-status-bar");
    let lockStatusElement = $("#board-lock-status");
    let readyStatusElement = $("#board-ready-status");
    const getCell = (x, y) => {
        if (x < maxRow && y < maxCol) {
            return board[x][y];
        }
    };
    const isCellEmpty = (row, col) => {
        return board[row][col] === EMPTY;
    };
    const aiTurn = () => {
        // Performs a turn for the AI if enabled
        if (playerTurn && !player1.isHuman) {
            let rootNode = minimax.Node(gameBoard.board, []); 
            rootNode = minimax.buildGameTree(rootNode, player2, player1, true);
            let bestMove = minimax.findBestMove(rootNode, player2, player1);
            
            if (bestMove) {
                player1.play(bestMove[0], bestMove[1], gameBoard);
                player1ScoreElement.textContent = player1.getScore().toString();
            }
        } else if (!playerTurn && !player2.isHuman) {
            let rootNode = minimax.Node(gameBoard.board, []); 
            rootNode = minimax.buildGameTree(rootNode, player1, player2, true);
            let bestMove = minimax.findBestMove(rootNode, player1, player2);
            
            if (bestMove) {
                player2.play(bestMove[0], bestMove[1], gameBoard);
                player2ScoreElement.textContent = player2.getScore().toString();
            }
        }
    }
    const nextTurn = () => { 
        playerTurn = !playerTurn 
        aiTurn(); 
    };
    const setCell = (x, y, value) => {
        if (x < maxRow && y < maxCol && typeof(value) === "string") {
            board[x][y] = value;
        } else {
            console.log(`Invalid cell value: cannot set cell ${x},${y} to ${value}`);
        }
    };

    const unlock = () => {
        if (isLocked) {
            statusBarElement.classList.toggle("status-ready");
            lockStatusElement.textContent = "🔓";
            readyStatusElement.textContent = "READY!";
        }
        isLocked = false;
    }

    const lock = () => {
        if (!isLocked) {
            statusBarElement.classList.toggle("status-ready");
            lockStatusElement.textContent = "🔒";
            readyStatusElement.textContent ="LOCKED";
        }
        isLocked = true;     
    }

    const getLockStatus = () => {
        return isLocked;
    }

    const updateCellDisplay = (x, y, value) => {
        if (isLocked === false) {
            let cell = $(`#board tr[data-row="${x}"] td[data-col="${y}"]`);
            cell.textContent = value;
        }
    };
        
    const eraseCell = (x, y) => {
        if (x < maxRow && y < maxCol && isLocked === false) {
            board[x][y] = "";
            updateCellDisplay(x, y);
        }
    };

    const resetBoard = () => {
        unlock();
        board.forEach((row, yIndex) => {
            row.forEach((col, xIndex) => {
                eraseCell(yIndex, xIndex);
            });
        });
        lock();
        $("#banner").hidden = true;
        playerTurn = true;
    };

    const newGame = (player1, player2) => {
        resetBoard();
        unlock();
        aiTurn();
    };

    const addBoardEvents = (player1, player2) => {
        const displayCells = $$("#board .ttt-cell");
        displayCells.forEach(cell => {
            cell.addEventListener("click", (event) => {
                let row = Number(cell.parentElement.dataset.row);
                let col = Number(cell.dataset.col);
                if (gameBoard.getTurn() && player1.isHuman) {
                    // Player 1 turn
                    player1.play(row, col, gameBoard);
                    player1ScoreElement.textContent = player1.getScore().toString();
                } else if (!gameBoard.getTurn() && player2.isHuman) {
                    // Player 2 turn
                    player2.play(row, col, gameBoard);
                    player2ScoreElement.textContent = player2.getScore().toString();
                }
            });
        });
    };

    const clearBoardEvents = () => {
        const displayCells = $$("#board .ttt-cell");
        displayCells.forEach(cell => {
            cell.click = null;
        });
    };

    return { board, lock, unlock, resetBoard, newGame, getTurn, getLockStatus, nextTurn, getCell, isCellEmpty, setCell, updateCellDisplay, eraseCell, addBoardEvents, clearBoardEvents };
})();

gameBoard.addBoardEvents(player1, player2);

export { checkForWinner, checkForTie };
