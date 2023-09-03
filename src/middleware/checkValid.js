import { getUserByID } from "../models/user.js"

export async function checkValid(req, res, next) {
    if (!req.signedCookies.userID || !req.cookies.email){
        res.clearCookie('userID')
        res.clearCookie('email')
        res.redirect('/login')
        return 
    }

    const isRealUser = await getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        next()
    }
    
    else {
        res.clearCookie('userID')
        res.clearCookie('email')
        res.redirect('/login')
        return 
    }
}