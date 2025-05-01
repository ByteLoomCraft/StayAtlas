import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { app } from "./app.js" 


dotenv.config({
  path: './.env'
})

//start the server
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 6000,()=>{
    console.log(`server is running at PORT:${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log(`MongoDB connection Failed!!!!:${err}`)
})

