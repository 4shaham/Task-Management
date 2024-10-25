import { Model } from "mongoose";
import ITask from "../../entity/taskEntity";
import ITaskRepository from "../../interface/iRepository/iTaskRepository";
import IUser from "../../entity/userEntity";
import { createTaskData } from "../../interface/other.ts/IBodyData";

export default class TaskRepository implements ITaskRepository {
  private task: Model<ITask>;
  private users: Model<IUser>;
  constructor(task: Model<ITask>, users: Model<IUser>) {
    this.task = task;
    this.users = users;
  }

  async getEmployees(id: string, name?: string): Promise<IUser | null[]> {
    try {
      return await this.users.find({ managerId: id });
    } catch (error) {
      throw error;
    }
  }

  async saveTask(data: createTaskData): Promise<void> {
    try {
      const task = new this.task({
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        assignedBy: data.assignedBy,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      await task.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllTask(
    startDate: Date,
    endDate: Date,
    managerId: string
  ): Promise<ITask | null[]> {
    try {

      return await this.task.find({
        $and: [
          { startDate: { $gte: startDate } },
          { startDate: { $lte: endDate } },
        ],
        assignedBy: managerId,
      });

    

    } catch (error) { 
      throw error;
    }
  }
}