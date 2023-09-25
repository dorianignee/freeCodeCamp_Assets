import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
    name: 'display',
    initialState: {
        text: "WELCOME",
        power: true
    },
    reducers: {
        setText: (state, action) =>  {state.text = action.payload},
        setPower: (state, action) => {
            state.power = action.payload
            if (!action.payload) 
                state.text = "";
            else
                state.text = "WELCOME";
        }
    }
})

export const { setText, setPower } = displaySlice.actions

export default displaySlice.reducer