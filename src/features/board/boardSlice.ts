import { createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../store";

export interface BoardState {
  player1: number;
  player2: number;
  currentPlayer: number;
  board: number[][];
  gameOver: boolean;
  message: string;
}

const initialState: BoardState = {
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
  message: "Welcome to Connect4",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newGame(state, action: any) {
      state.board = action.payload.board;
    },
    togglePlayer(state, action: any) {
      state.currentPlayer = action.payload.nextPlayer;
      state.board = action.payload.board;
    },
    endGame(state, action: any) {
      state.gameOver = true;
      state.message = action.payload.message;
      state.board = action.payload.board;
    },
    updateMessage(state, action: any) {
      state.message = action.payload.message;
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
