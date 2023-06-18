import { useState } from "react"

export type Tile = {
  value: "X" | "O" | ""
}

interface IProps {
  tile: Tile;
  boardSize: number;
}

export default function BoardTile(props: IProps) {
  const [tile, setTileData] = useState(props.tile)
  const [boardSize, setBoardSize] = useState(props.boardSize)

  return (
    <div className={`flex justify-center items-center border border-black text-4xl text-center align-middle`}>
      <div className="">{tile.value}</div>
    </div>
  )
}
