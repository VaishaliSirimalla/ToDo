import {Schema, model, Document} from "mongoose"

export interface ToDoInterface extends Document{
    title : string;
    completed : boolean;
    status : "to-do" | "in-progress" | "done";
    priority : "high" | "medium" | "low";
    createdAt: Date;
}

const todoScehema = new Schema<ToDoInterface>({
    title:{
        type: String,
        required:true,
        trim :true,
    },
    completed:{
        type: Boolean,
        default:false,
    },
    status:{
        type: String,
        enum:["to-do","in-progress","done"],
        default :"to-do",
    },
    priority:{
        type: String,
        enum:["high","medium","low"],
        default :"low",
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
})

const ToDo = model<ToDoInterface>("ToDo", todoScehema)
export default ToDo;