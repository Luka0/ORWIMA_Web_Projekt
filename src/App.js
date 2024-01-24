import { useEffect, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import "./App.css"
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom'

export default function App() {
  let { user } = useParams()
  const [game, setGame] = useState(new Chess());
  const navigate = useNavigate();

  function makeAMove(move) {
    const newGame = { ...game };
    const result = newGame.move(move);
    setGame(newGame);
    return result; // returns null for illegal moves
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0){
      navigate(`/game/${user}/${true}`);
      return; // exit if the game is over
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <div className="main-container">
      <h2 style={{ color: 'white' }}>CPU</h2>
      <Chessboard 
        position={game.fen()}
        onPieceDrop={onDrop}
        customDarkSquareStyle={{backgroundColor:"#7D7D7D"}}
      />
      <h2 style={{ color: 'white' }}>{user}</h2>
    </div>
  );
}