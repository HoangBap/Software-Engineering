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

router
    .route('/health_monitoring')
    .get(checkValid, (req, res) => {
        res.render('health_monitoring')
    })

router
    .route('/bmi')
    .get(checkValid, (req, res) => {
        res.render('bmi')
    })
export default router
