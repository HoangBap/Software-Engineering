//js
import express from 'express'
import controller from '../controllers/authentication.js'
import { checkUserOnline } from '../middleware/checkUser.js'
import { checkValid } from '../middleware/checkValid.js'
const router = express.Router()

router.get('/login', checkUserOnline, controller.loginView)    
router.post('/check-login', controller.login) 
    
router.get('/register', checkUserOnline, controller.registerView)
router.post('/check-register', controller.register)

router.get('/logout', controller.logout)

export default router;

