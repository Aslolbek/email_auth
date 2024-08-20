const jwt = require("jsonwebtoken")
const config = require("../../config/index")


const sign = async (payload) => await jwt.sign(payload, config.Key)
const verify = async (payload) =>{
    try {
     
       return  await jwt.verify(payload, config.Key)  
    } catch (error) {
        
    }
  
} 


module.exports = {
    sign,
    verify
}