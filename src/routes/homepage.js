import express from 'express'
import controller from '../controllers/homepage.js'
import { checkValid } from '../middleware/checkValid.js'

const router = express.Router()

router.get('/', controller.landingpageView)
router.get('/landing_page', controller.landingpageView)
    
router
    .route('/mainpage')
    .get(checkValid, controller.mainpageView)

router
    .route('/health_monitoring')
    .get(checkValid, controller.viewHealthMonitor)

router
    .route('/bmi')
    .get(checkValid, controller.viewBMI) 
export default router
