const { verify } = require("../libs/jwt");

const isAuth =  (req, res, next) => {
  try {
    const {status}= req.user
    console.log(status);

    if (status==="active") next();
     console.log(status);
  } catch (error) {
    res.status(403).json({message:"error in token", data:`${error.message}`});
  }
};

module.exports = isAuth;