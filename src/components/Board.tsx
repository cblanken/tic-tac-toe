"use client"
import { useState, useEffect } from "react"
import BoardCell from "./BoardCell"
import type { PlayerSymbol } from "../lib"
import { AI, AiStrategy, Board as GameBoard } from "../lib"


interface IProps {
  gameBoard: GameBoard;
}

export default function Board(props: IProps) {
  const [gameBoard, setGameBoard] = useState(props.gameBoard)
  //const [playerTurn, setTurn] = useState(false)

  const ai = new AI("Hal", 0, {value: "X"}, AiStrategy.random);

  async function handleTurn() {
    setGameBoard({...ai.strategy(gameBoard, ai)})
  }

  return (
    <>
      <button onClick={handleTurn}>Random</button>
      <div className={`bg-white p-14 rounded-2xl gap-6 board aspect-square grid grid-cols-3`}>
        { gameBoard.cells.map((cell, index) =>
          <BoardCell 
            className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-300 drop-shadow-lg rounded-xl"
            cell={cell} boardSize={gameBoard.size} key={index} />
        )}
      </div>
      <br/>
    </>
  )
}
