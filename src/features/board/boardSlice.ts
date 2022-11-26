import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../../store";

enum Players {
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}
export interface BoardState {
  player1: Players.PLAYER_1;
  player2: Players.PLAYER_2;
  currentPlayer: Players;
  board: number[][];
  gameOver: boolean;
  message: {
    messageBody: string;
    messageVariant: "primary" | "success" | "danger" | "warning";
  };
  isBoardDisabled: boolean;
}

const initialState: BoardState = {
  player1: Players.PLAYER_1,
  player2: Players.PLAYER_2,
  currentPlayer: Players.PLAYER_1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: { messageBody: "Welcome to Connect4", messageVariant: "primary" },
  isBoardDisabled: true,
};

function getPlayerTurnMessage(playerType: Players): BoardState["message"] {
  const message: BoardState["message"] = {
    messageVariant: "danger",
    messageBody: "Player1 (red) turn",
  };
  if (playerType === Players.PLAYER_2) {
    message.messageVariant = "warning";
    message.messageBody = "Player2 (yellow) turn";
  }

  return message;
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newGame(
      state,
      action: PayloadAction<{
        board: BoardState["board"];
      }>
    ) {
      state.board = action.payload.board;
      state.isBoardDisabled = false;
      state.gameOver = false;
      state.message = getPlayerTurnMessage(state.currentPlayer);
    },
    togglePlayer(
      state,
      action: PayloadAction<{
        board: BoardState["board"];
        nextPlayer: BoardState["currentPlayer"];
      }>
    ) {
      state.currentPlayer = action.payload.nextPlayer;
      state.board = action.payload.board;
      state.message = getPlayerTurnMessage(action.payload.nextPlayer);
    },
    endGame(
      state,
      action: PayloadAction<{
        messageBody: BoardState["message"]["messageBody"];
        board: BoardState["board"];
        messageVariant?: BoardState["message"]["messageVariant"];
      }>
    ) {
      state.gameOver = true;
      state.isBoardDisabled = true;
      state.message = {
        ...state.message,
        messageBody: action.payload.messageBody,
        messageVariant: action.payload.messageVariant,
      };
      state.board = action.payload.board;
    },
    updateMessage(
      state,
      action: PayloadAction<{
        messageBody: BoardState["message"]["messageBody"];
        messageVariant?: BoardState["message"]["messageVariant"];
      }>
    ) {
      state.message = {
        messageBody: action.payload.messageBody,
        messageVariant: action.payload.messageVariant
          ? action.payload.messageVariant
          : "primary",
      };
    },
  },
});

export const { newGame, endGame, updateMessage, togglePlayer } =
  boardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.board.value)`
export const selectBoard = (state: AppState) => state.board;

export default boardSlice.reducer;
