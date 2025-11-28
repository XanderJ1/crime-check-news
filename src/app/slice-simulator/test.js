const axios = require('axios');

const endPoint = 'https://api.mnotify.com/api/sms/quick';
const apiKey = 'XBFPgQAITlj4dw5qOmN3P9uMA';
const url = endPoint + '?key=' + apiKey;

const data = {
    recipient: ['0247830746', '0504517905'],
    sender: 'mNotify',
    message: 'API messaging is fun!',
    is_schedule: false,
    schedule_date: '',
// uncomment the below line to send OTP sms
// When sms_type: "otp" is included in your payload, a charge of 0.035 per campaign will be deducted from your main wallet.
//  sms_type: 'otp' please do not include in payload when the purpose of the blast is not for otp
};

axios.post(url, data, {
    headers: { 'Content-Type': 'application/json' }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
