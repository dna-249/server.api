// Load the Twilio module
const twilio = require('twilio');

// Your Twilio account credentials (from https://www.twilio.com/console)
const accountSid = 'your_account_SID';   // Replace with your Account SID
const authToken = 'your_auth_token';     // Replace with your Auth Token

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Send an SMS
client.messages
  .create({
    body: 'Hello from Node.js using Twilio!', // Message content
    from: '+1234567890', // Your Twilio phone number
    to: '+0987654321'    // Recipient's phone number
  })
  .then(message => {
    console.log(`Message sent! SID: ${message.sid}`);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
