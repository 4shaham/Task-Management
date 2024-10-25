import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import Calendar from 'react-calendar';
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/user";
import { logOutStatusChange } from "../redux/slice/userAuthSlice";




function NavList() {
  return (
    // <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
    //   <Typography
    //     as="a"
    //     href="#"
    //     variant="small"
    //     color="blue-gray"
    //     className="font-medium"
    //   >
    //    <Link to={"/"}><ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem></Link>
    //   </Typography>
    //   <Link to={"/products"}><Typography
    //     variant="small"
    //     color="blue-gray"
    //     className="font-medium"
    //   >
    //     <ListItem className="flex items-center gap-2 py-2 pr-4">
    //       Prodoucts
    //     </ListItem>
    //   </Typography></Link>
    // </List>
    <></>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let userAuthStatus: boolean = useSelector(
    (state: any) => state.userReducer.userAuthStatus.userAuthStatus
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogOutClick=async()=>{
          try {

      
            await logout()
            dispatch(logOutStatusChange())
            navigate("/login")

          } catch (error) {
              
          }
  }

  return (
    <Navbar className="px-4 py-2  min-w-full bg-gray-100">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Task Manager
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {userAuthStatus ? (
            <>

              {/* <Link to={"/profile"}><CgProfile className="text-3xl"/></Link>
              <Link to={"/cart"}><FaShoppingCart className="text-3xl"/></Link>  */}
              <Button variant="gradient" color="red" size="sm" onClick={handleLogOutClick}>
                LogOut
              </Button>
            
            </>
          ) : (
           <Link to={"/login"}><Button variant="gradient" size="sm">
              Sign In
            </Button></Link>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        {userAuthStatus ? (
            <>
              <CgProfile className="text-3xl" />
              <FaShoppingCart className="text-3xl" />
              <Button variant="gradient" color="red" size="sm" onClick={handleLogOutClick}>
                LogOut
              </Button>
            </>
          ) : (
           <Link to={"/login"}><Button variant="gradient" size="sm">
              Sign In
            </Button></Link>
          )}
          {/* <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button> */}
        </div>
      </Collapse>
    </Navbar>
  );
}
