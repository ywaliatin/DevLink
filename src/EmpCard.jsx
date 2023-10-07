import React, { useState } from 'react';

function EmpCard({ job, onDelete, onCardClick, onMessageClick }) {
  const [expanded, setExpanded] = useState(false);

  if (!job) {
    return null; // Guard against rendering with an undefined 'job' prop.
  }

  //const [expanded, setExpanded] = useState(false);

  // Function to shorten job description to 7 words
  const shortenDescription = (desc) => {
    return desc.split(" ").slice(0, 7).join(" ") + "...";
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent the onClick event of the parent container from being triggered
    onDelete(job.id); // call the onDelete prop with the job's id
  };

const handleCardClick = (e) => {
    e.stopPropagation();
    
    // The onCardClick function will handle checking the user's login state.
    // We can have it return a boolean, true if the user is logged in, false otherwise.
    const isUserLoggedIn = onCardClick();
    
    // Only toggle expanded state if user is logged in.
    if (isUserLoggedIn) {
      setExpanded((prevExpanded) => !prevExpanded);
    }
  };

  

  return (
    
    <div className="job-card" onClick={handleCardClick}>

    <button className="grey-button" onClick={handleDelete}>Delete</button>

   <div className="job-profile-content">
      {job.profileImageUrl && <img src={job.profileImageUrl} className="job-card-image" alt="Job Profile" />}
        <h3 className="job-card-title">{job.title}</h3>
  
   </div>
      <div>
        <p>{expanded ? job.description : shortenDescription(job.description)}</p>
        {expanded && <p><strong>Skills:</strong> {job.skills}</p>}
        {expanded && <p><strong>Project Length:</strong> {job.projectLength} days</p>}
        {expanded && <p><strong>Email:</strong> {job.email}</p>}
        {expanded && <p><strong>Payment:</strong> ${job.paymentMin} - ${job.paymentMax}</p>}
        {expanded && <p><strong>Working Hours:</strong> {job.workingHours}</p>}
        {expanded && <p><strong>Experience In:</strong> {job.experienceIn} </p>}
        {expanded && <p><strong>For at least:</strong> {job.forAtLeast}</p>}
        <button className="message-button" onClick={onMessageClick}>Booking</button>

      </div>
    </div>
  );
}


export default EmpCard;