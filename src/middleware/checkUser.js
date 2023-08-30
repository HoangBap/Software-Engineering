import { getUserByID } from "../models/user.js"

export async function checkUserOnline(req, res, next) {
    console.log("Running this function")
    if (!req.signedCookies.userID || !req.cookies.email){
        res.send('error')
        next()
    }

    const isRealUser = await getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        res.redirect('/homepage')
        next()
    }
    
    else {
        res.clearCookie('userID')
        res.clearCookie('email')
        next()
    }
}
