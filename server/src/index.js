// mongo pass= Saurabh@2024
//mongodb+srv://7288saurabh:<password>@cluster0.unxdn3j.mongodb.net/
import dotenv from "dotenv"
import {app }from './app.js'

import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})
console.log("hello")

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!!",err)
})