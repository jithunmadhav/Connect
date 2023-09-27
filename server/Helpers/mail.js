import nodemailer from 'nodemailer'

export const sentOTP=(email, otp)=> {
    return new Promise((resolve, reject)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
  var mailOptions = {
      from:process.env.EMAIL,
      to: email,
      subject: "URLencrypto Email verification",
      html: `
                <h1>Verify Your Email For URLencrypto</h1>
                  <h3>use this code <h2>${otp}</h2> to verify your email</h3>
                 
               `
  };
  transporter.sendMail(mailOptions,(err,res)=>{
      if(err){
          console.log(err);
      }
      else {
  
      }
  });
    })
    
}