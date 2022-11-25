import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";

import styles from "../../styles/Home.module.css";
import {
  endGame,
  newGame,
  selectBoard,
  togglePlayer,
  updateMessage,
} from "./boardSlice";
import { deepCloneBoard, checkForWin, generateNewBoard } from "./BoardUtils";

import { Cell } from "./CustomCell";

export const Connect4 = () => {
  const gameState = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  console.log({ gameState });

  const play = (c, r) => {
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board);
      if (!board[r][c]) {
        board[r][c] = gameState.currentPlayer;
      }

      // Check status of board
      let result = checkForWin(board);
      if (result === gameState.player1) {
        dispatch(
          endGame({
            message: "Player1 (red) wins!",
            board,
          })
        );
      } else if (result === gameState.player2) {
        dispatch(
          endGame({
            message: "Player2 (yellow) wins!",
            board,
          })
        );
      } else if (result === "draw") {
        dispatch(
          endGame({
            message: "Draw Game!",
            board,
          })
        );
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;

        dispatch(togglePlayer({ nextPlayer, board }));
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatch(
        updateMessage({
          message: "Game Over. Please start a new game.",
        })
      );
    }
  };

  return (
    <>
      <Button
        className={styles.button}
        onClick={() => {
          dispatch(
            newGame({
              board: generateNewBoard(),
            })
          );
        }}
      >
        New Game
      </Button>
      <table>
        <tbody>
          {gameState.board.map((row, r) => (
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
