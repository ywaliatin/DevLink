import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import EmpCard from './EmpCard';
import UserContext from './UserContext';


function EmpList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [freelancejobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const database = getDatabase();
    const jobsRef = ref(database, 'freelancejobs');
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
  const filteredJobs = freelancejobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()) || (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase())));
  const deleteJob = (freelancejobId) => {
    const database = getDatabase();
    const jobRef = ref(database, `freelancejobs/${freelancejobId}`);
    remove(jobRef);
  };

  const handleCardClick = (freelancejobId) => {
    if (!user) {
      alert('Please login/register first to access all FreeList/EmpList cards.');
      navigate('/login');
      return;
    }
    navigate(`/EmpList/${freelancejobId}`);
  };

  return (
    <div>
      <h2>Find A Job with Dev!</h2>
      <div className="job-list">
        <input type="text" placeholder="Filter by skill or job title..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        {filteredJobs.slice(0, visibleJobs).map((job) => (
          <div key={job.id} onClick={() => handleCardClick(job.id)}>
            <EmpCard job={job} onDelete={deleteJob} />
                      </div>
          
          
        ))}
        {visibleJobs < 4 && <button className="grey-button" onClick={handleShowLess}>Show me less</button>}
        {visibleJobs < filteredJobs.length && <button className="grey-button" onClick={handleShowMore}>Show me more</button>}
      
      
      </div>
      
    </div>
  );
}

export default EmpList;
