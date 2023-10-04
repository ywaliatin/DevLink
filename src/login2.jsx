import React, { useState, useContext } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import UserContext from './UserContext'; 

function Login2() {
  const countrycode = "+61";
  const [phoneNumber, setPhoneNumber] = useState(countrycode);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null); // Use null instead of false
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // bypass OTP verification in development
      setConfirmationResult({ confirm: () => Promise.resolve({ user: {/* mock user data */} }) });
    } else {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
    }
  } catch (error) {
    alert('Error sending OTP: ' + error.message);
  }
};

  
  const verifyOtp = async () => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;
      setUser(user);
      alert('Logged in successfully');
      navigate('/profile');
    } catch (error) {
      alert('Error verifying OTP: ' + error.message);
    }
  };
  
  return (
    <div className="full-screen-container">
      <Segment className="login-segment">
        <h4>Login</h4>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {confirmationResult ? (
            <Form.Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          ) : null}
          <Button.Group>
            {!confirmationResult ? (
              <Button type="button" primary onClick={handleLogin}>Send OTP</Button>
            ) : (
              <Button type="button" primary onClick={verifyOtp}>Verify OTP</Button>
            )}
          </Button.Group>
          <div id="recaptcha-container"></div>
        </Form>
      </Segment>
    </div>
  );
}

export default Login2;
