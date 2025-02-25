import { configureStore } from "@reduxjs/toolkit";
import buttonsReducer from "./features/buttonSlice";

const store = configureStore({
  reducer: {
    buttons: buttonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
