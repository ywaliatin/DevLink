// MainContent.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderImage from './HeaderImage';
import JobPage from './JobPage';

function MainContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/JobPage' && <HeaderImage />}
      {/* Add other components or logic based on the route here */}
    </>
  );
}

export default MainContent;
