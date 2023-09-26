import React, { useState } from 'react';

function JobCard({ job, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  // Function to shorten job description to 7 words
  const shortenDescription = (desc) => {
    return desc.split(" ").slice(0, 7).join(" ") + "...";
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent the onClick event of the parent container from being triggered
    onDelete(job.id); // call the onDelete prop with the job's id
  };
  

  return (
    
    <div className="job-card" onClick={() => setExpanded(!expanded)}>
       <button className="grey-button" onClick={handleDelete}>Delete</button>
   
      <div className="job-profile-content">
        {job.profileImageUrl && <img src={job.profileImageUrl} className="job-card-image" alt="Job Profile" />}
        <h3 className="job-card-title">{job.title}</h3>
      </div>
      <div>
        <p>{expanded ? job.description : shortenDescription(job.description)}</p>
        {expanded && <p><strong>Skills:</strong> {job.skills}</p>}
        {expanded && <p><strong>Email:</strong> {job.email}</p>}
        {expanded && <p><strong>Project Length:</strong> {job.projectLength} days</p>}
        {expanded && <p><strong>Payment:</strong> ${job.paymentMin} - ${job.paymentMax}</p>}
        {expanded && <p><strong>Working Hours:</strong> {job.workingHours}</p>}
        
      </div>
    </div>
  );
}


export default JobCard;
