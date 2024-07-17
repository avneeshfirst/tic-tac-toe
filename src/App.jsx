import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import {WINNING_COMBINATIONS} from './winning-combinations.js'

const initGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function DerivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
      if(gameTurns.length>0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }

  return currentPlayer;
}

function App() {
  const [gameTurns,setGameTurns] = useState([]);

  const activePlayer = DerivedActivePlayer(gameTurns);
  let gameBoard = initGameBoard;
  let winner;
    
  for(const turn of gameTurns){
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard [row] [col] = player;
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymb = gameBoard[combination[0].row][combination[0].col]
    const SecondSquareSymb =gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymb =gameBoard[combination[2].row][combination[2].col]

    if(firstSquareSymb && firstSquareSymb===SecondSquareSymb && firstSquareSymb === thirdSquareSymb)
    {
        winner=firstSquareSymb;
    }
  }

  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns(prevTurn=>{
      let playingPlayer = DerivedActivePlayer(prevTurn);

      const updatedTurn = [{square:{ row: rowIndex,col: colIndex},player: playingPlayer},...prevTurn]
    
      return updatedTurn;
    });

      ;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer=='X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer=='O'}/>
        </ol>
        {winner && <GameOver winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard}/>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App;
