import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isEnter: false
  };


// slice
export const geoSlice = createSlice({
    name: 'geo',
    initialState,
    reducers: {
        geoEnter: (state) => {
            state.isEnter =true
        },
        geoNotEnter: (state) => {
            state.isEnter =false
        },
    },
    extraReducers: (builder) => { }
});

export const { geoEnter,geoNotEnter } = geoSlice.actions
export default geoSlice.reducer;