const pg =require("../libs/pg")
const bcrypt = require("../libs/bcrypt")
const jwt = require("../libs/jwt")

const nodemailer = require("nodemailer");

const isAuth = require("../middlewares/isAuth")
const shortid = require("shortid")
// const Redis = require("ioredis")

// const redis = new Redis({
//     port:6379,
//     host:'127.0.0.1',
// })





const register = async (req, res) => {
    try {
        const {username, password, email} = req.body

        const user = (await pg(`select * from users where username=$1`, username))[0]

        if(user){
          return  res.status(404).json({message:"username foydalanilgan"})
        }

        const heshpassword = await bcrypt.hesh(password)

        await pg(`insert into users(username, password, email) Values($1, $2, $3)`, username, heshpassword, email)

        res.status(200).json({message: "Success"})
    } catch (error) {
        console.log(error);
        
    }
}

const login = async (req, res) =>{
    try {
        
        const {username, password} = req.body

        const user = (await pg(`select * from users where username=$1`, username))[0]

        if(!user){
            res.status(404).json({message:"Foydalanuvchi topilmadi"})
        }
        console.log(user.password);
        

        const check = await bcrypt.compare(password, user.password)

        if(!check){

            const token = await jwt.sign(user.id)

            res.cookie("token", token)

            res.status(200).json({message:"Success"})

        }else{
            res.status(400).json({message:"Parol xato"})
            
        }
    } catch (error) {
        console.log(error);
    }
}




const email = async (req, res) =>{
    try {

        const {username} = req.body

        const user = (await pg(`select * from users where username=$1`, username))[0]

        if(!user){
          return  res.status(400).json({message:`${username} nomiga ega foydalanuvchi mavjud emas`})
        }

        const newpassword = await shortid.generate()

        const heshpassword = await bcrypt.hesh(newpassword)

       
        await pg(`update users set password=$1 where username=$2`, heshpassword, username )

        const transporter = nodemailer.createTransport({
            port: 465, 
            host: "smtp.gmail.com",
            auth: {
              user: "asrorabdiamnnonov464@gmail.com",
              pass: "Asrorbek1",
            },
            secure: true,
          });
          
          const mailData = {
            from: "asrorabdiamnnonov464@gmail.com", 
            to: `${user.email}`, 
            subject: "istalgan mavzu",
            text: `Kod:${newpassword}`
          };

          await transporter.sendMail(mailData);

          res.status(200).json({message:"success"})

          

    } catch (error) {
        console.log(error);
        
    }
}





module.exports ={
    register,
    login,
    email
}













// const SignUp =async (req,  res )=>{

//     const {firstname, lastname, phone, email, password}= req.body

//     const chekemail =false
//     if(chekemail){
//         res.status(400).json("Bu Email bilan ro'yxatdan o'tilgan")
//     }else{

//         const transporter = nodemailer.createTransport({
//             port: 465, 
//             host: "smtp.gmail.com",
//             auth: {
//               user: "nasirullayevo7@gmail.com",
//               pass: "smenmggcgonbqmwl",
//             },
//             secure: true,
//           });
//           const password = await shortid.generate()
//           const mailData = {
//             from: "nasirullayevo7@gmail.com", 
//             to: `${email}`, 
//             subject: "Sending Email using Node.js",
//             text: `Tasdiqlash uchun havolani bosing: http://localhost:8000/confirm/${password}/${email}`
//           };

        
//           await transporter.sendMail(mailData);

          
//             await redis.set(`${email}`, JSON.stringify(`${password}`))
        

//       const password_hesh =await bcrypt.hesh(password)

    
//     res.status(201).json("Email ga tasdiqlash uchun havola yuborildi") 

//     }
    
// }

// const SignIn = async (req, res)=>{

//     try {
//         const {email, password} = req.body
//         const user = (await pg(`select * from users where email=$1`, email))[0]
        
//         if(!user){
            
//             res.status(403).json("email topilmadi")
            
//         }else {
            
//             const chec = await bcrypt.passcompare(password, user.password)
//             if(chec){
//                 const token = await jwt.sign(user.id)
//                 res.cookie("token",token)
//                 res.status(201).json({message:"Tizmmiga kirdingiz", data:`${token}`})
//             }else{
//                 res.status(201).json("parol xato")
//             }
//         }
//     } catch (error) {
//         res.status(403).json({message:`${error.message}`})
//     }
//     }

//     const confirmation = async (req, res) => {

//        const {password, email} = req.params
//        redis.get(`${email}`, async (err, data) =>{
        
//         if(data === password)

//        res.send('Tasdiqlandi! Sizning hisobingiz aktivlashdi.');

//       })
        
//     }
    
    
//     module.exports={
//         SignUp,
//         SignIn,
//         confirmation
// }
