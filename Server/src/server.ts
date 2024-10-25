
import express, { Request, Response } from "express"
import app from "./framework/config/app"
import { createServer } from 'http';
import { connect } from "mongoose";
import connectDB from "./framework/config/db";


const port:string=process.env.PORT!


const httpServer=createServer(app)   

connectDB()



httpServer.listen(port,()=>console.log(`server running Port:http://localhost:${port}`))
