
import express,{ Router } from "express";


const router:Router=express.Router()


import AuthUseCase from "../../useCase/authUseCase";
import AuthController from "../../adapters/controllers/authController";
import AuthRepository from "../../adapters/respositorie/authRepository";


// db collection 

import Users from "../model/userSchema";

// services 

import HashingServices from "../utils/hashingService";
import JwtService from "../utils/jwtService";

const hashingService=new HashingServices()
const jwtService=new JwtService()

// middleware




const authRepository=new AuthRepository(Users)
const authUseCase=new AuthUseCase(authRepository,hashingService,jwtService)
const authController=new AuthController(authUseCase)



router.post("/login",authController.login.bind(authController))
router.post("/register",authController.register.bind(authController))
router.get("/tokenVerification",authController.verifyAuth.bind(authController))
router.post("/logout",authController.logOut.bind(authController))
router.get("/getAllManagers",authController.getAllManagers.bind(authController))


export default router

