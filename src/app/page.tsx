import Image from 'next/image'
import Board from '../components/Board'

export default function Home() {
  const boardSize = 3
  return (
    <main className="flex min-h-screen flex-col">
      <Board boardSize={boardSize}/>
    </main>
  )
}
