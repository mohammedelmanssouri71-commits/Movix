import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;

export const fetchFav = createAsyncThunk("fetchFavorites", async () => {
    try {
        const res = await axios.get(`${JSON_API_URL}/favorites`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
})
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    value : [],
    loading : false
  },
  reducers: {
    addFavorite: (state, action) => {
        state.value.push(action.payload);
    },
    deleteFavorite: (state, action) => {
        state.value = state.value.filter(f => f.id !== action.payload.favId);
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchFav.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchFav.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log(action.payload);
    })
  }
})


export const { addFavorite, deleteFavorite, initializeFav} = favoritesSlice.actions

export default favoritesSlice.reducer