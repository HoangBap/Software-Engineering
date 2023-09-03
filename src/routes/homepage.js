import express from 'express'
import controller from '../controllers/homepage.js'
import { checkValid } from '../middleware/checkValid.js'

const router = express.Router()

router
    .route('/landing_page')
    .get(controller.landingpageView)
    
router
    .route('/mainpage')
    .get(checkValid, controller.mainpageView)

export default router
