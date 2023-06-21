import { useState } from "react"
import type { PlayerSymbol } from "../lib"

interface IProps {
  tile: PlayerSymbol;
  boardSize: number;
  className?: string;
}

export default function BoardCell(props: IProps) {
  const [tile, setCellData] = useState(props.tile)
  const [boardSize, setBoardSize] = useState(props.boardSize)

  return (
      <div className={`${props.className} flex justify-center items-center text-7xl p-6`}>
        <div>{tile.value}</div>
      </div>
  )
}
