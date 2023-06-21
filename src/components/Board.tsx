"use client"
import { useState } from "react"
import BoardCell from "./BoardCell"
import { PlayerSymbol } from "../lib"


interface IProps {
  boardSize: number;
  tiles: PlayerSymbol[];
}

export default function Board(props: IProps) {
  const [boardSize, setSize] = useState(props.boardSize)
  const [tiles, setCells] = useState(props.tiles)
  const [playerTurn, setTurn] = useState(false)

  return (
    <div className={`bg-white p-14 rounded-2xl gap-6 board aspect-square grid grid-cols-3`}>
      { tiles.map((tile, index) =>
        <BoardCell 
          className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-300 drop-shadow-lg rounded-xl"
          tile={tile} boardSize={boardSize} key={index} />
      )}
    </div>
  )
}
