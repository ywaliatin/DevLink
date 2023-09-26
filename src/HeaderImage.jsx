import React from "react";
import headerImage from "./Images/header.PNG"; // Correct the image path


// Header.jsx
function HeaderImage() {
    return (
      <div className='headerImage'>
        <img src={headerImage} alt="DevLink headerimage" width={800} height={300}/>
        
      </div>
    );
  }
  
  export default HeaderImage;
  