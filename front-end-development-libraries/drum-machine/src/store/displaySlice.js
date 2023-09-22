import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
    name: 'display',
    initialState: {
        text: ""
    },
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    }
})

export const { setText } = displaySlice.actions

export default displaySlice.reducer