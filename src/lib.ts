export interface PlayerSymbol {
  value: "X" | "O" | ""
}

export class Board {
  cells: Array<PlayerSymbol>;
  size: number;

  constructor(cells: Array<PlayerSymbol>, size: number) {
    this.cells = cells;
    this.size = size;
  }
}

type PlayStrategy = (board: Board, player: Player) => Board

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
  public static random: PlayStrategy = (board: Board, player: Player): Board => {
    let available_cells = board.cells.filter((x) => x.value === "")

    // Return original board state if the board is already full
    if (available_cells.length === 0) { return board }

    // Update one of the available cells at random with the player's symbol
    let max = available_cells.length - 1;
    available_cells[Math.floor(Math.random() * max)].value = player.symbol.value

    return board
  }

  public static minimax: PlayStrategy = (board: Board): Board => { return board }
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

  constructor(board: Board, player1: IPlayer, player2: IPlayer, turn: boolean = true) {
    this.board = board;
    this.turn = turn;
    this.player1 = player1;
    this.player2 = player2;
  }
}

