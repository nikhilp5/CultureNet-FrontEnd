import { createSlice } from "@reduxjs/toolkit";

const contentsSlice = createSlice({
  name: "contents",
  initialState: {
    watchedContents: [],
    watchListContents: [],
  },
  reducers: {
    addContentToWatchlist(state, action) {
      state.watchListContents.push(action.payload);
    },
    addContentToWatched(state, action) {
      state.watchListContents = state.watchListContents.filter(
        (content) => content.id !== action.payload.id
      );
      state.watchedContents.push(action.payload);
    },
    removeContentFromWatchlist(state, action) {
      state.watchListContents = state.watchListContents.filter(
        (content) => content.id !== action.payload
      );
    },
    moveContentToWatchlistFromWatched(state, action) {
      state.watchedContents = state.watchedContents.filter(
        (content) => content.id !== action.payload.id
      );
      state.watchListContents.push(action.payload);
    },
    removeContentFromWatched(state, action) {
      state.watchedContents = state.watchedContents.filter(
        (content) => content.id !== action.payload
      );
    },
  },
});

export const selectAllWatchlistContent = (state) =>
  state.contents.watchListContents;

export const selectAllWatchedContent = (state) =>
  state.contents.watchedContents;

export const {
  addContentToWatchlist,
  addContentToWatched,
  removeContentFromWatchlist,
  moveContentToWatchlistFromWatched,
  removeContentFromWatched,
} = contentsSlice.actions;

export default contentsSlice.reducer;
