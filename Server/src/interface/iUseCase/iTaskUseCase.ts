import { Request, Response } from "express";
import IUser from "../../entity/userEntity";
import { createTaskData } from "../other.ts/IBodyData";
import ITask from "../../entity/taskEntity";


export default interface ITaskUseCase {
    getEmployeeUseCase(id:string,name?:string):Promise<IUser|null[]>
    createTask(formData:createTaskData):Promise<void>
    getAllTask(startDate:Date,endDate:Date,managerId:string,filterStatus:string,role:string):Promise<ITask|null[]>
}