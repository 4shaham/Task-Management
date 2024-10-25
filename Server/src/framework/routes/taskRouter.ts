


import express,{ Router } from "express";


const router:Router=express.Router()

import TaskController from "../../adapters/controllers/taskController";
import TaskRepository from "../../adapters/respositorie/taskRepository";
import TaskUseCase from "../../useCase/taskUseCase";



// db collection 
import Task from "../model/taskSchema";
import Users from "../model/userSchema";

// services 



// middleware
import authorizationMiddleware from "../middleware/authorizationMiddleware";



const taskRespoitory=new TaskRepository(Task,Users)
const taskUseCase=new TaskUseCase(taskRespoitory)
const taskController=new TaskController(taskUseCase)



router.get("/employees",authorizationMiddleware,taskController.getEmployers.bind(taskController))
router.post("/addTask",authorizationMiddleware,taskController.addTask.bind(taskController))
router.get("/getAllTask",authorizationMiddleware,taskController.getTask.bind(taskController))


export default router

  