import { useState } from "react"
import type { PlayerSymbol } from "../lib"

interface IProps {
  cell: PlayerSymbol;
  boardSize: number;
  className?: string;
}

export default function BoardCell(props: IProps) {
  return (
      <div className={`${props.className} flex justify-center items-center text-7xl p-6`}>
        <div>{props.cell.value}</div>
      </div>
  )
}
