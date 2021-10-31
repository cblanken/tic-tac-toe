const $ = (x) => document.querySelector(x);

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
	let board = new Array(xMax).fill().map(() => Array(yMax).fill(""));
	const getCell = (x, y) => {
		if (x < xMax && y < yMax) {
			return board[x][y];
		}
	}
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

	return {board, getCell, setCell, updateCellDisplay, eraseCell};
})();

const player1 = Player("one", "X");
const player2 = Player("two", "O");

// Game Loop
player1.play(1, 1, gameBoard);
player2.play(2, 2, gameBoard);

player1.play(2, 1, gameBoard);
player2.play(0, 1, gameBoard);

