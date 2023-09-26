import React, { useState } from 'react';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // New state to track subscription status

  const handleSubscribe = async () => {
    if (email && name) {
      try {
        const res = await fetch("http://localhost:3001/subscribe", {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email,
            name
          })
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error posting data:', errorData);
          setMessage('Error subscribing. Please try again.');
          throw new Error('Failed to post data');
        } else {
          setIsSubscribed(true); // Set subscribed status to true on successful subscription
          setEmail('');
          setName('');
        }
      } catch (error) {
        console.error("Error subscribing: ", error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage('Please enter a valid name and email.');
    }
  };

  // New function to render different components or messages based on subscription status
  const renderContent = () => {
    if (isSubscribed) {
      return (
        <div>
        <h2>Thank You for Subscribing!</h2>
        <p className='sub'>You'll receive useful weekly ideas straight to your inbox.</p>
     </div>
      );
    }

    return (
        <div className='signup'>
        <label className='inputsignup-label'>
        Sign up for our daily insider
        </label>
        <div className="input-container">
        <input 
            className='namesignup'
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
        />
        <input 
            className='emailsignup'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
        />
        
        <button className="grey-button2" onClick={handleSubscribe}>Subscribe</button>
        </div>
        {message && <p>{message}</p>}
        </div>

    );
}

return (
  <div>
    {renderContent()} {/* Call the function to render appropriate content */}
  </div>
);
}

export default NewsletterSubscription;
