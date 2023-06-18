import Image from 'next/image'
import Board from '../components/Board'
import { Tile } from '../components/BoardTile'

export default function Home() {
  const boardSize = 3

  let tiles: Array<Tile> = new Array(boardSize ** 2).fill( {value: "X" } )
  return (
    <main className="flex h-screen flex-col">
      <Board boardSize={boardSize} tiles={tiles} />
    </main>
  )
}
