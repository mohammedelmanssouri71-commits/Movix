import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "../slices/favoriteSlice";
import listReducer from "../slices/listSlice";
import alertReducer from "../slices/alertSlice";
import commentsReducer from "../slices/commentsSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    lists: listReducer,
    alert: alertReducer,
    comments: commentsReducer
  },
})

