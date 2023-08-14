"use client"
import BoardCell from "./BoardCell"
import { BoardState } from "@/lib"


interface IProps {
  boardState: BoardState;
  boardSize: number;
  handleTurn: Function;
}


export default function Board(props: IProps) {
  return (
    <>
      <div className={`bg-white p-4 rounded-2xl gap-6 board aspect-square grid grid-cols-3`}>
        { props.boardState.map(((row, r) => (
            row.map(((cell, c) => (
              <BoardCell 
                key={`${r},${c}`} row={r} col={c}
                className="h-32 font-extrabold text-white overflow-hidden aspect-square bg-indigo-400 drop-shadow-lg rounded-xl"
                cell={cell} boardSize={props.boardSize} onClick={props.handleTurn} />
            )
          ))
        )))}
      </div>
      <br/>
    </>
  )
}
