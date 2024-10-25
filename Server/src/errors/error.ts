
import { StatusCode } from "../enums/statusCode"


interface IErrors{
    statusCode:number,
    message:string
}



class Errors extends Error {
    
    private statusCode:number

    constructor(message:string,statusCode:number){
     
     super(message)
     this.statusCode = statusCode

    }

}

export default Errors