import Image from 'next/image'
import Board from '../components/Board'
import { PlayerSymbol, Board as GameBoard } from '../lib'

export default function Home() {
  const boardSize = 3
  let cells: Array<PlayerSymbol> = new Array(boardSize ** 2).fill(0).map( (): PlayerSymbol => ({value: ""}) )
  let board = new GameBoard(cells, boardSize)
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <Board boardState={board.cells} boardSize={boardSize} />
    </main>
  )
}
