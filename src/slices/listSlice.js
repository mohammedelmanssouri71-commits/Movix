import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "list",
    initialState : {
        value: []
    },
    reducers : {
        addNewList : (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export const {addNewList} = listSlice.actions;
export default listSlice.reducer;