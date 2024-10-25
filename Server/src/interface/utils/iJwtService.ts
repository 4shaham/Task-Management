

export default interface IJwtService {
    createToken(data:any):string;
    verify(token:string):any|null;
}