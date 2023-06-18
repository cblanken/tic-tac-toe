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
    <div className={`board grid grid-cols-${boardSize} m-12 aspect-square border border-black`}>
      { tiles.map((tile, index) =>
        <BoardTile tile={tile} boardSize={boardSize} key={index} />
      )}
    </div>
  )
}
