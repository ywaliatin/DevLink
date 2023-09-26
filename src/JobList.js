import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import JobCard from './JobCard';
import UserContext from './UserContext';

function JobList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const database = getDatabase();
    const jobsRef = ref(database, 'jobs');
    const handleDataSnapshot = (snapshot) => {
      const fetchedJobs = [];
      snapshot.forEach((childSnapshot) => {
        const job = childSnapshot.val();
        job.id = childSnapshot.key;
        fetchedJobs.push(job);
      });
      setJobs(fetchedJobs);
    };
    
    const unsubscribe = onValue(jobsRef, handleDataSnapshot);
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleShowMore = () => setVisibleJobs(prevVisible => prevVisible + 6);
  const handleShowLess = () => setVisibleJobs(prevVisible => Math.max(prevVisible - 6, 4));
  const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()) || (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase())));
  const deleteJob = (jobId) => {
    const database = getDatabase();
    const jobRef = ref(database, `jobs/${jobId}`);
    remove(jobRef);
  };

  const handleCardClick = (jobId) => {
    if (!user) {
      alert('Please login/register first to access all FreeList/EmpList cards.');
      navigate('/login');
      return;
    }
    navigate(`/JobList/${jobId}`);
  };

  return (
    <div>
      <h2>Find Dev's ... </h2>
      <div className="job-list">
        <input type="text" placeholder="Filter by skill or job title..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        {filteredJobs.slice(0, visibleJobs).map((job) => (
          <div key={job.id} onClick={() => handleCardClick(job.id)}>
            <JobCard job={job} onDelete={deleteJob} />
          </div>
        ))}
        {visibleJobs < 4 && <button className="grey-button" onClick={handleShowLess}>Show me less</button>}
        {visibleJobs < filteredJobs.length && <button className="grey-button" onClick={handleShowMore}>Show me more</button>}
      </div>
    </div>
  );
}

export default JobList;
