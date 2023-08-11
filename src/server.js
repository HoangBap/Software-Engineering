import express from 'express'
import userRouter from './routes/authentication.js'
const app = express();

//___________________________________________
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');

//Routes
app.use('/', userRouter);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))