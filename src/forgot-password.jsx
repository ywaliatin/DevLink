import React, { useState } from 'react';
import { resetPassword } from './firebase';
import { useNavigate } from 'react-router-dom'; 
import { Button, Form, Segment } from 'semantic-ui-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await resetPassword(email);
            setMessage('Check your email for further instructions.');
        } catch (error) {
            setMessage('Error resetting password: ' + error.message);
        }
    };

    return (
        <div className="full-screen-container">
            <Segment className="login-segment">
                <h4>Reset Password</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button primary type="submit">Send Reset Email</Button>
                </Form>
                {message && <p>{message}</p>}
            </Segment>
        </div>
    );
}

export default ForgotPassword;
