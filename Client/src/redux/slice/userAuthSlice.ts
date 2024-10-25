import { createSlice } from "@reduxjs/toolkit";

interface UserAuthData {
    id: string;
    role: string;
    email: string;
    userAuthStatus: boolean;
}


const initialState: { userAuthStatus: UserAuthData } = {
    userAuthStatus:{
        id: '',              
        role: '',         
        email: '',        
        userAuthStatus: false 
    }
};



export const userAuthSlice=createSlice({
    
    name:"userAuthSlice",
    initialState,

    reducers:{

        loginStatusChange:(state,action)=>{
          state.userAuthStatus=action.payload
        },
        logOutStatusChange:(state)=>{
          state.userAuthStatus.userAuthStatus=false
        }
        
    }

})

export const {loginStatusChange,logOutStatusChange}=userAuthSlice.actions  
export default userAuthSlice.reducer    
