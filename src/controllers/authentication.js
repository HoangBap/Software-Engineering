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

        res.redirect("landing_page")
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
            res.redirect("login")
            return 

        } else {
            console.log(`Welcome new user ${email} to the website!`)

            const hashed_pass = await bcrypt.hash(user_password, 10)
            const userID = await createUser(email, hashed_pass) //Add the user to the database
 
            await createUserProfile(userID) //creating the initial profile for the user

            //Sending cookie back to the client
            res.cookie(`userID`, userID, {signed: true})
            res.cookie(`email`, email)

            res.redirect("/landing_page")
        }
    }
    return 
}

controller.loginView = (req, res) => {
    if (!req.signedCookies.userID || !req.cookies.email){
        res.render('login')
        return 
    }

    const isRealUser = getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        res.redirect('/landing_page')
    }
    
    else {
        res.clearCookie('userID')
        res.clearCookie('email')
        res.render('login')
    }
}

controller.registerView = (req, res) => {
    if (!req.signedCookies.userID || !req.cookies.email){
        res.render('register')
        return 
    }

    const isRealUser = getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        res.redirect('/landing_page')
    }
    
    else {
        res.clearCookies('userID')
        res.clearCookies('email')
        res.redirect('register')
    }
}

controller.logoutView = (req, res) => {
    console.log("Nothing here to see, logout function will be out soon")
}

controller.logout = (req, res) => {
    res.clearCookies('userID')
    res.clearCookies('email')

    res.redirect('login')
}

controller.forgotPassView = (req, res) =>{
    console.log("Nothing here to see, forgot password function will be out soon")
}

controller.confirmEmail = async (req, res) => {
    const {email} = req.query
    // console.log(req.query)
    const cur_user = await getUser(email) //return value la mot file json
    //console.log(email)
        //The email is already existed in the database!
    if (cur_user) {
        await fetch(`https://hooks.airtable.com/workflows/v1/genericWebhook/appLJelkbGDaNk8Me/wfloBgRlxfkMH5tBU/wtrDxFneJOx8sQ7p4`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({'mail': email})
        })
        console.log(`OTP sent successfully to ${email}!`)
        res.json({ flag: 1})
    }
    else{
        res.json({flag : 2})
    }
}


controller.confirmOTP = async (req, res) =>{
    const {email, otp } = req.query
    const response = await fetch(`https://api.airtable.com/v0/appLJelkbGDaNk8Me/OTP?maxRecords=1&view=Active%20OTP&filter=${encodeURIComponent(`AND(Mail='${email}', OTP='${otp}')`)}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer patOUXhqU5qIghdet.8bdd0b668ff022459ce49b3ca499b6c09fe2eedbd2fe44d67c17783699fe16a3"
        }
    })
    const otps = await response.json();
    //console.log(otps)
    if (otps.records.length) {
        res.json({message: "OTP OK"})
    }else {
        res.json({message: "OTP Not OK"})
    }
}

export default controller