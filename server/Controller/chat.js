import chatModel from "../Model/chatModel.js";
import messageModel from "../Model/messageModel.js";
import userModel from "../Model/userSchema.js";

export const userDetails=async(req,res)=>{
    const {search,userId} =req.query;
    if(search){
        const query={
            name: new RegExp(search, 'i')
        }
        console.log("***************************",search);
        const result = await userModel.find(
            {
              $and: [query, { _id: { $ne: userId } }]
            },{password:0,email:0}
          );
        if(result){
            res.status(200).json({err:false,result})
        }else{
            res.status(404).json({err:true,message:'No data found'})
        }
    }else{
        let data= await chatModel.find({members:{$all:userId}})
        let chatMembers=[]
        data.filter((item)=>chatMembers.push(item.members[1]))
        const result = await userModel.find({
            _id: { $in: chatMembers },
          });
          res.status(200).json({err:false,result})    }
}

export const createChat = async (req, res) => {
    try {
    const chatExist = await chatModel.findOne({
      members: { $all: [req.body.senderId, req.body.recieverId] },
    });
    if(chatExist){
      res.status(200).json({err:false,message:'chat already exist'})
    }else{
      const newChat = new chatModel({
        members: [req.body.senderId, req.body.recieverId],
      });
    
        const result = await newChat.save();
        res.status(200).json({err:false,message:"chat created"});
    }
  
    } catch (error) {
      res.status(500).json(error);
    }
  };

export const addMessage=async(req,res)=>{
try {
    const {chatId,senderId,text}=req.body;
    await messageModel.create({chatId,senderId,text})
    res.status(200).json({err:false})
} catch (error) {
    console.log(error);
    res.status(501).json({err:true})
}
}