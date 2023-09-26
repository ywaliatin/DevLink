const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Use Cors middleware for enabling Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a POST endpoint for email subscription
app.post('/subscribe', async (req, res) => {
  const { email, name } = req.body;

  // Create a Nodemailer transporter (configure with your email service)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
      user: 'tintinwaliatin@gmail.com', // Replace with your email address
      pass: '050969sM', // Replace with your email password or app-specific password
    },
  });

  // Enable SMTP debugging
transporter.on('debug', console.log);

  // Define the email content
  const mailOptions = {
    from: 'tintinwaliatin@gmail.com',
    to: email,
    subject: 'Welcome to DevLink Marketplace',
    text: `Hello ${name},\n\nThank you for subscribing to DevLink Marketplace!`,
  };

  try {
    // Send the email
    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
