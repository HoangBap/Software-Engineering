//Import global files
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

//Import local files
import userRouter from './routes/authentication.js'
import homepageRouter from './routes/homepage.js'
import profileRouter from './routes/profileModification.js'
import healthRecRouter from './routes/userHealthRecord.js'
import recipeRouter from './routes/recipe.js'
import exp from 'constants'

const app = express();

//Render file .ejs with css applied 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/publics')))

//Setting up the view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Indicate to use the signed cookies
app.use(cookieParser(process.env.SECRET_KEY))

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

//___________________________________________
app.use(express.urlencoded({extended: true}))

//Setting up routes
app.use(userRouter)
app.use(homepageRouter)
app.use(profileRouter)
app.use(healthRecRouter)
app.use(recipeRouter)

app.use('*', (req, res) => {
    res.status(404).render('404')
})

//Creating port
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))