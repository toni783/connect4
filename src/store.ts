import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { boardApi } from "./features/board/BoardAPI";
import boardReducer from "./features/board/BoardSlice";

const reducer = combineReducers({
  gameBoard: boardReducer,
  [boardApi.reducerPath]: boardApi.reducer,
});

export function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      getDefaultMiddleware({ serializableCheck: false }).concat(
        boardApi.middleware
      ),
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
