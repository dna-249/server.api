const jwt = require("jsonwebtoken")

const{ Products }= require("../models/user");

 const userLogin = async (req,res,next) =>{
  try {
    const {user, password} = req.body;

    console.log(user,password)
    const teacher = await Products.findOne({user:user,pass:password})
    if(!teacher) {
        res.status(404).json("not found")
    }
    const token = jwt.sign({user:teacher.user,pass:teacher.pass},process.env.secret)
    console.log(token)
    res.send(token)
    
    next()
  } catch (error) {
   console.log(error) 
  }
}


const userVerify = async (req,res,next)=>{
    const {header,name,password} = req.body

    try {
       const token = await header;
       const teacher = await Products.findOne({user:name,pass:password})
       if(!token){
        console.log("access denied")
       } 
       const verified = jwt.verify(token, process.env.secret)
       req.name = verified;
       req.password = verified;
       res.send(res.json(teacher))
       next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = {userLogin, userVerify}