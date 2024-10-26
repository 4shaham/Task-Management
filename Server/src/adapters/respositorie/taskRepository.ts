import mongoose, { Model } from "mongoose";
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
    managerId: string,
    fiterStaus: string
  ): Promise<ITask | null[]> {
    try {

      if(fiterStaus=="day"){
        return await this.task.aggregate([
          {
            $match: {  
              $and: [
                { startDate: { $gte: startDate } },
                { startDate: { $lte: endDate } },
                { assignedBy: new mongoose.Types.ObjectId(managerId) },
              ],
            },
          },
          {
            $group: {
              _id: "$startTime",
              task: { $push: "$$ROOT" },
            },
          },
        ]);
      }

      if (fiterStaus == "month") {

        return this.task.aggregate([
          {
            $match: {
              $and: [
                { startDate: { $gte: startDate } },
                { startDate: { $lte: endDate } },
                { assignedBy: new mongoose.Types.ObjectId(managerId) },
              ],
            },
          },
          {
            $group: {
              _id:"$startDate",
              task: { $push: "$$ROOT" },
            },
          },
        ]);

      }else if(fiterStaus=="week"){
        
        return await this.task.aggregate([
          {
            $match: {
              $and: [
                { startDate: { $gte: startDate } },
                { startDate: { $lte: endDate } },
                { assignedBy: new mongoose.Types.ObjectId(managerId) }
              ],
            },
          },
          {
            $project: {
              dayOfWeek: { $dayOfWeek: "$startDate" }, // 1 (Sunday) to 7 (Saturday)
              day: { $dayOfMonth: "$startDate" },
              month: { $month: "$startDate" },
              year: { $year: "$startDate" },
              hour: { $hour: "$startDate" },
              minute: { $minute: "$startDate" },
              task: "$$ROOT",
            },
          },
          {
            $group: {
              _id: {
                dayOfWeek: "$dayOfWeek",
                day: "$day",
                month: "$month",
                year: "$year",
                hour: "$hour",
                minute: "$minute"
              },
              tasks: { $push: "$task" },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1, "_id.minute": 1 }
          }
        ]);
        
      }
    

      return [null]
     
    } catch (error) {
      throw error;
    }
  }
  
  async getAllTaskEmp(
    startDate: Date,
    endDate: Date,
    empId: string,
    filterStatus: string
  ): Promise<ITask|null[]> {
    try {

   
        console.log("djfdkjf shaham salam")

        if(filterStatus=="month"){
            return await this.task.aggregate([
                {
                  $match: {
                    $and: [
                      { startDate: { $gte: startDate } },
                      { startDate: { $lte: endDate } },
                      { assignedTo: { $in: [new mongoose.Types.ObjectId(empId)] } }
                    ],
                  },
                },
                {
                  $group: {
                    _id: "$startDate",
                    task: { $push: "$$ROOT" },
                  },
                },
              ]);
        }

        if(filterStatus=="week"){
          return await this.task.aggregate([
            {
              $match: {
                $and: [
                  { startDate: { $gte: startDate } },
                  { startDate: { $lte: endDate } },
                  { assignedTo:{$in:[new mongoose.Types.ObjectId(empId)]}}
                ],
              },
            },
            {
              $project: {
                dayOfWeek: { $dayOfWeek: "$startDate" }, // 1 (Sunday) to 7 (Saturday)
                day: { $dayOfMonth: "$startDate" },
                month: { $month: "$startDate" },
                year: { $year: "$startDate" },
                hour: { $hour: "$startDate" },
                minute: { $minute: "$startDate" },
                task: "$$ROOT",
              },
            },
            {
              $group: {
                _id: {
                  dayOfWeek: "$dayOfWeek",
                  day: "$day",
                  month: "$month",
                  year: "$year",
                  hour: "$hour",
                  minute: "$minute"
                },
                tasks: { $push: "$task" },
              },
            },
            {
              $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1, "_id.minute": 1 }
            }
          ]);
          
        }

        return await this.task.aggregate([
            {
              $match: {
                $and: [
                  { startDate: { $gte: startDate } },
                  { startDate: { $lte: endDate } },
                  { assignedTo: { $in: [new mongoose.Types.ObjectId(empId)] } }
                ],
              },
            },
            {
              $group: {
                _id: "$startTime",
                task: { $push: "$$ROOT" },
              },
            },
          ]);
    } catch (error) {
      throw error;
    }
  }
}
