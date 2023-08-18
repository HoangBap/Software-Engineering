import express from 'express'
const router = express.Router()

router
    .route('/homepage')
    .get((req, res) => {
        const user = req.cookies.email
        console.log(`User ${email} is accessing the homepage!`)
    })

router
    .route('/editprofile')
    .get((req, res)=> {
        console.log("Accessing edit profile function")
        const email = req.cookies.email
        console.log(`User ${email} is editing the profile`)
        res.render("editprofile")
    })
    .post((req, res)=> {
        
    })

export default router
