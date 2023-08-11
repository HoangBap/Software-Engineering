import {getUser, createUser} from '../database.js'
import bcrypt from 'bcrypt'
const controller = {}

controller.register = async (req, res, next) => {
    const {email, user_password, confirm} = req.body

    //Checking if there are any empty fields
    if ( !email || !user_password || !confirm) {
        console.log('User must fill all the empty fields!')
        res.render("register.ejs", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
    } 

    //Password and confirm must match
    if (user_password != confirm) { //If not match, user must re-enter the password
        console.log('Password must match')
        res.render("register", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
    } else {
        const cur_user = await getUser(email) //return value la mot file json
        //The email is already existed in the database!
        if (cur_user) {
            console.log("The email is already existed in the database!")
            res.render("register", {email: req.body.email})

        } else {
            console.log(`Welcome new user ${email} to the website!`)

            const hashed_pass = await bcrypt.hash(user_password, 10)
            createUser(email, hashed_pass, email) //Add the user to the database
            res.render("dashboard", {email: req.body.email})
        }
    }
}

controller.login = async (req, res) => {
    const {email, user_password} = req.body
    //
}

//For Register Page
controller.registerView = (req, res) => {
    res.render("register", {
    });
}

// For Login View 
controller.loginView = (req, res) => {
    res.render("login", {
    });
}

export default controller