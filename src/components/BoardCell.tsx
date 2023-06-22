"use client"
import { useState } from "react"
import type { PlayerSymbol } from "../lib"

interface IProps {
  cell: PlayerSymbol;
  boardSize: number;
  className?: string;
  onClick: Function;
}

export default function BoardCell(props: IProps) {
  return (
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => props.onClick(e)}
        className={`${props.className} flex justify-center items-center text-7xl p-6`}
        data-value={props.cell.value}>
        <div>{props.cell.value}</div>
      </button>
  )
}
