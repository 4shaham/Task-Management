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
        increment(state,action) {
            const currentDate = new Date(state.date);
            if(action.payload=="day"){
                currentDate.setDate(currentDate.getDate() + 1); 
                state.date = currentDate;  
            }else{
                currentDate.setDate(currentDate.getDate() + 7); 
                state.date = currentDate;  
            }
            
        },
        dicrement(state,action) {
            const currentDate = new Date(state.date); 
            if(action.payload=="day"){
                currentDate.setDate(currentDate.getDate() - 1); 
                state.date = currentDate;  
            }else{
                currentDate.setDate(currentDate.getDate() - 7); 
                state.date = currentDate;  
            }
        },


    },

});

export const {setDateOf,increment,dicrement}=dateSlice.actions;  
export default dateSlice.reducer;
