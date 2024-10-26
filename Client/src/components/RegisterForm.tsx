import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
  Select,
  Option,
  List,
  ListItem,
  Radio,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAllManagers, userRegister } from "../api/user";
import IUser from "../interface/Iuser";

interface RegisterationFromData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  managerEmail?: string;
}

// interface Manager {
//   id: string;
//   name: string;
//   email: string;
//   department?: string;
// }

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterationFromData>();

  const [selectedManager, setSelectedManager] = useState<string>("");
  const selectedRole = watch("role");
  const password = watch("password");
  const navigate = useNavigate();
  const [managers,setManagers]=useState<IUser[]>([])
  
  useEffect(()=>{
      const handlefn=async()=>{
             try {
               const response=await getAllManagers()
               console.log(response.data.managers)
               setManagers(response.data.managers)
             } catch (error) {
                
             }
      }
      handlefn()
  },[])
 

  const handleFormSubmit = async (data: RegisterationFromData) => {
    try {
      const submitData = {
        ...data,
        managerEmail: data.role === "employee" ? selectedManager : undefined,
      };

      if (data.role === "employee" && !selectedManager) {
        setError("managerEmail", {
          type: "manual",
          message: "Please select a manager",
        });
        return;
      }
      alert(submitData.role)

      await userRegister(
        submitData.userName,
        submitData.email,
        submitData.password,
        submitData.confirmPassword,
        submitData.role,
        submitData.managerEmail || ""
      );
      navigate("/login");
    } catch (error) {
      console.log("eror",error) 
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.message ===
          "The email address is already in use. Please try another one"
        ) {
          setError("email", {
            type: "server",
            message: error.response?.data.message,
          });
        }
    
      }
    }
  };

  const handleManagerSelection = (managerEmail: string) => {
    setSelectedManager(managerEmail);
    setValue("managerEmail", managerEmail);
  };

  return (
    <Card
      shadow={false}
      className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg"
    >
      <CardHeader shadow={false} floated={false} className="text-center mb-6">
        <Typography
          variant="h1"
          color="blue-gray"
          className="text-3xl lg:text-4xl"
        >
          User SignUp
        </Typography>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label htmlFor="userName" className="font-medium mb-1">
            <Typography variant="small" color="blue-gray">
              UserName
            </Typography>
          </label>
          <Input
            color="gray"
            size="lg"
            className="w-full"
            {...register("userName", { required: "This field is required" })}
            crossOrigin={"d"}
          />
          {errors.userName && (
            <Typography color="red" className="text-sm">
              {errors.userName.message}
            </Typography>
          )}

          <label htmlFor="email" className="font-medium mb-1">
            <Typography variant="small" color="blue-gray">
              Your Email
            </Typography>
          </label>
          <Input
            color="gray"
            size="lg"
            type="email"
            className="w-full"
            crossOrigin={"cros"}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <Typography color="red" className="text-sm">
              {errors.email.message}
            </Typography>
          )}

          <label htmlFor="password" className="font-medium mb-1">
            <Typography variant="small" color="blue-gray">
              Password
            </Typography>
          </label>
          <Input
            color="gray"
            size="lg"
            type="password"
            className="w-full"
            {...register("password", { required: "This field is required" })}
            crossOrigin={"crossorgin"}
          />
          {errors.password && (
            <Typography color="red" className="text-sm">
              {errors.password.message}
            </Typography>
          )}

          <label htmlFor="confirmPassword" className="font-medium mb-1">
            <Typography variant="small" color="blue-gray">
              Confirm Password
            </Typography>
          </label>
          <Input
            color="gray"
            size="lg"
            type="password"
            className="w-full"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            crossOrigin={"crosso"}
          />
          {errors.confirmPassword && (
            <Typography color="red" className="text-sm">
              {errors.confirmPassword.message}
            </Typography>
          )}

          <label htmlFor="role" className="font-medium mb-1">
            <Typography variant="small" color="blue-gray">
              Role
            </Typography>
          </label>
          <Select
            label="Select Role"
            size="lg"
            {...register("role", { required: "Role selection is required" })}
            onChange={(value: any) => {
              setValue("role", value);
              setSelectedManager("");
              setValue("managerEmail", "");
            }}
          >
            <Option value="Manager">Manager</Option>
            <Option value="Employee">Employee</Option>
          </Select>
          {errors.role && (
            <Typography color="red" className="text-sm">
              {errors.role.message}
            </Typography>
          )}

          {selectedRole === "Employee" && (
            <div className="mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Select Your Manager
              </Typography>
              <Card className="w-full shadow-md">
                <List className="p-0 max-h-60 overflow-y-auto">
                  {managers.map((manager) => (
                    <ListItem
                      key={manager._id}
                      className={`p-2 hover:bg-gray-50 cursor-pointer ${
                        selectedManager === manager.email ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleManagerSelection(manager.email)}
                    >
                      <div className="flex items-center gap-4">
                        <ListItemPrefix>
                          <Radio
                            name="manager"
                            checked={selectedManager === manager.email}
                            onChange={() =>
                              handleManagerSelection(manager.email)
                            }
                            crossOrigin={"c"}
                          />
                        </ListItemPrefix>
                        <div className="flex-1">
                          <Typography color="blue-gray" className="font-medium">
                            {manager.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            {manager.email}
                          </Typography>
                          {manager.role && (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-xs"
                            >
                              {manager.role}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
              {errors.managerEmail && (
                <Typography color="red" className="text-sm mt-2">
                  {errors.managerEmail.message}
                </Typography>
              )}
            </div>
          )}

          <Button size="lg" color="black" type="submit" fullWidth>
            SignUp
          </Button>
          <Link to="/login">
            <Button size="lg" color="gray" fullWidth>
              SignIn
            </Button>
          </Link>

          <Typography
            variant="small"
            className="text-center text-gray-600 mt-4"
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

export default RegisterForm;
