
import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import  dateSlice  from "./slice/dateSlice";


const store=configureStore({
   reducer:{
     userReducer:userAuthSlice,
     dateReducer:dateSlice
   }
})

export default store