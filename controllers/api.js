const axios = require('axios');

// 🔐 Your credentials from MTN Developer portal
const clientId = process.env.SHARE_KEY;
const clientSecret = process.env.SHARE_SECRET;

// 🌍 MSISDN you want to check


const checkEligibility =(token)=>{
const apiKey = process.env.SHARE_KEY; // Replace with your real API key
const senderMsisdn = '2347074297959'; // Replace with actual sender MSISDN

const url = `https://api.mtn.com/v1/datashare/customers/${senderMsisdn}`;

const data = {
  receiverMsisdn: '2348136439493',
  requestedDataAmount: '100',
  senderId: 'MyApp'
};

const headers = {
   'Authorization':token,
  'Content-Type': 'application/json',
  'X-API-Key': apiKey
};

axios.post(url, data, { headers })
  .then(response => {
    console.log('✅ Data Share Response:', response.data);
  })
  .catch(error => {
    console.error('❌ Error:', error.response?.data || error.message);
  });
}

module.exports={
    checkEligibility
}
