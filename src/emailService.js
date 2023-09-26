require('dotenv').config();
const request = require('request');

function sendWelcomeEmail(recipientEmail) {
    return new Promise((resolve, reject) => {
        const data = {
            members: [{
                email_address: recipientEmail,
                status: 'subscribed',
            }]
        };

        const apiKey = process.env.MAILCHIMP_API_KEY;
        const listId = process.env.MAILCHIMP_LIST_ID;
        const server = apiKey.split('-')[1];  // Last part of your Mailchimp API key is the server

        request.post({
            url: `https://${server}.api.mailchimp.com/3.0/lists/${listId}`,
            headers: {
                'Authorization': `apikey ${apiKey}`,
                'Content-Type': 'application/json'
                
            },
            json: true,
            body: data

            

        }, (error, response, body) => {
            console.log('Mailchimp response:', body);
            if (error) {
                console.error('Mailchimp error:', error);
                reject({ type: 'EMAIL_ERROR', message: error.message });
            } else if (body.errors && body.errors.length) {
                console.error('Mailchimp error:', body.errors[0].error);
                reject({ type: 'EMAIL_ERROR', message: body.errors[0].error });
            } else {
                resolve(body);
            }
        });
    });
}

module.exports = { sendWelcomeEmail };
