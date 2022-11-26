import { Alert, Button, Col, Container, Row } from "react-bootstrap";
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

  const play = (c, r) => {
    let board = deepCloneBoard(gameState.board);
    if (!board[r][c]) {
      board[r][c] = gameState.currentPlayer;

      // Check status of board
      let result = checkForWin(board);
      if (result === gameState.player1) {
        dispatch(
          endGame({
            messageBody: "Player1 (red) wins!",
            messageVariant: "danger",
            board,
          })
        );
      } else if (result === gameState.player2) {
        dispatch(
          endGame({
            messageBody: "Player2 (yellow) wins!",
            messageVariant: "warning",
            board,
          })
        );
      } else if (result === "draw") {
        dispatch(
          endGame({
            messageBody: "Draw Game!",
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
    } else {
      dispatch(
        updateMessage({
          messageBody: "Please Select Another Cell",
        })
      );
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col className={`d-flex justify-content-center mx-auto m-5 `}>
            <table
              className={
                gameState.isBoardDisabled ? styles["board-disabled"] : ""
              }
            >
              <tbody>
                {gameState.board.map((row, r) => (
                  <tr key={r}>
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
          </Col>
        </Row>

        <Row className={`m-2`}>
          {gameState.message.messageBody ? (
            <Alert variant={gameState.message.messageVariant}>
              {gameState.message.messageBody}
            </Alert>
          ) : null}
        </Row>

        <Row className={`m-2`}>
          {gameState.isBoardDisabled ? (
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
              {gameState.gameOver ? "Start New Game" : "Play"}
            </Button>
          ) : null}
        </Row>
      </Container>
    </>
  );
};
