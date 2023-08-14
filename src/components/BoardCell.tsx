"use client";
import type { PlayerSymbol } from "@/lib";

interface IProps {
  boardSize: number;
  cell: PlayerSymbol;
  className?: string;
  row: number;
  col: number;
  onClick: Function;
}

export default function BoardCell(props: IProps) {
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => props.onClick(e)}
      className={`${props.className} flex justify-center items-center text-7xl p-6`}
      data-row={props.row}
      data-col={props.col}
      data-value={props.cell.value}
    >
      <div>{props.cell.value}</div>
    </button>
  );
}
