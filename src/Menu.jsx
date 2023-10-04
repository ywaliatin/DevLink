import React, { useContext } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import devlinkLogo from "./Images/yeni.png"; // Correct the image path
import { Link, useNavigate } from 'react-router-dom';  // Corrected the import
import UserContext from './UserContext';
import { logout } from './firebase';  // Removed the unused auth import

const MenuComponent = () => {
  const navigate = useNavigate();  // Get the navigate function from react-router-dom
  const { user, setUser } = useContext(UserContext); // Use the user and setUser from context
  
  const handleLogout = async () => {
    try {
      await logout();  // Call the logout function
      setUser(null); // Reset user in the context
      alert('Logged out successfully');
      navigate('/login2'); // Navigate to the main homepage
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <Menu fixed="top" inverted>
      <Menu.Item as={Link} to="/" header className='find-jobs'>
        <Image src={devlinkLogo} alt="DevLink Marketplace Logo" width={50} />
      </Menu.Item>
      <Menu.Item as={Link} to="/" header className='find-jobs'>
        DevLink Marketplace
      </Menu.Item>
  
      {/* Render Find Dev and Find Jobs only if user is logged in */}
      {user && (
        <>
          <Menu.Item as={Link} to="/JobList" className='find-dev-item'>
            Find Dev
          </Menu.Item>
          <Menu.Item as={Link} to="/EmpList" className='find-jobs'>
            Find Jobs
          </Menu.Item>
        </>
      )}
  
      {user ? (
        <Menu.Item as={Link} to="/login2" onClick={handleLogout} className='find-jobs'>
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item as={Link} to="/login2" className='find-jobs'>
            Login
          </Menu.Item>
          <Menu.Item as={Link} to="/register" className='find-jobs'>
            Create Account
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  
};

export default MenuComponent;
