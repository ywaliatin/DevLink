// index.js

import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useLocation } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import MenuComponent from './Menu';
import HeaderImage from './HeaderImage';
import 'semantic-ui-css/semantic.min.css'; // Import the Semantic UI CSS
import NewsLetterSubscription from './NewsLetterSubscription';
import Footer from './Footer';
import Footer2 from './Footer2';
import Footer3 from './footer3';
import Login2 from './login2'; 
import Login from './login'; // Import your Login component
import Register from './register'; // Import your Login component
import UserProfile from './profile';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import  UserContext  from './UserContext';
import ForgotPassword from './forgot-password';
import FreelancerCard from './FreelancerCard';
import JobList from './JobList';
import JobList1 from './JobList1';
import EmpList from './EmpList';
import EmpLists from './EmpLists';
import CustomerCard from './FreelancerCard';
import JobCard from './JobCard';
import EmpCard from './EmpCard';
import CustomerList from './CustomerList';
import Signup from './signup';
import JobPage from './JobPage';
import PaymentForm from './PaymentForm';
import Chat from './Chat';
import ChatGPT from './ChatGPT';
import { listenToAuthChanges } from './firebase';  // Update this path to point to your Firebase setup file


const data = [
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 1',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 2',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 3',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 4',
    name: 'Freelancer 4',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 4',
    name: 'Freelancer 4',
    rating: 4.5,
  },
  // Add more items as needed
];

const datacust = [
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 1',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 2',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 3',
    name: 'Freelancer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 4',
    name: 'Freelancer 4',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square.jpg'),
    description: 'Description of Image 4',
    name: 'Freelancer 4',
    rating: 4.5,
  },
  // Add more items as needed
];

const customerData = [
  {
    imageUrl: require('./Images/square2.JPG'),
    description: 'Customer 1 Description',
    name: 'Customer 1',
    rating: 4.5,
  },
  {
    imageUrl: require('./Images/square2.JPG'),
    description: 'Customer 2 Description',
    name: 'Customer 2',
    rating: 4.2,
  },
  {
    imageUrl: require('./Images/square2.JPG'),
    description: 'Customer 3 Description',
    name: 'Customer 3',
    rating: 4.8,
  },
  {
    imageUrl: require('./Images/square2.JPG'),
    description: 'Customer 2 Description',
    name: 'Customer 2',
    rating: 4.2,
  },
  {
    imageUrl: require('./Images/square2.JPG'),
    description: 'Customer 3 Description',
    name: 'Customer 3',
    rating: 4.8,
  },
  // Add more customer items as needed
];

function Content() {
  const location = useLocation();
  
  function ChatWrapper() {
    const { jobId } = useParams();
    return <Chat jobId={jobId} />;
  }
  

  return (
    
    <div>
        <Container className="container">
        <MenuComponent />
      </Container>
      
      {location.pathname !== '/JobPage' && <HeaderImage />}
      
      <Routes>
            <Route path="/JobPage" element={<JobPage />} />
            <Route path="/PaymentForm" element={<PaymentForm />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/FreelancerCard" element={<FreelancerCard />} />
            <Route path="/CustomerCard" element={<CustomerCard />} />
            <Route path="/EmpList" element={<EmpList />} />
            <Route path="/JobList" element={<JobList />} />
            <Route path="/ChatGPT" element={<ChatGPT />} />
            <Route path="/EmpList/:freelancejobId" element={<EmpCard />} />
            
            <Route path="/JobList/:jobId" element={<JobCard />} />
            <Route path="/Chat/:jobId" element={<ChatWrapper />} />

        {/*... Other Routes ...*/}
        <Route path="/" element={
          <>
            <JobList />
            <Divider />
            <EmpList/>
            <Divider />
            <NewsLetterSubscription/>
            <Container className="container">
              <Footer/>
              <Divider />
              <Footer2/>
              <Footer3/>
              
            </Container>
          </>
        }/>
      </Routes>
    </div>
  );
}


function App() {
  const [user, setUser] = useState(null);

  // Effect to listen to authentication changes
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((authUser) => {
      if (authUser) {
        setUser(authUser); // User is logged in, update the user state
      } else {
        setUser(null); // User is logged out, reset the user state
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Note: The empty dependency array ensures this effect runs only once when the component mounts.


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Content />
      </Router>
    </UserContext.Provider>
  );
}




//ReactDOM.render(<App />, document.getElementById('root'));

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);
