import express from 'express'
import profile_controller from '../controllers/profileModification.js'

const router = express.Router()

router.get('/profile', profile_controller.viewprofile)

router
    .route('/editprofile')
    .get(profile_controller.getprofile)
    .post(profile_controller.updateprofile)

export default router