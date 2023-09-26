import React from 'react';
import './index.css'; // Import your CSS file for Footer styling
import socialmediaImage from "./Images/link.png"; 
import socialmediaImage2 from "./Images/fb.png"; 

const Footer = () => {
    

  return (
    <div className='footerclass'>
    <footer className="footer">
      <div className="column">
        <h3>For Dev</h3>
        <p><a href="url">How it works</a></p>
        <p><a href="url">How to create a profile</a></p>
        <p><a href="url">Find Jobs</a></p>
      </div>
      <div className="column">
        <h3>For Clients</h3>
        <p><a href="url">How it works</a></p>
        <p><a href="./EmpJobForm">How to post a job</a></p>
        <p><a href="url">Find Dev</a></p>
      </div>
      <div className="column">
        <h3>Stay connected</h3>
        <p> 
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src= {socialmediaImage} alt="LinkedIn" width="30" height="30" style={{ marginRight: '10px' }}/>
             
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src= {socialmediaImage2} alt="LinkedIn" width="30" height="30" />
             
        </a>
        </p>

        
      </div>
    </footer>
    </div>
  );
};

export default Footer;
