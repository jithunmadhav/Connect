import userModel from "../Model/userSchema.js";

export const userDetails=async(req,res)=>{
    const {search,userId} =req.query;
    console.log(userId);
    const query={
        name: new RegExp(search, 'i')
    }
    const result = await userModel.find({
        $or: [{ query }, { password: 0, email: 0 }, { _id: { $ne: userId } }],
      });
    if(result){
        res.status(200).json({err:false,result})
    }else{
        res.status(404).json({err:true,message:'No data found'})
    }
}