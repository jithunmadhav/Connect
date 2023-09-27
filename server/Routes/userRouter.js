import express from 'express'
import { forgotPassword, resendOtp, resetpassword, userCheckAuth, userLogin, userLogout, userSignup, VerifyResetOtp, verifyUserSignup } from '../Controller/userController.js'
import { verifyUser } from '../Middlewares/userAuth.js'
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/login',userLogin).get('/logout',userLogout)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)
router.post('/forgotPassword',forgotPassword).post('/resetPassword',resetpassword).post('/verifyResetOtp',VerifyResetOtp)
// router.use(verifyUser)
export default router                                  