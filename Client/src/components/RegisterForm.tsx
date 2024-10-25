import { RegisterationFromData } from "../interface/FormData";

import { userRegister } from "../api/user";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
  ListItemPrefix,
  Checkbox,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterationFromData>();
  const selectedRole = watch("role");
  const password = watch("password");
  const navigate = useNavigate();
  const [selectedManager, setSelectedManager] = useState<null | string>(null);

  const [managers, setManagers] = useState([
    // This would typically come from your API
    { id: 1, name: "Manager 1", email: "manager1@example.com" },
    { id: 2, name: "Manager 2", email: "manager2@example.com" },
    { id: 3, name: "Manager 3", email: "manager3@example.com" },
    { id: 4, name: "Manager 4", email: "manager4@example.com" },
    { id: 5, name: "Manager 5", email: "manager5@example.com" },
  ]);

  const handleFormSubmit = async (data: RegisterationFromData) => {
    try {
      await userRegister(
        data.userName,
        data.email,
        data.password,
        data.confirmPassword,
        data.role, // Pass the selected role here
        "dshsh"
      );
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.message ==
          "The email address is already in use. Please try another one"
        ) {
          setError("email", {
            type: "server",
            message: error.response?.data.message,
          });
          return;
        }
      }
    }
  };

  const handleManagerSelection = (managerEmail: string) => {
    setSelectedManager(managerEmail);
    setValue("managerEmail", managerEmail);
  };

  return (
    <Card shadow={false} className="md:px-24 md:py-14 py-8 bg-gray-100">
      <CardHeader shadow={false} floated={false} className="text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-1 !text-3xl lg:text-4xl bg-gray-100"
        >
          User SignUp
        </Typography>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4 md:mt-12"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <label htmlFor="userName">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                UserName
              </Typography>
            </label>
            <Input
              color="gray"
              size="lg"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("userName", {
                required: "This field is required",
                onChange: (e) => setValue("userName", e.target.value.trim()),
              })}
              crossOrigin="croosorgin"
            />
            {errors.userName && (
              <Typography color="red" className="text-start text-sm">
                {errors.userName.message}
              </Typography>
            )}

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
              type="email"
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

            <label htmlFor="password">
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
              {...register("password", {
                required: "This field is required",
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
              crossOrigin="croosorgin"
            />
            {errors.password && (
              <Typography color="red" className="text-start text-sm">
                {errors.password.message}
              </Typography>
            )}

            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Confirm Password
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
              {...register("confirmPassword", {
                required: "This field is required",
                onChange: (e) =>
                  setValue("confirmPassword", e.target.value.trim()),
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <Typography color="red" className="text-start text-sm">
                {errors.confirmPassword.message}
              </Typography>
            )}

            {/* Role Select Input */}
            <label htmlFor="role">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium mb-2"
              >
                Role
              </Typography>
            </label>
            <Select
              label="Select Role"
              size="lg"
              {...register("role", { required: "Role selection is required" })}
              onChange={(e: any) => setValue("role", e)}
            >
              <Option value="manager">Manager</Option>
              <Option value="employee">Employee</Option>
            </Select>
            {errors.role && (
              <Typography color="red" className="text-start text-sm">
                {errors.role.message}
              </Typography>
            )}

            {/* Manager Selection List - Only shown when role is employee */}
            {selectedRole === "employee" && (
              <div className="mt-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Select Your Manager
                </Typography>

                <Card className="w-full">
                  <List className="max-h-48 overflow-y-auto">
                    {managers.map((manager) => (
                      <ListItem
                        key={manager.id}
                        className="p-0"
                        selected={selectedManager === manager.email}
                      >
                        <label
                          htmlFor={`manager-${manager.id}`}
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <input
                              type="radio"
                              id={`manager-${manager.id}`}
                              name="manager-selection"
                              value={manager.email}
                              checked={selectedManager === manager.email}
                              onChange={() =>
                                handleManagerSelection(manager.email)
                              }
                              className="form-radio" // Tailwind class for radio styling
                            />
                          </ListItemPrefix>
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              {manager.name}
                            </Typography>
                            <Typography className="text-sm font-normal text-blue-gray-500">
                              {manager.email}
                            </Typography>
                          </div>
                        </label>
                      </ListItem>
                    ))}
                  </List>
                </Card>

                {errors.managerEmail && (
                  <Typography color="red" className="text-start text-sm">
                    Please select a manager
                  </Typography>
                )}
              </div>
            )}
          </div>

          <Button size="lg" color="gray" type="submit" fullWidth>
            SignUp
          </Button>
          <Link to={"/login"}>
            <Button size="lg" color="gray" fullWidth>
              SignIn
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

export default RegisterForm;
