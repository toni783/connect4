import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";

import { animationsReducer } from "redux-time";
const reducer = combineReducers({
  counter: counterReducer,
  animations: animationsReducer,
});

export function makeStore() {
  return configureStore({
    reducer,
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
