require("dotenv").config()

const {env}=process

 const config = {
    Key: env.SECRET_KEY,
    PORT : +env.PORT
}

module.exports=config
