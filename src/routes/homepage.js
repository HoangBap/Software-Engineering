import express from 'express'
const router = express.Router()

router
    .route('/homepage')
    .get((req, res) => {
        console.log("Accessing the homepage!")
        const userID = req.cookies.userID
        console.log('User ', userID)
        res.render("homepage")
    })

router
    .route('/editprofile')
    .get((req, res)=> {
        console.log("Accessing edit profile function")
        res.render("editprofile")
    })

export default router
