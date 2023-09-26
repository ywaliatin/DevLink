import React, { useState, useContext } from 'react'; // Import useContext
import { auth, signInWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router-dom'; 
import { Button, Form, Segment } from 'semantic-ui-react';
import UserContext from './UserContext'; // Import UserContext


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Get the navigate function
    const { setUser } = useContext(UserContext); // Use the setUser from context

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user from the userCredential
            setUser(user); // Set the user in context
            alert('Logged in successfully');
            navigate('/profile '); // Navigate to the UserProfile
        } catch (error) {
            alert('Error logging in: ' + error.message);
        }
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // assuming this is the route for your password reset page
    };

    const handleRegister = () => {
        navigate('/register'); // navigate to the registration route when Register button is clicked
    };

    return (
        <div className="full-screen-container">
        <Segment className="login-segment">
            <h4>Login</h4>
            <Form>
                <Form.Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button primary onClick={handleLogin}>Login</Button>
                    <Button.Group>
                        <Button secondary onClick={handleForgotPassword} style={{ marginLeft: '20px' }}>Forgot Password</Button>
                        <Button color='teal' onClick={handleRegister}>Register</Button> {/* Added Register button with teal color */}
                    </Button.Group>  
            </Form>
        </Segment>
        </div>
    );
}

export default Login;
