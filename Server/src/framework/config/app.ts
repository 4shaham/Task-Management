import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser";


import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware"


// routers
import authRouter from "../routes/authRouter"
import taskRouter from "../routes/taskRouter"

// env
dotenv.config()



const app=express()



// this for useing instead of body parser
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit: '10mb'})) 


//  set up cookieParser
app.use(cookieParser());



app.use(cors({
    origin:"https://task-management-pevubz64r-shahams-projects.vercel.app",
    credentials:true
}))

// morgan for get all routes console
app.use(morgan('dev'))  

app.use('/api',authRouter)
app.use('/api',taskRouter)


app.use(errorHandlerMiddleware)
  

export default app


