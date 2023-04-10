import { createSlice } from '@reduxjs/toolkit'


export const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState: {
        value: localStorage.getItem('ImageIn Darkmode')
    },
    reducers: {
        toggle: (state) => {
            const booleanValue = (state.value==='true') ? true : false;
            state.value = !booleanValue;
        }
    }
})

export const { toggle } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;