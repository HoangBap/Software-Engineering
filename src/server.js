import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import userRouter from './routes/authentication.js'
import homepageRouter from './routes/homepage.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//___________________________________________
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'publics')))

app.set('view engine', 'ejs');

//Routes
app.use('/', homepageRouter)
app.use('/', userRouter);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))