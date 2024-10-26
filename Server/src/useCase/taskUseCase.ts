import ITask from "../entity/taskEntity";
import IUser from "../entity/userEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import ITaskRepository from "../interface/iRepository/iTaskRepository";
import ITaskUseCase from "../interface/iUseCase/iTaskUseCase";
import { createTaskData } from "../interface/other.ts/IBodyData";

export default class TaskUseCase implements ITaskUseCase {
  private taskRepository: ITaskRepository;
  constructor(taskRepositroy: ITaskRepository) {
    this.taskRepository = taskRepositroy;
  }

  async getEmployeeUseCase(id: string, name?: string): Promise<IUser | null[]> {
    try {
      if (id == null) {
        throw new Errors("id is requried", StatusCode.badRequest);
      }
      return this.taskRepository.getEmployees(id, name);
    } catch (error) {
      throw error;
    }
  }

  async createTask(formData: createTaskData): Promise<void> {
    try {
      await this.taskRepository.saveTask(formData);
    } catch (error) {
      throw error;
    }
  }

  async getAllTask(
    startDate: Date,
    endDate: Date,
    managerId: string,
    filterStatus: string,
    role:string
  ): Promise<ITask | null[]> {
    try {

     if(role!="Manager"){
        return await this.taskRepository.getAllTaskEmp(startDate,endDate,managerId,filterStatus)
     }

     
      return await this.taskRepository.getAllTask(
        startDate,
        endDate,
        managerId,
        filterStatus,
      );
      

    } catch (error) {
      throw error;
    }

  }
}
