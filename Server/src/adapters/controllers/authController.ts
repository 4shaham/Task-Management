import { NextFunction, Request, Response } from "express";
import IAuthController from "../../interface/iController/iAuthController";
import IAuthUseCase from "../../interface/iUseCase/iAuthUseCase";
import { StatusCode } from "../../enums/statusCode";
import Errors from "../../errors/error";

export default class AuthController implements IAuthController {
  private authUseCase: IAuthUseCase;

  constructor(authUseCase: IAuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const {email,password}=req.body;

      if (!email || !password) {
         throw new Errors("all field is required", StatusCode.forBidden);
      }

      const response = await this.authUseCase.loginUseCase({ email, password });
      res.cookie("token", response.token, { 
        maxAge: 3600000, 
        secure: true,       // Ensure it's sent over HTTPS only
      });
      
      
      res.status(StatusCode.success).json({payload:response});

    } catch (error) {  
      next(error);  
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {userName,email,password,confirmPassword,role,managerEmail} = req.body;

      if (!userName || !email || !password || !confirmPassword || !role) {
        throw new Errors("All fields are required", StatusCode.badRequest);
      }

      await this.authUseCase.registerUserUseCase({
        userName,
        email,
        password,
        confirmPassword,
        role,
        managerEmail
      });
      res.status(StatusCode.success).json({ message: "successfully created" });
    } catch (error) {
      next(error);
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.cookie("token", "",{maxAge:3600000,secure:true});
      res.status(StatusCode.success).json({ message: "successfully logOut" });
    } catch (error) {
      next(error);
    }
  }


  async verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token=req.cookies.token 
      if(!token){
        throw new Errors("token is empty",StatusCode.UnAuthorized)
      }
      let r= await this.authUseCase.verifyAuthUseCase(token)

      res.status(StatusCode.success).json({tokenData:r})
    } catch (error) {
        next(error)
    }
  }


  async getAllManagers(req:Request,res:Response,next:NextFunction){
          try {
            
            const result=await this.authUseCase.getAllManagers()
            res.status(StatusCode.success).json({managers:result}) 

          } catch (error) {
            next(error)
          }
  }


   

}
