"use client"
import { useState, useEffect } from "react"
import BoardCell from "./BoardCell"
import type { PlayerSymbol } from "../lib"
import { AI, AiStrategy, Board as GameBoard, BoardState } from "../lib"


interface IProps {
  boardState: BoardState;
  boardSize: number;
}

export default function Board(props: IProps) {
  const [boardState, setBoardState] = useState(props.boardState)
  //const [playerTurn, setTurn] = useState(false)

  const ai = new AI("Hal", 0, {value: "X"}, AiStrategy.random);

  async function handleTurn() {
    setBoardState(Array.from(ai.strategy(boardState, ai)))
  }

  return (
    <>
      <h1>{ai.name}</h1>
      <button className="p-2 m-3 bg-blue-300 rounded-md" onClick={handleTurn}>Random</button>
      <div className={`bg-white p-14 rounded-2xl gap-6 board aspect-square grid grid-cols-3`}>
        { boardState.map((cell, index) =>
          <BoardCell 
            className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-300 drop-shadow-lg rounded-xl"
            cell={cell} boardSize={props.boardSize} key={index} />
        )}
      </div>
      <br/>
    </>
  )
}
