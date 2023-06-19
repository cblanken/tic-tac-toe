import { useState } from "react"

export type Tile = {
  value: "X" | "O" | ""
}

interface IProps {
  tile: Tile;
  boardSize: number;
  className?: string;
}

export default function BoardTile(props: IProps) {
  const [tile, setTileData] = useState(props.tile)
  const [boardSize, setBoardSize] = useState(props.boardSize)

  return (
      <div className={`${props.className} flex justify-center items-center text-6xl p-6`}>
        <div>{tile.value}</div>
      </div>
  )
}
