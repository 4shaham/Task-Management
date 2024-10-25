import { NextFunction, Request, Response } from "express";

export default interface IAuthController {
  
  login(req: Request, res: Response,next:NextFunction): Promise<void>;
  register(req: Request, res: Response,next:NextFunction): Promise<void>;
  logOut(req:Request,res:Response,next:NextFunction):Promise<void>  
  verifyAuth(req:Request,res:Response,next:NextFunction):Promise<void>
  
}
