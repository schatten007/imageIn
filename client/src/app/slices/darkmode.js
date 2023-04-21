import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem("darkmode")) || false;

export const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
        toggleDarkmode: (state) => {
            localStorage.setItem("darkmode", !state);
            return state = !state;
        }
    }
})

export const { toggleDarkmode } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;