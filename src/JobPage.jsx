// components/JobPage.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import Free2JobForm from './Free2JobForm';
import Emp2JobForm from './Emp2JobForm';
import './index.css';

const jobTypes = [
  { key: 'freelance', value: 'freelance', text: 'Freelance' },
  { key: 'employment', value: 'employment', text: 'Employment' },
];

const JobPage = () => {
  const [selectedJobType, setSelectedJobType] = useState(null);

  const handleJobTypeChange = (_, { value }) => {
    setSelectedJobType(value);
  };

  const renderJobComponents = () => {
    if (selectedJobType === 'freelance') {
      return <Free2JobForm />;
    } else if (selectedJobType === 'employment') {
      return <Emp2JobForm />;
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
