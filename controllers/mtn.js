const https = require("https")
const {Products} = require("../models/user");
const { default: axios } = require("axios");


const payment =(q,r)=>{
  
  const {email,amount,name} = q?.body
  const params = JSON.stringify({
  "email": email,
  "amount": amount *100,
  "name":name
  
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.LIVE_KEY}`,
    'Content-Type': 'application/json'
  }
}

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
  if(response.data.status === "success"){
    transaction(userId,response.data.status,date,amount,size,network)
    total2(userId,amount)
  }else{
     transaction(userId,response.data.status,date,amount,size,network)
  }
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

 const product ={ MTN_DATA:[{price:"220", size:"230mb1d", network:"MTN",plan:" MTN Direct Data 230MB Daily Plan"},
               {price: "550" ,size:"1gb1d", network:"MTN",plan:" MTN Direct Data 1GB + 1.5Mins Daily plan"},
               {price: "850" ,size:"1gb1w", network:"MTN",plan:" MTN Direct Data 1GB Weekly plan"},
               {price: "650" ,size:"1.5gb2d", network:"MTN",plan:" MTN Direct Data 1.5GB 2 Days Plan"},
               {price: "1100" ,size:"1.5gb1w", network:"MTN",plan:" MTN Direct Data 1.5GB Weekly plan"},
               {price: "950" ,size:"2.5gb1d", network:"MTN",plan:" MTN Direct Data 2.5GB Daily plan"},
               {price: "1200" ,size:"2.5gb2d", network:"MTN",plan:" MTN Direct Data 2.5GB 2 Days plan"},
               {price: "1500" ,size:"2gb1m", network:"MTN",plan:" MTN Direct Data 2GB + 2Mins for 30days"},
               {price: "2100" ,size:"2.7gb1m", network:"MTN",plan:" MTN Direct Data 2.7GB + 5Mins for 30days"},
               {price: "2600" ,size:"6gb1w", network:"MTN",plan:" MTN Direct Data 6GB weekly plan"},
               {price: "2650" ,size:"3.5gb1m", network:"MTN",plan:" MTN Direct Data 3.5GB + 5Mins for 30 Days"},
               {price: "3600" ,size:"7gb1m", network:"MTN",plan:" MTN Direct Data 7GB for 30 Days"},
               {price: "4600" ,size:"10gb1m", network:"MTN",plan:" MTN Direct Data 10GB +10Mins for 30days"},
               {price: "5600" ,size:"12.5gb1m", network:"MTN",plan:" MTN Direct Data 12.5GB for 30days"},
               {price: "6500" ,size:"16.5gb1m", network:"MTN",plan:" MTN Direct Data 16.5GB + 10mins for 30days"},
               {price: "7600" ,size:"20gb1m", network:"MTN",plan:" MTN Direct Data 20GB for 30 days"},
               {price: "9200" ,size:"25gb1m", network:"MTN",plan:" MTN Direct Data 25GB Monthly plan"}],

GLO_DATA:[{price:"350",size:"500MB", network:"GLO", plan:" GLO Data 500MB (SME) 30 Days"},
                    {price:"550", size:"1GB", network:"GLO", plan:" GLO Data 1GB (SME) 30 Days"},
                    {price:"1000", size:"2GB", network:"GLO", plan:" GLO Data 2GB (SME) 30 Days"},
                    {price:"1450", size:"3GB", network:"GLO", plan:" GLO Data 3GB (SME) 30 Days"},
                    {price:"2400", size:"5GB", network:"GLO", plan:" GLO Data 5GB (SME) 30 Days"},
                    {price:"4650", size:"10GB", network:"GLO", plan:" GLO Data 10GB (SME) 30 Days"}],


AIRTEL_DATA :[{price:"350", size:"300mb2d", network:"Airtel",  plan:" Airtel Direct Data 300MB for 2 Days"},
               { price:"550", size:"500mb1w", network:"Airtel",  plan:" Airtel Direct Data 500MB Weekly Plan"},
               { price:"850", size:"1gb1w", network:"Airtel",  plan:" Airtel Direct Data 1GB Weekly Plan"},
               { price:"700", size:"1.5gb2d", network:"Airtel",  plan:" Airtel Direct Data 1.5GB for 2 Days"},
               { price:"1100", size:"1.5gb1w", network:"Airtel",  plan:" Airtel Direct Data 1.5GB Weekly Plan"},
               { price:"1600", size:"3.5gb1w", network:"Airtel",  plan:" Airtel Direct Data 3.5GB Weekly Plan"},
               { price:"2600", size:"6gb1w", network:"Airtel",  plan:" Airtel Direct Data 6GB Weekly Plan"},
               { price:"3200", size:"10gb1w", network:"Airtel",  plan:" Airtel Direct Data 10GB Weekly Plan"},
               { price:"5200", size:"15gb1w", network:"Airtel",  plan:" Airtel Direct Data 15GB Weekly Plan"},
               { price:"1550", size:"2gb1m", network:"Airtel",  plan:" Airtel Direct Data 2GB Monthly Plan"},
               { price:"2100", size:"3gb1m", network:"Airtel",  plan:" Airtel Direct Data 3GB Monthly Plan"},
               { price:"2600", size:"4gb1m", network:"Airtel",  plan:" Airtel Direct Data 4GB Monthly Plan"},
               { price:"3200", size:"8gb1m", network:"Airtel",  plan:" Airtel Direct Data 8GB Monthly Plan"},
               { price:"4200", size:"10gb1m", network:"Airtel",  plan:" Airtel Direct Data 10GB Monthly Plan"},
               { price:"5200", size:"13gb1m", network:"Airtel",  plan:" Airtel Direct Data 13GB Monthly Plan"},
               { price:"6200", size:"18gb1m", network:"Airtel",  plan:" Airtel Direct Data 18GB Monthly Plan"},
               { price:"8200", size:"25gb1m", network:"Airtel",  plan:" Airtel Direct Data 25GB Monthly Plan"},
               { price:"10000", size:"35gb1m", network:"Airtel",  plan:" Airtel Direct Data 35GB Monthly Plan"}]}

                r.json(product)
}

const createUser =async(req,res)=>{
    const {name,email,phone,address,user,password,pin,date,size,amount,network,status,total} =req.body;

    try {
     await Products.create({
                   
                    name:name,
                    email:email,
                    phone:phone,
                    address:address,
                    pin:pin,
                    user:user,
                    pass:password,
                    total:total, 
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
const deleteOneUser =  async(req,res)=>{
    try {
        const {id}=req.params
        const student = await Products.findByIdAndDelete({_id:id}, req.body)

        if(!student){
            res.status(404).json("student not found")
        }else{
        res.status(200).json(student)}
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

const total = async(email,add)=>{

     const user = await Products.findOne({email:email})
     const sums = user?.total
     const id = user?._id

     const divid =()=>{return add/100}
     const adds = divid()
    try {
                    const sum =()=>{

                            if(add){ return Number(sums) + Number(adds)}
                           else{ return sums }

                            }

                    const plus = sum()

      await Products.findByIdAndUpdate({_id:id},{total:plus})
                          

    } catch (error) {
          console.log(error.message)
    }
  

}
const total2 = async(id,minus)=>{

     const user = await Products.findById({_id:id})
     const sums = user?.total

  
    try {
                    const sum =()=>{
                            if(minus){ return Number(sums) - Number(minus)
                            }else{ return sums }

                            }

                    const plus = sum()

      await Products.findByIdAndUpdate({_id:id},{total:plus})
                          

    } catch (error) {
          res.json(error.message)
    }
  

}

const transaction = async(req,res)=>{
   try { 
    const {id} = req.params;
    const {status,date,amount,size,network} = req.body;
   
       await Products.findByIdAndUpdate({_id:id},
        {push:{
                transaction:[{
                size:size,
                network:network,
                amount:amount,
                date:date,
                status:status
            }]}
     })
     res.sendStatus(200)
    } catch (error) {
         console.log(error.message)
    }
  
}
const resEvent =async(name,phone,email,date) =>{
       try {
          await Payer.create({
          name:name,
          phone:phone,
          email:email,
          date:date
     })
       console.log("created successfully")
     } catch (error) {
        console.log('error')  
     }
    
}


module.exports = {share,gifting,getOneUser,getUsers,createUser,api,transaction,total,payment,total2,deleteOneUser}