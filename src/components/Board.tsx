"use client"
import { useState, useEffect } from "react"
import BoardCell from "./BoardCell"
import type { PlayerSymbol } from "../lib"
import { AI, AiStrategy, Board as GameBoard, BoardState } from "../lib"


interface IProps {
  boardState: BoardState;
  boardSize: number;
  handleTurn: Function;
}

export default function Board(props: IProps) {
  const [boardState, setBoardState] = useState(props.boardState)

  return (
    <>
      <div className={`bg-white p-4 rounded-2xl gap-6 board aspect-square grid grid-cols-3`}>
        { boardState.map((cell, index) =>
          <BoardCell 
            className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-400 drop-shadow-lg rounded-xl"
            cell={cell} boardSize={props.boardSize} onClick={props.handleTurn} key={index} />
        )}
      </div>
      <br/>
    </>
  )
}
