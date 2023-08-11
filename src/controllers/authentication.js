import {getUser, createUser, authenticateUser} from '../database.js'
import bcrypt from 'bcrypt'
const controller = {}
const saltRounds = 10; // so vong lap hash password

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

            const hashed_pass = await bcrypt.hash(user_password, saltRounds)
            createUser(email, hashed_pass, email) //Add the user to the database
            res.render("dashboard", {email: req.body.email})
        }
    }
}

controller.login = async (req, res) => {
    const { email, user_password } = req.body;
    console.log('mail', email, 'pass', user_password );
    // Checking if there are any empty fields
    if (!email || !user_password) {
        console.log('User must fill all the empty fields!');
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    }

    const cur_user = await getUser(email); // Assuming getUser returns user data

    if (!cur_user) { 
        console.log('User not found');
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    }

    const hashed_pass = await bcrypt.hash(user_password, saltRounds) // hash pass to compare with hashed pass in database
    console.log('hash xong r ne', hashed_pass)
    const isPasswordMatch = await authenticateUser(email, hashed_pass)

    if (isPasswordMatch) { // Successfully
        console.log(`Welcome back, ${email}!`);
        return res.render("dashboard", { email: req.body.email });
    } else {
        console.log('Incorrect password');
        return res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
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