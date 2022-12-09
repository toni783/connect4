import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";
import { boardApi } from "services/BoardAPI";
import boardReducer from "./features/board/BoardSlice";

const reducer = combineReducers({
  gameBoard: boardReducer,
  [boardApi.reducerPath]: boardApi.reducer,
});

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      getDefaultMiddleware({ serializableCheck: false }).concat(
        boardApi.middleware
      ),
    preloadedState,
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

export type RootState = ReturnType<typeof reducer>;

export type AppStore = ReturnType<typeof makeStore>;

export default store;
