//Checking if the user has accessed the website before
import { getUser } from "../models/user.js"
export async function checkingUser(req, res) {
    const email = req.cookies.email
    console.log(email)
    if (email) {
        const user = await getUser(email)
        res.render("login", {email: email})
        return true
    }

    return false
}