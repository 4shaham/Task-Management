import IUser from "../../entity/userEntity"

export interface RegisterBodyData{
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:string,
    managerEmail?:string
}

export interface LoginBody{
    email:string,
    password:string
}

export interface LoginResponse{
    message:string,
    token:string,       
    userData:IUser 
}   
  

export interface createTaskData{
    title: string;
    description: string;
    assignedTo:string[];  // Array of employee ObjectIds
    assignedBy:string;    // ObjectId of the manager assigning the task
    startDate: Date;
    endDate: Date;
    startTime:string;
    endTime:string;
}
