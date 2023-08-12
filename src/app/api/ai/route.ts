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

export async function POST(req: Request) {
    const data = await req.json();

    if (!data.board) {
        return NextResponse.json({ error: "No board state provided" });
    }

    let board: Board = new Board(JSON.parse(data.board));
    let human_player = new Player("Human", parseInt(data?.player1_score || ""), { value: "X"});
    let ai_player = new AI("AI", parseInt(data?.player2_score || ""), { value: "O"}, AiStrategy.MINIMAX);
    let ttt: TicTacToe = new TicTacToe(board, human_player, ai_player, ai_player)

    ttt.ai.strategy(ttt.board.boardState, ai_player, human_player);
    
    return NextResponse.json(ttt.board)
}