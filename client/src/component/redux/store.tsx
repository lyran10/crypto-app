import { configureStore } from "@reduxjs/toolkit";
import { stateValues } from "./reducer";

export const store = configureStore({
  reducer: {
    currencyData: stateValues.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
