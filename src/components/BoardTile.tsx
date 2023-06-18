import { useState } from "react"

interface Props {
  boardSize: number;
}

export default function BoardTile(props: Props) {
  return (
    <div className="text-white text-4xl text-center align-middle bg-slate-700 border-4 border-neutral-400 h-100">
      X
    </div>
  )
}
