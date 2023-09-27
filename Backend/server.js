const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup nodemailer transporter, e.g. with SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tintinwaliatin@gmail.com',
    pass: '050969sM',
  },
});

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

app.listen(3002, () => {
  console.log('Server is running on port 3001');
});
