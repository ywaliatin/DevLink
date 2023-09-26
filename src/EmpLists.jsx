import React, { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import EmpCard from './EmpCard';

function EmpList() {
  const [freelancejobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(4);  // initially showing 6 jobs (2 rows)
  const [searchQuery, setSearchQuery] = useState("");  // for filtering by skill or job title

  useEffect(() => {
    const database = getDatabase();
    const jobsRef = ref(database, 'freelancejobs');

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

  const filteredJobs = freelancejobs.filter(job => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const deleteJob = (jobId) => {
    const database = getDatabase();
    const jobRef = ref(database, `freelancejobs/${jobId}`);
    remove(jobRef); // delete the job from Firebase
  };
  

  return (
    <div>
        <h2>Dev's Employees</h2>
    
    <div className="job-list"> 
    
      <input 
        type="text" 
        placeholder="Filter by skill or job title..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {filteredJobs.slice(0, visibleJobs).map((job) => (
        <EmpCard key={job.id} job={job} onDelete={deleteJob}/>
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

export default EmpList;
