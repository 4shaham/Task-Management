import { NextFunction,Response } from "express";
import IRequest from "../other.ts/iRequest";

export default interface ITaskController{
    getEmployers(req:IRequest,res:Response,next:NextFunction):Promise<void>
    addTask(req:IRequest,res:Response,next:NextFunction):Promise<void>
    getTask(req:IRequest,res:Response,next:NextFunction):Promise<void>
}