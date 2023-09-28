// components/JobPage.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import Free2JobForm from './Free2JobForm';
import Emp2JobForm from './Emp2JobForm';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const jobTypes = [
  { key: 'freelance', value: 'freelance', text: 'Freelance' },
  { key: 'employment', value: 'employment', text: 'Employment' },
];

const JobPage = () => {
  const [selectedJobType, setSelectedJobType] = useState(null);
  const navigate = useNavigate();

  const handleJobTypeChange = (_, { value }) => {
    setSelectedJobType(value);
    if (value === 'employment') {
      navigate('/PaymentForm');
    }
  };
  

   // Define a new function to handle payment navigation
   const handlePaymentNavigation = () => {
    navigate('/PaymentForm'); // Navigates to PaymentForm component when called
  };

  const renderJobComponents = () => {
    if (selectedJobType === 'freelance') {
      return <Free2JobForm />;
    } else if (selectedJobType === 'employment') {
      return (
        <>
          <Emp2JobForm />
          <Button onClick={handlePaymentNavigation} color='blue'>Pay</Button> {/* Add Pay Button Here */}
        </>
      );
    }
    return null;
  };

  return (
    <div className="fullWidthContainer">
    <Container >
      <h1>Post a New Job</h1>
      <h4>New Job</h4>
      <Form>
        <Form.Group inline>
          <label>Choose the type of job:</label>
          {jobTypes.map((jobType) => (
            <Form.Radio
              key={jobType.key}
              label={jobType.text}
              value={jobType.value}
              checked={selectedJobType === jobType.value}
              onChange={handleJobTypeChange}
            />
          ))}
        </Form.Group>
        {renderJobComponents()}
        
      </Form>
    </Container>
    </div>
  );
};

export default JobPage;
