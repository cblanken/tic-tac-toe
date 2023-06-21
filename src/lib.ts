export interface PlayerSymbol {
  value: "X" | "O" | ""
}

export class Board {
  cells: Array<PlayerSymbol>;
  size: number;

  constructor(cells: Array<PlayerSymbol>, size: number = 3) {
    this.cells = cells;
    this.size = size;
  }
}

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

export class AI extends IPlayer {
  get_next_play_random(board: Board): Board {
    // TODO: implement random selection
    return board
  }

  get_next_play_minimax(board: Board): Board {
    // TODO: implement minimax algo
    return board
  }
}

export class TicTacToe {
  board: Board;
  turn: boolean;
  player1: IPlayer;
  player2: IPlayer;

  constructor(board: Board, player1: IPlayer, player2: IPlayer, turn: boolean = true) {
    this.board = board;
    this.turn = turn;
    this.player1 = player1;
    this.player2 = player2;
  }
}

