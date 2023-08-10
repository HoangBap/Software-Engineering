//js
import express from 'express'
// import { getAllData, getUser, createUser } from '../database.js'
import {registerView, loginView } from '../controllers/loginController.js'

const router = express.Router()

router
    .route('/login')
    .get(loginView)
    .post((req, res) => {
        const isValid = false
        if (isValid) {
            user = {name: req.body.username}
            res.redirect('/users/')
        }
        else {
            console.log("Error")
            res.render('login', {name: req.body.name})
        }
        console.log(req.body.name)
    })

router.get('/', loginView)

router.get('/register', registerView)

// router.get("/login/:id", async (req, res) => {
//     const id = req.params.id
//     const note = await getUser(id)
//     res.send(note)
// })

export default router;

