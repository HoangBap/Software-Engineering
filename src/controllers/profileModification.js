import { getUserProfile, updateUserProfile } from "../models/userProfile.js"
import { getUser } from "../models/user.js"
const controller = {}

//Update the user profile
controller.updateprofile = async (req, res) => {
    const userID = req.signedCookies.userID
    const {Fullname, Phone_number, Date_of_birth, Gender, Address, Country} = req.body
    const flag = await updateUserProfile(userID, Fullname, Phone_number, Gender, Address, Country, Date_of_birth)
    if(flag) {
        console.log('Function update user\'s profile is working fine')
    } else {
        console.log('Something is wrong!')
    }
    
    res.redirect("profile")
    return 
}

controller.getprofile = async (req, res) => {
    const userID = req.signedCookies.userID
    const email = req.cookies.email

    if(!userID) {
        console.log('Can not retrieve the cookie!')
        return 
    }

    const user_profile = await getUserProfile(userID)
    res.render("edit_profile", {email: email, fullname: user_profile.fullname, phone_number: user_profile.phone_number, gender: user_profile.gender, home_address: user_profile.home_address, country: user_profile.country, date_of_birth: user_profile.date_of_birth})
    return 
}

controller.viewprofile = async(req, res) => {
    res.render('profile')
}

controller.sendprofile = async(req, res) => {
    const userID = req.signedCookies.userID
    const email = req.cookies.email
    if(!userID) {
        console.log('Cannot retrieve the cookie!')
        return
    }

    const user_profile = await getUserProfile(userID)
    res.json({email: email, fullname: user_profile.fullname, phone_number: user_profile.phone_number, date_of_birth: user_profile.date_of_birth, gender: user_profile.gender, address: user_profile.home_address, country: user_profile.country})
    return
}

export default controller
