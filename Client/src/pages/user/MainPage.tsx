
import NavbarWithMegaMenu from "../../components/Navbar";
import FooterWithSitemap from "../../components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { loginStatusChange, logOutStatusChange } from "../../redux/slice/userAuthSlice";
import { tokenVerification } from "../../api/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function mainPage(){

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
    <div className="w-full p-4">
     
         {userStatus?<Outlet/>:<Navigate to={"/login"}/>}
  
    </div>
  )

}

export default mainPage
