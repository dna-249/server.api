const https = require("https")


const gifting =async(q,r)=>{

  const params = `client_id=${process.env.customer_key}&client_secret=${process.env.customer_secret}`




const options = {
  hostname: 'api.mtn.com',
  port: 443,
  path: '/v1/oauth/access_token?grant_type=client_credentials',
  method: 'POST',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  }}

const req = https.request(options, res => {
  let data = ''
 
  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
   const response = JSON.parse(data)
    r.json(response)
  })
}).on('error', error => {
  console.error(error)
})

req.write(params)
req.end() 
}

/*const verify = async(q,r)=>{
const {email,ref,adm} = q.body
const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: `/transaction/timeline/${ref}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.SECRET_KEYS}`,
    'Content-Type': 'application/json'
  }
}

const req = https.get(options, res => {
    let data = ''
 
  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', async() => {
    const response = JSON.parse(data)
    console.log(response)
    responses(response?.data?.success)
  
  })
}).on('error', error => {
  console.error(error)
})
const responses =(res)=>{
  r.send(res)
}

req.end()

} */


 const share =async(req,res)=>{
res.sendStatus(200)
}

const createUser =async(req,res)=>{
    const {name,email,phone,address,user,password} =req.body;

    try {
    const create = await Products.create({
                   
                    name:name,
                    email:email,
                    phone:phone,
                    address:address,
                    user:user,
                    pass:password, 
                     }) 
        res.send("created")
    } catch (error) {
        res.json(error)
    }
}

const getUsers =async(req,res)=>{
    try {
          const users = await Products.find({})
          console.log("created")
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