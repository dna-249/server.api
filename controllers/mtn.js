const https = require("https")


const gifting =async(req,res)=>{
 const {email,amount} = q?.body
  const params = JSON.stringify({
  "email": email,
  "amount": amount *100,
  
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.SECRET_KEYS}`,
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

const verify = async(q,r)=>{
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

}


 const share =async(req,res)=>{
console.log("share")
}


module.exports = {share,gifting}