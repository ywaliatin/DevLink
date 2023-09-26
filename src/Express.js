const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import nodemailer

// Other middleware
app.use(cors());
app.use(express.json());

// Setup Nodemailer transport
let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'tintinwaliatin.com', // Replace with your email address
    pass: '050969sM' // Replace with your email password
  }
});

// Existing or Modified Subscribe route
app.post('/api/subscribe', (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  // Sending the Email
  try {
    let mailOptions = {
      from: 'tintinwaliatin.com',
      to: email,
      subject: 'Thank You for Subscribing!',
      text: 'You have successfully subscribed to our newsletter!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    return res.json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
