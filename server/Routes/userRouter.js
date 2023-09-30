import express from 'express'
import { forgotPassword, resendOtp, resetpassword, userCheckAuth, userLogin, userLogout, userSignup, VerifyResetOtp, verifyUserSignup } from '../Controller/authentication.js'
import { createChat, userDetails } from '../Controller/chat.js'
import { updateUser, userData } from '../Controller/userProfile.js'
import upload from '../Helpers/multer.js'
import { verifyUser } from '../Middlewares/userAuth.js'
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/login',userLogin).get('/logout',userLogout)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)
router.post('/forgotPassword',forgotPassword).post('/resetPassword',resetpassword).post('/verifyResetOtp',VerifyResetOtp)
router.use(verifyUser)
router.get('/userdetails',userDetails)
router.get('/singleUser',userData).post('/updateUser',upload.single('files'),updateUser)
router.post('/createChat',createChat)
export default router                                  