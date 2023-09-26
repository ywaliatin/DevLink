import React from "react";
import devlinkLogo from "./Images/yeni.png"; // Correct the image path


// Header.jsx
function Header() {
    return (
      <div className='header'>
        <img src={devlinkLogo} alt="DevLink Marketplace Logo" width={50}/>
        <h3 className='title'></h3>
      </div>
    );
  }
  
  export default Header;
  