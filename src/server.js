//Import global files
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import session from 'express-session'

//Import local files
import userRouter from './routes/authentication.js'
import homepageRouter from './routes/homepage.js'

const app = express();

//Render file .ejs with css applied 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'publics')))

//Setting up the view engine
app.set('view engine', 'ejs')

//Indicate to use the signed cookies
app.use(cookieParser())

//___________________________________________
app.use(express.urlencoded({extended: true}))

//Setting up routes
app.use(homepageRouter)
app.use(userRouter);

//Creating port
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))