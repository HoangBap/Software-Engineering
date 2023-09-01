import { getUserByID } from "../models/user.js"

export async function checkUserOnline(req, res, next) {
    console.log("Running this function")
    if (!req.signedCookies.userID || !req.cookies.email){
        next()
    }

    const isRealUser = await getUserByID(req.signedCookies.userID);
    if (isRealUser) {
        res.redirect('/mainpage')
        return
    }
    
    else {
        next()
    }
}
