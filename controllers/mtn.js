const https = require("https")
const {Products} = require("../models/user");
const { default: axios } = require("axios");


const gifting =async(q,r)=>{

  const {size,network,phone,userId,date,amount} = q.body;
    await axios.get('https://smedata.ng/wp-json/api/v1/data', {
    params: {
    size:size,
    network:network,
    phone:phone,
    token:"b1b2fce9371a0be8a1c65a6bc"
  }
})
.then(response => {
  transaction(userId,response.data.status,date,amount)
  r.send(response.data); 
})
.catch(error => {
  console.error(error);
});
}
 const share =async(req,res)=>{
res.sendStatus(200)
}



const api =(q,r)=>{

 const product ={ MTN_DATA:[{size:"230mb1d", network:"MTN",plan:" MTN Direct Data 230MB Daily Plan"},
               {size:"1gb1d", network:"MTN",plan:" MTN Direct Data 1GB + 1.5Mins Daily plan"},
               {size:"1gb1w", network:"MTN",plan:" MTN Direct Data 1GB Weekly plan"},
               {size:"1.5gb2d", network:"MTN",plan:" MTN Direct Data 1.5GB 2 Days Plan"},
               {size:"1.5gb1w", network:"MTN",plan:" MTN Direct Data 1.5GB Weekly plan"},
               {size:"2.5gb1d", network:"MTN",plan:" MTN Direct Data 2.5GB Daily plan"},
               {size:"2.5gb2d", network:"MTN",plan:" MTN Direct Data 2.5GB 2 Days plan"},
               {size:"2gb1m", network:"MTN",plan:" MTN Direct Data 2GB + 2Mins for 30days"},
               {size:"2.7gb1m", network:"MTN",plan:" MTN Direct Data 2.7GB + 5Mins for 30days"},
               {size:"6gb1w", network:"MTN",plan:" MTN Direct Data 6GB weekly plan"},
               {size:"3.5gb1m", network:"MTN",plan:" MTN Direct Data 3.5GB + 5Mins for 30 Days"},
               {size:"7gb1m", network:"MTN",plan:" MTN Direct Data 7GB for 30 Days"},
               {size:"10gb1m", network:"MTN",plan:" MTN Direct Data 10GB +10Mins for 30days"},
               {size:"12.5gb1m", network:"MTN",plan:" MTN Direct Data 12.5GB for 30days"},
               {size:"16.5gb1m", network:"MTN",plan:" MTN Direct Data 16.5GB + 10mins for 30days"},
               {size:"20gb1m", network:"MTN",plan:" MTN Direct Data 20GB for 30 days"},
               {size:"25gb1m", network:"MTN",plan:" MTN Direct Data 25GB Monthly plan"}],

GLO_DATA:[{size:"500MB", network:"GLO", plan:" GLO Data 500MB (SME) 30 Days"},
                    {size:"1GB", network:"GLO", plan:" GLO Data 1GB (SME) 30 Days"},
                    {size:"2GB", network:"GLO", plan:" GLO Data 2GB (SME) 30 Days"},
                    {size:"3GB", network:"GLO", plan:" GLO Data 3GB (SME) 30 Days"},
                    {size:"5GB", network:"GLO", plan:" GLO Data 5GB (SME) 30 Days"},
                    {size:"10GB", network:"GLO", plan:" GLO Data 10GB (SME) 30 Days"}],


AIRTEL_DATA :[{size:"300mb2d", network:"Airtel",  plan:" Airtel Direct Data 300MB for 2 Days"},
               { size:"500mb1w", network:"Airtel",  plan:" Airtel Direct Data 500MB Weekly Plan"},
               { size:"1gb1w", network:"Airtel",  plan:" Airtel Direct Data 1GB Weekly Plan"},
               { size:"1.5gb2d", network:"Airtel",  plan:" Airtel Direct Data 1.5GB for 2 Days"},
               { size:"1.5gb1w", network:"Airtel",  plan:" Airtel Direct Data 1.5GB Weekly Plan"},
               { size:"3.5gb1w", network:"Airtel",  plan:" Airtel Direct Data 3.5GB Weekly Plan"},
               { size:"6gb1w", network:"Airtel",  plan:" Airtel Direct Data 6GB Weekly Plan"},
               { size:"10gb1w", network:"Airtel",  plan:" Airtel Direct Data 10GB Weekly Plan"},
               { size:"15gb1w", network:"Airtel",  plan:" Airtel Direct Data 15GB Weekly Plan"},
               { size:"2gb1m", network:"Airtel",  plan:" Airtel Direct Data 2GB Monthly Plan"},
               { size:"3gb1m", network:"Airtel",  plan:" Airtel Direct Data 3GB Monthly Plan"},
               { size:"4gb1m", network:"Airtel",  plan:" Airtel Direct Data 4GB Monthly Plan"},
               { size:"8gb1m", network:"Airtel",  plan:" Airtel Direct Data 8GB Monthly Plan"},
               { size:"10gb1m", network:"Airtel",  plan:" Airtel Direct Data 10GB Monthly Plan"},
               { size:"13gb1m", network:"Airtel",  plan:" Airtel Direct Data 13GB Monthly Plan"},
               { size:"18gb1m", network:"Airtel",  plan:" Airtel Direct Data 18GB Monthly Plan"},
               { size:"25gb1m", network:"Airtel",  plan:" Airtel Direct Data 25GB Monthly Plan"},
               { size:"35gb1m", network:"Airtel",  plan:" Airtel Direct Data 35GB Monthly Plan"}]}

                r.json(product)
}

const createUser =async(req,res)=>{
    const {name,email,phone,address,user,password,pin,date,size,amount,network,status} =req.body;

    try {
     await Products.create({
                   
                    name:name,
                    email:email,
                    phone:phone,
                    address:address,
                    pin:pin,
                    user:user,
                    pass:password, 
                    transaction:[{
                    size:size,
                    network:network,
                    amount:amount,
                    date:date,
                    status:status}]
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
const transaction = async(userId,status,date,amount)=>{
    try {
       await Products.findById({_id:userId},
        {push:{
                transaction:[{
                size:size,
                network:network,
                amount:amount,
                date:date,
                status:status,
            }]}
     })
    } catch (error) {
         console.log(error.message)
    }
  
}


module.exports = {share,gifting,getOneUser,getUsers,createUser,api,transaction}