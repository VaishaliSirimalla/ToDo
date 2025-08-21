import {Schema, model, Document} from "mongoose"

export interface ToDoInterface extends Document{
    title : string;
    completed : boolean;
    status : "To Do" | "In Progress" | "Done";
    priority : "High" | "Medium" | "Low";
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
        enum:["To Do","In Progress","Done"],
        default :"To Do",
    },
    priority:{
        type: String,
        enum:["High","Medium","Low"],
        default :"Low",
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
})

const ToDo = model<ToDoInterface>("ToDo", todoScehema)
export default ToDo;