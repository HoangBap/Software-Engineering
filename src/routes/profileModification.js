import express from 'express'
import profile_controller from '../controllers/profileModification.js'
import { checkValid } from '../middleware/checkValid.js'

const router = express.Router()

router.get('/profile', checkValid, profile_controller.viewprofile)
router.get('/view-profile', profile_controller.sendprofile)

router
    .route('/edit_profile')
    .get(checkValid, profile_controller.getprofile)
    .post(checkValid, profile_controller.updateprofile)

export default router