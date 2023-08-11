"use client"
import { useState, useEffect } from "react"
import Board from "./Board"
import toast from "react-hot-toast";
import {
  AI,
  AiStrategy,
  Board as GameBoard,
  BoardState,
  Player,
  PlayerSymbol,
  TicTacToe,
  checkForTie,
  checkForWinner,
} from "@/lib"

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


  let player: Player, ai: AI;
  if (player1Name === undefined ||
      player2Name === undefined ||
      player1Symbol === undefined ||
      player2Symbol === undefined) {
    console.log("Missing player names or symbols. Creating default game...")
    toast("Missing player names or symbols. Creating default game...")
    player = new Player("Dave", 0, {value: "X"});
    ai = new AI("Hal", 0, {value: "O"}, AiStrategy.random);
  } else {
    player = new Player(player1Name, 0, player1Symbol)
    ai = new AI(player2Name, 0, player2Symbol)
  }

  const boardSize = 3
  const gameBoard = new GameBoard(boardState)
  const [game, setGame] = useState(
    new TicTacToe(gameBoard, player, ai, ai)
  )


  function handlePlayerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    let value = e.currentTarget.getAttribute("data-value")
    if (value !== "") {
      toast.error("Please select an empty cell")
      return false;
    }

    const row = parseInt(e.currentTarget.getAttribute("data-row") || "");
    const col = parseInt(e.currentTarget.getAttribute("data-col") || "");

    // Human player's turn
    let newBoardState = boardState.map((board_row, r) => {
      return board_row.map((board_cell, c) => {
        return r === row && c === col ? game.currentPlayer.symbol : board_cell
      })
    })

    // AI player's turn
    fetch(`/api/ai`, {
      method: "POST",
      body: JSON.stringify({
        player1_score: player.score,
        player2_score: ai.score,
        board: JSON.stringify(newBoardState),
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
      .then(newBoardState => {
        console.log("NEW BOARD STATE", newBoardState)
        setBoardState(newBoardState.boardState);
      })

    let isWinner = checkForWinner(newBoardState, {value: "X"}) || checkForWinner(boardState, {value: "O"})
    let isTie = checkForTie(newBoardState)
    if (isTie) {
      toast.error("It's a tie!");
    } else if (isWinner) {
      toast("Winner winner chicken dinner! 🍗")
    } else {
      toast.error("No winner yet! Play on!");
    }
  }

  return (
    <section className="flex flex-col gap-4 text-center text-black">
      <h1 className="font-bold text-4xl">Tic-Tac-Toe</h1>
      <h2 className="flex justify-between">
        <div>{player.name}</div>
        <div>{ai.name}</div>
      </h2>
      <Board boardState={boardState} boardSize={boardSize} handleTurn={handlePlayerClick} />
    </section>
  )
}
