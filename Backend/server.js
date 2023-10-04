const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Place this middleware at the very top of your middleware stack
app.use((req, res, next) => {
  console.log('Request received at:', new Date().toISOString(), req.method, req.url);
  next();
});


// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin to match your frontend’s URL
app.use(bodyParser.json());

// Setup nodemailer transporter, e.g. with SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define the sendMessage route
app.post('/sendMessage', async (req, res) => {
  console.log('Inside /sendMessage route');
  try {
    const userMessage = req.body.message;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: userMessage,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': process.env.OPENAI_API_KEY
      }
    });
    
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define the subscribe route
app.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  try {
    // Send email
    await transporter.sendMail({
      from: 'tintinwaliatin@gmail.com',
      to: email,
      subject: 'Thank you for subscribing!',
      text: `Hi ${name}! Thank you for subscribing to our newsletter!`,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000'); // Updated port in console log message
});
