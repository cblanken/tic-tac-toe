export interface PlayerSymbol {
  value: string
}

export type BoardState = Array<Array<PlayerSymbol>>;

export class Board {
  boardState: BoardState;

  constructor(boardState: BoardState) {
    this.boardState = boardState;
  }

  updateStateByIndex(row: number, col: number, symbol: PlayerSymbol) {
    try {
      this.boardState[row][col] = symbol
    } catch (err) {
      console.log(err)
    }
  }

  updateState(boardState: BoardState) {
    this.boardState = boardState;
  }
}

type PlayStrategy = (boardState: BoardState, player: Player) => BoardState

export class IPlayer {
  name: string;
  score: number;
  symbol: PlayerSymbol;

  constructor(name: string, score: number = 0, symbol: PlayerSymbol) {
    this.name = name;
    this.score = score;
    this.symbol = symbol;
  }
}

export function checkForWinner(boardState: BoardState, playerSymbol: PlayerSymbol) {
  let isWinner = false;
  // Check rows
  console.log("WINNER CHECK", boardState)
  boardState.forEach((row, index) => {
    // Skip row if winning state already found or
    // any row starting with an empty cell
    let firstCell = row[0]?.value;

    if (firstCell !== playerSymbol.value && playerSymbol.value !== undefined) return;

    // Winner if every cell in pattern matches
    isWinner = row.every(cell => cell.value === firstCell);
  });
  
  // Check columns
  for (let col = 0; col < boardState[0].length; col++) {
    // Skip column if it starts with an empty cell
    const firstCell = boardState[0][col].value;
    if (firstCell !== playerSymbol.value && playerSymbol.value !== undefined) continue;
    
    for (let row = 1; row < boardState.length; row++) {
      const cell = boardState[row][col];     
      if (cell.value !== firstCell) {
          break; // move on to next column
      } else if (row === boardState.length - 1) {
          isWinner = true;
      }
    }
  }

  // Check diagonals
  if (boardState.length === boardState[0].length) {
    const topLeft = boardState[0][0].value;
    const topRight = boardState[0][boardState.length - 1].value;
    // Top-left to bottom-right diagonal
    for (let row = 0; row < boardState.length; row++) {
      let col = row;
      // Skip column if it starts with an empty cell
      if (topLeft !== playerSymbol.value && playerSymbol.value !== undefined) break;

      if (boardState[row][col].value !== topLeft) {
          break; // move on to next diagonal
      } else if (row === boardState.length - 1) {
          isWinner = true;
      }
    }
      
    // Top-right to bottom-left diagonal
    for (let row = 0; row < boardState.length; row++) {
      let col = boardState.length - row - 1;
      // Skip column if it starts with an empty cell
      if (topRight !== playerSymbol.value && playerSymbol.value !== undefined) break;

      if (boardState[row][col].value !== topRight) {
          break;
      } else if (row === boardState.length - 1) {
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

export function checkForTie(boardState: BoardState) {
  let emptyCells = boardState.flat().filter(cell => cell.value === "");

  return (emptyCells.length === 0
    && checkForWinner(boardState, { value: "X" }) === false
    && checkForWinner(boardState, { value: "O" }) === false)
}


export class Player extends IPlayer {}

export abstract class AiStrategy {
  public static random: PlayStrategy = (boardState: BoardState, player: Player): BoardState => {
    let available_cells = boardState.flat().filter((cell => cell.value === ""))

    // Return original board state if the board is already full
    if (available_cells.length === 0) { return boardState }

    // Update one of the available cells at random with the player's symbol
    let max = available_cells.length;
    available_cells[Math.floor(Math.random() * available_cells.length)].value = player.symbol.value

    console.table(boardState)
    return boardState
  }

  public static minimax: PlayStrategy = (boardState: BoardState, player: Player): BoardState => { 
    return boardState
  }
}

export class AI extends IPlayer {
  strategy: PlayStrategy;

  constructor(name: string, score: number, symbol: PlayerSymbol, strategy: PlayStrategy = AiStrategy.random) {
    super(name, score, symbol);
    this.strategy = strategy;
  }
}


export class TicTacToe {
  board: Board;
  turn: boolean;
  player1: IPlayer;
  player2: IPlayer;
  ai: AI;
  currentPlayer: IPlayer;
  winner: IPlayer | null;

  constructor(board: Board, player1: IPlayer, player2: IPlayer, ai: AI, turn: boolean = true) {
    this.board = board;
    this.turn = turn;
    this.player1 = player1;
    this.player2 = player2;
    this.ai = ai;
    this.currentPlayer = this.player1;
    this.winner = null;
  }
}

