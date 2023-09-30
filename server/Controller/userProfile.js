import sanitize from "sanitize-html"
import userModel from "../Model/userSchema.js"
export const userData=async(req,res)=>{
    const {userId}=req.query;
    const sanitizeUserId=sanitize(userId);
    userModel.findOne({_id:sanitizeUserId}).then((result)=>{
        res.status(200).json({err:false,result})
    }).catch((error)=>{
        res.status(501).json({err:true,error})
    })
    
}
export const updateUser=(req,res)=>{
    const {name,userId}=req.body;
    const sanitizeName=sanitize(name)
    const sanitizeUserId=sanitize(userId)
    userModel.updateOne({_id:sanitizeUserId},{$set:{
        name:sanitizeName,
        image:req.file
    }}).then((result)=>{
        res.status(200).json({err:false})
    }).catch((err)=>{
        res.status(501).json({err:true})
    })
}