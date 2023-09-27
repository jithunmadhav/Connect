import mongoose from "mongoose";

const urlSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    longurl:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
        required:true
    },
     createdDate:{
        type:Date,
        default:new Date()
     }      
})
const urlModel=mongoose.model('url',urlSchema)
export default urlModel;