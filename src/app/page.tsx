import Image from 'next/image'
import Game from '@/components/Game'
import { PlayerSymbol, Board as GameBoard } from '../lib'
import { Toaster } from "react-hot-toast";

export default function Home() {
  const boardSize = 3
  let boardState: Array<Array<PlayerSymbol>> = new Array(boardSize)
    .fill(Array(boardSize)
    .fill({value: ""}))
  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center">
      <Toaster 
        position="bottom-left"
        reverseOrder={false}
      />
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
