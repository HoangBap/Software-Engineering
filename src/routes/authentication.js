//js
import express from 'express'
import controller from '../controllers/authentication.js'
import { checkUserOnline } from '../middleware/checkUser.js'
import { checkValid } from '../middleware/checkValid.js'
const router = express.Router()

//Login
router.get('/login', checkUserOnline, controller.loginView)    
router.post('/check-login', controller.login) 
//Register
router.get('/register', checkUserOnline, controller.registerView)
router.post('/check-register', controller.register)
//Logout
router.get('/logout', controller.logout)

//Forgot password
router.get('/forgot_pass', checkUserOnline, controller.forgotPassView) //Show forgot password page to the user
router.post('/check-forgot-email',controller.confirmEmail) //Check if the email is existed in the DB
router.get('/OTP_confirm', checkUserOnline, controller.viewPageOTP) //Show OTP page to the user
router.post('/check-OTP', controller.confirmOTP) //Check if the OTP code is correct
router.get('/re_pass_page', checkUserOnline, controller.viewRepassPage) //Show reset password to the user
router.post('/new-pass', controller.repassword) //Reset the password of the user's account

export default router;