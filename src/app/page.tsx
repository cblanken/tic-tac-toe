import Image from 'next/image'
import Board from '../components/Board'
import Game from '../components/Game'
import { PlayerSymbol, Board as GameBoard } from '../lib'

export default function Home() {
  const boardSize = 3
  let cells: Array<PlayerSymbol> = new Array(boardSize ** 2).fill(0).map( (): PlayerSymbol => ({value: ""}) )
  let board = new GameBoard(cells, boardSize)
  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center">
      <Game
        boardState={board.boardState}
        player1Name={'Player 1'}
        player2Name={'Player 2'}
        player1Symbol={{value: "X"}}
        player2Symbol={{value: "O"}}
      />
    </main>
  )
}
