import {getUser, createUser} from '../models/user.js'
import bcrypt from 'bcrypt'
const controller = {}

// Check if the email and password match the data in the database
controller.login = async (req, res) => {
    const { email, user_password } = req.body;
    console.log(`User ${email} is trying to log in!`)

    // Checking if there are any empty fields
    if (!email || !user_password) {
        console.log('User must fill all the empty fields!');
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    }

    const cur_user = await getUser(email); //Get the user with the email from the database 

    if (!cur_user) { //User is not in the database yet!
        console.log(`User ${email} not found in the database`);
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    }

    //Checking if the password match with the user's password in the database
    const isMatch = await bcrypt.compare(user_password, cur_user.user_password)
    if (isMatch) { // Successfully
        console.log(`Welcome back, ${email}!`);
        res.cookie('ID', cur_user.ID, {signed: true})
        return res.render("dashboard", { email: req.body.email });
        
    } else { //Failed
        console.log('Incorrect password');
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    }
}

controller.register = async (req, res, next) => {
    const {email, user_password, confirm} = req.body

    //Checking if there are any empty fields
    if ( !email || !user_password || !confirm) {
        console.log('User must fill all the empty fields!')
        return res.render("register.ejs", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
    } 

    //Password and confirm must match
    if (user_password != confirm) { //If not match, user must re-enter the password
        console.log('Password must match')
        return res.render("register", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
    } else {
        const cur_user = await getUser(email) //return value la mot file json
        //The email is already existed in the database!
        if (cur_user) {
            console.log("The email is already existed in the database!")
            return res.render("register", {email: req.body.email})

        } else {
            console.log(`Welcome new user ${email} to the website!`)

            const hashed_pass = await bcrypt.hash(user_password, 10)
            createUser(email, hashed_pass, email) //Add the user to the database
            return res.render("dashboard", {email: req.body.email})
        }
    }
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