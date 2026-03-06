import { createSlice } from "@reduxjs/toolkit";



const alertSlice = createSlice({
    name: "alert",
    initialState: {
        "type" : "",
        "message" : "",
        "visible": false
    },
    reducers: {
        show: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.visible = true;
        },
        hide: (state, action) => {
            state.type = "";
            state.message = "";
            state.visible = false;
        }
    }
})

export const {show, hide} = alertSlice.actions;

export default alertSlice.reducer;