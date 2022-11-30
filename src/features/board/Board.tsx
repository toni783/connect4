import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import CustomModal from "../../components/CustomModal";
import { useAppDispatch, useAppSelector } from "../../hooks";

import styles from "../../styles/Home.module.css";
import {
  useGetGamesQuery,
  useCreateGameMutation,
  useDeleteGameMutation,
  useUpdateGameMutation,
} from "./BoardAPI";

import {
  endGame,
  getPlayerTurnMessage,
  newGame,
  selectBoard,
  setSelectedBoard,
  togglePlayer,
  updateMessage,
} from "./boardSlice";
import { deepCloneBoard, checkForWin, generateNewBoard } from "./BoardUtils";

import { Cell } from "./CustomCell";

export const Connect4 = () => {
  const gameState = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();

  const { data: games, isLoading: isLoadingGames } = useGetGamesQuery();

  const [createGame, result] = useCreateGameMutation();

  const [deleteGame, result2] = useDeleteGameMutation();

  const [updateGame, result3] = useUpdateGameMutation();

  const [displayModal, setDisplayModal] = useState(false);
  console.log({ games });

  const onStartNewGame = async () => {
    try {
      const result = await createGame({
        gameBoard: generateNewBoard(),
        alertMessage: getPlayerTurnMessage(gameState.currentPlayer),
        isGameOver: false,
        isGameDisabled: false,
      }).unwrap();
      dispatch(
        setSelectedBoard({
          gameBoard: result,
        })
      );
    } catch (e) {
      //  TODO: add error message
    }
  };

  const play = async (c, r) => {
    let gameBoard = deepCloneBoard(gameState.gameBoard);
    if (!gameBoard[r][c]) {
      gameBoard[r][c] = gameState.currentPlayer;

      // Check status of board
      let result = checkForWin(gameBoard);
      if (result === gameState.player1) {
        try {
          const result = await deleteGame(gameState.id).unwrap();
          dispatch(
            endGame({
              messageBody: "Player1 (red) wins!",
              messageVariant: "danger",
              gameBoard,
            })
          );
        } catch (e) {
          //  TODO: add error message
        }
      } else if (result === gameState.player2) {
        try {
          const result = await deleteGame(gameState.id).unwrap();

          dispatch(
            endGame({
              messageBody: "Player2 (yellow) wins!",
              messageVariant: "warning",
              gameBoard,
            })
          );
        } catch (e) {
          //  TODO: add error message
        }
      } else if (result === "draw") {
        try {
          const result = await deleteGame(gameState.id).unwrap();
          dispatch(
            endGame({
              messageBody: "Draw Game!",
              gameBoard,
            })
          );
        } catch (e) {
          //  TODO: add error message
        }
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;

        try {
          const result = await updateGame({
            ...gameState,
            currentPlayer: nextPlayer,
            gameBoard,
            alertMessage: getPlayerTurnMessage(nextPlayer),
          }).unwrap();
          dispatch(
            setSelectedBoard({
              gameBoard: result,
            })
          );
        } catch (e) {
          //  TODO: add error message
        }

        // dispatch(togglePlayer({ nextPlayer, board }));
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
                gameState.isGameDisabled ? styles["board-disabled"] : ""
              }
            >
              <tbody>
                {gameState.gameBoard.map((row, r) => (
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
          {gameState.alertMessage.messageBody ? (
            <Alert variant={gameState.alertMessage.messageVariant}>
              {gameState.alertMessage.messageBody}
            </Alert>
          ) : null}
        </Row>

        <Row className={`m-2`}>
          {gameState.isGameDisabled ? (
            <Button className={styles.button} onClick={onStartNewGame}>
              Start New Game (Locally)
            </Button>
          ) : null}
        </Row>

        <Row className={`m-2`}>
          <Button
            className={styles.button}
            disabled={isLoadingGames}
            onClick={() => {
              setDisplayModal(true);
            }}
          >
            {isLoadingGames ? "Loading…" : "Load Existing Game"}
          </Button>
        </Row>
      </Container>
      {games ? (
        <CustomModal
          games={games}
          show={displayModal}
          onHide={() => setDisplayModal(false)}
        />
      ) : null}
    </>
  );
};
