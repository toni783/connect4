import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../../store";
import { BoardState, Players } from "./BoardTypes";

const initialState: BoardState = {
  /**Initial state with an id out of bounds  */
  id: -1,
  player1: Players.PLAYER_1,
  player2: Players.PLAYER_2,
  currentPlayer: Players.PLAYER_1,
  gameBoard: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  isGameOver: false,
  alertMessage: {
    messageBody: "Welcome to Connect4, Please start a new game to enable the board!",
    messageVariant: "primary",
  },
  isGameDisabled: true,
  updatedTime: new Date(),
  createdTime: new Date(),
};

export function getPlayerTurnMessage(
  playerType: Players
): BoardState["alertMessage"] {
  const message: BoardState["alertMessage"] = {
    messageVariant: "danger",
    messageBody: "Player1 (red) turn",
  };
  if (playerType === Players.PLAYER_2) {
    message.messageVariant = "warning";
    message.messageBody = "Player2 (yellow) turn";
  }

  return message;
}

export const gameBoardSlice = createSlice({
  name: "gameBoard",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newGame(
      state,
      action: PayloadAction<{
        gameBoard: BoardState["gameBoard"];
      }>
    ) {
      state.gameBoard = action.payload.gameBoard;
      state.isGameDisabled = false;
      state.isGameOver = false;
      state.alertMessage = getPlayerTurnMessage(state.currentPlayer);
    },
    togglePlayer(
      state,
      action: PayloadAction<{
        gameBoard: BoardState["gameBoard"];
        nextPlayer: BoardState["currentPlayer"];
      }>
    ) {
      state.currentPlayer = action.payload.nextPlayer;
      state.gameBoard = action.payload.gameBoard;
      state.alertMessage = getPlayerTurnMessage(action.payload.nextPlayer);
    },
    endGame(
      state,
      action: PayloadAction<{
        messageBody: BoardState["alertMessage"]["messageBody"];
        gameBoard: BoardState["gameBoard"];
        messageVariant?: BoardState["alertMessage"]["messageVariant"];
      }>
    ) {
      state.isGameOver = true;
      state.isGameDisabled = true;
      state.alertMessage = {
        ...state.alertMessage,
        messageBody: action.payload.messageBody,
        messageVariant: action.payload.messageVariant,
      };
      state.gameBoard = action.payload.gameBoard;
    },
    updateMessage(
      state,
      action: PayloadAction<{
        messageBody: BoardState["alertMessage"]["messageBody"];
        messageVariant?: BoardState["alertMessage"]["messageVariant"];
      }>
    ) {
      state.alertMessage = {
        messageBody: action.payload.messageBody,
        messageVariant: action.payload.messageVariant
          ? action.payload.messageVariant
          : "primary",
      };
    },
    setSelectedBoard(
      state,
      action: PayloadAction<{
        gameBoard: BoardState;
      }>
    ) {
      state = action.payload.gameBoard;
      return state;
    },
  },
});

export const {
  newGame,
  endGame,
  updateMessage,
  togglePlayer,
  setSelectedBoard,
} = gameBoardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.gameBoard.value)`
export const selectBoard = (state: AppState) => state.gameBoard;

export default gameBoardSlice.reducer;
