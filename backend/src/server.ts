import dotenv from "dotenv";
dotenv.config();
// console.log("Mongo URI:", process.env.MONGO_URI);
// console.log("Port:", process.env.PORT);
import todoRoutes from "../src/routes/todoRoutes"


import express, {Application} from "express";
import mongoose from "mongoose";

const app: Application=express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI as string;
app.use(express.json());

app.use("/api/todos", todoRoutes)
mongoose
    .connect(mongoUri)
    .then(()=>{
        console.log("MongoDB Connected");
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
            
        })
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })
