import {getUser, getUserByID, createUser, updatePassword} from '../models/user.js'
import {createUserProfile} from '../models/userProfile.js'
import bcrypt from 'bcrypt'

const controller = {}

// Check if the email and password match the data in the database
controller.login = async (req, res) => {
    const { email, password } = req.body;
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
        res.json({flag: false});
        return 
    }

    //Checking if the password match with the user's password in the database
    const isMatch = await bcrypt.compare(password, cur_user.user_password)
    if (isMatch) { // Successfully
        console.log(`Welcome back, ${email}!`)

        res.cookie(`userID`, cur_user.ID, {signed: true})
        res.cookie(`email`, cur_user.email)

        res.json({flag: true})
        
    } else { //Failed
        console.log('Incorrect password');
        res.json({flag: false});
    }
}

controller.register = async (req, res, next) => {
    const {email, password} = req.body
    console.log(`User ${email} is trying to register`)

    const cur_user = await getUser(email) //return value la mot file json
    //The email is already existed in the database!
    if (cur_user) {
        console.log("The email is already existed in the database!")
        res.json({flag: false}) 
        return 

    } else {
        console.log(`Welcome new user ${email} to the website!`)

        const hashed_pass = await bcrypt.hash(password, 10)
        const userID = await createUser(email, hashed_pass) //Add the user to the database

        await createUserProfile(userID) //creating the initial profile for the user

        //Sending cookie back to the client
        res.cookie(`userID`, userID, {signed: true})
        res.cookie(`email`, email)

        res.json({flag: true})
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
        res.json({ flag: true})
    }
    else{
        res.json({flag: false})
    }
}


controller.confirmOTP = async (req, res) =>{
    const {email, otp } = req.query
    const response = await fetch(`https://api.airtable.com/v0/appLJelkbGDaNk8Me/OTP?maxRecords=1&view=Active%20OTP&filterByFormula=${encodeURIComponent(`AND(Mail="${email}", OTP="${otp}")`)}`,
    
    {
        method: "GET",
        headers: {
            "Authorization": "Bearer patOUXhqU5qIghdet.8bdd0b668ff022459ce49b3ca499b6c09fe2eedbd2fe44d67c17783699fe16a3"
        }
    })
    const otps = await response.json();
    //console.log('response ne ', response)
    //console.log('otp ', otps)
    //console.log(otps.records.length)
    if (otps.records.length) {
        res.json({flag: true})
    }else {
        res.json({flag: false})
    }
}

controller.repassword = async(req, res) =>{
    const { new_password } = req.body
    const { email } = req.query
    const hashed_new_pass = await bcrypt.hash(new_password, 10)
    const mess = await updatePassword(email, hashed_new_pass)
    if (mess){
        res.json({flag: true})
    }
    else{
        res.json({flag: false})
    }
}


export default controller