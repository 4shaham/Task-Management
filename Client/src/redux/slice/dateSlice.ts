import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    date:new Date(),  
};

export const dateSlice = createSlice({

    name: "dateSlice",
    initialState,

    reducers: {
        setDateOf(state, action) {
            state.date = action.payload;
        },
        increment(state) {
            const currentDate = new Date(state.date); 
            currentDate.setDate(currentDate.getDate() + 1); 
            state.date = currentDate; 
        },
        dicrement(state) {
            const currentDate = new Date(state.date); 
            currentDate.setDate(currentDate.getDate() - 1); 
            state.date = currentDate; 
        },


    },

});

export const {setDateOf,increment,dicrement}=dateSlice.actions;  
export default dateSlice.reducer;
