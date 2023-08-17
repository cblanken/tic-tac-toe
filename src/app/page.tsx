import React from "react";
import Game from "@/components/Game";
import { PlayerSymbol } from "@/lib";
import { Toaster } from "react-hot-toast";
import MinimaxTree, { TreeProps } from "@/components/MinimaxTree";

export default function Home() {
  const boardSize = 3;
  let boardState: Array<Array<PlayerSymbol>> = new Array(boardSize).fill(
    Array(boardSize).fill({ value: "" })
  );

  return (
    <main className="bg-white h-screen flex flex-row justify-center items-center gap-x-16">
      <section className="">
        <Toaster position="bottom-left" reverseOrder={false} />
        <Game
          boardState={boardState}
          player1Name={"Player 1"}
          player2Name={"Player 2"}
          player1Symbol={{ value: "X" }}
          player2Symbol={{ value: "O" }}
        />
      </section>
      <section className="text-blue bg-black rounded-lg">
        <MinimaxTree width={800} height={800} />
      </section>
    </main>
  );
}
