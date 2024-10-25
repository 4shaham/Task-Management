import IHashingService from "../../interface/utils/iHasingService";
import bcrypt from "bcrypt";

export default class HashingServices implements IHashingService {
     
  async hashing(password: string): Promise<string> {
    return await bcrypt.hash(password,10);
  }

  async compare(password:string,hashedPassword:string): Promise<boolean> {
    
    try {
      let match = await bcrypt.compare(password,hashedPassword);
      console.log(match,"matchedddd")
      return match; 
    } catch (error) {
       throw error 
    }

  }

}
