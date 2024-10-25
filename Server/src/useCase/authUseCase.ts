import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/error";
import { IAuthRepository } from "../interface/iRepository/iAuthRepository";
import IAuthUseCase from "../interface/iUseCase/iAuthUseCase";
import {
  LoginBody,
  LoginResponse,
  RegisterBodyData,
} from "../interface/other.ts/IBodyData";
import { JwtPayloadData } from "../interface/other.ts/jwtData";
import IHashingService from "../interface/utils/iHasingService";
import IJwtService from "../interface/utils/iJwtService";

export default class AuthUseCase implements IAuthUseCase {
  private authRepository: IAuthRepository;
  private hashingService: IHashingService;
  private jwtService: IJwtService;

  constructor(
    authRepository: IAuthRepository,
    hashingService: IHashingService,
    jwtService: IJwtService
  ) {
    this.authRepository = authRepository;
    this.hashingService = hashingService;
    this.jwtService = jwtService;
  }

  async registerUserUseCase(data: RegisterBodyData): Promise<void> {
    try {

      // passowrd validataion

      if (data.password != data.confirmPassword) {
        throw new Errors(
          "password and confirm password is not match",
          StatusCode.forBidden
        );
      }

      // email validation
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(data.email)) {
        throw new Errors("email format is not valid", StatusCode.forBidden);
      }

      // email field is unique Here checking email is excedd
      let user = await this.authRepository.emailIsExists(data.email);
      if (user) {
        throw new Errors(
          "The email address is already in use. Please try another one",
          StatusCode.forBidden
        );
      }

      // if the Manager email is here it validate

      if (data.managerEmail && !emailRegex.test(data.managerEmail)) {
        throw new Errors(
          "Manager email format is not valid",
          StatusCode.forBidden
        );
      }

      if (data.managerEmail) {
        const manager = await this.authRepository.emailIsExists(data.managerEmail);
        console.log("m",manager)
        if (manager?.role !="Manager") {
          throw new Errors(
            "The Manager email is not esixt. Please try another one",
            StatusCode.forBidden
          );
        }
            
        data.managerEmail=manager._id 
      }

      // hashing password
      let hashedPassword = await this.hashingService.hashing(data.password);
      data.password = hashedPassword;

      // save use data
      await this.authRepository.saveUserData(data);

    } catch (error) {
      throw error;
    }
  }

  async loginUseCase(data: LoginBody): Promise<LoginResponse> {
    try {

      // email validation
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(data.email)) {
         throw new Errors("email format is not valid", StatusCode.forBidden);
      }

      let user = await this.authRepository.emailIsExists(data.email);
      if (!user) {
        throw new Errors("Email is not match", StatusCode.notFound);
      }

      if (
        !(await this.hashingService.compare(
          data.password,
          user.password as string
        ))
      ) {
        throw new Errors("Password is not match", StatusCode.UnAuthorized);
      }

      const token = await this.jwtService.createToken({
        email: user.email,
        id: user._id,
      });
      return {
        message: "login is sucessfully",
        token: token,
        userData:user
      };
    } catch (error) {
      throw error;
    }
  }

 

  async verifyAuthUseCase(token:string):Promise<JwtPayloadData> {
    try {

    let response:JwtPayloadData=await this.jwtService.verify(token)      
    return response

    }catch (error) {
       throw error  
    }

  }


}
