const express = require("express")
require("dotenv").config()
const cors = require("cors")
const file = require("express-fileupload")
const path = require("path")
const router = require("./routers")
const config = require("../config/index.js")

const cookie = require("cookie-parser")

try {
     
    const  app = express()
    
app.use(express.json())
app.use(cors({
    origin:'*',
}))
app.use(cookie())
app.use(express.urlencoded({extended: true}));
app.use(file())

app.use(express.static(process.cwd() + "/src/public"));
app.use(express.static(process.cwd() + "/uploads"));

app.use(router)
app.listen(5000, ()=>{
    console.log(5000);
})

} catch (error) {
    console.log(error.message);
    
}
