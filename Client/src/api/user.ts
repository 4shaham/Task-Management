import api from "../service/axios";
import userEndPoints from "../service/endPoints/userEndPoints";

export const login = async (email: string, password: string): Promise<any> =>
  await api.post(userEndPoints.login, { email, password });

export const userRegister = async (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  managerEmail?: string
): Promise<any> =>
  await api.post(userEndPoints.register, {
    userName,
    email,
    password,
    confirmPassword,
    role,
    managerEmail,
  });


export const logout = async (): Promise<any> =>
  await api.post(userEndPoints.logout);



export const tokenVerification = async (): Promise<any> =>
  await api.get(userEndPoints.tokenVerification);



export const getAllEmpoyees = async (): Promise<any> =>
  await api.get(userEndPoints.getAllEmpoyees);



export const addTask = async (
  title: string,
  description: string,
  assignedTo: string[],
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string
): Promise<any> =>
  await api.post(userEndPoints.addTask, {
    title,
    description,
    assignedTo,
    startDate,
    endDate,
    startTime,
    endTime,
  });



export const getAllTask = async (
  startDate: Date,
  endDate: Date,
  filterStatus:"day" | "week" | "month"
): Promise<any> =>
  await api.get(
    `${userEndPoints.getManagerTask}?startDate=${startDate}&&endDate=${endDate}&&fiterStaus=${filterStatus}`
  );


export const getAllManagers=async()=>await api.get(userEndPoints.getAllManagers)  
  