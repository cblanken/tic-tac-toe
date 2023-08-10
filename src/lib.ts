import * as minimax from "@/minimax_ai";

export interface PlayerSymbol {
  // value: "X" | "O" | ""
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

export class Player extends IPlayer {}

export abstract class AiStrategy {
  public static random: PlayStrategy = (boardState: BoardState, player: Player): BoardState => {
    // let available_cells = boardState.filter((row => row.findIndex(cell => cell.value === "") !== -1))
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

