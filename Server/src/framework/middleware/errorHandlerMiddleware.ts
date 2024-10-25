import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../enums/statusCode";


const errorHandlerMiddleware=((error:any,req:Request,res:Response,next:NextFunction)=>{

    res.status(error.statusCode||StatusCode.internalServer).json({message:error.message})

})

export default errorHandlerMiddleware