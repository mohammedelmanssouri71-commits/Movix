import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "../slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer
  },
})

