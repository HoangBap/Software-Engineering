import express from 'express'
import router from './routes/login.js'
import {getAllData, getUser, createUser} from './database.js'

const app = express();

//Dang test code voi database______________
app.get('/database', async(req, res) => {
    const user = await getAllData()
    console.log(user)
    res.send(user)
})

app.get('/database/:username', async(req, res) => {
    const username = req.params.username
    console.log(username)
    const user = await getUser(username)
    console.log(user)
    res.send(user)
})
//___________________________________________
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');

//Routes
app.use('/', router);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))