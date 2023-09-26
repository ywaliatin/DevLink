import React, { useState, useEffect, useContext } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import JobCard from './JobCard';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function JobsList1() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(4);  // initially showing 6 jobs (2 rows)
  const [searchQuery, setSearchQuery] = useState("");  // for filtering by skill or job title

  useEffect(() => {
    const database = getDatabase();
    const jobsRef = ref(database, 'jobs');

    const handleDataSnapshot = (snapshot) => {
      const fetchedJobs = [];
      snapshot.forEach((childSnapshot) => {
        const job = childSnapshot.val();
        job.id = childSnapshot.key; // Set the Firebase document ID as an ID for the job
        fetchedJobs.push(job);
      });

      setJobs(fetchedJobs);
    };

    const unsubscribe = onValue(jobsRef, handleDataSnapshot);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }; // Cleanup listener on component unmount
  }, []);

  const handleShowMore = () => {
    setVisibleJobs(prevVisible => prevVisible + 6); // Show 6 more jobs (2 more rows) each time
  };

  const handleShowLess = () => {
    setVisibleJobs(prevVisible => Math.max(prevVisible - 6, 6)); // Reduce by 6 jobs but not below the initial 6
};

  const filteredJobs = jobs.filter(job => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const deleteJob = (jobId) => {
    const database = getDatabase();
    const jobRef = ref(database, `jobs/${jobId}`);
    remove(jobRef); // delete the job from Firebase
  };

  const handleCardClick = (jobId) => {
    if (!user) {
      alert('Please login/register first to access all FreeList/EmpList cards.');
      navigate('/login');
      return;
    }
    navigate(`/JobList1/${jobId}`);
  };
  

  return (
    <div>
        <h2>JobList1</h2>
    
    <div className="job-list"> 
    
      <input 
        type="text" 
        placeholder="Filter by skill or job title..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

{filteredJobs.slice(0, visibleJobs).map((job) => (
  <JobCard key={job.id} job={job} onDelete={deleteJob} onCardClick={handleCardClick}/>

  
))}


      {visibleJobs > 6 && (
        <button className="grey-button" onClick={handleShowLess}>Show me less</button>
      )}
      
      {visibleJobs < filteredJobs.length && (
        <button className="grey-button" onClick={handleShowMore}>Show me more</button>
      )}
      
    </div> </div>
  );
}

export default JobsList1;
