import { configureStore } from "@reduxjs/toolkit";
import contentsReducer from "./components/watchlist/addContent/contentsSlice";
import { contentApi } from "./contentApi";

export const store = configureStore({
  reducer: {
    [contentApi.reducerPath]: contentApi.reducer,
    contents: contentsReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(contentApi.middleware),
});
