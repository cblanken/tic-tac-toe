import { NextResponse } from "next/server";
import { AI, AiStrategy, Board, Player, TicTacToe } from "@/lib";
import * as minimax from "@/minimax";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.board) {
    return NextResponse.json({ error: "No board state provided" });
  }

  let board: Board = new Board(JSON.parse(data.board));
  let human_player = new Player("Human", parseInt(data?.player1_score || ""), {
    value: "X",
  });
  let ai_player = new AI(
    "AI",
    parseInt(data?.player2_score || ""),
    { value: "O" },
    AiStrategy.MINIMAX
  );
  let ttt: TicTacToe = new TicTacToe(board, human_player, ai_player);

  let rootNode = new minimax.Node(board.boardState, []);
  let gameTree = minimax.buildGameTree(rootNode, human_player, ai_player, true);
  ttt.ai.strategy(ttt.board.boardState, ai_player, human_player, gameTree);

  return NextResponse.json({
    boardState: ttt.board.boardState,
    gameTree: gameTree,
  });
}
