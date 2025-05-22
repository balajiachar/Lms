import mongoose, { mongo } from "mongoose";
import Course from "./Course.js";
// import { ref } from "process";
// import { type } from "os";

const PurchaseSchema = new mongoose.Schema({
     CourseId : {type : mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required:true
     },
     userId : {
         type: String,
         ref: 'User', 
         required: true
     },
     amount : { type: Number, required: true},
     status: { type: String, enum: ['pending', 'completed', 'failed'], 
        default: 'pending'}
}, {timestamps: true});

export const Purchase = mongoose.model('Purchase', PurchaseSchema)