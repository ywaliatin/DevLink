// CustomerList.jsx
import React, { useState } from 'react';  // <-- Make sure to import useState
import CustomerCard from './CustomerCard';
import JohnDoe from './Images/1.png';
import JaneSmith from './Images/2.png';
import Michael from './Images/3.png';
import John from './Images/4.png';
import Mitch from './Images/5.png';
import Lulu from './Images/6.png';
import MLee from './Images/7.png';
import Iain from './Images/8.png';
import { Button } from 'semantic-ui-react';  // <-- Import Button from semantic-ui-react


const CustomerList = () => {
    const [visibleCustomers, setVisibleCustomers] = useState(2); // <-- state to control the number of visible freelancers
  
 // Data for freelancers
const customers = [
    {
      id: 1,
      name: "ABC",
      description: "Looking full Stack Developer with 5 years of experience in React and Node.js, Full Stack Developer with 5 years of experience in React and Node.js., Full Stack Developer with 5 years of experience in React and Node.js..",
      experienced: "at least 2 years in React js",
      imageUrl: JohnDoe,
      rating: 4
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "UI/UX Designer with a passion for creating intuitive user interfaces.",
      experienced: "5 years web development",
      imageUrl: JaneSmith,
      rating: 5
    },
    {
      id: 3,
      name: "Michael Johnson",
      description: "Java Developer with 3 years of experience in Spring Boot.",
      experienced: "5 years web development",
      imageUrl: Michael,
      rating: 4.5
    },
    {
        id: 4,
        name: "Michael John",
        description: "Java Developer with 3 years of experience in Spring Boot.",
        experienced: "5 years web development",
        imageUrl: John,
        rating: 4.5
      },

      {
        id: 5,
        name: "Mitch Johnson",
        description: "Java Developer with 3 years of experience in Spring Boot.",
        experienced: "5 years web development",
        imageUrl: Mitch,
        rating: 4.5
      },
      {
        id: 6,
        name: "Lulu Leem",
        description: "Java Developer with 3 years of experience in Spring Boot.",
        experienced: "5 years web development",
        imageUrl: Lulu,
        rating: 4.5
      },
      {
        id: 7,
        name: "Michael Lee",
        description: "Java Developer with 3 years of experience in Spring Boot.",
        experienced: "5 years web development",
        imageUrl: MLee,
        rating: 4.5
      },
      {
        id: 8,
        name: "Iain Ibrahim",
        description: "Java Developer with 3 years of experience in Spring Boot.",
        experienced: "5 years web development",
        imageUrl: Iain,
        rating: 4.5
      },
    // ... add more freelancers as needed
  ];
  

  // Increase the number of visible freelancers
  const handleShowMore = () => {
    setVisibleCustomers(customers.length); // Show all freelancers
  };

  // Decrease the number of visible freelancers
  const handleShowLess = () => {
    setVisibleCustomers(2); // Show only 2 freelancers
  };

  return (
    <><h4 className='findajob'>Find a job</h4>
    <div className="freelancer-list">
      
      {customers.slice(0, visibleCustomers).map((customer, index) => (
        <CustomerCard 
          key={index}
          name={customer.name} 
          description={customer.description}
          imageUrl={customer.imageUrl}
          rating={customer.rating}
          experienced={customer.experienced}
        />
      ))}

<div className="button-container">
      {visibleCustomers < customers.length ? (
        <Button className= "buttonmoreless" onClick={handleShowMore}>Show More</Button>
      ) : (
        <Button className= "buttonmoreless"  onClick={handleShowLess}>Show Less</Button>
      )}
      </div>
    </div>
    </>
  );
}

export default CustomerList;
