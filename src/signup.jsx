import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send the email to the server for subscription processing
    fetch('/api/subscribe', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Subscription successful');
        setEmail('');  // Clear the input after successful submission
        // Optionally, show a success message to the user
      } else {
        console.log('Subscription failed');
        // Optionally, show an error message to the user
      }
    })
    .catch(error => {
      console.error('There was an error with the subscription:', error);
      // Optionally, show an error message to the user
    });
  };
  

  return (
    <div className='signup'>
    <form onSubmit={handleSubmit}>
      <label className='inputsignup'>
        Sign up for our daily insider
        <input className='emailsignup'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Please type your email"
        />
      </label>
      <button type="submit">Subscribe</button>
    </form>
    </div>
  );
};

export default SignupForm;
