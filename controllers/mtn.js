const https = require("https")
const {Products} = require("../models/user");
const { default: axios } = require("axios");

const gifting =async(q,r)=>{
    await axios.get('https://smedata.ng/wp-json/api/v1/data', {
    params: {
    size:"500MB",
    network:"MTN",
    phone:"07074297959",
    token:"b1b2fce9371a0be8a1c65a6bc"
  }
})
.then(response => {
  r.send(response.data); 
})
.catch(error => {
  console.error(error);
});
}
 const share =async(req,res)=>{
res.sendStatus(200)
}

const createUser =async(req,res)=>{
    const {name,email,phone,address,user,password,pin} =req.body;

    try {
     await Products.create({
                   
                    name:name,
                    email:email,
                    phone:phone,
                    address:address,
                    pin:pin,
                    user:user,
                    pass:password, 
                     }) 
        res.send("created successfully")
    } catch (error) {
        res.json(error)
    }
}

const getUsers =async(req,res)=>{
    try {
          const users = await Products.find({})
          res.json(users)
    } catch (error) {
          res.json(error.message)
    }
  
}

const getOneUser = async(req,res)=>{
    const {id} = req.params
    try {
        const users = await Products.findById({_id:id})
          res.json(users)
    } catch (error) {
          res.json(error.message)
    }
  
}


module.exports = {share,gifting,getOneUser,getUsers,createUser}