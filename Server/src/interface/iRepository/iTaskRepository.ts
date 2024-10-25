import ITask from "../../entity/taskEntity";
import IUser from "../../entity/userEntity";
import { createTaskData } from "../other.ts/IBodyData";


export default interface ITaskRepository {
      getEmployees(id:string,name?:string):Promise<IUser|null[]>
      saveTask(data:createTaskData):Promise<void>
      getAllTask(startDate:Date,endDate:Date,managerId:string):Promise<ITask|null[]>
}