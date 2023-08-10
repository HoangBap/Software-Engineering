const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');

//Routes
const userRouter = require('./routes/login')
app.use('/', userRouter);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))