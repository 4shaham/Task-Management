
import { LoginResponse, RegisterBodyData } from "../other.ts/IBodyData";
import { LoginBody } from "../other.ts/IBodyData";
import { JwtPayloadData } from "../other.ts/jwtData";



 

export default interface IAuthUseCase{

    registerUserUseCase(data:RegisterBodyData):Promise<void>
    loginUseCase(data:LoginBody):Promise<LoginResponse>
    verifyAuthUseCase(token:string):Promise<JwtPayloadData>
}