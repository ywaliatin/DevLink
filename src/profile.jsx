import React from 'react';
import { auth, logout } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';

const UserProfile = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(auth);
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    if (!user) {
        return <p>Please log in first.</p>;
    }

    return (
        <Segment>
            <h4>User Profile</h4>
            
            <p><strong>Email:</strong> {user.email}</p>
            
            {/* You can add more details here if you've stored other user info */}
            
            <Button color='red' onClick={handleLogout}>Sign Out</Button>
        </Segment>
    );
}

export default UserProfile;
