import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;

export const fetchComments = createAsyncThunk("fetchComments", async () => {
    try {
        const res = await axios.get(`${JSON_API_URL}/comments`);
        const arr = [...res.data].reverse();
        return arr;
    } catch (error) {
        console.log(error)
    }
})
const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        value: [],
        loading: false
    },
    reducers: {
        addComment : (state, action) => {
            state.value.unshift(action.payload);
        },
        toggleLike: (state, action) => {
        const { commentId, userId } = action.payload;

        state.value = state.value.map(c => {
            if (c.id === commentId) {
                if (c.likes.includes(userId)){
                    return {
                        ...c,
                        likes: c.likes.filter(l => l !== userId)
                    }
                }
                return {
                    ...c,
                    likes: [...c.likes, userId]
                };
            }
            return c;
        });
        }

    },
    extraReducers (builder){
        builder.addCase(fetchComments.pending, (state, action) => {
            state.loading = true;
        }).addCase(fetchComments.fulfilled, (state, action) => {
            state.value = action.payload;
            state.loading = false;
        })
    }
})

export default commentsSlice.reducer;
export const {addComment, toggleLike} = commentsSlice.actions;