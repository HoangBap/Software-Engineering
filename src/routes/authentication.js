//js
import express from 'express'
import controller from '../controllers/authentication.js'
const router = express.Router()

router 
    .route('/login')
    .get(controller.loginView)   
    .post(controller.login)  
    
router
    .route('/register')
    .get(controller.registerView)
    .post(controller.register)

router
    .route('/logout')
    .get(controller.logoutView)
    .post(controller.logout)

router
    .route('/forgot-password')
    .get(controller.forgotPassView)

router
    .route('/confirm-otp')
    .get(controller.confirmOTP)

router
    .route('/confirm-email')
    .get(controller.confirmEmail)

router
    .route('/reset-password')
    .post(controller.repassword)



// router
//     .route('/logout')
//     .get(controller.logout)
//     .post(controller.logout)

export default router;