
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:"day"  
};

export const viewSlice = createSlice({

    name: "viewSlice",
    initialState,

    reducers: {
        setView(state, action) {
            state.status = action.payload;
        },
    },

});

export const {setView}=viewSlice.actions;  
export default viewSlice.reducer;
