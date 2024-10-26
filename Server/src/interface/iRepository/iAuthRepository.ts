import IUser from "../../entity/userEntity";
import { RegisterBodyData } from "../other.ts/IBodyData";

export interface IAuthRepository{

    emailIsExists(email:string):Promise<IUser|null>
    saveUserData(data:RegisterBodyData):Promise<void>
    getAllManagers():Promise<IUser|null[]>
}  