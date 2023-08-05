import Image from 'next/image'
import Board from '../components/Board'
import Game from '../components/Game'
import { PlayerSymbol, Board as GameBoard } from '../lib'

export default function Home() {
  const boardSize = 3
  let boardState: Array<PlayerSymbol> = new Array(boardSize ** 2).fill({value: ""})
  boardState[1] = {value: "X"}
  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center">
      <Game
        boardState={boardState}
        player1Name={'Player 1'}
        player2Name={'Player 2'}
        player1Symbol={{value: "X"}}
        player2Symbol={{value: "O"}}
      />
    </main>
  )
}
