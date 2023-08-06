export interface PlayerSymbol {
  value: "X" | "O" | ""
}

export type BoardState = Array<PlayerSymbol>;

export class Board {
  boardState: BoardState;
  size: number;

  constructor(boardState: BoardState, size: number) {
    this.boardState = boardState;
    this.size = size;
  }

  updateStateByIndex(index: number, symbol: PlayerSymbol) {
    if (index > 0 && index < this.boardState.length) {
      this.boardState[index] = symbol
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
    let available_cells = boardState.filter((x) => x.value === "")

    // Return original board state if the board is already full
    if (available_cells.length === 0) { return boardState }

    // Update one of the available cells at random with the player's symbol
    let max = available_cells.length - 1;
    available_cells[Math.floor(Math.random() * max)].value = player.symbol.value

    console.table(boardState)
    return boardState
  }

  public static minimax: PlayStrategy = (boardState: BoardState): BoardState => { return boardState }
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
  currentPlayer: IPlayer;

  constructor(board: Board, player1: IPlayer, player2: IPlayer, turn: boolean = true) {
    this.board = board;
    this.turn = turn;
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer  = this.player1;
  }

  nextTurn() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
  }
}

