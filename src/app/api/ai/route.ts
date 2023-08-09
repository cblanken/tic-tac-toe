import { NextResponse } from "next/server"
import {
  AI,
  AiStrategy,
  Board,
  BoardState,
  Player,
  PlayerSymbol,
  TicTacToe,
} from "@/lib"

export function GET(req: Request) {
    const url = new URL(req.url).search
    const params = new URLSearchParams(url)
    
    console.log(params)

    const board_csv = params.get("board");
    if (!board_csv) {
        return NextResponse.json({ error: "No board state provided" });
    }

    let boardState: Array<PlayerSymbol> = Array.from(board_csv.split(',')).map(x => ({ value: x }) );

    let board: Board = new Board(boardState);
    let human_player = new Player("Human", parseInt(params.get("player_score") || ""), { value: "X"});
    let ai_player = new AI("AI", parseInt(params.get("player_score") || ""), { value: "O"});
    let ttt: TicTacToe = new TicTacToe(board, human_player, ai_player, ai_player)

    ttt.ai.strategy(ttt.board.boardState, ai_player);
    
    return NextResponse.json(ttt.board)
}