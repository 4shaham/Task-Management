import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loginStatusChange, logOutStatusChange } from "../../redux/slice/userAuthSlice";
import { tokenVerification } from "../../api/user";

function LoginAndRegistration() {
  
  const [isloading,setIsloading]=useState<Boolean>(true)
  const [userStatus,setUserStatus]=useState<Boolean>(false) 
  const dispatch=useDispatch()

  useEffect(()=>{

      const handleFn=async()=>{
          try {
            await tokenVerification()
            setUserStatus(true)
            dispatch(loginStatusChange())

          } catch (error) {

            dispatch(logOutStatusChange())

          }finally{
            setIsloading(false)
          }
      }
      handleFn()

  },[])


  if(isloading){
    return <div>...loading</div>
  }
  
  return (
    <>
      <div className="h-screen flex items-center justify-center ">
        <div className="w-full sm:w-1/2 lg:w-1/2 p-8 shadow-lg rounded-lg bg-gray-100">
          {userStatus!=true?<Outlet />:<Navigate to={"/"}/>} 
        </div>
      </div>
    </>
  );
}

export default LoginAndRegistration;
