import mongoose from "mongoose";

export const dbconnect=()=>{
    mongoose.connect(`${process.env.MONGOOSE_CONNECT}`).then(()=>{
        console.log("DBconnected");
    }).catch((err)=>{
        console.log(err);
    })
}