
import axios, { AxiosInstance } from "axios";


const api:AxiosInstance=axios.create({
  baseURL: "https://task-managment.shaham.website",
  withCredentials: true,
});
export default api