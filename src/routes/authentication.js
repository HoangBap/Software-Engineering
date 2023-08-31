//js
import express from 'express'
import controller from '../controllers/authentication.js'
import { checkUserOnline } from '../middleware/checkUser.js'
const router = express.Router()

router 
    .route('/login')
    .get(checkUserOnline, controller.loginView)   
    .post(controller.login)  
    
router
    .route('/register')
    .get(checkUserOnline, controller.registerView)
    .post(controller.register)

router
    .route('/logout')
    .get(controller.logoutView)
    .post(controller.logout)

// router
//     .route('/logout')
//     .get(controller.logout)
//     .post(controller.logout)

export default router;

