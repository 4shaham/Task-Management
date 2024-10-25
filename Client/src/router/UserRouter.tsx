import { Route, Routes } from "react-router-dom";
import LoginAndRegistration from "../pages/user/LoginAndRegistration";
import MainPage from "../pages/user/MainPage";
import HomePage from "../pages/user/HomePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";


function UserRouter() {
  return (
    <Routes>
      <Route element={<LoginAndRegistration />}>
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/register"} element={<RegisterForm />} />
      </Route>

      <Route element={<MainPage />}>
        <Route path={"/"} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default UserRouter;
