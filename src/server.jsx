const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendWelcomeEmail } = require('./emailService'); // Assuming this function sends the email.

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  sendWelcomeEmail(email)
    .then(() => {
      res.status(200).send('Email sent successfully.');
    })
    .catch(error => {
      console.error('Error sending email:', error);
      res.status(500).send('Server error.');
    });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
