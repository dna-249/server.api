const https = require("https")
const {Products} = require("../models/user");
const { default: axios } = require("axios");

// Call the function



const qs = require('qs');
const { checkEligibility } = require("./api");

// Replace these with your actual credentials and endpoint
const tokenUrl = 'https://api.mtn.com/v1/oauth/access_token?grant_type=client_credentials';
const clientId = '3EKiybDnteaJ2skHsXVGUUNMtGLlvgk2';
const clientSecret ='akgfShZqdCgbMp3f';

const fetchAccessToken =async()=> {
  try {
    const data = qs.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(tokenUrl, data, { headers });

    console.log('✅ Access Token:', response);
    checkEligibility(response.data.access_token);
  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
    } else {
      console.error('⚠️ Unexpected Error:', error.message);
    }
  }
}


const checking =async(token)=> {
  const url = 'https://api.mtn.com/v1/datashare/customers/07074297959';

const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': '3EKiybDnteaJ2skHsXVGUUNMtGLlvgk2' // 🔑 Replace with your actual MTN API key
};

const data = {
  receiverMsisdn: '2345957585859',
  requestedDataAmount: '100',
  senderId: 'MyApp'
};

axios.post(url, data, { headers })
  .then(response => {
    console.log('✅ Success:', response.data);
  })
  .catch(error => {
    console.error('❌ Error:', error.response?.data || error.message);
  });

}


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
  if(response.data.code === "success"){
    transaction("transaction",userId,"success",date,amount,size,network)
    total2(userId,amount)
  }else{
     transaction("transaction",userId,"failed",date,amount,size,network)
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

 const product ={ MTN_DATA:[{price:"220", size:"230mb1d", network:"MTN",plan:" MTN 230MB Daily Plan"},
               {price: "495" ,size:"1gb1d", network:"MTN",plan:" MTN 1GB + 1.5Mins Daily plan"},
               {price: "795" ,size:"1gb1w", network:"MTN",plan:" MTN 1GB Weekly plan"},
               {price: "600" ,size:"1.5gb2d", network:"MTN",plan:" MTN 1.5GB 2 Days Plan"},
               {price: "995" ,size:"1.5gb1w", network:"MTN",plan:" MTN 1.5GB Weekly plan"},
               {price: "950" ,size:"2.5gb1d", network:"MTN",plan:" MTN 2.5GB Daily plan"},
               {price: "995" ,size:"2.5gb2d", network:"MTN",plan:" MTN 2.5GB 2 Days plan"},
               {price: "1490" ,size:"2gb1m", network:"MTN",plan:" MTN 2GB + 2Mins for 30days"},
               {price: "1990" ,size:"2.7gb1m", network:"MTN",plan:" MTN 2.7GB + 5Mins for 30days"},
               {price: "2490" ,size:"6gb1w", network:"MTN",plan:" MTN 6GB weekly plan"},
               {price: "2490" ,size:"3.5gb1m", network:"MTN",plan:" MTN 3.5GB + 5Mins for 30 Days"},
               {price: "3490" ,size:"7gb1m", network:"MTN",plan:" MTN 7GB for 30 Days"},
               {price: "4450" ,size:"10gb1m", network:"MTN",plan:" MTN 10GB +10Mins for 30days"},
               {price: "5450" ,size:"12.5gb1m", network:"MTN",plan:" MTN 12.5GB for 30days"},
               {price: "6450" ,size:"16.5gb1m", network:"MTN",plan:" MTN 16.5GB + 10mins for 30days"},
               {price: "7450" ,size:"20gb1m", network:"MTN",plan:" MTN 20GB for 30 days"},
               {price: "8890" ,size:"25gb1m", network:"MTN",plan:" MTN 25GB Monthly plan"}],

GLO_DATA:[{price:"300",size:"500MB", network:"GLO", plan:" GLO Data 500MB (SME) 30 Days"},
                    {price:"480", size:"1GB", network:"GLO", plan:" GLO Data 1GB (SME) 30 Days"},
                    {price:"990", size:"2GB", network:"GLO", plan:" GLO Data 2GB (SME) 30 Days"},
                    {price:"1450", size:"3GB", network:"GLO", plan:" GLO Data 3GB (SME) 30 Days"},
                    {price:"2450", size:"5GB", network:"GLO", plan:" GLO Data 5GB (SME) 30 Days"},
                    {price:"4850", size:"10GB", network:"GLO", plan:" GLO Data 10GB (SME) 30 Days"}],


AIRTEL_DATA :[{price:"300", size:"300mb2d", network:"Airtel",  plan:" Airtel  300MB for 2 Days"},
               { price:"500", size:"500mb1w", network:"Airtel",  plan:" Airtel  500MB Weekly Plan"},
               { price:"800", size:"1gb1w", network:"Airtel",  plan:" Airtel  1GB Weekly Plan"},
               { price:"600", size:"1.5gb2d", network:"Airtel",  plan:" Airtel  1.5GB for 2 Days"},
               { price:"990", size:"1.5gb1w", network:"Airtel",  plan:" Airtel  1.5GB Weekly Plan"},
               { price:"1490", size:"3.5gb1w", network:"Airtel",  plan:" Airtel  3.5GB Weekly Plan"},
               { price:"2490", size:"6gb1w", network:"Airtel",  plan:" Airtel  6GB Weekly Plan"},
               { price:"2990", size:"10gb1w", network:"Airtel",  plan:" Airtel  10GB Weekly Plan"},
               { price:"4990", size:"15gb1w", network:"Airtel",  plan:" Airtel  15GB Weekly Plan"},
               { price:"1490", size:"2gb1m", network:"Airtel",  plan:" Airtel  2GB Monthly Plan"},
               { price:"1990", size:"3gb1m", network:"Airtel",  plan:" Airtel  3GB Monthly Plan"},
               { price:"2490", size:"4gb1m", network:"Airtel",  plan:" Airtel  4GB Monthly Plan"},
               { price:"2990", size:"8gb1m", network:"Airtel",  plan:" Airtel  8GB Monthly Plan"},
               { price:"3990", size:"10gb1m", network:"Airtel",  plan:" Airtel  10GB Monthly Plan"},
               { price:"4990", size:"13gb1m", network:"Airtel",  plan:" Airtel  13GB Monthly Plan"},
               { price:"5900", size:"18gb1m", network:"Airtel",  plan:" Airtel  18GB Monthly Plan"},
               { price:"7900", size:"25gb1m", network:"Airtel",  plan:" Airtel  25GB Monthly Plan"},
               { price:"9990", size:"35gb1m", network:"Airtel",  plan:" Airtel  35GB Monthly Plan"}]}

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
                    status:status}],
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
const deleteTransactions =async()=>{
   const user = await Products.find({})
        for(let i = 0; i< user.length;i++){
            const items = user[i]
            const id = user[i]
                
            for(let i = 0;i<items.transaction.length;i++){
            const item =  items?.transaction[i].date
            const _id2 =  items?.transaction[i]._id
            console.log(item)
           
            const date2 = new Date(item)
            const current = new Date()
          
            const current2 = date2.getTime()
            const diff = (current-current2)/86400000
            console.log(diff)


            if(diff > 25){
            await Products.findOneAndUpdate({_id:id},
            {$pull:
                {["transaction"]:{_id:_id2}}
            })
                }else{
                    return;
                }      
        }}
   
}  
setInterval(() => {
  deleteTransactions()
}, 24*60*60000);

const transaction = async(object,_id,status,date,amount,size,network)=>{
   try { 
                 await Products.findByIdAndUpdate({_id:_id},{
                    $push:{
                      [`${object}`]:[
                        {
                           size:size,
                            network:network,
                            amount:amount,
                            date:date,
                            status:status
                        }]
                    }
                })
                res.sendStatus(200)
   
    } catch (error) {
         console.log(error.message)
    }
  
}
const order = async(req,res)=>{
  const {userId,date,amount,size,network,phone} = req.body
   try { 
                 await Products.findByIdAndUpdate({_id:userId},{
                    $push:{
                      ["order"]:[
                        {
                           size:size,
                            network:network,
                            amount:amount,
                            date:date,
                            phone:phone
                        }]
                    }
                })
                res.sendStatus(200)
   
    } catch (error) {
         console.log(error.message)
    }
  
}


module.exports = {order,fetchAccessToken,share,gifting,getOneUser,getUsers,createUser,api,transaction,total,payment,total2,deleteOneUser}