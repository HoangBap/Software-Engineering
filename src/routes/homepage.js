import express from 'express'
import controller from '../controllers/homepage.js'
const router = express.Router()

router
    .route('/homepage')
    .get(controller.homePageView)
    
export default router
