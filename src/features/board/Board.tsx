//1
import { useReducer } from "react";
import { Button } from "react-bootstrap";

import styles from "../../styles/Home.module.css";
import { deepCloneBoard, checkForWin, generateNewBoard } from "./BoardUtils";

import { Cell } from "./CustomRow";

//2
const gameReducer = (state, action) => {
  switch (action.type) {
    case "newGame":
      return {
        ...initialGameState,
        board: action.board,
      };
    case "togglePlayer":
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      };
    case "endGame":
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      };
    case "updateMessage":
      return {
        ...state,
        message: action.message,
      };
    default:
      throw Error(`Action "${action.type}" is not a valid action.`);
  }
};

//3
const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: "dfsdf",
};

export const Connect4 = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  );

  //4
  // triggered when a user clicks a cell
  const play = (c, r) => {
    console.log(c);
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board);
      //check if cell is taken by starting at the bottom row and working up
      if (!board[r][c]) {
        board[r][c] = gameState.currentPlayer;
      }

      // Check status of board
      let result = checkForWin(board);
      if (result === gameState.player1) {
        dispatchGameState({
          type: "endGame",
          message: "Player1 (red) wins!",
          board,
        });
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: "endGame",
          message: "Player2 (yellow) wins!",
          board,
        });
      } else if (result === "draw") {
        dispatchGameState({
          type: "endGame",
          message: "Draw Game!",
          board,
        });
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;

        dispatchGameState({ type: "togglePlayer", nextPlayer, board });
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatchGameState({
        type: "updateMessage",
        message: "Game Over. Please start a new game.",
      });
    }
  };

  return (
    <>
      <Button
        //   colorScheme="purple"
        className={styles.button}
        onClick={() => {
          dispatchGameState({ type: "newGame", board: generateNewBoard() });
        }}
      >
        New Game
      </Button>
      //5
      <table>
        <tbody>
          {gameState.board.map((row, r) => (
            //6
            <tr>
              {row.map((cell, c) => (
                <Cell
                  key={c}
                  value={cell}
                  columnIndex={c}
                  play={() => play(c, r)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="lead">{gameState.message}</h2>
    </>
  );
};
