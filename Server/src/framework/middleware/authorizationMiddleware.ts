import { NextFunction, Request, Response } from "express";
import IRequest from "../../interface/other.ts/iRequest";
import JwtService from "../utils/jwtService";
import { StatusCode } from "../../enums/statusCode";


const jwtService = new JwtService();

const authorizationMiddleware=((req:IRequest,res:Response,next:NextFunction)=>{
     
        try {
      
          const token = req.cookies.token;
          let verification = jwtService.verify(token)
          req.userId = verification?.id as string;
          next();

        } catch (error) {

          res.status(StatusCode.UnAuthorized).json({ message:"userTokenExpired"});

        }
})

export default authorizationMiddleware