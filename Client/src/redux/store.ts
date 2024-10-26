
import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slice/userAuthSlice";
import  dateSlice  from "./slice/dateSlice";
import viewSlice  from "./slice/viewSlice";


const store=configureStore({
   reducer:{
     userReducer:userAuthSlice,
     dateReducer:dateSlice,
     viewReduxer:viewSlice
   }
})

export default store