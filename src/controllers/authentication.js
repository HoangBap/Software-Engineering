import {getUser, getUserByID, createUser} from '../models/user.js'
import {createUserProfile} from '../models/userProfile.js'
import bcrypt from 'bcrypt'

const controller = {}

// Check if the email and password match the data in the database
controller.login = async (req, res) => {
    const { email, user_password } = req.body;
    console.log(`User ${email} is trying to log in!`)

    // // Checking if there are any empty fields
    // if (!email || !user_password) {
    //     console.log('User must fill all the empty fields!');
    //     res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
    //     return 
    // }

    const cur_user = await getUser(email); //Get the user with the email from the database 
    if (!cur_user) { //User is not in the database yet!
        console.log(`User ${email} not found in the database`);
        res.render("login", { email: req.body.email, user_password: req.body.user_password || null });
        return 
    }

    //Checking if the password match with the user's password in the database
    const isMatch = await bcrypt.compare(user_password, cur_user.user_password)
    if (isMatch) { // Successfully
        console.log(`Welcome back, ${email}!`)

        res.cookie(`userID`, cur_user.ID, {signed: true})
        res.cookie(`email`, cur_user.email)

        res.redirect("mainpage")
        return
        
    } else { //Failed
        console.log('Incorrect password');
        res.render("login", { email: req.body.email });
    }
}

controller.register = async (req, res, next) => {
    const {email, user_password, confirm} = req.body
    console.log(`User ${email} is trying to register`)
    // //Checking if there are any empty fields
    // if ( !email || !user_password || !confirm) {
    //     console.log('User must fill all the empty fields!')
    //     res.render("register.ejs", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
    //     return 
    // } 

    //Password and confirm must match
    if (user_password != confirm) { //If not match, user must re-enter the password
        console.log('Password must match')
        res.render("register", {email: req.body.email, user_password: req.body.user_password, confirm: req.body.confirm || null})
        return 

    } else {
        const cur_user = await getUser(email) //return value la mot file json
        //The email is already existed in the database!
        if (cur_user) {
            console.log("The email is already existed in the database!")
            res.redirect("register")
            return 

        } else {
            console.log(`Welcome new user ${email} to the website!`)

            const hashed_pass = await bcrypt.hash(user_password, 10)
            const userID = await createUser(email, hashed_pass) //Add the user to the database
 
            await createUserProfile(userID) //creating the initial profile for the user

            //Sending cookie back to the client
            res.cookie(`userID`, userID, {signed: true})
            res.cookie(`email`, email)

            res.redirect("/mainpage")
        }
    }
    return 
}

controller.loginView = (req, res) => {
    res.render('login')
}

controller.registerView = (req, res) => {
    res.render('register')
}

controller.logout = (req, res) => {
    res.clearCookie('userID')
    res.clearCookie('email')

    res.redirect('login')
}

export default controller