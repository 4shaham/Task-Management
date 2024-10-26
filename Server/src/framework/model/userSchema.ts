
import mongoose, {Schema} from "mongoose";
import IUser from "../../entity/userEntity";


const UserSchema:Schema=new Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['Employee','Manager'], 
    },
    managerId:{
        type:String,
    }
},
{
    timestamps: true 
})

const Users=mongoose.model<IUser>('Users',UserSchema)
export default Users
        





  