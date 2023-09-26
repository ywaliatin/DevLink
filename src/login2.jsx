import React, { useState, useContext, useEffect } from 'react';
//import { auth, signInWithPhoneNumber, RecaptchaVerifier } from './firebase'; // import additional Firebase Auth methods
import { auth } from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth"; 

import { useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import UserContext from './UserContext';

const Login = () => {
  const countrycode = "+61"
  const [phoneNumber, setPhoneNumber] = useState(countrycode);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', null, auth);
      const confirmation = await signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
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
        <Form>
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
              <Button primary onClick={handleLogin}>
                Send OTP
              </Button>
            ) : (
              <Button primary onClick={verifyOtp}>
                Verify OTP
              </Button>
            )}
          </Button.Group>
          {/* Add this div for the reCAPTCHA */}
          <div id="recaptcha-container"></div>
        </Form>
      </Segment>
    </div>
  );
};

export default Login;
