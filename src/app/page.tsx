import Image from 'next/image'
import Board from '../components/Board'
import { Tile } from '../components/BoardTile'

export default function Home() {
  const boardSize = 3

  let tiles: Array<Tile> = new Array(boardSize ** 2).fill(0).map( (): Tile => ({value: "X"}) )
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <Board boardSize={boardSize} tiles={tiles} />
    </main>
  )
}
