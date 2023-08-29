import { createUserProfile, getUserProfile, updateUserProfile } from "../models/userProfile.js"
import { createUser, getUser } from "../models/user.js"
const controller = {}

//Update the user profile
controller.updateprofile = async (req, res) => {
    const userID = Number(req.cookies.userID) //data stored in cookie is a string so need to be converted to int value
    const {fullname, phone_number, date_of_birth, gender, home_address, country} = req.body

    console.log(fullname)
    console.log("User trying to update the profile")
    
    const flag = await updateUserProfile(userID, fullname, phone_number, gender, home_address, country, date_of_birth)
    if(flag) {
        console.log('Function update user is working fine')
    } else {
        console.log('Something is wrong!')
    }
    
    res.redirect("homepage")
    return 
}

controller.getprofile = async (req, res) => {
    const userID = req.cookies.userID
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
    const userID = req.cookies.userID
    const email = req.cookies.email

    if(!userID) {
        console.log('Cannot retrieve the cookie!')
        return
    }
    console.log('UserID: ', userID)

    const user_profile = await getUserProfile(userID)
    res.render("profile")
    return
}
export default controller
