export default interface IUser{
  _id: string;
  name:string;
  email: string;
  password: string;
  role: string;
  managerId?:string;
}
