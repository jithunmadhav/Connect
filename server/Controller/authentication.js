import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { sentOTP } from '../Helpers/mail.js';
import { randomNumber } from '../Helpers/randomnum.js';
import userModel from '../Model/userSchema.js';
import sanitize from 'sanitize-html';
export const userSignup=async(req,res)=>{
    try {

        console.log(req.body);
    let {email,password,confirmpassword}=req.body;
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);
    const sanitizedconfirmpassword = sanitize(confirmpassword);
    const oldUser=await userModel.findOne({sanitizedEmail})
    if(oldUser){
        res.json({err:true,message:'User already exsist'})
    }else{
         
        if(sanitizedPassword==sanitizedconfirmpassword){
           let otp=randomNumber()
           console.log(otp);
           sentOTP(email,otp);
            const userToken=jwt.sign({
                otp:otp,

            },
            process.env.JWT_SECRET_KEY);
            return res.cookie("signupToken", userToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'Otp send successfull'});
            
        }else{
            res.json({err:true,message:'password entered are not same'})
        }
       
       
    }
    } catch (error) {
        console.log(error);
    }
}
export const verifyUserSignup=async(req,res)=>{
    try {
        
        const {name,email,mobile,password}=req.body
        let otp=req.body.OTP;
        let userToken=req.cookies.signupToken;

        const sanitizedName = sanitize(name);
        const sanitizedEmail = sanitize(email);
        const sanitizedPassword = sanitize(password);
        
         const OtpToken = jwt.verify(userToken,process.env.JWT_SECRET_KEY)
        let bcrypPassword=await bcrypt.hash(sanitizedPassword,10)
        if(otp==OtpToken.otp){
    
            let user= await userModel.create({
                name:sanitizedName,
                email:sanitizedEmail,
                password:bcrypPassword
            });
            const userToken=jwt.sign({
                id:user._id,
                role: 'user'
            },
            process.env.JWT_SECRET_KEY);
            return res.cookie("userToken", userToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'User registration success'});
        }else{
            res.json({err:true,message:'something went wrong'})
        }
    } catch (error) {
        console.log(error);
    }

}
export const resendOtp=(req,res)=>{
    const {email}=req.body;
    const sanitizedEmail = sanitize(email);
    let otp=randomNumber()
    console.log(otp);
           sentOTP(sanitizedEmail,otp);
            const userToken=jwt.sign({
                otp:otp,

            },
            process.env.JWT_SECRET_KEY);
            return res.cookie("resetToken", userToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'Otp Resend successfull'});
}


export const forgotPassword=async(req,res)=>{
    const {email}=req.body
    const sanitizedEmail = sanitize(email);
    let oldUser=await userModel.findOne({email:sanitizedEmail})
    if(oldUser){
        let otp=randomNumber()
        console.log(otp);
        sentOTP(sanitizedEmail,otp)
           const userToken=jwt.sign({
                otp:otp,

            },
            process.env.JWT_SECRET_KEY);
            return res.cookie("resetToken", userToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'Otp send successfull'});
            
        
    }else{
        res.json({err:true,message:'Email is not registered'})
    }
}
export const VerifyResetOtp=async(req,res)=>{
    let otp=req.body.OTP;
    let userToken=req.cookies.resetToken;
    console.log(userToken);
     const OtpToken = jwt.verify(userToken,process.env.JWT_SECRET_KEY)
    if(otp==OtpToken.otp){
        res.json({err:false})
    }else{
        res.json({err:true})
    }
}

export const resetpassword=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    let bcrypPassword=await bcrypt.hash(password,10)
    await userModel.updateOne({email:email},{$set:{
        password:bcrypPassword
    }}).then((result)=>{
        res.json({err:false,result,message:'Reset password successfull'})
    }).catch(err=>{
        res.json({err:true,message:'something went wrong'})
    })
}

export const userLogin=async(req,res)=>{
    try {
      let {email,password}=req.body;
      const sanitizedEmail = sanitize(email);
      const sanitizedPassword = sanitize(password);
      let user=await userModel.findOne({email:sanitizedEmail})
      if(user ){
            let status= await bcrypt.compare(sanitizedPassword,user.password)
            if(status){
                const userToken=jwt.sign({
                    id:user._id,
                    role:'user'
                },process.env.JWT_SECRET_KEY);
                return res.cookie("userToken", userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'User login success',user}); 
            }else{
                res.json({err:true,message:"Invalid email or password"})
            }
         
      }else{
          res.json({err:true,message:'No user found, please signup.'})
      }
    } catch (error) {
      console.log(error);
    }
  }

  export const userLogout = (req, res) => {
    return res
      .cookie('userToken', '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .cookie('signupToken', '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .json({ err: false, message: 'Logged out successfully' });
  };
  
  export const userCheckAuth=async(req,res)=>{
    const token = req.cookies.userToken;
    if(token){
    const verifyJwt= jwt.verify(token,process.env.JWT_SECRET_KEY);
    let ID=verifyJwt.id;
    const user=await userModel.findOne({_id:ID})
    if(user.ban==true){
        res.json({logged:false,err:true,message:'user banned',ban:true})
    }else{
        res.json({logged:true,details:user,ban:false})
    }
    }else{
     res.json({logged:false,err:true,message:'No token',ban:false})
    }
 }