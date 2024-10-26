import { NextFunction, Request, Response } from "express";
import ITaskController from "../../interface/iController/iTaskController";
import ITaskUseCase from "../../interface/iUseCase/iTaskUseCase";
import IRequest from "../../interface/other.ts/iRequest";
import { StatusCode } from "../../enums/statusCode";
import { createTaskData } from "../../interface/other.ts/IBodyData";

export default class TaskController implements ITaskController {
  private taskUseCase: ITaskUseCase;
  constructor(taskUseCase: ITaskUseCase) {
    this.taskUseCase = taskUseCase;
  }

  async getEmployers(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const managerId = req.userId;
      console.log(managerId);
      const response = await this.taskUseCase.getEmployeeUseCase(
        managerId as string
      );
      console.log(response);
      res.status(StatusCode.success).json({ employees: response });
    } catch (error) {
      next(error);
    }
  }

  async addTask(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        title,
        description,
        assignedTo,
        startDate,
        endDate,
        startTime,
        endTime,
      } = req.body;
      let assignedBy = req.userId;

      if (!assignedBy) {
        return;
      }
      let formData: createTaskData = {
        title,
        description,
        assignedTo,
        assignedBy,
        startDate,
        endDate,
        startTime,
        endTime,
      };
      await this.taskUseCase.createTask(formData);
      res.status(StatusCode.success).json({ message: "created succesffully" });
    } catch (error) {
      next(error);
    }
  }

  async getTask(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const startDate: Date = new Date(req.query.startDate as string);
      const endDate: Date = new Date(req.query.endDate as string);
      const managerId = req.userId;
      const filterStatus:string=req.query.fiterStaus as string
      const role:string=req.role as string

      const response = await this.taskUseCase.getAllTask(
        startDate,
        endDate,
        managerId as string,
        filterStatus,
        role
      );
      
      console.log("ress", response);
      res.status(StatusCode.success).json({ task: response });

    }catch(error){
      console.log(error);
      next(error);
    }
  }

}
