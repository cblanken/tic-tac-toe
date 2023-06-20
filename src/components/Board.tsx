"use client"
import { useState } from "react"
import BoardTile, { Tile } from '../components/BoardTile'


interface IProps {
  boardSize: number;
  tiles: Tile[];
}

export default function Board(props: IProps) {
  const [boardSize, setSize] = useState(props.boardSize)
  const [tiles, setTiles] = useState(props.tiles)
  const [playerTurn, setTurn] = useState(false)

  return (
    <div className={`bg-white p-14 rounded-2xl gap-6 board aspect-square grid grid-cols-${boardSize}`}>
      { tiles.map((tile, index) =>
        <BoardTile 
          className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-300 drop-shadow-lg rounded-xl"
          tile={tile} boardSize={boardSize} key={index} />
      )}
    </div>
  )
}
