import { createSlice } from "@reduxjs/toolkit";

export const drumSlice = createSlice({
    name: 'drums',
    initialState: [
        {button: "Q", name: "Heater 1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", clicks: 0},
        {button: "W", name: "Heater 2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", clicks: 0},
        {button: "E", name: "Heater 3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", clicks: 0},
        {button: "A", name: "Heater 4", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", clicks: 0},
        {button: "S", name: "Clap", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", clicks: 0},
        {button: "D", name: "Open-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", clicks: 0},
        {button: "Z", name: "Kick-n'-Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", clicks: 0},
        {button: "X", name: "Kick", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", clicks: 0},
        {button: "C", name: "Closed-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", clicks: 0}
    ],
    reducers: {
        play: (state, action) => {
            const drum = state.find(d=>d.button === action.payload.toUpperCase());
            if (drum) ++drum.clicks;
        }
    }
})

export const { play } = drumSlice.actions

export default drumSlice.reducer