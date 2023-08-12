import express from "express";
import morgan from "morgan";
import cors from "cors"
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
import path from "path"

const port = process.env.PORT || 3000

const app = express();

//Middlewares
require('dotenv').config();
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({useTempFiles: true}))

//Routes
app.use('/',require('./routes/auth.routes'))
app.use('/profesor',require('./routes/profesor.routes'))
app.use('/student',require('./routes/student.routes'))


//Middlewares from Vue
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))
//Settings
app.listen(port, ()=>{
    console.log("serve run on port "+ port)
})
