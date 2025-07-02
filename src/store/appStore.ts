import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;