"use client"
import { useState, useEffect } from "react"
import Board from "./Board"
import {
  AI,
  AiStrategy,
  Board as GameBoard,
  BoardState,
  Player,
  PlayerSymbol,
  TicTacToe,
} from "../lib"

interface IProps {
  boardState: BoardState;
  player1Name?: string;
  player2Name?: string;
  player1Symbol?: PlayerSymbol;
  player2Symbol?: PlayerSymbol;
}

export default function Game(props: IProps) {
  const [boardState, setBoardState] = useState(props.boardState)
  const [player1Name, setPlayer1Name] = useState(props.player1Name)
  const [player1Symbol, setPlayer1Symbol] = useState(props.player1Symbol)
  const [player2Name, setPlayer2Name] = useState(props.player2Name)
  const [player2Symbol, setPlayer2Symbol] = useState(props.player2Symbol)

  const boardSize = 3
  let player1: Player, player2: Player;
  if (player1Name === undefined ||
      player2Name === undefined ||
      player1Symbol === undefined ||
      player2Symbol === undefined) {
    console.log("Missing player names or symbols. Creating default game...")
    player1 = new Player("Dave", 0, {value: "X"});
    player2 = new AI("Hal", 0, {value: "O"}, AiStrategy.random);
  } else {
    player1 = new Player(player1Name, 0, player1Symbol)
    player2 = new Player(player2Name, 0, player2Symbol)
  }

  let gameBoard = new GameBoard(boardState, boardSize)
  let ttt = new TicTacToe(gameBoard, player1, player2)

  let cells: Array<PlayerSymbol> = new Array(boardSize ** 2).fill(0).map( (): PlayerSymbol => ({value: ""}) )
  cells[0] = {value: 'X'}
  let board = new GameBoard(cells, boardSize)


  async function handlePlayerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    let value = e.currentTarget.getAttribute("data-value")
    console.log(value, typeof(value))
    if (value === "") {
      e.currentTarget.setAttribute("data-value", ttt.currentPlayer.symbol.value)
    }
  }

  return (
    <section className="flex flex-col gap-4 text-center text-black">
      <h1 className="font-bold text-4xl">Tic-Tac-Toe</h1>
      <h2 className="flex justify-between">
        <div>{player1.name}</div>
        <div>{player2.name}</div>
      </h2>
      <Board boardState={board.boardState} boardSize={boardSize} handleTurn={handlePlayerClick} />
    </section>
  )
}
