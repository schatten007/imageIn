import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getUserProfile } from "../services/user.service";


export const populate = createAsyncThunk("user/populate", async (undefined, thunkAPI) => {
    try{
        const response = await getUserProfile();
        const { user } = response.data;
        thunkAPI.dispatch(setMessage(response.data.message));
        return user;
    } catch(error){
        console.log(error)
        const message = (error.response && error.response.data && error.response.data.message) || 
                        error.message ||
                        error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(populate.fulfilled, (state, action) => {
            return state = action.payload;
        })
        .addCase(populate.pending, (state, action) => {
            return null;
        })
        .addCase(populate.rejected, (state, action) => {
            return null;
        })
    }
})

export default userSlice.reducer;