import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../interface/FormData";
import { useForm } from "react-hook-form";
import { login } from "../api/user";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStatusChange } from "../redux/slice/userAuthSlice";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      let response = await login(data.email, data.password);
      console.log(response, "hiiii heloo");
      dispatch(loginStatusChange());
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message == "Email is not match") {
          setError("email", {
            type: "server",
            message: error.response?.data.message,
          });
          return;
        }

        if (error.response?.data.message == "Password is not match") {
          setError("password", {
            type: "server",
            message: error.response?.data.message,
          });
          return;
        }
      }
    }
  };

  return (
    <Card
      shadow={false}
      className="md:px-24 md:py-14 py-8 bg-gray-100"
    >
      <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-1 !text-3xl lg:text-4xl bg-gray-100"
        >
          User Login
        </Typography>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4 md:mt-12"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Your Email
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
              crossOrigin="croosorgin"
            />
            {errors.email && (
              <Typography color="red" className="text-start text-sm">
                {errors.email.message}
              </Typography>
            )}

            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Password
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              type="password"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin="croosorgin"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && (
              <Typography color="red" className="text-start text-sm">
                {errors.password.message}
              </Typography>
            )}
          </div>
          <Button size="lg" type="submit" color="gray" fullWidth>
            SignIn
          </Button>
          <Link to={"/register"}>
            <Button size="lg" color="gray" fullWidth>
              SignUp
            </Button>
          </Link>

          <Typography
            variant="small"
            className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
          >
            Upon signing in, you consent to abide by our{" "}
            <a href="#" className="text-gray-900">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-gray-900">
              Privacy Policy.
            </a>
          </Typography>
        </form>
      </CardBody>
    </Card>
  );
}

export default LoginForm;
