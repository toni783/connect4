import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "../../store";

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
  message: "dfsdf",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const boardSlice = createSlice({
  name: "board",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newGame(state, action: any) {
      console.log({ state, action });
      // return {
      //   ...initialState,
      //   board: action.payload.board,
      // };

      state.board = action.payload.board;
    },
    togglePlayer(state, action: any) {
      console.log({ state, action });

      // return {
      //   ...state,
      //   currentPlayer: action.payload.nextPlayer,
      //   board: action.payload.board,
      // };
      state.currentPlayer = action.payload.nextPlayer;
      state.board = action.payload.board;
    },
    endGame(state, action: any) {
      console.log({ state, action });
      // return {
      //   ...state,
      //   gameOver: true,
      //   message: action.payload.message,
      //   board: action.payload.board,
      // };
      state.gameOver = true;
      state.message = action.payload.message;
      state.board = action.payload.board;
    },
    updateMessage(state, action: any) {
      console.log({ state, action });
      // return {
      //   ...state,
      //   message: action.payload.message,
      // };
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

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default boardSlice.reducer;
