const https = require("https")


const gifting =async(q,r)=>{
console.log(process.env.customer_key)
  const params = JSON.stringify({
  'client_id':`${process.env.customer_key}`,
 ' client_secret':`${process.env.customer_secret}`

  
})


const options = {
  hostname: 'https://api.mtn.com',
  port: 443,
  path: 'v1/oauth/access_token?grant_typ=credentials',
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
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


module.exports = {share,gifting}