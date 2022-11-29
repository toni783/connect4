import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { boardApi } from "./features/board/BoardAPI";
import boardReducer from "./features/board/boardSlice";

import counterReducer from "./features/counter/counterSlice";

const reducer = combineReducers({
  counter: counterReducer,
  board: boardReducer,
  [boardApi.reducerPath]: boardApi.reducer,
});

export function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(boardApi.middleware),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
