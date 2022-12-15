import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";

import styles from "../../styles/Home.module.css";
import {
  useGetGamesQuery,
  useCreateGameMutation,
  useDeleteGameMutation,
  useUpdateGameMutation,
} from "../../services/BoardAPI";

import {
  endGame,
  getPlayerTurnMessage,
  selectBoard,
  setSelectedBoard,
  updateMessage,
} from "./BoardSlice";
import { deepCloneBoard, checkForWin, generateNewBoard } from "./BoardUtils";

import { Cell } from "./components/CustomCell";
import CustomModal from "./components/CustomModal";
import { Players } from "./BoardTypes";
import { randomNumber } from "utils/common";

export const Connect4 = () => {
  const gameState = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();

  const { data: games, isLoading: isLoadingGames } = useGetGamesQuery();

  const [createGame] = useCreateGameMutation();

  const [deleteGame] = useDeleteGameMutation();

  const [updateGame] = useUpdateGameMutation();

  const [displayModal, setDisplayModal] = useState(false);

  const onError = useCallback(() => {
    dispatch(
      updateMessage({
        messageBody: "Unexpected error! Please try again!",
      })
    );
  }, [dispatch]);

  const onStartNewGame = async (isBotGame?: boolean) => {
    try {
      const result = await createGame({
        gameBoard: generateNewBoard(),
        alertMessage: getPlayerTurnMessage(gameState.currentPlayer),
        isGameOver: false,
        isGameDisabled: false,
        ...(isBotGame && { player2: Players.BOT }),
      }).unwrap();
      dispatch(
        setSelectedBoard({
          gameBoard: result,
        })
      );
    } catch (e) {
      onError();
    }
  };

  const play = useCallback(
    async (c, r) => {
      const gameBoard = deepCloneBoard(gameState.gameBoard);
      if (!gameBoard[r][c]) {
        gameBoard[r][c] = gameState.currentPlayer;

        // Check status of board
        const checkW = checkForWin(gameBoard);
        if (checkW === gameState.player1) {
          try {
            await deleteGame(gameState.id).unwrap();
            dispatch(
              endGame({
                messageBody: "Player1 (red) wins!",
                messageVariant: "danger",
                gameBoard,
              })
            );
          } catch (e) {
            onError();
          }
        } else if (checkW === gameState.player2) {
          try {
            await deleteGame(gameState.id).unwrap();

            dispatch(
              endGame({
                messageBody: "Player2 (yellow) wins!",
                messageVariant: "warning",
                gameBoard,
              })
            );
          } catch (e) {
            onError();
          }
        } else if (checkW === "draw") {
          try {
            await deleteGame(gameState.id).unwrap();
            dispatch(
              endGame({
                messageBody: "Draw Game!",
                gameBoard,
              })
            );
          } catch (e) {
            onError();
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
              isGameDisabled: nextPlayer === Players.BOT,
            }).unwrap();
            dispatch(
              setSelectedBoard({
                gameBoard: result,
              })
            );
          } catch (e) {
            onError();
          }
        }
      } else {
        dispatch(
          updateMessage({
            messageBody: "Please Select Another Cell",
          })
        );
      }
    },
    [deleteGame, dispatch, gameState, onError, updateGame]
  );

  const BOTPlay = useCallback(
    (gameBoard) => {
      const availableMoves: number[][] = [];

      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (gameBoard[r][c] === null) {
            availableMoves.push([r, c]);
          }
        }
      }
      const [r, c] = availableMoves[randomNumber(0, availableMoves.length)];

      // Simulate connection with websocket, endpoint ,etc.. adding a delay
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve(2), 2000);
      });

      promise.then(() => play(c, r));
    },
    [play]
  );

  useEffect(() => {
    if (
      gameState.player2 === Players.BOT &&
      gameState.isGameDisabled &&
      !gameState.isGameOver
    ) {
      BOTPlay(gameState.gameBoard);
    }
  }, [
    BOTPlay,
    gameState.gameBoard,
    gameState.isGameDisabled,
    gameState.player2,
  ]);

  return (
    <>
      <Container>
        <Row>
          <Col className={`d-flex justify-content-center mx-auto m-5 `}>
            <table
              aria-label={
                gameState.isGameDisabled
                  ? "Connect4 game board disabled, please start a new game or load an existing game"
                  : "Connect4 game board, enjoy your game "
              }
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
          <Col className={` mx-auto m-5 `}>
            {!gameState.isGameDisabled ? (
              <Row className={`m-2`}>
                <p>You are currently on the board: {gameState.id}</p>
              </Row>
            ) : null}{" "}
            <Row className={`m-2`}>
              {gameState.alertMessage.messageBody ? (
                <Alert variant={gameState.alertMessage.messageVariant}>
                  {gameState.alertMessage.messageBody}
                </Alert>
              ) : null}
            </Row>
            <Row className={`m-2`}>
              <Button
                className={styles.button}
                onClick={() => onStartNewGame()}
              >
                Start New Game (Locally)
              </Button>
            </Row>
            <Row className={`m-2`}>
              <Button
                className={styles.button}
                onClick={() => onStartNewGame(true)}
              >
                Start New Game Against Bot
              </Button>
            </Row>
            <Row className={`m-2`}>
              <Button
                className={styles.button}
                disabled={isLoadingGames}
                onClick={() => {
                  if (games && games.length) {
                    setDisplayModal(true);
                  }
                }}
              >
                {isLoadingGames
                  ? "Loading…"
                  : games && games.length > 0
                  ? "Load Existing Game"
                  : "No saves found"}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
      {games && games.length ? (
        <CustomModal
          games={games}
          show={displayModal}
          onHide={() => setDisplayModal(false)}
        />
      ) : null}
    </>
  );
};
