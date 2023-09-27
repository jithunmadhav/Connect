import jwt from 'jsonwebtoken'
import userModel from '../Model/userSchema.js';
export const verifyUser = async (req, res, next) => {
    const token = req.cookies.userToken;
    if (token) {
      try {
        const verifyJwt = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userID = verifyJwt.id;
        const user = await userModel.findOne({ _id: userID });
        
        if(user){
            next();
        }else{
            res.json({ logged: false, err: true, message: 'No user found' });
        }
        
      } catch (error) {
        res.json({ logged: false, err: true, message: 'Invalid token' });
      }
    } else {
      res.json({ logged: false, err: true, message: 'No token' });
    }
  };
  