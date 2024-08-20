const {Router}=require("express")
const {  register, login, email } = require("../controller/auth.controler")
const isAuth = require("../middlewares/isAuth")

const router = Router()




router.post("/register",  register)
router.post("/login", login)
router.post("/email", email)



module.exports=router