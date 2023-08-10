//js
const express = require('express');
const {registerView, loginView } = require('../controllers/loginController');
const router = express.Router();

router
    .route('/login')
    .get(loginView)
    .post((req, res) => {
        const isValid = false
        if (isValid) {
            user = {name: req.body.username}
            res.redirect('/users/')
        }
        else {
            console.log("Error")
            res.render('login', {name: req.body.name})
        }
        console.log(req.body.name)
    })
router.get('/register', registerView);

module.exports = router;