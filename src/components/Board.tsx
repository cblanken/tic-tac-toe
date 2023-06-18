import { useState } from "react"
import BoardTile from '../components/BoardTile'

type Props = {
  boardSize: number;
}

export default function Board(props: Props) {
  let tiles = new Array<>;
  return (
    <div>
      <BoardTile boardSize={props.boardSize} />
    </div>
  )
}
