import express from 'express'
import profile_controller from '../controllers/profileModification.js'

const router = express.Router()

router.get('/profile', profile_controller.viewprofile)
router.get('/view-profile', profile_controller.sendprofile)

router
    .route('/edit_profile')
    .get(profile_controller.getprofile)
    .post(profile_controller.updateprofile)

export default router