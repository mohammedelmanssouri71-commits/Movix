import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
        state.value.push(action.payload);
    },
    deleteFavorite: (state, action) => {
        state.value = state.value.filter(f => f.typeId !== action.payload.favId);
    },
    initializeFav: (state, action) => {
        state.value = action.payload
    }
  },
})


export const { addFavorite, deleteFavorite, initializeFav} = favoritesSlice.actions

export default favoritesSlice.reducer