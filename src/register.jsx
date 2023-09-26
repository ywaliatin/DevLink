import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from './firebase';  // Single line import
import { useNavigate } from 'react-router-dom'; 
import { Button, Form, Segment } from 'semantic-ui-react';
import { db } from './firebase';  // Ensure you've exported Firestore instance as db


const Register = () => {
    const [fullname, setFullname] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registered successfully');
            navigate('/login'); 
        } catch (error) {
            alert('Error registering: ' + error.message);
        }
    }

    return (
        <div className="full-screen-container2">
        <Segment className="login-segment">
            <h4>Register</h4>
            <Form>
            <Form.Input
                    type="fullname"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                 <Form.Input
                    type="mobilephone"
                    placeholder="Mobile phone"
                    value={mobilenumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
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
                <Form.Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button primary onClick={handleRegister}>Register</Button>
            </Form>
        </Segment>
        </div>
    );
}

export default Register;
