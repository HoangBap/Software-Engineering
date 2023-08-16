import { createUserProfile, getUserProfile, updateUserProfile } from "../models/userProfile"
import { createUser, getUser } from "../models/user"
const profile_controller = {}

profile_controller.updateprofile = async (req, res) => {
    const {email, fullname, phone_number, gender, home_address, country, date_of_birth} = req.body
    
    const cur_user = await getUser(email)
    if(!cur_user) {
        console.log("Something is wrong with the table userprofile!!")
        return res.render("login.js")
    }

    updateUserProfile(cur_user.ID, fullname, phone_number, gender, home_address, country, date_of_birth)
}

profile_controller.createprofile = async (req, res) => {
    const {email} = req.body.email
    const cur_user = await getUser(email)

    if(!cur_user) {
        console.log("Something is wrong with the table userprofile!")
        return res.render("login.js")
    }
    
    createUserProfile(cur_user.ID)
}

